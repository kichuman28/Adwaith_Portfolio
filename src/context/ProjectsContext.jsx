import { createContext, useContext, useState, useEffect } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';

const ProjectsContext = createContext();

export const useProjects = () => useContext(ProjectsContext);

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      // Create a query against the projects collection
      const projectsQuery = query(
        collection(db, 'projects')
      );

      // Set up a real-time listener
      const unsubscribe = onSnapshot(
        projectsQuery,
        (snapshot) => {
          const projectsData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setProjects(projectsData);
          setLoading(false);
          setError(null);
        },
        (err) => {
          console.error('Error fetching projects:', err);
          setError('Failed to load projects');
          setLoading(false);
        }
      );

      // Clean up listener on unmount
      return () => unsubscribe();
    } catch (err) {
      console.error('Error setting up projects listener:', err);
      setError('Failed to load projects');
      setLoading(false);
    }
  }, []);

  const value = {
    projects,
    loading,
    error
  };

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
}; 