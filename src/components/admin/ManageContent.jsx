import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const ManageContent = ({ type, onEdit, setMessage }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    const q = query(collection(db, type), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setItems(data);
        setLoading(false);
      },
      (error) => {
        console.error(`Error fetching ${type}:`, error);
        setMessage({ type: 'error', text: `Error loading ${type}. Please try again.` });
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [type]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, type, id));
      setMessage({ type: 'success', text: 'Item deleted successfully!' });
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting item:', error);
      setMessage({ type: 'error', text: 'Error deleting item. Please try again.' });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-400"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.length === 0 ? (
        <p className="text-white/60 text-center py-8">No items found.</p>
      ) : (
        items.map(item => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white/5 backdrop-blur-sm rounded-lg p-4 space-y-2"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="text-white/60 line-clamp-2 text-sm">
                  {item.shortDescription || item.description}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(item)}
                  className="p-2 rounded-lg bg-emerald-400/10 text-emerald-400 hover:bg-emerald-400/20 transition-colors duration-200"
                  title="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => setDeleteConfirm(item.id)}
                  className="p-2 rounded-lg bg-red-400/10 text-red-400 hover:bg-red-400/20 transition-colors duration-200"
                  title="Delete"
                >
                  <FaTrash />
                </button>
                {type === 'projects' && (
                  <a
                    href={`/projects/${item.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-blue-400/10 text-blue-400 hover:bg-blue-400/20 transition-colors duration-200"
                    title="View"
                  >
                    <FaEye />
                  </a>
                )}
              </div>
            </div>

            {/* Delete Confirmation */}
            <AnimatePresence>
              {deleteConfirm === item.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-white/10 mt-4 pt-4"
                >
                  <p className="text-white/80 mb-4">Are you sure you want to delete this item? This action cannot be undone.</p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
                    >
                      Yes, Delete
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))
      )}
    </div>
  );
};

export default ManageContent; 