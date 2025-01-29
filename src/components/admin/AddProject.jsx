import { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import axios from 'axios';

const AddProject = ({ setMessage, editingItem, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    detailedDescription: '',
    technologies: '',
    githubLink: '',
    liveLink: '',
    videoUrl: '',
    image: null,
    additionalImages: []
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingItem) {
      setFormData({
        title: editingItem.title || '',
        shortDescription: editingItem.shortDescription || '',
        detailedDescription: editingItem.detailedDescription || '',
        technologies: editingItem.technologies?.join(', ') || '',
        githubLink: editingItem.githubLink || '',
        liveLink: editingItem.liveLink || '',
        videoUrl: editingItem.videoUrl || '',
        image: null,
        additionalImages: []
      });
    }
  }, [editingItem]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'additionalImages') {
      setFormData(prev => ({
        ...prev,
        [name]: Array.from(files)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: files ? files[0] : value
      }));
    }
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
      let additionalImageUrls = editingItem?.additionalImages || [];

      if (formData.image) {
        imageUrl = await uploadToCloudinary(formData.image);
      }

      if (formData.additionalImages.length > 0) {
        const newImages = await Promise.all(
          formData.additionalImages.map(uploadToCloudinary)
        );
        additionalImageUrls = [...additionalImageUrls, ...newImages];
      }

      const projectData = {
        title: formData.title,
        shortDescription: formData.shortDescription,
        detailedDescription: formData.detailedDescription,
        technologies: formData.technologies.split(',').map(tech => tech.trim()),
        githubLink: formData.githubLink,
        liveLink: formData.liveLink,
        videoUrl: formData.videoUrl,
        imageUrl,
        additionalImages: additionalImageUrls,
        updatedAt: serverTimestamp()
      };

      if (editingItem) {
        await updateDoc(doc(db, 'projects', editingItem.id), projectData);
        setMessage({ type: 'success', text: 'Project updated successfully!' });
      } else {
        await addDoc(collection(db, 'projects'), {
          ...projectData,
          createdAt: serverTimestamp()
        });
        setMessage({ type: 'success', text: 'Project added successfully!' });
      }

      setFormData({
        title: '',
        shortDescription: '',
        detailedDescription: '',
        technologies: '',
        githubLink: '',
        liveLink: '',
        videoUrl: '',
        image: null,
        additionalImages: []
      });
      
      if (onCancel) onCancel();
    } catch (error) {
      console.error('Error saving project:', error);
      setMessage({ type: 'error', text: 'Error saving project. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">
          {editingItem ? 'Edit Project' : 'Add New Project'}
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
          Short Description (shown in cards)
        </label>
        <textarea
          name="shortDescription"
          value={formData.shortDescription}
          onChange={handleChange}
          required
          rows="3"
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
          placeholder="A brief overview of the project (will be shown in project cards)"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">
          Detailed Description
        </label>
        <textarea
          name="detailedDescription"
          value={formData.detailedDescription}
          onChange={handleChange}
          required
          rows="6"
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
          placeholder="A detailed description of the project, its features, and implementation details"
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
          Video URL (YouTube/Vimeo)
        </label>
        <input
          type="url"
          name="videoUrl"
          value={formData.videoUrl}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
          placeholder="e.g., https://www.youtube.com/embed/..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">
          Main Project Image {editingItem?.imageUrl && '(Leave empty to keep current image)'}
        </label>
        <input
          type="file"
          name="image"
          onChange={handleChange}
          accept="image/*"
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">
          Additional Images
        </label>
        <input
          type="file"
          name="additionalImages"
          onChange={handleChange}
          accept="image/*"
          multiple
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
        {loading ? (editingItem ? 'Updating Project...' : 'Adding Project...') : (editingItem ? 'Update Project' : 'Add Project')}
      </button>
    </form>
  );
};

export default AddProject; 