import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../config/firebase';
import { motion } from 'framer-motion';
import axios from 'axios';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import AddProject from '../components/admin/AddProject';
import AddBlog from '../components/admin/AddBlog';
import AddHackathon from '../components/admin/AddHackathon';
import ManageContent from '../components/admin/ManageContent';
import Toast from '../components/Toast';

const Admin = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [activeType, setActiveType] = useState('projects');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isAdding, setIsAdding] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsAdding(true);
  };

  const sections = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'projects', label: 'Projects' },
    { id: 'blogs', label: 'Blogs' },
    { id: 'hackathons', label: 'Hackathons' }
  ];

  const renderContent = () => {
    if (activeSection === 'dashboard') {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.slice(1).map(section => (
            <motion.div
              key={section.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 cursor-pointer"
              onClick={() => setActiveSection(section.id)}
            >
              <h3 className="text-xl font-bold text-white mb-2">Manage {section.label}</h3>
              <p className="text-white/60">Add, edit, or remove {section.label.toLowerCase()}</p>
            </motion.div>
          ))}
        </div>
      );
    }

    if (isAdding) {
      switch (activeSection) {
        case 'projects':
          return <AddProject setMessage={setMessage} editingItem={editingItem} onCancel={() => { setIsAdding(false); setEditingItem(null); }} />;
        case 'blogs':
          return <AddBlog setMessage={setMessage} editingItem={editingItem} onCancel={() => { setIsAdding(false); setEditingItem(null); }} />;
        case 'hackathons':
          return <AddHackathon setMessage={setMessage} editingItem={editingItem} onCancel={() => { setIsAdding(false); setEditingItem(null); }} />;
        default:
          return null;
      }
    }

    return (
      <>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Manage {activeSection}</h2>
          <button
            onClick={() => setIsAdding(true)}
            className="px-4 py-2 rounded-lg bg-emerald-400/20 text-emerald-400 hover:bg-emerald-400/30 transition-colors duration-200"
          >
            Add New {activeSection.slice(0, -1)}
          </button>
        </div>
        <ManageContent
          type={activeSection}
          onEdit={handleEdit}
          setMessage={setMessage}
        />
      </>
    );
  };

  return (
    <div className="min-h-screen pt-32 pb-12 px-4 sm:px-6 lg:px-8">
      <Toast 
        message={message} 
        onClose={() => setMessage({ type: '', text: '' })} 
      />
      <div className="max-w-7xl mx-auto">
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

          {/* Navigation */}
          <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => {
                  setActiveSection(section.id);
                  setIsAdding(false);
                  setEditingItem(null);
                }}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
                  activeSection === section.id
                    ? 'bg-emerald-400/20 text-emerald-400'
                    : 'text-white/60 hover:text-white/80'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>

          {renderContent()}
        </motion.div>
      </div>
    </div>
  );
};

export default Admin; 