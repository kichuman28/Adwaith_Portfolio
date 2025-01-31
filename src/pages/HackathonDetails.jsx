import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';

const HackathonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hackathon, setHackathon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

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

  return (
    <div className="min-h-screen py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => navigate('/hackathons')}
          className="flex items-center gap-2 text-white/80 hover:text-emerald-400 transition-colors duration-300 mb-8"
        >
          <FaArrowLeft />
          <span>Back to Hackathons</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Main Image */}
            <div className="aspect-video rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10">
              <img
                src={selectedImage || hackathon.imageUrl}
                alt={hackathon.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Image Gallery */}
            {hackathon.additionalImages && hackathon.additionalImages.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                <div
                  className={`aspect-video rounded-lg overflow-hidden cursor-pointer ${
                    selectedImage === hackathon.imageUrl ? 'ring-2 ring-emerald-400' : ''
                  }`}
                  onClick={() => setSelectedImage(hackathon.imageUrl)}
                >
                  <img
                    src={hackathon.imageUrl}
                    alt={hackathon.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                {hackathon.additionalImages.map((image, index) => (
                  <div
                    key={index}
                    className={`aspect-video rounded-lg overflow-hidden cursor-pointer ${
                      selectedImage === image ? 'ring-2 ring-emerald-400' : ''
                    }`}
                    onClick={() => setSelectedImage(image)}
                  >
                    <img
                      src={image}
                      alt={`${hackathon.title} ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Certificate */}
            {hackathon.certificateUrl && (
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10">
                <img
                  src={hackathon.certificateUrl}
                  alt={`${hackathon.title} Certificate`}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-4xl font-bold text-white">{hackathon.title}</h1>
                {hackathon.position && (
                  <span className="px-4 py-1 text-lg rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
                    🏆 {hackathon.position}
                  </span>
                )}
              </div>
              <p className="text-white/60">
                {new Date(hackathon.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>

            <div className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-emerald-400">Project: {hackathon.projectTitle}</h2>
              <p className="text-white/80">{hackathon.description}</p>
              
              <h3 className="text-xl font-bold text-white mt-8 mb-4">Project Description</h3>
              <p className="text-white/80">{hackathon.projectDescription}</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-4">Technologies Used</h3>
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

            <div className="flex flex-wrap gap-4 pt-4">
              {hackathon.githubLink && (
                <a
                  href={hackathon.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors duration-300"
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
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-400/20 text-emerald-400 hover:bg-emerald-400/30 transition-colors duration-300"
                >
                  <FaExternalLinkAlt className="w-4 h-4" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HackathonDetails; 