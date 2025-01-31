import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import ProjectList from '../components/admin/ProjectList';
import HackathonList from '../components/admin/HackathonList';
import AddProject from '../components/admin/AddProject';
import AddHackathon from '../components/admin/AddHackathon';
import Toast from '../components/Toast';
import { motion } from 'framer-motion';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [projects, setProjects] = useState([]);
  const [hackathons, setHackathons] = useState([]);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [editingProject, setEditingProject] = useState(null);
  const [editingHackathon, setEditingHackathon] = useState(null);
  const [showAddProject, setShowAddProject] = useState(false);
  const [showAddHackathon, setShowAddHackathon] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const projectsQuery = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    const hackathonsQuery = query(collection(db, 'hackathons'), orderBy('date', 'desc'));

    const unsubscribeProjects = onSnapshot(projectsQuery, (snapshot) => {
      const projectsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(projectsData);
    });

    const unsubscribeHackathons = onSnapshot(hackathonsQuery, (snapshot) => {
      const hackathonsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setHackathons(hackathonsData);
    });

    return () => {
      unsubscribeProjects();
      unsubscribeHackathons();
    };
  }, []);

  const handleEditProject = (project) => {
    setEditingProject(project);
    setShowAddProject(true);
  };

  const handleEditHackathon = (hackathon) => {
    setEditingHackathon(hackathon);
    setShowAddHackathon(true);
  };

  const handleCancelEdit = () => {
    setEditingProject(null);
    setEditingHackathon(null);
    setShowAddProject(false);
    setShowAddHackathon(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-2">Projects</h3>
              <p className="text-white/60">{projects.length} projects</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-2">Hackathons</h3>
              <p className="text-white/60">{hackathons.length} hackathons</p>
            </div>
          </div>
        );
      case 'projects':
        return showAddProject ? (
          <AddProject
            setMessage={setMessage}
            editingItem={editingProject}
            onCancel={handleCancelEdit}
          />
        ) : (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Manage projects</h2>
              <button
                onClick={() => setShowAddProject(true)}
                className="px-4 py-2 rounded-lg bg-emerald-400/20 text-emerald-400 hover:bg-emerald-400/30 transition-colors duration-200"
              >
                Add New Project
              </button>
            </div>
            <ProjectList
              projects={projects}
              onEdit={handleEditProject}
              setMessage={setMessage}
            />
          </div>
        );
      case 'hackathons':
        return showAddHackathon ? (
          <AddHackathon
            setMessage={setMessage}
            editingItem={editingHackathon}
            onCancel={handleCancelEdit}
          />
        ) : (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Manage hackathons</h2>
              <button
                onClick={() => setShowAddHackathon(true)}
                className="px-4 py-2 rounded-lg bg-emerald-400/20 text-emerald-400 hover:bg-emerald-400/30 transition-colors duration-200"
              >
                Add New hackathon
              </button>
            </div>
            <HackathonList
              hackathons={hackathons}
              onEdit={handleEditHackathon}
              setMessage={setMessage}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-emerald-400 font-audiowide"
          >
            Admin Panel
          </motion.h1>
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 rounded-lg bg-red-400/20 text-red-400 hover:bg-red-400/30 transition-colors duration-200"
          >
            Logout
          </button>
        </div>

        <div className="flex space-x-4 mb-8">
          {['Dashboard', 'Projects', 'Blogs', 'Hackathons'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                activeTab === tab.toLowerCase()
                  ? 'bg-emerald-400/20 text-emerald-400'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {renderContent()}
      </div>

      <Toast message={message} onClose={() => setMessage({ type: '', text: '' })} />
    </div>
  );
};

export default Admin; 