import { useTheme } from '../context/ThemeContext';
import Skills from '../components/Skills';
import { motion } from 'framer-motion';
import AnimatedBackground from '../components/AnimatedBackground';
import { useEffect } from 'react';

const TECH_STACK = [
  {
    name: "C++",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg"
  },
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
  },
  {
    name: "Flutter",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg"
  },
  {
    name: "Android Studio",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg"
  },
  {
    name: "VS Code",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg"
  },
  {
    name: "Figma",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg"
  },
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
  },
  {
    name: "Firebase",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg"
  },
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
  },
  {
    name: "TensorFlow",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg"
  },
  {
    name: "Tailwind CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg"
  }
];

const Home = () => {
  const { theme } = useTheme();

  useEffect(() => {
    // Check if there's a hash in the URL
    if (window.location.hash) {
      // Remove the '#' and get the section ID
      const sectionId = window.location.hash.slice(1);
      // Find the element
      const element = document.getElementById(sectionId);
      // If element exists, scroll to it
      if (element) {
        // Add a small delay to ensure the page is fully loaded
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []); // Run only once when component mounts

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
    <main className="relative">
      <AnimatedBackground />
      
      {/* Content Container */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center pt-28">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative"
          >
            {/* Decorative circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
              style={{
                background: 'radial-gradient(circle at center, rgba(52, 211, 153, 0.1) 0%, transparent 70%)',
                filter: 'blur(40px)',
                animation: 'pulse 8s ease-in-out infinite'
              }}
            />

            <div className="text-center relative">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight mb-8"
              >
                <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-emerald-400 hover:scale-105 transition-transform duration-300">
                  Hi, I'm Adwaith
                </span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-8 max-w-2xl mx-auto text-xl sm:text-2xl leading-relaxed"
                style={{ color: 'rgba(255, 255, 255, 0.9)' }}
              >
                Final year computer science student passionate about technology and innovation.
                Building solutions that make a difference.
              </motion.p>
              
              {/* Contact Links */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-16 flex justify-center space-x-8"
              >
                {contactLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transform p-3 rounded-xl backdrop-blur-sm"
                    style={{ 
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                      willChange: 'transform'
                    }}
                    aria-label={link.name}
                  >
                    <div className="text-emerald-400 w-6 h-6">
                      {link.icon}
                    </div>
                  </motion.a>
                ))}
              </motion.div>

              {/* Resume Button */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-16"
              >
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  href="/path-to-your-resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-3 rounded-full text-lg font-medium gap-2 bg-gradient-to-r from-teal-400 to-emerald-400"
                  style={{ 
                    color: '#0A0F1C',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                    willChange: 'transform'
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
        <section id="about" className="min-h-screen py-20 flex items-center relative">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-[300px] h-[300px] rounded-full"
              style={{
                background: 'radial-gradient(circle at center, rgba(52, 211, 153, 0.1) 0%, transparent 70%)',
                filter: 'blur(40px)',
                animation: 'float 10s ease-in-out infinite'
              }}
            />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full"
              style={{
                background: 'radial-gradient(circle at center, rgba(52, 211, 153, 0.05) 0%, transparent 70%)',
                filter: 'blur(40px)',
                animation: 'float 12s ease-in-out infinite reverse'
              }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
            >
              {/* Image Column */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="relative mx-auto md:mx-0 max-w-md w-full"
              >
                <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm"
                  style={{ 
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    background: 'rgba(255, 255, 255, 0.05)'
                  }}>
                  <img
                    src="/assets/images/my_photo.jpg"
                    alt="Adwaith"
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </motion.div>

              {/* Content Column */}
              <div className="space-y-8 text-left">
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-emerald-400"
                >
                  About Me
                </motion.h2>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="space-y-6 text-lg"
                  style={{ color: 'rgba(255, 255, 255, 0.8)' }}
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
                  <div className="pt-8">
                    <motion.a
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      href="#contact"
                      className="inline-flex items-center px-6 py-3 rounded-full text-base font-medium gap-2 backdrop-blur-sm"
                      style={{ 
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#fff'
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
        <section id="skills" className="min-h-screen py-20 flex items-center relative">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 right-1/4 w-[200px] h-[200px]"
              style={{
                background: 'radial-gradient(circle at center, rgba(52, 211, 153, 0.1) 0%, transparent 70%)',
                filter: 'blur(40px)',
                animation: 'float 8s ease-in-out infinite'
              }}
            />
            <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px]"
              style={{
                background: 'radial-gradient(circle at center, rgba(52, 211, 153, 0.05) 0%, transparent 70%)',
                filter: 'blur(40px)',
                animation: 'float 10s ease-in-out infinite reverse'
              }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            {/* Tech stack heading with enhanced animation */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16 relative"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full"
                style={{
                  background: 'radial-gradient(circle at center, rgba(52, 211, 153, 0.2) 0%, transparent 70%)',
                  filter: 'blur(20px)'
                }}
              />
              
              <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-emerald-400 relative">
                Tech Stack
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                Technologies and tools I work with to bring ideas to life
              </p>
            </motion.div>

            {/* Tech Grid with enhanced animations */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6"
            >
              {TECH_STACK.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    transition: { type: "spring", stiffness: 400, damping: 10 }
                  }}
                  className="group relative p-6 rounded-xl backdrop-blur-sm"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500"
                    style={{
                      background: 'radial-gradient(circle at center, rgba(52, 211, 153, 0.1) 0%, transparent 70%)',
                      filter: 'blur(10px)'
                    }}
                  />
                  
                  <div className="relative flex flex-col items-center gap-3">
                    <motion.img
                      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                      src={tech.icon}
                      alt={tech.name}
                      className="w-12 h-12 object-contain"
                    />
                    <p className="text-sm font-medium text-center transition-colors duration-300"
                      style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      {tech.name}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home; 