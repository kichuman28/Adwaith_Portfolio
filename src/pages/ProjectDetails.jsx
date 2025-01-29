import { useParams } from 'react-router-dom';
import { useProjects } from '../context/ProjectsContext';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const { projects, loading } = useProjects();
  const project = projects.find(p => p.id === projectId);

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
    <div className="min-h-screen py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl"
          style={{
            boxShadow: '0 0 20px rgba(52, 211, 153, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* Project Header */}
          <div className="relative">
            <div className="h-[300px] sm:h-[400px] overflow-hidden">
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
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">{project.title}</h1>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 text-sm rounded-lg bg-emerald-400/20 text-emerald-400 border border-emerald-400/30 backdrop-blur-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Project Content */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Short Description */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Overview</h2>
              <p className="text-white/80 font-grotesk">{project.shortDescription || project.description}</p>
            </div>

            {/* Detailed Description */}
            {project.detailedDescription && (
              <div>
                <h2 className="text-xl font-bold text-white mb-4">Details</h2>
                <p className="text-white/80 font-grotesk whitespace-pre-wrap">{project.detailedDescription}</p>
              </div>
            )}

            {/* Project Video */}
            {project.videoUrl && (
              <div>
                <h2 className="text-xl font-bold text-white mb-4">Demo Video</h2>
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
                <h2 className="text-xl font-bold text-white mb-4">Gallery</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {project.additionalImages.map((image, index) => (
                    <div key={index} className="aspect-video rounded-lg overflow-hidden bg-black/20">
                      <img
                        src={image}
                        alt={`${project.title} screenshot ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Project Links */}
            <div className="flex flex-wrap gap-4 pt-4">
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all duration-300 hover:-translate-y-1"
                >
                  <FaGithub className="w-5 h-5" />
                  <span>View Source</span>
                </a>
              )}
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-400/20 text-emerald-400 hover:bg-emerald-400/30 transition-all duration-300 hover:-translate-y-1"
                >
                  <FaExternalLinkAlt className="w-4 h-4" />
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