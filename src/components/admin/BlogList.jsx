import { useState } from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmation from './DeleteConfirmation';

const BlogList = ({ blogs, onEdit, setMessage }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!blogToDelete) return;

    try {
      await deleteDoc(doc(db, 'blogs', blogToDelete.id));
      setMessage({ type: 'success', text: 'Blog post deleted successfully!' });
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

  return (
    <div className="space-y-4">
      {blogs.map((blog) => (
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