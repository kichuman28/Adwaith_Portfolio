import { useParams, useNavigate } from 'react-router-dom';
import { useProjects } from '../context/ProjectsContext';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const { projects, loading } = useProjects();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === projectId);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-400"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-400">Project not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 sm:py-20 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => navigate('/projects')}
          className="mt-8 sm:mt-12 md:mt-16 mb-6 sm:mb-8 md:mb-10 flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all duration-300 group text-sm sm:text-base"
        >
          <FaArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Projects</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl overflow-hidden shadow-xl"
          style={{
            boxShadow: '0 0 20px rgba(52, 211, 153, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* Project Header */}
          <div className="relative">
            <div className="h-[200px] xs:h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
              <img
                src={project.imageUrl || '/assets/images/project-placeholder.jpg'}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div 
                className="absolute inset-0" 
                style={{ 
                  background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0.95) 100%)'
                }} 
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">{project.title}</h1>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm rounded-lg bg-emerald-400/20 text-emerald-400 border border-emerald-400/30 backdrop-blur-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Project Content */}
          <div className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 md:space-y-10">
            {/* Short Description */}
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4">Overview</h2>
              <p className="text-sm sm:text-base md:text-lg text-white/80 font-grotesk leading-relaxed">{project.shortDescription || project.description}</p>
            </div>

            {/* Detailed Description */}
            {project.detailedDescription && (
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4">Details</h2>
                <p className="text-sm sm:text-base md:text-lg text-white/80 font-grotesk leading-relaxed whitespace-pre-wrap">{project.detailedDescription}</p>
              </div>
            )}

            {/* Project Video */}
            {project.videoUrl && (
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4">Demo Video</h2>
                <div className="aspect-video rounded-lg overflow-hidden bg-black/20">
                  <iframe
                    src={project.videoUrl}
                    title={`${project.title} demo`}
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {/* Additional Images */}
            {project.additionalImages && project.additionalImages.length > 0 && (
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4">Gallery</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {project.additionalImages.map((image, index) => (
                    <div key={index} className="aspect-video rounded-lg overflow-hidden bg-black/20 group">
                      <img
                        src={image}
                        alt={`${project.title} screenshot ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Project Links */}
            <div className="flex flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-4">
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all duration-300 hover:-translate-y-1 text-sm sm:text-base"
                >
                  <FaGithub className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>View Source</span>
                </a>
              )}
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-emerald-400/20 text-emerald-400 hover:bg-emerald-400/30 transition-all duration-300 hover:-translate-y-1 text-sm sm:text-base"
                >
                  <FaExternalLinkAlt className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetails; 