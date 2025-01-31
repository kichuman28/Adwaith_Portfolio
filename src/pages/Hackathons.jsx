import { useTheme } from '../context/ThemeContext';
import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTrophy, FaArrowRight } from 'react-icons/fa';
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

  const handleHackathonClick = (hackathonId) => {
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
              className="group relative bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden"
              style={{
                boxShadow: '0 0 20px rgba(52, 211, 153, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              {/* Hackathon Image with Gradient Overlay */}
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={hackathon.imageUrl}
                  alt={hackathon.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                
                {/* Position Badge */}
                {hackathon.position && (
                  <div className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-400/20 backdrop-blur-md border border-emerald-400/30">
                    <FaTrophy className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 font-medium">{hackathon.position}</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors duration-300">
                  {hackathon.title}
                </h3>

                <div className="flex flex-wrap gap-2 mb-6">
                  {hackathon.technologies.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/20"
                    >
                      {tech}
                    </span>
                  ))}
                  {hackathon.technologies.length > 3 && (
                    <span className="px-3 py-1 text-xs rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
                      +{hackathon.technologies.length - 3} more
                    </span>
                  )}
                </div>

                {/* View Details Button */}
                <button
                  onClick={() => handleHackathonClick(hackathon.id)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-emerald-400/20 text-emerald-400 hover:bg-emerald-400/30 transition-all duration-300 group-hover:-translate-y-1"
                >
                  <span>View Details</span>
                  <FaArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hackathons; 