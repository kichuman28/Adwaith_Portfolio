import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProjectList from '../components/admin/ProjectList';
import HackathonList from '../components/admin/HackathonList';
import BlogList from '../components/admin/BlogList';
import AddProject from '../components/admin/AddProject';
import AddHackathon from '../components/admin/AddHackathon';
import AddBlog from '../components/admin/AddBlog';
import DisplayOrderInitializer from '../components/admin/DisplayOrderInitializer';
import Toast from '../components/Toast';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [projects, setProjects] = useState([]);
  const [hackathons, setHackathons] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch projects
    const projectsQuery = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    const unsubscribeProjects = onSnapshot(projectsQuery, (snapshot) => {
      const projectsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(projectsData);
    });

    // Fetch hackathons
    const hackathonsQuery = query(collection(db, 'hackathons'), orderBy('createdAt', 'desc'));
    const unsubscribeHackathons = onSnapshot(hackathonsQuery, (snapshot) => {
      const hackathonsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setHackathons(hackathonsData);
    });

    // Fetch blogs
    const blogsQuery = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
    const unsubscribeBlogs = onSnapshot(blogsQuery, (snapshot) => {
      const blogsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBlogs(blogsData);
    });

    return () => {
      unsubscribeProjects();
      unsubscribeHackathons();
      unsubscribeBlogs();
    };
  }, []);

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
    setShowAddForm(true);
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setShowAddForm(true);
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingItem(null);
  };

  const refreshProjects = () => {
    const projectsQuery = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    onSnapshot(projectsQuery, (snapshot) => {
      const projectsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(projectsData);
    });
  };

  const renderContent = () => {
    if (showAddForm) {
      switch (activeTab) {
        case 'projects':
          return (
            <AddProject
              setMessage={setMessage}
              editingItem={editingItem}
              onCancel={handleCancel}
            />
          );
        case 'hackathons':
          return (
            <AddHackathon
              setMessage={setMessage}
              editingItem={editingItem}
              onCancel={handleCancel}
            />
          );
        case 'blogs':
          return (
            <AddBlog
              setMessage={setMessage}
              editingItem={editingItem}
              onCancel={handleCancel}
            />
          );
        default:
          return null;
      }
    }

    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-bold mb-2">Projects</h3>
              <p className="text-white/60">{projects.length} projects</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-bold mb-2">Hackathons</h3>
              <p className="text-white/60">{hackathons.length} hackathons</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-bold mb-2">Blog Posts</h3>
              <p className="text-white/60">{blogs.length} posts</p>
            </div>
          </div>
        );
      case 'projects':
        return (
          <>
            <DisplayOrderInitializer refreshProjects={refreshProjects} />
            
            <ProjectList 
              projects={projects} 
              onEdit={handleEdit} 
              setMessage={setMessage}
              refreshProjects={refreshProjects}
            />
          </>
        );
      case 'hackathons':
        return <HackathonList hackathons={hackathons} onEdit={handleEdit} setMessage={setMessage} />;
      case 'blogs':
        return <BlogList blogs={blogs} onEdit={handleEdit} setMessage={setMessage} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-emerald-400">
            Admin Panel
          </h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['dashboard', 'projects', 'hackathons', 'blogs'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setShowAddForm(false);
                setEditingItem(null);
              }}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab
                  ? 'bg-emerald-400/20 text-emerald-400 border border-emerald-400/30'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Add Button */}
        {activeTab !== 'dashboard' && !showAddForm && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onClick={handleAddNew}
            className="w-full mb-8 px-6 py-3 rounded-lg bg-gradient-to-r from-teal-400 to-emerald-400 text-black font-medium
              transition-all duration-200 hover:shadow-lg hover:shadow-emerald-400/20 hover:-translate-y-1"
          >
            Add New {activeTab.slice(0, -1)}
          </motion.button>
        )}

        {/* Content */}
        <motion.div
          key={activeTab + (showAddForm ? '-form' : '')}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {renderContent()}
        </motion.div>
      </div>

      {/* Toast Notification */}
      {message.text && (
        <Toast
          type={message.type}
          message={message.text}
          onClose={() => setMessage({ type: '', text: '' })}
        />
      )}
    </div>
  );
};

export default Admin; 