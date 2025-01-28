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
        {/* Navbar */}
        <nav className="fixed top-0 w-full shadow-lg z-50" style={{ background: theme.secondary }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="text-2xl font-bold" style={{ color: theme.accent }}>Adwaith</Link>
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <Link to="/" className="transition-colors duration-200" style={{ color: theme.text.secondary }}>Home</Link>
                <Link to="/#skills" className="transition-colors duration-200" style={{ color: theme.text.secondary }}>Skills</Link>
                <Link to="/projects" className="transition-colors duration-200" style={{ color: theme.text.secondary }}>Projects</Link>
                <Link to="/hackathons" className="transition-colors duration-200" style={{ color: theme.text.secondary }}>Hackathons</Link>
                <Link to="/blog" className="transition-colors duration-200" style={{ color: theme.text.secondary }}>Blog</Link>
                <Link to="/#contact" className="transition-colors duration-200" style={{ color: theme.text.secondary }}>Contact</Link>
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

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden" style={{ background: theme.secondary }}>
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link to="/" className="block px-3 py-2 transition-colors duration-200" style={{ color: theme.text.secondary }}>Home</Link>
                <Link to="/#skills" className="block px-3 py-2 transition-colors duration-200" style={{ color: theme.text.secondary }}>Skills</Link>
                <Link to="/projects" className="block px-3 py-2 transition-colors duration-200" style={{ color: theme.text.secondary }}>Projects</Link>
                <Link to="/hackathons" className="block px-3 py-2 transition-colors duration-200" style={{ color: theme.text.secondary }}>Hackathons</Link>
                <Link to="/blog" className="block px-3 py-2 transition-colors duration-200" style={{ color: theme.text.secondary }}>Blog</Link>
                <Link to="/#contact" className="block px-3 py-2 transition-colors duration-200" style={{ color: theme.text.secondary }}>Contact</Link>
              </div>
            </div>
          )}
        </nav>

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
