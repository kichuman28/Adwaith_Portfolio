import { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import axios from 'axios';

const AddBlog = ({ setMessage, editingItem, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    tags: '',
    image: null,
    readTime: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingItem) {
      setFormData({
        title: editingItem.title || '',
        summary: editingItem.summary || '',
        content: editingItem.content || '',
        tags: editingItem.tags?.join(', ') || '',
        readTime: editingItem.readTime || '',
        image: null
      });
    }
  }, [editingItem]);

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
      let imageUrl = editingItem?.imageUrl || '';

      if (formData.image) {
        imageUrl = await uploadToCloudinary(formData.image);
      }

      const blogData = {
        title: formData.title,
        summary: formData.summary,
        content: formData.content,
        tags: formData.tags.split(',').map(tag => tag.trim()),
        readTime: formData.readTime,
        imageUrl,
        updatedAt: serverTimestamp()
      };

      if (editingItem) {
        await updateDoc(doc(db, 'blogs', editingItem.id), blogData);
        setMessage({ type: 'success', text: 'Blog post updated successfully!' });
      } else {
        await addDoc(collection(db, 'blogs'), {
          ...blogData,
          createdAt: serverTimestamp()
        });
        setMessage({ type: 'success', text: 'Blog post added successfully!' });
      }

      setFormData({
        title: '',
        summary: '',
        content: '',
        tags: '',
        readTime: '',
        image: null
      });
      
      if (onCancel) onCancel();
    } catch (error) {
      console.error('Error saving blog post:', error);
      setMessage({ type: 'error', text: 'Error saving blog post. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">
          {editingItem ? 'Edit Blog Post' : 'Add New Blog Post'}
        </h2>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors duration-200"
          >
            Cancel
          </button>
        )}
      </div>

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
          Summary
        </label>
        <textarea
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          required
          rows="3"
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
          placeholder="A brief summary of the blog post"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">
          Content (Markdown supported)
        </label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          rows="12"
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 font-mono"
          placeholder="Write your blog post content here..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">
          Tags (comma-separated)
        </label>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
          placeholder="e.g., React, Web Development, Tutorial"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">
          Read Time (e.g., '5 min read')
        </label>
        <input
          type="text"
          name="readTime"
          value={formData.readTime}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
          placeholder="e.g., 5 min read"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">
          Cover Image {editingItem?.imageUrl && '(Leave empty to keep current image)'}
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
        {loading ? (editingItem ? 'Updating Blog Post...' : 'Adding Blog Post...') : (editingItem ? 'Update Blog Post' : 'Add Blog Post')}
      </button>
    </form>
  );
};

export default AddBlog; 