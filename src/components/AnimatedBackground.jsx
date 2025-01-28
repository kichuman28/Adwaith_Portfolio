import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const AnimatedBackground = () => {
  const { theme } = useTheme();
  
  const floatingElements = Array(12).fill(null);
  const smallElements = Array(20).fill(null);

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1C] via-[#12151E] to-[#0A0F1C]">
        {/* Animated gradient overlay */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(52, 211, 153, 0.15), transparent 50%)',
            animation: 'pulse 8s ease-in-out infinite'
          }}
        />
      </div>

      {/* Small floating particles */}
      {smallElements.map((_, index) => (
        <motion.div
          key={`particle-${index}`}
          className="absolute w-1 h-1 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight * 2,
            scale: 0,
            opacity: 0
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight * 2,
            scale: Math.random() * 2 + 1,
            opacity: Math.random() * 0.3 + 0.2,
            transition: {
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }
          }}
          style={{
            background: 'rgba(52, 211, 153, 0.5)',
            boxShadow: '0 0 10px rgba(52, 211, 153, 0.5)',
            willChange: 'transform'
          }}
        />
      ))}

      {/* Large floating elements */}
      {floatingElements.map((_, index) => (
        <motion.div
          key={`blob-${index}`}
          className="absolute rounded-full opacity-[0.15]"
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
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }
          }}
          style={{
            width: Math.random() * 300 + 100 + 'px',
            height: Math.random() * 300 + 100 + 'px',
            background: `radial-gradient(circle at center, ${theme.accent}30, transparent)`,
            filter: 'blur(30px)',
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
            linear-gradient(${theme.accent}10 1px, transparent 1px), 
            linear-gradient(90deg, ${theme.accent}10 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
          opacity: 0.05,
          boxShadow: 'inset 0 0 100px rgba(52, 211, 153, 0.1)'
        }}
      />

      {/* Vignette Effect */}
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

// Add this to your global CSS or custom.css
const styles = `
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.1); opacity: 0.4; }
}
`; 