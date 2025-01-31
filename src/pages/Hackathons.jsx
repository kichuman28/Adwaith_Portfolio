import { useTheme } from '../context/ThemeContext';
import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const MAX_DESCRIPTION_LENGTH = 200;

const Hackathons = () => {
  const { theme } = useTheme();
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const hackathonsQuery = query(
      collection(db, 'hackathons'),
      orderBy('date', 'desc')
    );

    const unsubscribe = onSnapshot(hackathonsQuery, 
      (snapshot) => {
        const hackathonsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setHackathons(hackathonsData);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching hackathons:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleHackathonClick = (hackathonId, e) => {
    if (e.target.closest('a') || e.target.closest('button')) {
      e.stopPropagation();
      return;
    }
    navigate(`/hackathons/${hackathonId}`);
  };

  const truncateDescription = (description) => {
    if (!description) return '';
    if (description.length <= MAX_DESCRIPTION_LENGTH) return description;
    return description.slice(0, MAX_DESCRIPTION_LENGTH).trim() + '...';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-emerald-400"
            style={{
              textShadow: '0 0 20px rgba(52, 211, 153, 0.5), 0 0 40px rgba(52, 211, 153, 0.3)'
            }}
          >
            Hackathon Experiences
          </h2>
          <p className="text-base sm:text-lg max-w-2xl mx-auto font-grotesk" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            Showcasing my journey through various hackathons
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {hackathons.map((hackathon, index) => (
            <motion.div
              key={hackathon.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: isMobile ? index * 0.1 : index * 0.2 }}
              viewport={{ once: true, margin: "-50px" }}
              className="group relative bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden cursor-pointer"
              style={{
                boxShadow: '0 0 20px rgba(52, 211, 153, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
              onClick={(e) => handleHackathonClick(hackathon.id, e)}
            >
              {/* Hackathon Image */}
              <div className="aspect-video overflow-hidden">
                <img
                  src={hackathon.imageUrl}
                  alt={hackathon.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Hackathon Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors duration-300">
                    {hackathon.title}
                  </h3>
                  {hackathon.position && (
                    <span className="px-3 py-1 text-sm rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
                      🏆 {hackathon.position}
                    </span>
                  )}
                </div>

                <p className="text-white/70 mb-4 font-grotesk h-[6rem] overflow-hidden">
                  {truncateDescription(hackathon.description)}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {hackathon.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 mt-auto z-10 relative">
                  {hackathon.githubLink && (
                    <a
                      href={hackathon.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors duration-300"
                    >
                      <FaGithub className="w-5 h-5" />
                      <span>View Source</span>
                    </a>
                  )}
                  {hackathon.demoLink && (
                    <a
                      href={hackathon.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-400/20 text-emerald-400 hover:bg-emerald-400/30 transition-colors duration-300"
                    >
                      <FaExternalLinkAlt className="w-4 h-4" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hackathons; 