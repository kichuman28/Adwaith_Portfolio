import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaTrophy, FaCalendar, FaUsers, FaCode, FaTimes } from 'react-icons/fa';

const HackathonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hackathon, setHackathon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [showLightbox, setShowLightbox] = useState(false);

  useEffect(() => {
    const fetchHackathon = async () => {
      try {
        const hackathonDoc = await getDoc(doc(db, 'hackathons', id));
        if (hackathonDoc.exists()) {
          const data = { id: hackathonDoc.id, ...hackathonDoc.data() };
          setHackathon(data);
          setMainImage(data.imageUrl); // Set initial main image
        } else {
          navigate('/hackathons');
        }
      } catch (error) {
        console.error('Error fetching hackathon:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHackathon();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-400"></div>
      </div>
    );
  }

  if (!hackathon) {
    return null;
  }

  const handleGalleryClick = (image) => {
    setMainImage(image); // Update main image when clicking gallery image
  };

  const handleMainImageClick = () => {
    setSelectedImage(mainImage);
    setShowLightbox(true);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setShowLightbox(false);
  };

  return (
    <div className="min-h-screen py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => navigate('/hackathons')}
          className="mt-4 sm:mt-6 mb-6 sm:mb-8 flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all duration-300 group text-sm sm:text-base"
        >
          <FaArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Hackathons</span>
        </motion.button>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Images */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Main Image */}
            <div 
              className="aspect-video rounded-lg overflow-hidden cursor-pointer group relative"
              onClick={handleMainImageClick}
            >
              <img
                src={mainImage}
                alt={hackathon.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-sm font-medium">Click to enlarge</span>
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {(hackathon?.gallery?.length > 0 || hackathon?.additionalImages?.length > 0) && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-4">
                {[
                  hackathon.imageUrl,
                  ...(hackathon.gallery || []),
                  ...(hackathon.additionalImages || [])
                ].map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`relative cursor-pointer overflow-hidden rounded-lg aspect-video ${
                      mainImage === image ? 'ring-2 ring-emerald-400' : ''
                    }`}
                    onClick={() => handleGalleryClick(image)}
                  >
                    <img
                      src={image}
                      alt={`Gallery image ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </motion.div>
                ))}
              </div>
            )}

            {/* Certificate */}
            {hackathon.certificateUrl && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <FaTrophy className="text-emerald-400" />
                  Certificate of Achievement
                </h3>
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10">
                  <img
                    src={hackathon.certificateUrl}
                    alt={`${hackathon.title} Certificate`}
                    className="w-full h-full object-contain"
                  />
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <h1 className="text-4xl font-bold text-white">{hackathon.title}</h1>
                {hackathon.position && (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-400/20 border border-emerald-400/30">
                    <FaTrophy className="w-5 h-5 text-emerald-400" />
                    <span className="text-emerald-400 font-medium">{hackathon.position}</span>
                  </div>
                )}
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-white/80">
                  <FaCalendar className="w-5 h-5 text-emerald-400" />
                  <span>{new Date(hackathon.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <FaUsers className="w-5 h-5 text-emerald-400" />
                  <span>Team Size: {hackathon.teamSize}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-invert max-w-none">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-3">About the Hackathon</h2>
                  <p className="text-white/80 leading-relaxed">{hackathon.description}</p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-3">Project: {hackathon.projectTitle}</h2>
                  <p className="text-white/80 leading-relaxed">{hackathon.projectDescription}</p>
                </div>
              </div>
            </div>

            {/* Technologies */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FaCode className="text-emerald-400" />
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {hackathon.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 text-sm rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-4 pt-4">
              {hackathon.githubLink && (
                <a
                  href={hackathon.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all duration-300 hover:-translate-y-1"
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
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-400/20 text-emerald-400 hover:bg-emerald-400/30 transition-all duration-300 hover:-translate-y-1"
                >
                  <FaExternalLinkAlt className="w-4 h-4" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              className="relative max-w-7xl mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-2 backdrop-blur-sm transition-all duration-300"
              >
                <FaTimes className="w-6 h-6" />
              </button>
              <img
                src={selectedImage}
                alt="Enlarged view"
                className="max-h-[90vh] max-w-[90vw] w-auto h-auto object-contain rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HackathonDetails; 