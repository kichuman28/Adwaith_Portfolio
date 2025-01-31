import { useState } from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmation from './DeleteConfirmation';

const HackathonList = ({ hackathons, onEdit, setMessage }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [hackathonToDelete, setHackathonToDelete] = useState(null);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!hackathonToDelete) return;

    try {
      await deleteDoc(doc(db, 'hackathons', hackathonToDelete.id));
      setMessage({ type: 'success', text: 'Hackathon deleted successfully!' });
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

  return (
    <div className="space-y-4">
      {hackathons.map((hackathon) => (
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