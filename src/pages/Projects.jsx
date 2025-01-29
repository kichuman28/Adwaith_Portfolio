import { motion } from 'framer-motion';
import { useProjects } from '../context/ProjectsContext';
import { useState, useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const Projects = () => {
  const { projects, loading, error } = useProjects();
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

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        Error loading projects: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 sm:py-20">
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
            My Projects
          </h2>
          <p className="text-base sm:text-lg max-w-2xl mx-auto font-grotesk" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            Here are some of the projects I've worked on
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
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
              {/* Project Image */}
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.imageUrl || '/assets/images/project-placeholder.jpg'}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-emerald-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-white/70 mb-4 font-grotesk line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-emerald-400 transition-colors duration-300"
                    >
                      <FaGithub className="w-6 h-6" />
                    </a>
                  )}
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-emerald-400 transition-colors duration-300"
                    >
                      <FaExternalLinkAlt className="w-5 h-5" />
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

export default Projects; 