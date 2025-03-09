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
    window.scrollTo(0, 0);
  }, []);

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
      orderBy('displayOrder', 'asc')
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

  // Sort hackathons by displayOrder, with new items (without displayOrder) at the end
  const sortedHackathons = [...hackathons].sort((a, b) => {
    // If both have displayOrder, compare them
    if (a.displayOrder !== undefined && b.displayOrder !== undefined) {
      return a.displayOrder - b.displayOrder;
    }
    // If only a has displayOrder, a comes first
    if (a.displayOrder !== undefined) {
      return -1;
    }
    // If only b has displayOrder, b comes first
    if (b.displayOrder !== undefined) {
      return 1;
    }
    // If neither has displayOrder, sort by creation date (newest first)
    const aDate = a.createdAt?.toDate() || new Date(0);
    const bDate = b.createdAt?.toDate() || new Date(0);
    return bDate - aDate;
  });

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
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {sortedHackathons.map((hackathon, index) => (
            <motion.div
              key={hackathon.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden"
              style={{
                boxShadow: '0 0 20px rgba(52, 211, 153, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              {/* Hackathon Image with Gradient Overlay */}
              <div className="aspect-[16/9] overflow-hidden relative">
                <img
                  src={hackathon.imageUrl}
                  alt={hackathon.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                
                {/* Position Badge */}
                {hackathon.position && (
                  <div className="absolute top-3 right-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-400/20 backdrop-blur-md border border-emerald-400/30">
                    <FaTrophy className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-medium text-sm">{hackathon.position}</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors duration-300">
                  {hackathon.title}
                </h3>

                <div className="flex flex-wrap gap-2 mb-4">
                  {hackathon.technologies.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 text-xs rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/20"
                    >
                      {tech}
                    </span>
                  ))}
                  {hackathon.technologies.length > 3 && (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
                      +{hackathon.technologies.length - 3} more
                    </span>
                  )}
                </div>

                {/* View Details Button */}
                <button
                  onClick={() => handleHackathonClick(hackathon.id)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-emerald-400/20 text-emerald-400 hover:bg-emerald-400/30 transition-all duration-300 group-hover:-translate-y-1"
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