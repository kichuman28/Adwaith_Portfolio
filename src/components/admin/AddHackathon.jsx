import { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';

const AddHackathon = ({ setMessage, editingItem, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    teamSize: '',
    position: '',
    projectTitle: '',
    projectDescription: '',
    technologies: '',
    githubLink: '',
    demoLink: '',
    image: null,
    imagePreview: null,
    additionalImages: [],
    additionalImagePreviews: [],
    certificate: null,
    certificatePreview: null,
    removedImages: []
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingItem) {
      setFormData({
        title: editingItem.title || '',
        description: editingItem.description || '',
        date: editingItem.date || '',
        teamSize: editingItem.teamSize || '',
        position: editingItem.position || '',
        projectTitle: editingItem.projectTitle || '',
        projectDescription: editingItem.projectDescription || '',
        technologies: editingItem.technologies?.join(', ') || '',
        githubLink: editingItem.githubLink || '',
        demoLink: editingItem.demoLink || '',
        image: null,
        imagePreview: editingItem.imageUrl || null,
        additionalImages: [],
        additionalImagePreviews: editingItem.additionalImages || [],
        certificate: null,
        certificatePreview: editingItem.certificateUrl || null,
        removedImages: []
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
    } else if (name === 'certificate' && files?.[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          certificate: files[0],
          certificatePreview: reader.result
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

  const handleRemoveImage = (isMainImage, index = null) => {
    if (isMainImage) {
      setFormData(prev => ({
        ...prev,
        image: null,
        imagePreview: null
      }));
      if (editingItem) {
        setFormData(prev => ({
          ...prev,
          imageUrl: null
        }));
      }
    } else if (index !== null) {
      setFormData(prev => {
        const newAdditionalImages = [...prev.additionalImages];
        const newAdditionalImagePreviews = [...prev.additionalImagePreviews];
        
        newAdditionalImages.splice(index, 1);
        newAdditionalImagePreviews.splice(index, 1);

        if (editingItem) {
          const removedImages = prev.removedImages || [];
          if (prev.additionalImagePreviews[index].startsWith('http')) {
            removedImages.push(prev.additionalImagePreviews[index]);
          }
          return {
            ...prev,
            additionalImages: newAdditionalImages,
            additionalImagePreviews: newAdditionalImagePreviews,
            removedImages
          };
        }

        return {
          ...prev,
          additionalImages: newAdditionalImages,
          additionalImagePreviews: newAdditionalImagePreviews
        };
      });
    }
  };

  const handleRemoveCertificate = () => {
    setFormData(prev => ({
      ...prev,
      certificate: null,
      certificatePreview: null
    }));
    if (editingItem) {
      setFormData(prev => ({
        ...prev,
        certificateUrl: null
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
      let certificateUrl = formData.certificatePreview;
      let additionalImageUrls = [...formData.additionalImagePreviews];

      if (editingItem && formData.imageUrl === null) {
        imageUrl = null;
      }
      if (editingItem && formData.certificateUrl === null) {
        certificateUrl = null;
      }

      if (formData.image) {
        imageUrl = await uploadToCloudinary(formData.image);
      }

      if (formData.certificate) {
        certificateUrl = await uploadToCloudinary(formData.certificate);
      }

      if (formData.additionalImages.length > 0) {
        const newImages = await Promise.all(
          formData.additionalImages.map(file => {
            if (file instanceof File) {
              return uploadToCloudinary(file);
            }
            return file;
          })
        );
        
        additionalImageUrls = [
          ...additionalImageUrls.filter(url => 
            typeof url === 'string' && 
            url.startsWith('http') && 
            (!formData.removedImages || !formData.removedImages.includes(url))
          ),
          ...newImages.filter(Boolean)
        ];
      } else if (editingItem && formData.removedImages) {
        additionalImageUrls = additionalImageUrls.filter(
          url => !formData.removedImages.includes(url)
        );
      }

      const hackathonData = {
        title: formData.title,
        description: formData.description,
        date: formData.date,
        teamSize: formData.teamSize,
        position: formData.position,
        projectTitle: formData.projectTitle,
        projectDescription: formData.projectDescription,
        technologies: formData.technologies.split(',').map(tech => tech.trim()),
        githubLink: formData.githubLink,
        demoLink: formData.demoLink,
        imageUrl,
        certificateUrl,
        additionalImages: additionalImageUrls,
        updatedAt: serverTimestamp()
      };

      if (editingItem) {
        await updateDoc(doc(db, 'hackathons', editingItem.id), hackathonData);
        setMessage({ type: 'success', text: 'Hackathon updated successfully!' });
      } else {
        await addDoc(collection(db, 'hackathons'), {
          ...hackathonData,
          createdAt: serverTimestamp()
        });
        setMessage({ type: 'success', text: 'Hackathon added successfully!' });
      }

      setFormData({
        title: '',
        description: '',
        date: '',
        teamSize: '',
        position: '',
        projectTitle: '',
        projectDescription: '',
        technologies: '',
        githubLink: '',
        demoLink: '',
        image: null,
        imagePreview: null,
        additionalImages: [],
        additionalImagePreviews: [],
        certificate: null,
        certificatePreview: null,
        removedImages: []
      });

      if (onCancel) onCancel();
    } catch (error) {
      console.error('Error saving hackathon:', error);
      setMessage({ type: 'error', text: 'Error saving hackathon. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">
          {editingItem ? 'Edit Hackathon' : 'Add New Hackathon'}
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
          Hackathon Title
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
          placeholder="e.g., HackMIT 2023"
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
          placeholder="Describe the hackathon and your experience"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Team Size
          </label>
          <input
            type="number"
            name="teamSize"
            value={formData.teamSize}
            onChange={handleChange}
            required
            min="1"
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">
          Position/Achievement
        </label>
        <input
          type="text"
          name="position"
          value={formData.position}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
          placeholder="e.g., Winner, Runner-up, Top 10"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">
          Project Title
        </label>
        <input
          type="text"
          name="projectTitle"
          value={formData.projectTitle}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">
          Project Description
        </label>
        <textarea
          name="projectDescription"
          value={formData.projectDescription}
          onChange={handleChange}
          required
          rows="4"
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
          placeholder="Describe your project and its impact"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">
          Technologies Used (comma-separated)
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
          Demo Link
        </label>
        <input
          type="url"
          name="demoLink"
          value={formData.demoLink}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">
          Main Project Image {editingItem?.imageUrl && '(Leave empty to keep current image)'}
        </label>
        {formData.imagePreview ? (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4">
            <img
              src={formData.imagePreview}
              alt="Main project"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(true)}
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
                    name="image"
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

      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">
          Additional Images
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {formData.additionalImagePreviews.map((preview, index) => (
            <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
              <img
                src={preview}
                alt={`Project ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(false, index)}
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
                name="additionalImages"
                className="sr-only"
                accept="image/*"
                multiple
                onChange={handleChange}
              />
            </label>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">
          Certificate {editingItem?.certificateUrl && '(Leave empty to keep current certificate)'}
        </label>
        {formData.certificatePreview ? (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4">
            <img
              src={formData.certificatePreview}
              alt="Certificate"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={handleRemoveCertificate}
              className="absolute top-2 right-2 p-2 bg-red-500/80 text-white rounded-full hover:bg-red-600/80 transition-colors"
            >
              <FaTimes />
            </button>
          </div>
        ) : (
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-white/10 border-dashed rounded-lg hover:border-emerald-400/50 transition-colors">
            <div className="space-y-1 text-center">
              <div className="flex text-sm text-white/60">
                <label htmlFor="certificate" className="relative cursor-pointer rounded-md font-medium text-emerald-400 hover:text-emerald-300">
                  <span>Upload certificate</span>
                  <input
                    id="certificate"
                    name="certificate"
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
        {loading ? (editingItem ? 'Updating Hackathon...' : 'Adding Hackathon...') : (editingItem ? 'Update Hackathon' : 'Add Hackathon')}
      </button>
    </form>
  );
};

export default AddHackathon; 