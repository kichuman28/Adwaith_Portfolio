import { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';

const AddBlog = ({ setMessage, editingItem, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    tags: '',
    coverImage: null,
    coverImagePreview: null,
    readTime: '',
    status: 'published' // or 'draft'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingItem) {
      setFormData({
        title: editingItem.title || '',
        summary: editingItem.summary || '',
        content: editingItem.content || '',
        tags: editingItem.tags?.join(', ') || '',
        coverImage: null,
        coverImagePreview: editingItem.coverImageUrl || null,
        readTime: editingItem.readTime || '',
        status: editingItem.status || 'published'
      });
    }
  }, [editingItem]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'coverImage' && files?.[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          coverImage: files[0],
          coverImagePreview: reader.result
        }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({
      ...prev,
      coverImage: null,
      coverImagePreview: null
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
      let coverImageUrl = formData.coverImagePreview;

      if (formData.coverImage) {
        coverImageUrl = await uploadToCloudinary(formData.coverImage);
      }

      const blogData = {
        title: formData.title,
        summary: formData.summary,
        content: formData.content,
        tags: formData.tags.split(',').map(tag => tag.trim()),
        coverImageUrl,
        readTime: formData.readTime,
        status: formData.status,
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
        coverImage: null,
        coverImagePreview: null,
        readTime: '',
        status: 'published'
      });

      if (onCancel) onCancel();
    } catch (error) {
      console.error('Error saving blog:', error);
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
          Title
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
          placeholder="Enter blog title"
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
          placeholder="Brief summary of the blog post"
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
          rows="10"
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 font-mono"
          placeholder="Write your blog content here (Markdown supported)"
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
          Status
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">
          Cover Image {editingItem?.coverImageUrl && '(Leave empty to keep current image)'}
        </label>
        {formData.coverImagePreview ? (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4">
            <img
              src={formData.coverImagePreview}
              alt="Cover"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 p-2 bg-red-500/80 text-white rounded-full hover:bg-red-600/80 transition-colors"
            >
              <FaTimes />
            </button>
          </div>
        ) : (
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-white/10 border-dashed rounded-lg hover:border-emerald-400/50 transition-colors">
            <div className="space-y-1 text-center">
              <div className="flex text-sm text-white/60">
                <label htmlFor="cover-image" className="relative cursor-pointer rounded-md font-medium text-emerald-400 hover:text-emerald-300">
                  <span>Upload cover image</span>
                  <input
                    id="cover-image"
                    name="coverImage"
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
          </div>
        )}
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