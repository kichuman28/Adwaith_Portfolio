import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../config/firebase';
import { motion } from 'framer-motion';
import axios from 'axios';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const AddProject = ({ setMessage }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    githubLink: '',
    liveLink: '',
    image: null
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      let imageUrl = '';
      if (formData.image) {
        imageUrl = await uploadToCloudinary(formData.image);
      }

      await addDoc(collection(db, 'projects'), {
        title: formData.title,
        description: formData.description,
        technologies: formData.technologies.split(',').map(tech => tech.trim()),
        githubLink: formData.githubLink,
        liveLink: formData.liveLink,
        imageUrl,
        createdAt: serverTimestamp()
      });

      setFormData({
        title: '',
        description: '',
        technologies: '',
        githubLink: '',
        liveLink: '',
        image: null
      });
      setMessage({ type: 'success', text: 'Project added successfully!' });
    } catch (error) {
      console.error('Error adding project:', error);
      setMessage({ type: 'error', text: 'Error adding project. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">
          Project Title
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows="4"
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">
          Technologies (comma-separated)
        </label>
        <input
          type="text"
          name="technologies"
          value={formData.technologies}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">
          GitHub Link
        </label>
        <input
          type="url"
          name="githubLink"
          value={formData.githubLink}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">
          Live Link
        </label>
        <input
          type="url"
          name="liveLink"
          value={formData.liveLink}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">
          Project Image
        </label>
        <input
          type="file"
          name="image"
          onChange={handleChange}
          accept="image/*"
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full px-6 py-3 rounded-lg bg-gradient-to-r from-teal-400 to-emerald-400 text-black font-medium
          transition-all duration-200 hover:shadow-lg hover:shadow-emerald-400/20
          ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-1'}`}
      >
        {loading ? 'Adding Project...' : 'Add Project'}
      </button>
    </form>
  );
};

const AddBlog = ({ setMessage }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: null
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      let imageUrl = '';
      if (formData.image) {
        imageUrl = await uploadToCloudinary(formData.image);
      }

      await addDoc(collection(db, 'blogs'), {
        title: formData.title,
        content: formData.content,
        imageUrl,
        createdAt: serverTimestamp()
      });

      setFormData({
        title: '',
        content: '',
        image: null
      });
      setMessage({ type: 'success', text: 'Blog post added successfully!' });
    } catch (error) {
      console.error('Error adding blog post:', error);
      setMessage({ type: 'error', text: 'Error adding blog post. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">
          Blog Title
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">
          Content
        </label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          rows="8"
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">
          Blog Image
        </label>
        <input
          type="file"
          name="image"
          onChange={handleChange}
          accept="image/*"
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full px-6 py-3 rounded-lg bg-gradient-to-r from-teal-400 to-emerald-400 text-black font-medium
          transition-all duration-200 hover:shadow-lg hover:shadow-emerald-400/20
          ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-1'}`}
      >
        {loading ? 'Adding Blog Post...' : 'Add Blog Post'}
      </button>
    </form>
  );
};

const Admin = () => {
  const [activeTab, setActiveTab] = useState('project');
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 backdrop-blur-lg rounded-xl p-6 sm:p-8 shadow-xl"
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-emerald-400">
              Admin Panel
            </h2>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-red-400/10 text-red-400 hover:bg-red-400/20 transition-colors duration-200"
            >
              Logout
            </button>
          </div>

          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab('project')}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                activeTab === 'project'
                  ? 'bg-emerald-400/20 text-emerald-400'
                  : 'text-white/60 hover:text-white/80'
              }`}
            >
              Add Project
            </button>
            <button
              onClick={() => setActiveTab('blog')}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                activeTab === 'blog'
                  ? 'bg-emerald-400/20 text-emerald-400'
                  : 'text-white/60 hover:text-white/80'
              }`}
            >
              Add Blog
            </button>
          </div>

          {message.text && (
            <div className={`p-4 rounded-lg mb-6 ${
              message.type === 'success' ? 'bg-emerald-400/20 text-emerald-400' : 'bg-red-400/20 text-red-400'
            }`}>
              {message.text}
            </div>
          )}

          {activeTab === 'project' ? (
            <AddProject setMessage={setMessage} />
          ) : (
            <AddBlog setMessage={setMessage} />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Admin; 