import { useTheme } from '../context/ThemeContext';

const Projects = () => {
  const { theme } = useTheme();

  return (
    <main className="pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8" style={{ color: theme.accent }}>
          Featured Projects
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Project Card Example */}
          <div 
            className="rounded-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2"
            style={{ background: theme.secondary }}
          >
            <div className="relative">
              <div className="aspect-video w-full bg-gray-800" />
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="flex gap-4">
                  <a 
                    href="#" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:scale-110 transition-transform duration-300"
                    style={{ background: theme.accent }}
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                  </a>
                  <a 
                    href="#" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:scale-110 transition-transform duration-300"
                    style={{ background: theme.accent }}
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2" style={{ color: theme.text.primary }}>
                Project Name
              </h3>
              <p className="text-sm mb-4" style={{ color: theme.text.secondary }}>
                Brief description of the project. What it does, what technologies were used, and what problems it solves.
              </p>
              <div className="flex flex-wrap gap-2">
                <span 
                  className="text-xs px-3 py-1 rounded-full"
                  style={{ background: theme.background, color: theme.accent }}
                >
                  React
                </span>
                <span 
                  className="text-xs px-3 py-1 rounded-full"
                  style={{ background: theme.background, color: theme.accent }}
                >
                  Node.js
                </span>
                <span 
                  className="text-xs px-3 py-1 rounded-full"
                  style={{ background: theme.background, color: theme.accent }}
                >
                  MongoDB
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Projects; 