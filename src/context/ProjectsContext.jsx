import { createContext, useContext, useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';

const ProjectsContext = createContext();

export const useProjects = () => useContext(ProjectsContext);

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const projectsQuery = query(
      collection(db, 'projects'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(projectsQuery, 
      (snapshot) => {
        const projectsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProjects(projectsData);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching projects:', error);
        setError(error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
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