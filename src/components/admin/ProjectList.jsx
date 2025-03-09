import { useState } from 'react';
import { deleteDoc, doc, updateDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { FaEdit, FaTrash, FaEye, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmation from './DeleteConfirmation';

const ProjectList = ({ projects, onEdit, setMessage, refreshProjects }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [isReordering, setIsReordering] = useState(false);
  const navigate = useNavigate();

  // Sort projects by displayOrder, with new items (without displayOrder) at the end
  const sortedProjects = [...projects].sort((a, b) => {
    // If both have displayOrder, compare them
    if (a.displayOrder !== undefined && b.displayOrder !== undefined) {
      return a.displayOrder - b.displayOrder;
    }
    // If only a has displayOrder, a comes first
    if (a.displayOrder !== undefined) {
      return -1;
    }
    // If only b has displayOrder, b comes first
    if (b.displayOrder !== undefined) {
      return 1;
    }
    // If neither has displayOrder, sort by creation date (newest first)
    const aDate = a.createdAt?.toDate() || new Date(0);
    const bDate = b.createdAt?.toDate() || new Date(0);
    return bDate - aDate;
  });

  const handleDelete = async () => {
    if (!projectToDelete) return;

    try {
      await deleteDoc(doc(db, 'projects', projectToDelete.id));
      setMessage({ type: 'success', text: 'Project deleted successfully!' });
      if (refreshProjects) refreshProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      setMessage({ type: 'error', text: 'Error deleting project. Please try again.' });
    }

    setShowDeleteConfirm(false);
    setProjectToDelete(null);
  };

  const confirmDelete = (project) => {
    setProjectToDelete(project);
    setShowDeleteConfirm(true);
  };

  const moveProject = async (project, direction) => {
    setIsReordering(true);
    try {
      const currentIndex = sortedProjects.findIndex(p => p.id === project.id);
      const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      
      // Check if move is possible
      if (targetIndex < 0 || targetIndex >= sortedProjects.length) {
        setIsReordering(false);
        return;
      }
      
      const targetProject = sortedProjects[targetIndex];
      
      // Swap display orders
      const currentOrder = project.displayOrder || Number.MAX_SAFE_INTEGER;
      const targetOrder = targetProject.displayOrder || Number.MAX_SAFE_INTEGER;
      
      // Update both projects
      await updateDoc(doc(db, 'projects', project.id), {
        displayOrder: targetOrder
      });
      
      await updateDoc(doc(db, 'projects', targetProject.id), {
        displayOrder: currentOrder
      });
      
      setMessage({ type: 'success', text: 'Project order updated!' });
      if (refreshProjects) refreshProjects();
    } catch (error) {
      console.error('Error reordering projects:', error);
      setMessage({ type: 'error', text: 'Error updating project order. Please try again.' });
    }
    setIsReordering(false);
  };

  return (
    <div className="space-y-4">
      {sortedProjects.map((project, index) => (
        <div
          key={project.id}
          className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6"
          style={{
            boxShadow: '0 0 20px rgba(52, 211, 153, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-white/60 text-sm">
                {new Date(project.createdAt?.toDate()).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Order Controls */}
              <div className="flex items-center gap-2 mr-2">
                <button
                  onClick={() => moveProject(project, 'up')}
                  disabled={index === 0 || isReordering}
                  className={`p-2 rounded-lg transition-colors duration-200 
                    ${index === 0 || isReordering 
                      ? 'bg-white/5 text-white/30 cursor-not-allowed' 
                      : 'bg-emerald-400/20 text-emerald-400 hover:bg-emerald-400/30'}`}
                  title="Move Up"
                >
                  <FaArrowUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => moveProject(project, 'down')}
                  disabled={index === sortedProjects.length - 1 || isReordering}
                  className={`p-2 rounded-lg transition-colors duration-200 
                    ${index === sortedProjects.length - 1 || isReordering 
                      ? 'bg-white/5 text-white/30 cursor-not-allowed' 
                      : 'bg-emerald-400/20 text-emerald-400 hover:bg-emerald-400/30'}`}
                  title="Move Down"
                >
                  <FaArrowDown className="w-4 h-4" />
                </button>
              </div>
              
              <button
                onClick={() => navigate(`/projects/${project.id}`)}
                className="p-2 rounded-lg bg-emerald-400/20 text-emerald-400 hover:bg-emerald-400/30 transition-colors duration-200"
                title="View Project"
              >
                <FaEye className="w-5 h-5" />
              </button>
              <button
                onClick={() => onEdit(project)}
                className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors duration-200"
                title="Edit Project"
              >
                <FaEdit className="w-5 h-5" />
              </button>
              <button
                onClick={() => confirmDelete(project)}
                className="p-2 rounded-lg bg-red-400/20 text-red-400 hover:bg-red-400/30 transition-colors duration-200"
                title="Delete Project"
              >
                <FaTrash className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}

      <DeleteConfirmation
        isOpen={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false);
          setProjectToDelete(null);
        }}
        onConfirm={handleDelete}
        title="Delete Project"
        message="Are you sure you want to delete this project? This action cannot be undone."
      />
    </div>
  );
};

export default ProjectList; 