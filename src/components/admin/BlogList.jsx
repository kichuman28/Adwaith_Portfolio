import { useState } from 'react';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { FaEdit, FaTrash, FaEye, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmation from './DeleteConfirmation';

const BlogList = ({ blogs, onEdit, setMessage, refreshBlogs }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [isReordering, setIsReordering] = useState(false);
  const navigate = useNavigate();

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

  const handleDelete = async () => {
    if (!blogToDelete) return;

    try {
      await deleteDoc(doc(db, 'blogs', blogToDelete.id));
      setMessage({ type: 'success', text: 'Blog post deleted successfully!' });
      if (refreshBlogs) refreshBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
      setMessage({ type: 'error', text: 'Error deleting blog post. Please try again.' });
    }

    setShowDeleteConfirm(false);
    setBlogToDelete(null);
  };

  const confirmDelete = (blog) => {
    setBlogToDelete(blog);
    setShowDeleteConfirm(true);
  };

  const moveBlog = async (blog, direction) => {
    setIsReordering(true);
    try {
      const currentIndex = sortedBlogs.findIndex(b => b.id === blog.id);
      const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      
      // Check if move is possible
      if (targetIndex < 0 || targetIndex >= sortedBlogs.length) {
        setIsReordering(false);
        return;
      }
      
      const targetBlog = sortedBlogs[targetIndex];
      
      // Swap display orders
      const currentOrder = blog.displayOrder || Number.MAX_SAFE_INTEGER;
      const targetOrder = targetBlog.displayOrder || Number.MAX_SAFE_INTEGER;
      
      // Update both blogs
      await updateDoc(doc(db, 'blogs', blog.id), {
        displayOrder: targetOrder
      });
      
      await updateDoc(doc(db, 'blogs', targetBlog.id), {
        displayOrder: currentOrder
      });
      
      setMessage({ type: 'success', text: 'Blog order updated!' });
      if (refreshBlogs) refreshBlogs();
    } catch (error) {
      console.error('Error reordering blogs:', error);
      setMessage({ type: 'error', text: 'Error updating blog order. Please try again.' });
    }
    setIsReordering(false);
  };

  return (
    <div className="space-y-4">
      {sortedBlogs.map((blog, index) => (
        <div
          key={blog.id}
          className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6"
          style={{
            boxShadow: '0 0 20px rgba(52, 211, 153, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold text-white">{blog.title}</h3>
                {blog.status === 'draft' && (
                  <span className="px-2 py-1 text-xs rounded-full bg-yellow-400/20 text-yellow-400 border border-yellow-400/20">
                    Draft
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-3 mt-2">
                <p className="text-white/60 text-sm">
                  {new Date(blog.createdAt?.toDate()).toLocaleDateString()}
                </p>
                <p className="text-white/60 text-sm">•</p>
                <p className="text-white/60 text-sm">{blog.readTime}</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Order Controls */}
              <div className="flex items-center gap-2 mr-2">
                <button
                  onClick={() => moveBlog(blog, 'up')}
                  disabled={index === 0 || isReordering}
                  className={`p-2 rounded-lg transition-colors duration-200 
                    ${index === 0 || isReordering 
                      ? 'bg-white/5 text-white/30 cursor-not-allowed' 
                      : 'bg-emerald-400/20 text-emerald-400 hover:bg-emerald-400/30'}`}
                  title="Move Up"
                >
                  <FaArrowUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => moveBlog(blog, 'down')}
                  disabled={index === sortedBlogs.length - 1 || isReordering}
                  className={`p-2 rounded-lg transition-colors duration-200 
                    ${index === sortedBlogs.length - 1 || isReordering 
                      ? 'bg-white/5 text-white/30 cursor-not-allowed' 
                      : 'bg-emerald-400/20 text-emerald-400 hover:bg-emerald-400/30'}`}
                  title="Move Down"
                >
                  <FaArrowDown className="w-4 h-4" />
                </button>
              </div>
              
              <button
                onClick={() => navigate(`/blogs/${blog.id}`)}
                className="p-2 rounded-lg bg-emerald-400/20 text-emerald-400 hover:bg-emerald-400/30 transition-colors duration-200"
                title="View Blog Post"
              >
                <FaEye className="w-5 h-5" />
              </button>
              <button
                onClick={() => onEdit(blog)}
                className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors duration-200"
                title="Edit Blog Post"
              >
                <FaEdit className="w-5 h-5" />
              </button>
              <button
                onClick={() => confirmDelete(blog)}
                className="p-2 rounded-lg bg-red-400/20 text-red-400 hover:bg-red-400/30 transition-colors duration-200"
                title="Delete Blog Post"
              >
                <FaTrash className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}

      <DeleteConfirmation
        isOpen={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false);
          setBlogToDelete(null);
        }}
        onConfirm={handleDelete}
        title="Delete Blog Post"
        message="Are you sure you want to delete this blog post? This action cannot be undone."
      />
    </div>
  );
};

export default BlogList; 