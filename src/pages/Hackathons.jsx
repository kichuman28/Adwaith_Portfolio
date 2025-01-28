import { useTheme } from '../context/ThemeContext';

const Hackathons = () => {
  const { theme } = useTheme();

  return (
    <main className="pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8" style={{ color: theme.accent }}>
          Hackathon Experiences
        </h1>
        <div className="space-y-12">
          {/* Hackathon experiences will be added here */}
        </div>
      </div>
    </main>
  );
};

export default Hackathons; 