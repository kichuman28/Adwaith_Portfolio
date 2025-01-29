import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useState, useEffect } from 'react';

const AnimatedBackground = () => {
  const { theme } = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Reduce number of elements for mobile
  const floatingElements = Array(isMobile ? 5 : 15).fill(null);
  const smallElements = Array(isMobile ? 10 : 30).fill(null);
  const blobs = Array(isMobile ? 1 : 3).fill(null);

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Base Gradient - Darker */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1C] via-[#141E2C] to-[#0A0F1C]">
        {/* Animated gradient overlay */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(52, 211, 153, 0.2), transparent 60%)',
            animation: isMobile ? 'none' : 'pulse 8s ease-in-out infinite'
          }}
        />
      </div>

      {/* Animated Blobs - Simplified for mobile */}
      {blobs.map((_, index) => (
        <motion.div
          key={`blob-${index}`}
          className="absolute"
          initial={{
            top: `${30 + index * 30}%`,
            left: `${20 + index * 30}%`,
            scale: 1,
          }}
          animate={isMobile ? {
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          } : {
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            borderRadius: ["30% 70% 70% 30% / 30% 30% 70% 70%", "60% 40% 30% 70% / 60% 30% 70% 40%", "30% 70% 70% 30% / 30% 30% 70% 70%"],
          }}
          transition={{
            duration: isMobile ? 30 : 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
            delay: index * 2,
          }}
          style={{
            width: isMobile ? '300px' : '400px',
            height: isMobile ? '300px' : '400px',
            background: `radial-gradient(circle at center, ${theme.accent}30, transparent 70%)`,
            filter: 'blur(50px)',
            willChange: 'transform',
            zIndex: 0,
          }}
        />
      ))}

      {/* Small floating particles - Reduced and simplified for mobile */}
      {smallElements.map((_, index) => (
        <motion.div
          key={`particle-${index}`}
          className="absolute w-1.5 h-1.5 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight * 2,
            scale: 0,
            opacity: 0
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight * 2,
            scale: Math.random() * (isMobile ? 1.5 : 2.5) + 1,
            opacity: Math.random() * 0.3 + 0.1,
            transition: {
              duration: Math.random() * (isMobile ? 12 : 8) + 8,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }
          }}
          style={{
            background: 'rgba(52, 211, 153, 0.4)',
            boxShadow: isMobile ? 'none' : '0 0 15px rgba(52, 211, 153, 0.5)',
            willChange: 'transform'
          }}
        />
      ))}

      {/* Large floating elements - Simplified for mobile */}
      {floatingElements.map((_, index) => (
        <motion.div
          key={`float-${index}`}
          className="absolute rounded-full opacity-20"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight * 2,
            scale: Math.random() * 0.5 + 0.5,
            rotate: 0
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight * 2,
            rotate: 360,
            transition: {
              duration: Math.random() * (isMobile ? 25 : 15) + 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }
          }}
          style={{
            width: Math.random() * (isMobile ? 200 : 400) + 150 + 'px',
            height: Math.random() * (isMobile ? 200 : 400) + 150 + 'px',
            background: `radial-gradient(circle at center, ${theme.accent}40, transparent)`,
            filter: isMobile ? 'blur(30px)' : 'blur(40px)',
            willChange: 'transform'
          }}
        />
      ))}

      {/* Noise Overlay - Disabled for mobile */}
      {!isMobile && (
        <div 
          className="absolute inset-0 opacity-[0.15] mix-blend-overlay" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
          }}
        />
      )}

      {/* Subtle Grid - Simplified for mobile */}
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: isMobile ? 'none' : `
            linear-gradient(${theme.accent}15 1px, transparent 1px), 
            linear-gradient(90deg, ${theme.accent}15 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
          opacity: 0.08,
          boxShadow: isMobile ? 'none' : 'inset 0 0 150px rgba(52, 211, 153, 0.15)'
        }}
      />

      {/* Vignette Effect - Lighter for mobile */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isMobile 
            ? 'radial-gradient(circle at 50% 50%, transparent 30%, rgba(10, 15, 28, 0.3) 100%)'
            : 'radial-gradient(circle at 50% 50%, transparent 20%, rgba(10, 15, 28, 0.4) 100%)'
        }}
      />
    </div>
  );
};

export default AnimatedBackground;

// Add these to your global CSS or custom.css
const styles = `
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.2); opacity: 0.4; }
}

@keyframes morph {
  0% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
  50% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
}
`; 