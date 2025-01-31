import { useState, useEffect } from 'react';
import { collection, query, orderBy, where, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { motion } from 'framer-motion';
import { FaCalendar, FaClock, FaTags, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState(null);
  const [allTags, setAllTags] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const blogsQuery = query(
      collection(db, 'blogs'),
      where('status', '==', 'published'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(blogsQuery, (snapshot) => {
      const blogsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBlogs(blogsData);

      // Extract all unique tags
      const tags = new Set();
      blogsData.forEach(blog => {
        blog.tags.forEach(tag => tags.add(tag));
      });
      setAllTags(Array.from(tags));

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredBlogs = selectedTag
    ? blogs.filter(blog => blog.tags.includes(selectedTag))
    : blogs;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-400"></div>
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
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-emerald-400"
            style={{
              textShadow: '0 0 20px rgba(52, 211, 153, 0.5), 0 0 40px rgba(52, 211, 153, 0.3)'
            }}
          >
            Blog Posts
          </h2>
          <p className="text-base sm:text-lg max-w-2xl mx-auto font-grotesk" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            Sharing insights, experiences, and knowledge about web development and technology
          </p>
        </motion.div>

        {/* Tags Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-4 py-2 rounded-full transition-colors duration-200 ${
                !selectedTag
                  ? 'bg-emerald-400/20 text-emerald-400 border border-emerald-400/30'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              All Posts
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full transition-colors duration-200 ${
                  selectedTag === tag
                    ? 'bg-emerald-400/20 text-emerald-400 border border-emerald-400/30'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredBlogs.map((blog, index) => (
            <motion.article
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden"
              style={{
                boxShadow: '0 0 20px rgba(52, 211, 153, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              {/* Cover Image */}
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={blog.coverImageUrl}
                  alt={blog.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors duration-300">
                  {blog.title}
                </h3>

                {/* Summary */}
                <p className="text-white/70 mb-4 line-clamp-2">
                  {blog.summary}
                </p>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm text-white/60 mb-6">
                  <div className="flex items-center gap-2">
                    <FaCalendar className="w-4 h-4" />
                    <span>{new Date(blog.createdAt?.toDate()).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaClock className="w-4 h-4" />
                    <span>{blog.readTime}</span>
                  </div>
                </div>

                {/* Read More Button */}
                <button
                  onClick={() => navigate(`/blogs/${blog.id}`)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-emerald-400/20 text-emerald-400 hover:bg-emerald-400/30 transition-all duration-300 group-hover:-translate-y-1"
                >
                  <span>Read More</span>
                  <FaArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* No Posts Message */}
        {filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/60">No blog posts found{selectedTag ? ` for tag "${selectedTag}"` : ''}.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs; 