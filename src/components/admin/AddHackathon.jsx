import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';
import axios from 'axios';

const AddHackathon = ({ setMessage }) => {
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
    certificate: null
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
      let certificateUrl = '';

      if (formData.image) {
        imageUrl = await uploadToCloudinary(formData.image);
      }

      if (formData.certificate) {
        certificateUrl = await uploadToCloudinary(formData.certificate);
      }

      await addDoc(collection(db, 'hackathons'), {
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
        createdAt: serverTimestamp()
      });

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
        certificate: null
      });
      setMessage({ type: 'success', text: 'Hackathon experience added successfully!' });
    } catch (error) {
      console.error('Error adding hackathon:', error);
      setMessage({ type: 'error', text: 'Error adding hackathon. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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

      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">
          Certificate (if any)
        </label>
        <input
          type="file"
          name="certificate"
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
        {loading ? 'Adding Hackathon...' : 'Add Hackathon'}
      </button>
    </form>
  );
};

export default AddHackathon; 