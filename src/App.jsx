import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Skills from './components/Skills';
import { useTheme } from './context/ThemeContext';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Hackathons from './pages/Hackathons';
import Blog from './pages/Blog';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <Router>
      <div className="min-h-screen" style={{ background: theme.background, color: theme.text.primary }}>
        {/* Floating Navbar */}
        <div className="fixed top-0 left-0 right-0 w-full flex justify-center p-4 z-50">
          <nav className="w-[95%] max-w-7xl rounded-2xl shadow-lg backdrop-blur-md" 
            style={{ 
              background: `${theme.secondary}E6`,
              border: `1px solid ${theme.accent}20`
            }}>
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center">
                  <Link to="/" className="text-2xl font-bold hover:scale-105 transition-transform duration-200" style={{ color: theme.accent }}>Adwaith</Link>
                </div>
                
                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                  <Link to="/" className="hover:scale-105 transition-all duration-200" style={{ color: theme.text.secondary }}>Home</Link>
                  <Link to="/#skills" className="hover:scale-105 transition-all duration-200" style={{ color: theme.text.secondary }}>Skills</Link>
                  <Link to="/projects" className="hover:scale-105 transition-all duration-200" style={{ color: theme.text.secondary }}>Projects</Link>
                  <Link to="/hackathons" className="hover:scale-105 transition-all duration-200" style={{ color: theme.text.secondary }}>Hackathons</Link>
                  <Link to="/blog" className="hover:scale-105 transition-all duration-200" style={{ color: theme.text.secondary }}>Blog</Link>
                  <Link to="/#contact" className="hover:scale-105 transition-all duration-200" style={{ color: theme.text.secondary }}>Contact</Link>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden flex items-center">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
                    style={{ color: theme.text.secondary }}
                  >
                    <svg
                      className="h-6 w-6"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      {isMenuOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      )}
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="fixed inset-x-0 top-24 p-4 md:hidden z-40">
            <div 
              className="w-[95%] mx-auto rounded-xl shadow-lg backdrop-blur-md animate-fade-in"
              style={{ 
                background: `${theme.secondary}E6`,
                border: `1px solid ${theme.accent}20`
              }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link to="/" className="block px-4 py-2 rounded-lg hover:scale-105 transition-all duration-200" style={{ color: theme.text.secondary }}>Home</Link>
                <Link to="/#skills" className="block px-4 py-2 rounded-lg hover:scale-105 transition-all duration-200" style={{ color: theme.text.secondary }}>Skills</Link>
                <Link to="/projects" className="block px-4 py-2 rounded-lg hover:scale-105 transition-all duration-200" style={{ color: theme.text.secondary }}>Projects</Link>
                <Link to="/hackathons" className="block px-4 py-2 rounded-lg hover:scale-105 transition-all duration-200" style={{ color: theme.text.secondary }}>Hackathons</Link>
                <Link to="/blog" className="block px-4 py-2 rounded-lg hover:scale-105 transition-all duration-200" style={{ color: theme.text.secondary }}>Blog</Link>
                <Link to="/#contact" className="block px-4 py-2 rounded-lg hover:scale-105 transition-all duration-200" style={{ color: theme.text.secondary }}>Contact</Link>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/hackathons" element={<Hackathons />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>

        {/* Footer */}
        <footer className="py-8" style={{ background: theme.secondary, color: theme.text.secondary }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p>© {new Date().getFullYear()} Adwaith. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
