import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './styles/globals.css';

// Components
import Layout from './components/layout/Layout';
import MaintenanceModal from './components/modals/MaintenanceModal';

// Pages
import DashboardPage from './pages/DashboardPage';
import ProjectPage from './pages/ProjectPage';
import PortfolioPage from './pages/PortfolioPage';
import CreateProjectPage from './pages/CreateProjectPage';

// Services
import { userService } from './services/userService';
import { projectService } from './services/projectService';

// Context for global state management
const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

function App() {
  // Global state
  const [currentUser, setCurrentUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Initialize app data
  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      setLoading(true);
      
      // Initialize default user
      const userData = await userService.initializeDefaultUser();
      if (userData.success) {
        setCurrentUser(userData.data);
        
        // Load user's projects
        const projectsData = await projectService.getUserProjects(userData.data.id);
        if (projectsData.success) {
          setProjects(projectsData.data);
        }
      }
    } catch (error) {
      console.error('App initialization failed:', error);
    } finally {
      setLoading(false);
    }
  };

  // Project management functions
  const createProject = async (projectData) => {
    try {
      if (!currentUser) {
        throw new Error('사용자가 로그인되지 않았습니다.');
      }

      const response = await projectService.createProject(projectData, currentUser.id);
      if (response.success) {
        setProjects(prev => [response.data, ...prev]);
        return response.data;
      }
      throw new Error(response.message);
    } catch (error) {
      console.error('프로젝트 생성 실패:', error);
      throw error;
    }
  };

  const updateProject = async (projectId, projectData) => {
    try {
      if (!currentUser) {
        throw new Error('사용자가 로그인되지 않았습니다.');
      }

      const response = await projectService.updateProject(projectId, projectData, currentUser.id);
      if (response.success) {
        setProjects(prev => 
          prev.map(project => 
            project.id === projectId ? response.data : project
          )
        );
        return response.data;
      }
      throw new Error(response.message);
    } catch (error) {
      console.error('프로젝트 업데이트 실패:', error);
      throw error;
    }
  };

  const deleteProject = async (projectId) => {
    try {
      if (!currentUser) {
        throw new Error('사용자가 로그인되지 않았습니다.');
      }

      const response = await projectService.deleteProject(projectId, currentUser.id);
      if (response.success) {
        setProjects(prev => prev.filter(project => project.id !== projectId));
        return true;
      }
      throw new Error(response.message);
    } catch (error) {
      console.error('프로젝트 삭제 실패:', error);
      throw error;
    }
  };

  // User status update
  const updateUserStatus = async (profileIcon, statusMessage) => {
    try {
      if (!currentUser) {
        throw new Error('사용자가 로그인되지 않았습니다.');
      }

      const response = await userService.updateUserStatus(currentUser.id, profileIcon, statusMessage);
      if (response.success) {
        setCurrentUser(response.data);
        return response.data;
      }
      throw new Error(response.message);
    } catch (error) {
      console.error('사용자 상태 업데이트 실패:', error);
      throw error;
    }
  };

  // Context value
  const contextValue = {
    // State
    currentUser,
    projects,
    loading,
    searchQuery,
    
    // Setters
    setCurrentUser,
    setProjects,
    setSearchQuery,
    
    // Functions
    createProject,
    updateProject,
    deleteProject,
    updateUserStatus,
    initializeApp
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Flow PMS 로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <AppContext.Provider value={contextValue}>
      <Router>
        <div className="App">
          {/* Global Toast Notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#4ade80',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />

          {/* Maintenance Modal */}
          {showMaintenanceModal && (
            <MaintenanceModal onClose={() => setShowMaintenanceModal(false)} />
          )}

          {/* Main App Routes */}
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/projects" element={<ProjectPage />} />
              <Route path="/projects/create" element={<CreateProjectPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              
              {/* Redirect old routes for compatibility */}
              <Route path="/create" element={<Navigate to="/projects/create" replace />} />
              <Route path="/myProjects" element={<Navigate to="/projects" replace />} />
              
              {/* 404 Fallback */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AppContext.Provider>
  );
}

export default App;