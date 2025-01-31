import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaTrophy, FaCalendar, FaUsers, FaCode } from 'react-icons/fa';

const HackathonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hackathon, setHackathon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showLightbox, setShowLightbox] = useState(false);

  useEffect(() => {
    const fetchHackathon = async () => {
      try {
        const hackathonDoc = await getDoc(doc(db, 'hackathons', id));
        if (hackathonDoc.exists()) {
          setHackathon({ id: hackathonDoc.id, ...hackathonDoc.data() });
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

  const allImages = [hackathon.imageUrl, ...(hackathon.additionalImages || [])];

  return (
    <div className="min-h-screen py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => navigate('/hackathons')}
          className="flex items-center gap-2 text-white/80 hover:text-emerald-400 transition-colors duration-300 mb-8 group"
        >
          <FaArrowLeft className="transform group-hover:-translate-x-1 transition-transform duration-300" />
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
              className="aspect-video rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 cursor-pointer relative group"
              onClick={() => {
                setSelectedImage(selectedImage || hackathon.imageUrl);
                setShowLightbox(true);
              }}
            >
              <img
                src={selectedImage || hackathon.imageUrl}
                alt={hackathon.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-sm">Click to enlarge</span>
              </div>
            </div>

            {/* Image Gallery */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {allImages.map((image, index) => (
                  <div
                    key={index}
                    className={`aspect-video rounded-lg overflow-hidden cursor-pointer relative ${
                      selectedImage === image ? 'ring-2 ring-emerald-400' : ''
                    }`}
                    onClick={() => setSelectedImage(image)}
                  >
                    <img
                      src={image}
                      alt={`${hackathon.title} ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                    <div className={`absolute inset-0 bg-black/20 ${selectedImage === image ? 'bg-opacity-0' : ''}`} />
                  </div>
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

      {/* Image Lightbox */}
      {showLightbox && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setShowLightbox(false)}
        >
          <div className="relative max-w-7xl w-full max-h-[90vh]">
            <img
              src={selectedImage}
              alt={hackathon.title}
              className="w-full h-full object-contain"
            />
            <button
              onClick={() => setShowLightbox(false)}
              className="absolute top-4 right-4 text-white/80 hover:text-white"
            >
              <span className="text-2xl">×</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HackathonDetails; 