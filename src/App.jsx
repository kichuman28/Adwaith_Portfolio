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
import Blogs from './pages/Blogs';
import BlogPost from './pages/BlogPost';
import AddBlog from './components/admin/AddBlog';
import { FaBars, FaTimes } from 'react-icons/fa';

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: 'Skills', path: '/#skills', isScroll: true },
    { name: 'Projects', path: '/projects' },
    { name: 'Hackathons', path: '/hackathons' },
    { name: 'Blogs', path: '/blogs' }
  ];
  
  const handleNavClick = (item) => {
    if (item.isScroll) {
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
      {/* Navigation Menu */}
      <nav className="fixed top-0 left-0 right-0 w-full flex justify-center p-2 sm:p-4 z-50">
        <motion.div 
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
              <div className="hidden sm:flex items-center space-x-1">
                {navItems.map((item) => (
                  <motion.div
                    key={item.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.isScroll ? (
                      <button
                        onClick={() => handleNavClick(item)}
                        className="px-4 py-2 rounded-xl relative group font-grotesk"
                        style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                      >
                        <span className="relative z-10 font-medium">{item.name}</span>
                      </button>
                    ) : (
                      <Link
                        to={item.path}
                        className="px-4 py-2 rounded-xl relative group font-grotesk"
                        style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="relative z-10 font-medium">{item.name}</span>
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <div className="sm:hidden flex items-center">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  {isMenuOpen ? (
                    <FaTimes className="w-5 h-5" />
                  ) : (
                    <FaBars className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Navigation Menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="sm:hidden overflow-hidden"
                >
                  <div className="py-4 space-y-3">
                    {navItems.map((item) => (
                      <motion.div
                        key={item.name}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -20, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex justify-center"
                      >
                        {item.isScroll ? (
                          <button
                            onClick={() => handleNavClick(item)}
                            className="w-[80%] text-center px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors font-grotesk"
                            style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                          >
                            {item.name}
                          </button>
                        ) : (
                          <Link
                            to={item.path}
                            className="w-[80%] text-center px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors font-grotesk"
                            style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {item.name}
                          </Link>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </nav>

      {/* Main Content */}
      <main className="relative">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:projectId" element={<ProjectDetails />} />
          <Route path="/hackathons" element={<Hackathons />} />
          <Route path="/hackathons/:id" element={<HackathonDetails />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogPost />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            } 
          />
          <Route path="/admin/add-blog" element={<AddBlog />} />
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
