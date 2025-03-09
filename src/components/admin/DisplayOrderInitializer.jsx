import { useState } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

const DisplayOrderInitializer = ({ refreshProjects }) => {
  const [isInitializing, setIsInitializing] = useState(false);
  const [result, setResult] = useState({ status: '', message: '' });

  const initializeDisplayOrder = async () => {
    setIsInitializing(true);
    setResult({ status: 'loading', message: 'Initializing display order for all projects...' });
    
    try {
      // Get all projects
      const projectsRef = collection(db, 'projects');
      const projectsSnapshot = await getDocs(projectsRef);
      const projects = projectsSnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      
      // Sort projects by createdAt timestamp (oldest first)
      const sortedProjects = [...projects].sort((a, b) => {
        const aDate = a.createdAt?.toDate() || new Date(0);
        const bDate = b.createdAt?.toDate() || new Date(0);
        return aDate - bDate;
      });
      
      // Update each project with a display order
      let successCount = 0;
      for (let i = 0; i < sortedProjects.length; i++) {
        await updateDoc(doc(db, 'projects', sortedProjects[i].id), {
          displayOrder: i
        });
        successCount++;
      }
      
      setResult({ 
        status: 'success', 
        message: `Successfully initialized display order for ${successCount} projects!` 
      });
      
      // Refresh projects to show the new order
      if (refreshProjects) {
        refreshProjects();
      }
    } catch (error) {
      console.error('Error initializing display order:', error);
      setResult({ 
        status: 'error', 
        message: `Error initializing display order: ${error.message}` 
      });
    } finally {
      setIsInitializing(false);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 mb-6">
      <h3 className="text-xl font-bold text-white mb-4">Project Order Initialization</h3>
      <p className="text-white/70 mb-4">
        This will assign a display order to all existing projects based on their creation date.
        This operation only needs to be performed once.
      </p>
      
      {result.status && (
        <div className={`mb-4 p-4 rounded-lg ${
          result.status === 'loading' ? 'bg-blue-400/20 text-blue-400' :
          result.status === 'success' ? 'bg-green-400/20 text-green-400' :
          'bg-red-400/20 text-red-400'
        }`}>
          {result.message}
        </div>
      )}
      
      <button
        onClick={initializeDisplayOrder}
        disabled={isInitializing}
        className={`px-6 py-3 rounded-lg bg-gradient-to-r from-purple-400 to-blue-400 text-black font-medium
          transition-all duration-200 hover:shadow-lg hover:shadow-blue-400/20
          ${isInitializing ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-1'}`}
      >
        {isInitializing ? 'Initializing...' : 'Initialize Project Order'}
      </button>
    </div>
  );
};

export default DisplayOrderInitializer; 