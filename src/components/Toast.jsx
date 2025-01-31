import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaTimesCircle, FaTimes } from 'react-icons/fa';
import { useEffect, useState } from 'react';

const Toast = ({ message, onClose }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (message?.text) {
      setProgress(100);
      const startTime = Date.now();
      const timer = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const remainingProgress = Math.max(0, 100 - (elapsedTime / 5000) * 100);
        
        if (remainingProgress <= 0) {
          clearInterval(timer);
          onClose();
        } else {
          setProgress(remainingProgress);
        }
      }, 10);

      return () => {
        clearInterval(timer);
      };
    }
  }, [message, onClose]);

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
        className="fixed top-24 right-4 sm:right-6 z-50"
      >
        <div
          className="flex items-center gap-3 px-6 py-4 rounded-lg shadow-xl relative overflow-hidden"
          style={{ 
            background: isSuccess ? 'rgba(52, 211, 153, 0.1)' : 'rgba(248, 113, 113, 0.1)',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${isSuccess ? 'rgba(52, 211, 153, 0.2)' : 'rgba(248, 113, 113, 0.2)'}`,
            maxWidth: 'calc(100vw - 2rem)'
          }}
        >
          {/* Progress bar */}
          <div
            className="absolute bottom-0 left-0 h-1 transition-all duration-100"
            style={{
              width: `${progress}%`,
              background: isSuccess ? 'rgb(52, 211, 153)' : 'rgb(248, 113, 113)',
              boxShadow: `0 0 10px ${isSuccess ? 'rgba(52, 211, 153, 0.5)' : 'rgba(248, 113, 113, 0.5)'}`,
            }}
          />
          
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
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Toast; 