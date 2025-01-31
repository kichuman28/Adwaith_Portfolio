import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaExclamationCircle, FaTimes } from 'react-icons/fa';

const Toast = ({ type, message, onClose }) => {
  const [progress, setProgress] = useState(100);
  const DURATION = 5000; // 5 seconds

  useEffect(() => {
    if (!message) return;

    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const remainingProgress = Math.max(0, 100 * (1 - elapsedTime / DURATION));
      
      if (remainingProgress === 0) {
        clearInterval(timer);
        onClose();
      } else {
        setProgress(remainingProgress);
      }
    }, 10);

    return () => {
      clearInterval(timer);
    };
  }, [message, onClose]);

  if (!message) return null;

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return {
          background: 'rgba(16, 185, 129, 0.2)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          icon: <FaCheckCircle className="w-5 h-5 text-emerald-400" />,
          progressColor: 'bg-emerald-400'
        };
      case 'error':
        return {
          background: 'rgba(239, 68, 68, 0.2)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          icon: <FaExclamationCircle className="w-5 h-5 text-red-400" />,
          progressColor: 'bg-red-400'
        };
      default:
        return {
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          icon: null,
          progressColor: 'bg-white'
        };
    }
  };

  const toastStyles = getToastStyles();

  return (
    <AnimatePresence>
      <div className="fixed bottom-4 right-4 z-50">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="relative flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg backdrop-blur-sm"
          style={{
            background: toastStyles.background,
            border: toastStyles.border,
            minWidth: '300px',
            maxWidth: '400px'
          }}
        >
          {toastStyles.icon}
          <p className="flex-1 text-sm text-white">{message}</p>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <FaTimes className="w-4 h-4 text-white/60" />
          </button>
          
          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: '100%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: 'linear' }}
              className={`absolute inset-0 ${toastStyles.progressColor}`}
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Toast; 