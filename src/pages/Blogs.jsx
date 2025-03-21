import { useState, useEffect } from 'react';
import { collection, query, orderBy, where, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { motion } from 'framer-motion';
import { FaCalendar, FaClock, FaArrowRight, FaImage } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // First, create a simpler query without composite requirements
    const blogsQuery = query(
      collection(db, 'blogs'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(blogsQuery, (snapshot) => {
      const blogsData = snapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        // Filter published posts after fetching
        .filter(blog => blog.status === 'published');

      console.log('Fetched blogs:', blogsData);
      setBlogs(blogsData);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching blogs:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-400"></div>
      </div>
    );
  }

  // Sort blogs by displayOrder, with new items (without displayOrder) at the end
  const sortedBlogs = [...blogs].sort((a, b) => {
    // If both have displayOrder, compare them
    if (a.displayOrder !== undefined && b.displayOrder !== undefined) {
      return a.displayOrder - b.displayOrder;
    }
    // If only a has displayOrder, a comes first
    if (a.displayOrder !== undefined) {
      return -1;
    }
    // If only b has displayOrder, b comes first
    if (b.displayOrder !== undefined) {
      return 1;
    }
    // If neither has displayOrder, sort by creation date (newest first)
    const aDate = a.createdAt?.toDate() || new Date(0);
    const bDate = b.createdAt?.toDate() || new Date(0);
    return bDate - aDate;
  });

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
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {sortedBlogs.map((blog, index) => (
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
                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors duration-300">
                  {blog.title}
                </h3>

                {/* Summary */}
                <p className="text-white/70 mb-4 line-clamp-2">
                  {blog.summary}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-white/60 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <FaCalendar className="w-4 h-4" />
                      <span>{new Date(blog.createdAt?.toDate()).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaClock className="w-4 h-4" />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>
                  {blog.contentImageUrls?.length > 0 && (
                    <div className="flex items-center gap-1">
                      <FaImage className="w-4 h-4" />
                      <span>{blog.contentImageUrls.length}</span>
                    </div>
                  )}
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
        {blogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/60">No blog posts found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs; 