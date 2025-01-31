import { motion, AnimatePresence } from 'framer-motion';

const DeleteConfirmation = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-[#1a1a1a] rounded-xl p-6 sm:p-8 w-full max-w-md relative z-10"
          style={{
            boxShadow: '0 0 20px rgba(52, 211, 153, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
          <p className="text-white/70 mb-6">{message}</p>
          
          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors duration-200"
            >
              Delete
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default DeleteConfirmation; 