import { useTheme } from '../context/ThemeContext';
import Skills from '../components/Skills';

const Home = () => {
  const { theme } = useTheme();

  return (
    <main className="pt-16">
      {/* Hero/Bio Section */}
      <section id="home" className="min-h-screen flex items-center justify-center transition-colors duration-200" 
        style={{ background: `linear-gradient(to bottom right, ${theme.background}, ${theme.secondary})` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
              <span className="block" style={{ color: theme.text.primary }}>Hi, I'm Adwaith</span>
              <span className="block" style={{ color: theme.accent }}>Computer Science Student</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base sm:text-lg md:mt-5 md:text-xl md:max-w-3xl" style={{ color: theme.text.secondary }}>
              Final year computer science student passionate about technology and innovation.
              Building solutions that make a difference.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 transition-colors duration-200" style={{ background: theme.background }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2" style={{ color: theme.accent }}>
              Tech Stack
            </h2>
            <p className="text-sm" style={{ color: theme.text.secondary }}>
              Technologies and tools I work with
            </p>
          </div>
          <Skills />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 transition-colors duration-200" style={{ background: theme.secondary }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center mb-12" style={{ color: theme.accent }}>
            Get In Touch
          </h2>
          <div className="max-w-lg mx-auto">
            {/* Contact form will be added here */}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home; 