import { useTheme } from '../context/ThemeContext';

const Blog = () => {
  const { theme } = useTheme();

  return (
    <main className="pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8" style={{ color: theme.accent }}>
          Latest Blog Posts
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Blog post cards will be added here */}
        </div>
      </div>
    </main>
  );
};

export default Blog; 