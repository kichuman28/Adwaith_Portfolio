import { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';

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
    imagePreview: null,
    additionalImages: [],
    additionalImagePreviews: []
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
        imagePreview: editingItem.imageUrl || null,
        additionalImages: [],
        additionalImagePreviews: editingItem.additionalImages || []
      });
    }
  }, [editingItem]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'image' && files?.[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: files[0],
          imagePreview: reader.result
        }));
      };
      reader.readAsDataURL(files[0]);
    } else if (name === 'additionalImages' && files?.length) {
      const newFiles = Array.from(files);
      const readers = newFiles.map(file => {
        return new Promise(resolve => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
      });

      Promise.all(readers).then(previews => {
        setFormData(prev => ({
          ...prev,
          additionalImages: [...prev.additionalImages, ...newFiles],
          additionalImagePreviews: [...prev.additionalImagePreviews, ...previews]
        }));
      });
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleRemoveImage = (isMainImage, index = null) => {
    if (isMainImage) {
      setFormData(prev => ({
        ...prev,
        image: null,
        imagePreview: editingItem?.imageUrl || null
      }));
    } else if (index !== null) {
      setFormData(prev => ({
        ...prev,
        additionalImages: prev.additionalImages.filter((_, i) => i !== index),
        additionalImagePreviews: prev.additionalImagePreviews.filter((_, i) => i !== index)
      }));
    }
  };

  const handleRemoveExistingImage = (isMainImage, index = null) => {
    if (isMainImage) {
      setFormData(prev => ({
        ...prev,
        imagePreview: null
      }));
    } else if (index !== null) {
      setFormData(prev => ({
        ...prev,
        additionalImagePreviews: prev.additionalImagePreviews.filter((_, i) => i !== index)
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
      let imageUrl = formData.imagePreview;
      let additionalImageUrls = [...formData.additionalImagePreviews];

      // Upload new main image if selected
      if (formData.image) {
        imageUrl = await uploadToCloudinary(formData.image);
      }

      // Upload new additional images
      if (formData.additionalImages.length > 0) {
        const newImages = await Promise.all(
          formData.additionalImages.map(uploadToCloudinary)
        );
        // Only add newly uploaded images
        additionalImageUrls = [
          ...additionalImageUrls.filter(url => typeof url === 'string' && url.startsWith('http')),
          ...newImages
        ];
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

      // Reset form
      setFormData({
        title: '',
        shortDescription: '',
        detailedDescription: '',
        technologies: '',
        githubLink: '',
        liveLink: '',
        videoUrl: '',
        image: null,
        imagePreview: null,
        additionalImages: [],
        additionalImagePreviews: []
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
        
        {/* Main Image Preview */}
        {formData.imagePreview ? (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4">
            <img
              src={formData.imagePreview}
              alt="Main project preview"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => handleRemoveExistingImage(true)}
              className="absolute top-2 right-2 p-2 bg-red-500/80 text-white rounded-full hover:bg-red-600/80 transition-colors"
            >
              <FaTimes />
            </button>
          </div>
        ) : (
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-white/10 border-dashed rounded-lg hover:border-emerald-400/50 transition-colors">
            <div className="space-y-1 text-center">
              <div className="flex text-sm text-white/60">
                <label htmlFor="main-image" className="relative cursor-pointer rounded-md font-medium text-emerald-400 hover:text-emerald-300">
                  <span>Upload main image</span>
                  <input
                    id="main-image"
                    type="file"
                    name="image"
                    onChange={handleChange}
                    accept="image/*"
                    className="sr-only"
                  />
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">
          Additional Images
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {/* Existing and New Image Previews */}
          {formData.additionalImagePreviews.map((preview, index) => (
            <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
              <img
                src={preview}
                alt={`Project ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemoveExistingImage(false, index)}
                className="absolute top-2 right-2 p-2 bg-red-500/80 text-white rounded-full hover:bg-red-600/80 transition-colors"
              >
                <FaTimes />
              </button>
            </div>
          ))}
          
          {/* Upload More Images Button */}
          <div className="aspect-video border-2 border-white/10 border-dashed rounded-lg hover:border-emerald-400/50 transition-colors">
            <label className="flex items-center justify-center w-full h-full cursor-pointer">
              <span className="text-emerald-400 hover:text-emerald-300">Add more images</span>
              <input
                type="file"
                name="additionalImages"
                onChange={handleChange}
                accept="image/*"
                multiple
                className="sr-only"
              />
            </label>
          </div>
        </div>
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