import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const MAX_SHORT_DESCRIPTION_LENGTH = 150;

const AddProject = ({ project = null, onClose }) => {
  const [formData, setFormData] = useState({
    title: project?.title || '',
    shortDescription: project?.shortDescription || '',
    detailedDescription: project?.detailedDescription || '',
    technologies: project?.technologies || [],
    githubLink: project?.githubLink || '',
    liveLink: project?.liveLink || '',
    videoUrl: project?.videoUrl || '',
    imageUrl: project?.imageUrl || '',
    additionalImages: project?.additionalImages || []
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'technologies') {
      setFormData(prev => ({
        ...prev,
        [name]: value.split(',').map(tech => tech.trim()).filter(tech => tech)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: name === 'shortDescription' ? value.slice(0, MAX_SHORT_DESCRIPTION_LENGTH) : value
      }));
    }
  };

  const handleImageUpload = async (e, isMainImage = false) => {
    const files = Array.from(e.target.files);
    setLoading(true);
    try {
      const uploadedUrls = await Promise.all(
        files.map(file => uploadToCloudinary(file))
      );
      
      if (isMainImage) {
        setFormData(prev => ({
          ...prev,
          imageUrl: uploadedUrls[0]
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          additionalImages: [...prev.additionalImages, ...uploadedUrls]
        }));
      }
    } catch (err) {
      setError('Failed to upload image(s)');
      console.error('Upload error:', err);
    }
    setLoading(false);
  };

  const handleRemoveImage = (index, isMainImage = false) => {
    if (isMainImage) {
      setFormData(prev => ({
        ...prev,
        imageUrl: ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        additionalImages: prev.additionalImages.filter((_, i) => i !== index)
      }));
    }
  };

  // ... existing handleSubmit and other functions ...

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-white">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md bg-white/5 border border-white/10 text-white px-4 py-2 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
            required
          />
        </div>

        {/* Short Description */}
        <div>
          <label className="block text-sm font-medium text-white">
            Short Description 
            <span className={`ml-2 ${formData.shortDescription.length >= MAX_SHORT_DESCRIPTION_LENGTH ? 'text-red-400' : 'text-white/60'}`}>
              ({formData.shortDescription.length}/{MAX_SHORT_DESCRIPTION_LENGTH} characters)
            </span>
          </label>
          <textarea
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            maxLength={MAX_SHORT_DESCRIPTION_LENGTH}
            className="mt-1 block w-full rounded-md bg-white/5 border border-white/10 text-white px-4 py-2 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
            rows="3"
            required
          />
        </div>

        {/* Detailed Description */}
        <div>
          <label className="block text-sm font-medium text-white">Detailed Description</label>
          <textarea
            name="detailedDescription"
            value={formData.detailedDescription}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md bg-white/5 border border-white/10 text-white px-4 py-2 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
            rows="6"
          />
        </div>

        {/* Technologies */}
        <div>
          <label className="block text-sm font-medium text-white">
            Technologies (comma-separated)
          </label>
          <input
            type="text"
            name="technologies"
            value={formData.technologies.join(', ')}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md bg-white/5 border border-white/10 text-white px-4 py-2 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
            required
          />
        </div>

        {/* Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white">GitHub Link</label>
            <input
              type="url"
              name="githubLink"
              value={formData.githubLink}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-white/5 border border-white/10 text-white px-4 py-2 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">Live Demo Link</label>
            <input
              type="url"
              name="liveLink"
              value={formData.liveLink}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-white/5 border border-white/10 text-white px-4 py-2 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
            />
          </div>
        </div>

        {/* Video URL */}
        <div>
          <label className="block text-sm font-medium text-white">Video URL</label>
          <input
            type="url"
            name="videoUrl"
            value={formData.videoUrl}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md bg-white/5 border border-white/10 text-white px-4 py-2 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
          />
        </div>

        {/* Main Image */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">Main Image</label>
          {formData.imageUrl ? (
            <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4">
              <img
                src={formData.imageUrl}
                alt="Main project"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(0, true)}
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
                      className="sr-only"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, true)}
                    />
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Additional Images */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">Additional Images</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {formData.additionalImages.map((image, index) => (
              <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                <img
                  src={image}
                  alt={`Project ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-2 right-2 p-2 bg-red-500/80 text-white rounded-full hover:bg-red-600/80 transition-colors"
                >
                  <FaTimes />
                </button>
              </div>
            ))}
            <div className="aspect-video border-2 border-white/10 border-dashed rounded-lg hover:border-emerald-400/50 transition-colors">
              <label className="flex items-center justify-center w-full h-full cursor-pointer">
                <span className="text-emerald-400 hover:text-emerald-300">Add image</span>
                <input
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-white bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50"
          >
            {loading ? 'Saving...' : (project ? 'Update Project' : 'Add Project')}
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400">
          {error}
        </div>
      )}
    </div>
  );
};

export default AddProject; 