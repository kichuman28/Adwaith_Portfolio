import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaTimesCircle, FaTimes } from 'react-icons/fa';

const Toast = ({ message, onClose }) => {
  if (!message?.text) return null;

  const isSuccess = message.type === 'success';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.3 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.5 }}
        transition={{ 
          type: "spring",
          stiffness: 500,
          damping: 40
        }}
        className="fixed top-24 right-4 sm:right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-lg shadow-xl"
        style={{ 
          background: isSuccess ? 'rgba(52, 211, 153, 0.1)' : 'rgba(248, 113, 113, 0.1)',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${isSuccess ? 'rgba(52, 211, 153, 0.2)' : 'rgba(248, 113, 113, 0.2)'}`,
          maxWidth: 'calc(100vw - 2rem)'
        }}
      >
        <div className="flex-shrink-0">
          {isSuccess ? (
            <FaCheckCircle className="w-5 h-5 text-emerald-400" />
          ) : (
            <FaTimesCircle className="w-5 h-5 text-red-400" />
          )}
        </div>
        <p className={`text-sm ${isSuccess ? 'text-emerald-400' : 'text-red-400'}`}>
          {message.text}
        </p>
        <button
          onClick={onClose}
          className={`ml-4 p-1 rounded-full hover:bg-white/10 transition-colors ${
            isSuccess ? 'text-emerald-400' : 'text-red-400'
          }`}
        >
          <FaTimes className="w-4 h-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default Toast; 