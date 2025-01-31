import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Hackathons from './pages/Hackathons';
import Blog from './pages/Blog';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollToTop from './components/ScrollToTop';
import { ProjectsProvider } from './context/ProjectsContext';
import Admin from './pages/Admin';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import ProjectDetails from './pages/ProjectDetails';
import HackathonDetails from './pages/HackathonDetails';

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = ['Projects', 'Hackathons', 'Blog'];
  
  const handleNavClick = (item) => {
    if (item === 'Skills') {
      if (location.pathname !== '/') {
        navigate('/#skills');
      } else {
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
          skillsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ background: theme.background, color: theme.text.primary }}>
      {/* Enhanced Floating Navbar */}
      <div className="fixed top-0 left-0 right-0 w-full flex justify-center p-2 sm:p-4 z-50">
        <motion.nav 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-[98%] sm:w-[95%] max-w-7xl rounded-xl sm:rounded-2xl shadow-lg backdrop-blur-lg"
          style={{ 
            background: `${theme.secondary}80`,
            borderBottom: `1px solid ${theme.accent}20`,
            boxShadow: `0 10px 30px -10px ${theme.accent}30`
          }}
        >
          <div className="px-3 sm:px-4 lg:px-8">
            <div className="flex justify-between h-14 sm:h-16">
              <motion.div 
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
              >
                <Link 
                  to="/"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-xl sm:text-2xl font-bold relative group font-audiowide"
                  style={{ color: theme.accent }}
                >
                  <span className="relative z-10 text-glow" style={{ color: '#00D1B2', textShadow: '0 0 15px #00D1B2' }}>Adwaith</span>
                  <motion.span
                    className="absolute inset-0 rounded-lg -z-10"
                    style={{ 
                      background: `${theme.accent}15`,
                      originX: 0,
                      boxShadow: `0 0 20px ${theme.accent}30`
                    }}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={() => handleNavClick('Skills')}
                    className="px-4 py-2 rounded-xl relative group font-grotesk"
                    style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                  >
                    <span className="relative z-10 font-medium">Skills</span>
                    <motion.span
                      className="absolute inset-0 rounded-xl -z-10"
                      style={{ 
                        background: `linear-gradient(135deg, ${theme.accent}20, ${theme.accent}05)`,
                        boxShadow: `0 0 20px ${theme.accent}20`
                      }}
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </button>
                </motion.div>
                {navItems.map((item) => (
                  <motion.div
                    key={item}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={`/${item.toLowerCase()}`}
                      className="px-4 py-2 rounded-xl relative group font-grotesk"
                      style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                    >
                      <span className="relative z-10 font-medium">{item}</span>
                      <motion.span
                        className="absolute inset-0 rounded-xl -z-10"
                        style={{ 
                          background: `linear-gradient(135deg, ${theme.accent}20, ${theme.accent}05)`,
                          boxShadow: `0 0 20px ${theme.accent}20`
                        }}
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileHover={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Mobile menu button */}
              <motion.div 
                className="md:hidden flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-xl transition-colors duration-200"
                  style={{ 
                    color: 'rgba(255, 255, 255, 0.9)',
                    background: isMenuOpen ? `${theme.accent}20` : 'transparent',
                    boxShadow: isMenuOpen ? `0 0 20px ${theme.accent}20` : 'none'
                  }}
                >
                  <svg
                    className="w-6 h-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <motion.path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      variants={{
                        closed: { d: "M4 6h16M4 12h16M4 18h16" },
                        open: { d: "M6 18L18 6M6 6l12 12" }
                      }}
                      animate={isMenuOpen ? "open" : "closed"}
                      transition={{ duration: 0.3 }}
                    />
                  </svg>
                </button>
              </motion.div>
            </div>
          </div>
        </motion.nav>
      </div>

      {/* Animated Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-20 sm:top-24 p-2 sm:p-4 md:hidden z-40"
          >
            <motion.div 
              className="w-[98%] sm:w-[95%] mx-auto rounded-xl sm:rounded-2xl shadow-lg backdrop-blur-lg overflow-hidden"
              style={{ 
                background: `${theme.secondary}90`,
                borderBottom: `1px solid ${theme.accent}20`,
                boxShadow: `0 10px 30px -10px ${theme.accent}30`
              }}
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-2 py-3 space-y-1">
                <motion.div
                  whileHover={{ x: 10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={() => handleNavClick('Skills')}
                    className="block w-full text-left px-4 py-2 rounded-xl font-grotesk"
                    style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                  >
                    Skills
                  </button>
                </motion.div>
                {navItems.map((item) => (
                  <motion.div
                    key={item}
                    whileHover={{ x: 10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={`/${item.toLowerCase()}`}
                      className="block px-4 py-2 rounded-xl font-grotesk"
                      style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                      onClick={() => handleNavClick(item)}
                    >
                      {item}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="relative">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:projectId" element={<ProjectDetails />} />
          <Route path="/hackathons" element={<Hackathons />} />
          <Route path="/hackathons/:id" element={<HackathonDetails />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>

      {/* Enhanced Footer */}
      <footer className="relative py-6 sm:py-8" style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
        <div className="absolute inset-0 backdrop-blur-sm" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col items-center space-y-2 sm:space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-emerald-400 font-audiowide"
            >
              Adwaith
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-xs sm:text-sm font-grotesk text-center px-4"
              style={{ color: 'rgba(255, 255, 255, 0.7)' }}
            >
              Building digital experiences with code and creativity
            </motion.div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ProjectsProvider>
        <Router>
          <ScrollToTop />
          <AppContent />
        </Router>
      </ProjectsProvider>
    </ThemeProvider>
  );
}

export default App;
