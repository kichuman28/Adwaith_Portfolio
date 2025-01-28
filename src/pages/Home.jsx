import { useTheme } from '../context/ThemeContext';
import Skills from '../components/Skills';
import { motion } from 'framer-motion';

const Home = () => {
  const { theme } = useTheme();

  const contactLinks = [
    {
      name: 'Email',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      href: 'mailto:your.email@example.com'
    },
    {
      name: 'LinkedIn',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      href: 'https://linkedin.com/in/your-profile'
    },
    {
      name: 'GitHub',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
        </svg>
      ),
      href: 'https://github.com/your-username'
    },
    {
      name: 'Phone',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      href: 'tel:+1234567890'
    }
  ];

  return (
    <main className="pt-16">
      {/* Hero Section */}
      <section id="home" className="min-h-[90vh] flex items-center justify-center relative overflow-hidden" 
        style={{ 
          background: `linear-gradient(135deg, ${theme.background}, ${theme.secondary})`
        }}>
        <div className="absolute inset-0" style={{ 
          background: `radial-gradient(circle at 50% 50%, ${theme.accent}10 0%, transparent 25%)`
        }}/>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10"
        >
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl"
            >
              <span className="block" style={{ color: theme.text.primary }}>Hi, I'm Adwaith</span>
              <span className="block mt-2" style={{ color: theme.accent }}>Computer Science Student</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 max-w-lg mx-auto text-lg sm:text-xl md:max-w-2xl"
              style={{ color: theme.text.secondary }}
            >
              Final year computer science student passionate about technology and innovation.
              Building solutions that make a difference.
            </motion.p>
            
            {/* Contact Links */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 flex justify-center space-x-6"
            >
              {contactLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform transition-all duration-200"
                  style={{ color: theme.accent }}
                  aria-label={link.name}
                >
                  {link.icon}
                </motion.a>
              ))}
            </motion.div>

            {/* Resume Button */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-8"
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/path-to-your-resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-3 rounded-full transition-all duration-200 gap-2"
                style={{ 
                  background: theme.accent,
                  color: '#ffffff',
                  boxShadow: `0 4px 14px 0 ${theme.accent}40`
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Resume
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-20" style={{ background: theme.background }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            {/* Image Column */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative mx-auto md:mx-0 max-w-md w-full"
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl"
                style={{ 
                  border: `2px solid ${theme.accent}20`,
                  background: theme.secondary
                }}>
                <img
                  src="/assets/images/my_photo.jpg"
                  alt="Adwaith"
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 opacity-10 blur-2xl group-hover:opacity-20 transition duration-700" 
                style={{ 
                  background: `linear-gradient(45deg, ${theme.accent}20, ${theme.secondary})`,
                  zIndex: -1
                }}
              />
              <div className="absolute -inset-1 rounded-2xl"
                style={{ 
                  background: `radial-gradient(circle at 50% 50%, ${theme.accent}15 0%, transparent 70%)`,
                  filter: 'blur(30px)',
                  transform: 'translate(10px, 10px)',
                  zIndex: -1
                }}
              />
            </motion.div>

            {/* Content Column */}
            <div className="space-y-6 text-left">
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-3xl font-bold"
                style={{ color: theme.accent }}
              >
                About Me
              </motion.h2>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-4 text-lg"
                style={{ color: theme.text.secondary }}
              >
                <p className="leading-relaxed">
                  Hello! I'm a final year Computer Science student with a passion for building innovative solutions.
                  My journey in tech has been driven by curiosity and a desire to create meaningful impact through code.
                </p>
                <p className="leading-relaxed">
                  I specialize in full-stack development and have a keen interest in artificial intelligence and machine learning.
                  When I'm not coding, you can find me participating in hackathons, contributing to open-source projects,
                  or exploring new technologies.
                </p>
                <div className="pt-6">
                  <motion.a
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    href="#contact"
                    className="inline-flex items-center px-6 py-2.5 rounded-full text-base font-medium transition-all duration-200 gap-2"
                    style={{ 
                      background: `${theme.accent}15`,
                      color: theme.accent,
                      border: `1px solid ${theme.accent}30`
                    }}
                  >
                    Get in touch 
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20" style={{ background: theme.secondary }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4" style={{ color: theme.accent }}>
              Tech Stack
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: theme.text.secondary }}>
              Technologies and tools I work with to bring ideas to life
            </p>
          </motion.div>
          <Skills />
        </div>
      </section>
    </main>
  );
};

export default Home; 