import { useTheme } from '../context/ThemeContext';
import Skills from '../components/Skills';
import { motion } from 'framer-motion';
import AnimatedBackground from '../components/AnimatedBackground';
import { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin, FaCode, FaProjectDiagram, FaTrophy, FaBlog } from 'react-icons/fa';
import { MdEmail, MdPhone } from 'react-icons/md';
import { HiDocumentDownload } from 'react-icons/hi';
import { Link } from 'react-router-dom';

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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      name: 'GitHub',
      href: 'https://github.com/kichuman28',
      icon: <FaGithub className="w-6 h-6" />
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/adwaith-jayasankar-156539200/',
      icon: <FaLinkedin className="w-6 h-6" />
    },
    {
      name: 'LeetCode',
      href: 'https://leetcode.com/u/kichu31084/',
      icon: <FaCode className="w-6 h-6" />
    },
    {
      name: 'Email',
      href: 'mailto:adwaithjk28@gmail.com',
      icon: <MdEmail className="w-6 h-6" />
    },
    {
      name: 'Phone',
      href: 'tel:+919645750263',
      icon: <MdPhone className="w-6 h-6" />
    }
  ];

  const navigationCards = [
    {
      title: 'Projects',
      icon: <FaProjectDiagram className="w-6 h-6" />,
      description: 'Check out my portfolio of projects',
      to: '/projects',
      gradient: 'from-emerald-400 to-teal-400'
    },
    {
      title: 'Hackathons',
      icon: <FaTrophy className="w-6 h-6" />,
      description: 'View my hackathon experiences',
      to: '/hackathons',
      gradient: 'from-teal-400 to-cyan-400'
    },
    {
      title: 'Blog',
      icon: <FaBlog className="w-6 h-6" />,
      description: 'Read my latest blog posts',
      to: '/blogs',
      gradient: 'from-cyan-400 to-emerald-400'
    }
  ];

  return (
    <main className="relative">
      <AnimatedBackground />
      
      {/* Content Container */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section id="home" className={`min-h-screen flex items-center justify-center px-4 ${isMobile ? 'pt-4' : 'pt-28'}`}>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isMobile ? 'py-4' : 'py-20'} relative`}
          >
            {/* Decorative circle */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
              isMobile ? 'w-[200px] h-[200px]' : 'w-[400px] h-[400px] md:w-[600px] md:h-[600px]'
            } rounded-full`}
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
                className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight ${isMobile ? 'mb-2' : 'mb-8'}`}
              >
                <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-emerald-400 hover:scale-105 transition-transform duration-300 animate-glow" style={{
                  filter: 'drop-shadow(0 0 8px rgba(52, 211, 153, 0.5))',
                  textShadow: '0 0 15px rgba(52, 211, 153, 0.5)'
                }}>
                  Hi, I'm Adwaith.
                </span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={`${isMobile ? 'mt-2' : 'mt-8'} max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl leading-relaxed px-4`}
                style={{ color: 'rgba(255, 255, 255, 0.9)' }}
              >
                I love Hackathons, Communities & Lofi Soundtracks! <br className="hidden sm:block" />
                Not necessarily in that order :)
              </motion.p>
              
              {/* Contact Links */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className={`${isMobile ? 'mt-4' : 'mt-16'} flex flex-wrap justify-center gap-4 sm:gap-8 px-4`}
              >
                {contactLinks.map((link) => (
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
                    <div className="text-emerald-400 w-5 h-5 sm:w-6 sm:h-6">
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
                className={`${isMobile ? 'mt-4' : 'mt-16'} px-4`}
              >
                <motion.a
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: '0 0 30px rgba(52,211,153,0.8), 0 0 60px rgba(52,211,153,0.6), 0 0 90px rgba(52,211,153,0.4)'
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  href="https://drive.google.com/file/d/1Va6AXTvxV7BvqWMioEaoW4bYXMMcv8Qi/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-base sm:text-lg font-medium gap-2 bg-gradient-to-r from-teal-400 to-emerald-400"
                  style={{ 
                    color: '#0A0F1C',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2), 0 0 20px rgba(52, 211, 153, 0.5)',
                    willChange: 'transform'
                  }}
                >
                  <HiDocumentDownload className="w-4 h-4 sm:w-5 sm:h-5" />
                  View Resume
                </motion.a>
              </motion.div>

              {/* Navigation Cards - Enhanced glowy version */}
              {isMobile && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="mt-4 px-4"
                >
                  <div className="flex justify-center gap-6">
                    {navigationCards.map((card) => (
                      <Link 
                        key={card.title} 
                        to={card.to}
                        className="group"
                      >
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                          className="flex flex-col items-center gap-2"
                        >
                          <div
                            className="transform p-4 rounded-2xl backdrop-blur-sm relative group-hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                            style={{ 
                              background: 'rgba(255, 255, 255, 0.05)',
                              border: '1px solid rgba(255, 255, 255, 0.2)',
                              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                            }}
                          >
                            {/* Background gradient */}
                            <div 
                              className="absolute inset-0 opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                              style={{
                                background: `linear-gradient(135deg, ${card.gradient.split(' ')[1]}, ${card.gradient.split(' ')[3]})`,
                              }}
                            />

                            {/* Icon */}
                            <div className="relative w-6 h-6 text-white group-hover:text-white transition-colors duration-300"
                                 style={{
                                   filter: 'drop-shadow(0 0 8px rgba(52, 211, 153, 0.5))',
                                 }}>
                              {card.icon}
                            </div>

                            {/* Shine effect */}
                            <div 
                              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              style={{
                                background: 'linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.2) 50%, transparent 60%)',
                                transform: 'translateX(-100%)',
                                animation: 'shine 1.5s infinite'
                              }}
                            />

                            {/* Glow effect */}
                            <div 
                              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              style={{
                                background: `linear-gradient(135deg, ${card.gradient.split(' ')[1]}, ${card.gradient.split(' ')[3]})`,
                                filter: 'blur(15px)',
                                transform: 'scale(1.2)',
                                zIndex: -1
                              }}
                            />
                          </div>
                          <span className="text-xs font-medium text-white/80 group-hover:text-emerald-400 transition-colors">
                            {card.title}
                          </span>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Add this style for the shine animation */}
              <style>{`
                @keyframes shine {
                  0% {
                    transform: translateX(-100%) rotate(45deg);
                  }
                  80%, 100% {
                    transform: translateX(200%) rotate(45deg);
                  }
                }
                .hide-scrollbar {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
                .hide-scrollbar::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
            </div>
          </motion.div>
        </section>

        {/* About Me Section */}
        <section id="about" className="min-h-screen py-8 sm:py-20 flex items-center relative">
          <div className="absolute inset-0 overflow-hidden">
            {!isMobile && (
              <>
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
              </>
            )}
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: isMobile ? 0.5 : 0.8 }}
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
            >
              {/* Image Column */}
              <motion.div 
                whileHover={!isMobile && { scale: 1.02 }}
                className="relative mx-auto md:mx-0 w-full max-w-[280px] sm:max-w-[320px] md:max-w-md"
              >
                {/* Glow effect behind image - Simplified for mobile */}
                <div 
                  className={`absolute inset-0 -z-10 ${!isMobile && 'animate-pulse-slow'}`}
                  style={{
                    background: 'radial-gradient(circle at center, rgba(52, 211, 153, 0.3) 0%, transparent 70%)',
                    filter: isMobile ? 'blur(20px)' : 'blur(40px)',
                    transform: 'translate(-10%, -10%) scale(1.2)'
                  }}
                />
                <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm relative"
                  style={{ 
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    boxShadow: isMobile ? 
                      '0 0 20px rgba(52, 211, 153, 0.15)' : 
                      '0 0 30px rgba(52, 211, 153, 0.2), inset 0 0 20px rgba(52, 211, 153, 0.1)'
                  }}>
                  <img
                    src="/assets/images/my_photo.jpg"
                    alt="Adwaith"
                    className={`w-full h-full object-cover object-center ${!isMobile && 'hover:scale-105 transition-transform duration-700'}`}
                    loading="eager"
                    decoding="async"
                    fetchpriority="high"
                  />
                </div>
              </motion.div>

              {/* Content Column */}
              <div className="space-y-6 sm:space-y-8 text-left">
                <motion.h2 
                  initial={{ opacity: 0, x: isMobile ? -10 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: isMobile ? 0.4 : 0.8 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-emerald-400 relative"
                  style={{
                    textShadow: isMobile ? 
                      '0 0 15px rgba(52, 211, 153, 0.4)' : 
                      '0 0 20px rgba(52, 211, 153, 0.5), 0 0 40px rgba(52, 211, 153, 0.3)'
                  }}
                >
                  About Me
                </motion.h2>
                <motion.div 
                  initial={{ opacity: 0, x: isMobile ? -10 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: isMobile ? 0.4 : 0.8, delay: isMobile ? 0.1 : 0.2 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="space-y-4 sm:space-y-6 text-base sm:text-lg font-grotesk"
                  style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                >
                  <p className="leading-relaxed">
                    Hello! I'm a final year Computer Science student who thrives on new challenges and experiences.
                    My journey in tech has been marked by constantly seeking out opportunities to learn and grow,
                    whether through hackathons, side projects, or exploring emerging technologies.
                  </p>
                  <p className="leading-relaxed">
                    I'm an avid hackathon enthusiast, having participated in numerous competitions where I've honed my
                    ability to rapidly prototype solutions and work effectively in team environments. When I'm not competing
                    in hackathons, you'll find me sketching in my notebook, playing video games, or studying
                    Japanese! - always eager to explore new hobbies and creative pursuits.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="min-h-screen py-12 sm:py-20 flex items-center relative">
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
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16 relative"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-emerald-400 relative"
                style={{
                  textShadow: '0 0 20px rgba(52, 211, 153, 0.5), 0 0 40px rgba(52, 211, 153, 0.3)'
                }}
              >
                Tech Stack
              </h2>
              <p className="text-base sm:text-lg max-w-2xl mx-auto font-grotesk px-4" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                Technologies and tools I work with to bring ideas to life
              </p>
            </motion.div>

            {/* Tech Grid - With glow effects */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
              {TECH_STACK.map((tech, index) => {
                // Define color based on technology
                const getGlowColor = (name) => {
                  const colors = {
                    'C++': 'rgba(0, 89, 156, 0.5)',
                    'Python': 'rgba(255, 212, 59, 0.5)',
                    'JavaScript': 'rgba(247, 223, 30, 0.5)',
                    'Flutter': 'rgba(69, 208, 255, 0.5)',
                    'Android Studio': 'rgba(82, 180, 72, 0.5)',
                    'VS Code': 'rgba(0, 122, 204, 0.5)',
                    'Figma': 'rgba(242, 78, 30, 0.5)',
                    'React': 'rgba(97, 218, 251, 0.5)',
                    'Firebase': 'rgba(255, 202, 40, 0.5)',
                    'Git': 'rgba(240, 80, 50, 0.5)',
                    'TensorFlow': 'rgba(255, 138, 101, 0.5)',
                    'Tailwind CSS': 'rgba(56, 189, 248, 0.5)'
                  };
                  return colors[name] || 'rgba(52, 211, 153, 0.5)';
                };

                const glowColor = getGlowColor(tech.name);

                return (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0 }}
                    whileInView={{ 
                      opacity: 1,
                      transition: {
                        duration: 0.3,
                        delay: isMobile ? index * 0.1 : index * 0.15
                      }
                    }}
                    viewport={{ once: true, margin: "-50px" }}
                    className={`
                      relative p-4 rounded-xl 
                      bg-white/5 backdrop-blur-sm
                      border border-white/10
                      transition-all duration-200
                      group cursor-pointer
                      overflow-hidden
                      hover:bg-white/10
                      ${!isMobile && 'hover:-translate-y-1 hover:scale-105'}
                    `}
                    style={{
                      boxShadow: `0 0 20px ${glowColor.replace('0.5', '0.15')}`,
                    }}
                  >
                    {/* Glow effect overlay */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-200"
                      style={{
                        background: `radial-gradient(circle at center, ${glowColor}, transparent 70%)`,
                        filter: 'blur(8px)',
                        transform: 'scale(1.1)',
                      }}
                    />

                    <div className="relative flex flex-col items-center gap-3">
                      <img
                        src={tech.icon}
                        alt={tech.name}
                        className={`
                          w-8 h-8 sm:w-10 sm:h-10 object-contain
                          transition-all duration-200 ease-out
                          ${!isMobile && 'group-hover:scale-125 group-hover:rotate-3'}
                        `}
                        loading="lazy"
                      />
                      <p className="text-xs sm:text-sm font-medium text-center font-grotesk text-white/80 group-hover:text-white transition-colors duration-200">
                        {tech.name}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home; 