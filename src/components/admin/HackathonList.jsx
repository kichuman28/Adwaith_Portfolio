import { useState } from 'react';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { FaEdit, FaTrash, FaEye, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmation from './DeleteConfirmation';

const HackathonList = ({ hackathons, onEdit, setMessage, refreshHackathons }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [hackathonToDelete, setHackathonToDelete] = useState(null);
  const [isReordering, setIsReordering] = useState(false);
  const navigate = useNavigate();

  // Sort hackathons by displayOrder, with new items (without displayOrder) at the end
  const sortedHackathons = [...hackathons].sort((a, b) => {
    // If both have displayOrder, compare them
    if (a.displayOrder !== undefined && b.displayOrder !== undefined) {
      return a.displayOrder - b.displayOrder;
    }
    // If only a has displayOrder, a comes first
    if (a.displayOrder !== undefined) {
      return -1;
    }
    // If only b has displayOrder, b comes first
    if (b.displayOrder !== undefined) {
      return 1;
    }
    // If neither has displayOrder, sort by creation date (newest first)
    const aDate = a.createdAt?.toDate() || new Date(0);
    const bDate = b.createdAt?.toDate() || new Date(0);
    return bDate - aDate;
  });

  const handleDelete = async () => {
    if (!hackathonToDelete) return;

    try {
      await deleteDoc(doc(db, 'hackathons', hackathonToDelete.id));
      setMessage({ type: 'success', text: 'Hackathon deleted successfully!' });
      if (refreshHackathons) refreshHackathons();
    } catch (error) {
      console.error('Error deleting hackathon:', error);
      setMessage({ type: 'error', text: 'Error deleting hackathon. Please try again.' });
    }

    setShowDeleteConfirm(false);
    setHackathonToDelete(null);
  };

  const confirmDelete = (hackathon) => {
    setHackathonToDelete(hackathon);
    setShowDeleteConfirm(true);
  };

  const moveHackathon = async (hackathon, direction) => {
    setIsReordering(true);
    try {
      const currentIndex = sortedHackathons.findIndex(h => h.id === hackathon.id);
      const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      
      // Check if move is possible
      if (targetIndex < 0 || targetIndex >= sortedHackathons.length) {
        setIsReordering(false);
        return;
      }
      
      const targetHackathon = sortedHackathons[targetIndex];
      
      // Swap display orders
      const currentOrder = hackathon.displayOrder || Number.MAX_SAFE_INTEGER;
      const targetOrder = targetHackathon.displayOrder || Number.MAX_SAFE_INTEGER;
      
      // Update both hackathons
      await updateDoc(doc(db, 'hackathons', hackathon.id), {
        displayOrder: targetOrder
      });
      
      await updateDoc(doc(db, 'hackathons', targetHackathon.id), {
        displayOrder: currentOrder
      });
      
      setMessage({ type: 'success', text: 'Hackathon order updated!' });
      if (refreshHackathons) refreshHackathons();
    } catch (error) {
      console.error('Error reordering hackathons:', error);
      setMessage({ type: 'error', text: 'Error updating hackathon order. Please try again.' });
    }
    setIsReordering(false);
  };

  return (
    <div className="space-y-4">
      {sortedHackathons.map((hackathon, index) => (
        <div
          key={hackathon.id}
          className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6"
          style={{
            boxShadow: '0 0 20px rgba(52, 211, 153, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">{hackathon.title}</h3>
              <p className="text-white/60 text-sm">
                {new Date(hackathon.date).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Order Controls */}
              <div className="flex items-center gap-2 mr-2">
                <button
                  onClick={() => moveHackathon(hackathon, 'up')}
                  disabled={index === 0 || isReordering}
                  className={`p-2 rounded-lg transition-colors duration-200 
                    ${index === 0 || isReordering 
                      ? 'bg-white/5 text-white/30 cursor-not-allowed' 
                      : 'bg-emerald-400/20 text-emerald-400 hover:bg-emerald-400/30'}`}
                  title="Move Up"
                >
                  <FaArrowUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => moveHackathon(hackathon, 'down')}
                  disabled={index === sortedHackathons.length - 1 || isReordering}
                  className={`p-2 rounded-lg transition-colors duration-200 
                    ${index === sortedHackathons.length - 1 || isReordering 
                      ? 'bg-white/5 text-white/30 cursor-not-allowed' 
                      : 'bg-emerald-400/20 text-emerald-400 hover:bg-emerald-400/30'}`}
                  title="Move Down"
                >
                  <FaArrowDown className="w-4 h-4" />
                </button>
              </div>
              
              <button
                onClick={() => navigate(`/hackathons/${hackathon.id}`)}
                className="p-2 rounded-lg bg-emerald-400/20 text-emerald-400 hover:bg-emerald-400/30 transition-colors duration-200"
                title="View Hackathon"
              >
                <FaEye className="w-5 h-5" />
              </button>
              <button
                onClick={() => onEdit(hackathon)}
                className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors duration-200"
                title="Edit Hackathon"
              >
                <FaEdit className="w-5 h-5" />
              </button>
              <button
                onClick={() => confirmDelete(hackathon)}
                className="p-2 rounded-lg bg-red-400/20 text-red-400 hover:bg-red-400/30 transition-colors duration-200"
                title="Delete Hackathon"
              >
                <FaTrash className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}

      <DeleteConfirmation
        isOpen={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false);
          setHackathonToDelete(null);
        }}
        onConfirm={handleDelete}
        title="Delete Hackathon"
        message="Are you sure you want to delete this hackathon? This action cannot be undone."
      />
    </div>
  );
};

export default HackathonList; 