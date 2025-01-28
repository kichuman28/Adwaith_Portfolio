import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const AnimatedBackground = () => {
  const { theme } = useTheme();
  
  const floatingElements = Array(15).fill(null);
  const smallElements = Array(30).fill(null);
  const blobs = Array(3).fill(null);

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Base Gradient - Darker */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1C] via-[#141E2C] to-[#0A0F1C]">
        {/* Animated gradient overlay */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(52, 211, 153, 0.2), transparent 60%)',
            animation: 'pulse 8s ease-in-out infinite'
          }}
        />
      </div>

      {/* Animated Blobs */}
      {blobs.map((_, index) => (
        <motion.div
          key={`blob-${index}`}
          className="absolute"
          initial={{
            top: `${30 + index * 30}%`,
            left: `${20 + index * 30}%`,
            scale: 1,
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            borderRadius: ["30% 70% 70% 30% / 30% 30% 70% 70%", "60% 40% 30% 70% / 60% 30% 70% 40%", "30% 70% 70% 30% / 30% 30% 70% 70%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
            delay: index * 2,
          }}
          style={{
            width: '400px',
            height: '400px',
            background: `radial-gradient(circle at center, ${theme.accent}30, transparent 70%)`,
            filter: 'blur(50px)',
            willChange: 'transform',
            zIndex: 0,
          }}
        />
      ))}

      {/* Small floating particles */}
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
            scale: Math.random() * 2.5 + 1,
            opacity: Math.random() * 0.4 + 0.2,
            transition: {
              duration: Math.random() * 8 + 8,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }
          }}
          style={{
            background: 'rgba(52, 211, 153, 0.6)',
            boxShadow: '0 0 15px rgba(52, 211, 153, 0.5)',
            willChange: 'transform'
          }}
        />
      ))}

      {/* Large floating elements */}
      {floatingElements.map((_, index) => (
        <motion.div
          key={`float-${index}`}
          className="absolute rounded-full opacity-20"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight * 2,
            scale: Math.random() * 0.7 + 0.6,
            rotate: 0
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight * 2,
            rotate: 360,
            transition: {
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }
          }}
          style={{
            width: Math.random() * 400 + 150 + 'px',
            height: Math.random() * 400 + 150 + 'px',
            background: `radial-gradient(circle at center, ${theme.accent}40, transparent)`,
            filter: 'blur(40px)',
            willChange: 'transform'
          }}
        />
      ))}

      {/* Noise Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.15] mix-blend-overlay" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Subtle Grid with Glow */}
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: `
            linear-gradient(${theme.accent}15 1px, transparent 1px), 
            linear-gradient(90deg, ${theme.accent}15 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
          opacity: 0.08,
          boxShadow: 'inset 0 0 150px rgba(52, 211, 153, 0.15)'
        }}
      />

      {/* Vignette Effect - Darker */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 20%, rgba(10, 15, 28, 0.4) 100%)'
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