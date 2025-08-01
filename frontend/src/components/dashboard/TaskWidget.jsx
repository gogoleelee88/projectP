import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Plus } from 'lucide-react';
import { useAppContext } from '../../App';

const TaskWidget = ({ projects = [] }) => {
  const navigate = useNavigate();
  const { currentUser } = useAppContext();
  const [selectedPeriod, setSelectedPeriod] = useState('이번 달');
  const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);

  // Calculate task statistics
  const [taskStats, setTaskStats] = useState({
    scheduled: 0,
    inProgress: 0,
    completed: 0,
    total: 0
  });

  const periods = ['이번 주', '이번 달', '이번 분기', '올해'];

  useEffect(() => {
    calculateTaskStats();
  }, [projects, selectedPeriod]);

  const calculateTaskStats = () => {
    // Mock calculation based on projects
    const stats = {
      scheduled: projects.filter(p => p.status === '예정').length,
      inProgress: projects.filter(p => p.status === '진행중').length,
      completed: projects.filter(p => p.status === '완료').length,
      total: projects.length
    };

    setTaskStats(stats);
  };

  const handleProjectClick = (project) => {
    navigate('/projects');
  };

  const handleCreateProject = () => {
    navigate('/projects/create');
  };

  // Default projects for demo
  const defaultProjects = [
    { id: 'default-1', title: '플로우 시작 가이드', status: '완료', category: '기본' },
    { id: 'default-2', title: '[플로우] LeeS 전용 문의방', status: '진행중', category: '기본' },
    { id: 'default-3', title: 'ddd', status: '진행중', category: '기본' }
  ];

  const allProjects = [...projects, ...defaultProjects];

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <h3 
            className="text-xl font-bold text-gray-800 cursor-pointer hover:text-purple-600 transition-colors"
            onClick={() => navigate('/projects')}
          >
            내가 담당중인 업무
          </h3>
          
          {/* Period Selector */}
          <div className="relative">
            <button
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              onClick={() => setShowPeriodDropdown(!showPeriodDropdown)}
            >
              {selectedPeriod}
              <ChevronDown size={14} className={`transform transition-transform ${showPeriodDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            {showPeriodDropdown && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[120px]">
                {periods.map((period) => (
                  <button
                    key={period}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                      selectedPeriod === period ? 'text-purple-600 bg-purple-50' : 'text-gray-700'
                    }`}
                    onClick={() => {
                      setSelectedPeriod(period);
                      setShowPeriodDropdown(false);
                    }}
                  >
                    {period}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <button 
          className="w-2 h-6 bg-gray-300 rounded-full cursor-pointer hover:bg-gray-400 transition-colors"
          title="위젯 설정"
        >
        </button>
      </div>
      
      {/* Task Statistics */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-lg font-bold text-gray-700">예정된 업무</span>
            <span className="text-2xl font-bold text-blue-500">{taskStats.scheduled}</span>
          </div>
          <div className="h-1 bg-blue-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 transition-all duration-500"
              style={{ width: `${taskStats.total > 0 ? (taskStats.scheduled / taskStats.total) * 100 : 0}%` }}
            ></div>
          </div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-lg font-bold text-gray-700">진행중 업무</span>
            <span className="text-2xl font-bold text-green-500">{taskStats.inProgress}</span>
          </div>
          <div className="h-1 bg-green-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 transition-all duration-500"
              style={{ width: `${taskStats.total > 0 ? (taskStats.inProgress / taskStats.total) * 100 : 0}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      {/* Divider */}
      <div className="h-0.5 bg-gradient-to-r from-purple-200 to-blue-200 w-32 mb-6"></div>

      {/* Project List */}
      <div className="space-y-3">
        {/* Create New Project Button */}
        <div 
          className="flex items-center gap-4 p-4 cursor-pointer hover:bg-purple-50 hover:shadow-md rounded-xl transition-all group"
          onClick={handleCreateProject}
        >
          <div className="w-10 h-10 border-2 border-dashed border-purple-400 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600 group-hover:bg-purple-100 transition-colors">
            <Plus size={20} />
          </div>
          <div className="flex-1">
            <span className="text-purple-600 font-medium group-hover:text-purple-700 transition-colors">새 프로젝트</span>
            <div className="text-xs text-purple-400 mt-1">클릭하여 프로젝트를 생성하세요</div>
          </div>
        </div>
        
        {/* User Projects */}
        {allProjects.map((project) => (
          <ProjectItem
            key={project.id}
            project={project}
            onClick={() => handleProjectClick(project)}
          />
        ))}
        
        {/* Empty State */}
        {allProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl opacity-20 mb-4">📋</div>
            <div className="text-gray-500 mb-4">아직 프로젝트가 없습니다</div>
            <button
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              onClick={handleCreateProject}
            >
              첫 번째 프로젝트 만들기
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>총 {taskStats.total}개 프로젝트</span>
          <button 
            className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
            onClick={() => navigate('/projects')}
          >
            전체 보기 →
          </button>
        </div>
      </div>
    </div>
  );
};

// Project Item Component
const ProjectItem = ({ project, onClick }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case '완료':
        return 'bg-green-500';
      case '진행중':
        return 'bg-blue-500';
      case '예정':
        return 'bg-yellow-500';
      case '보류':
        return 'bg-gray-500';
      default:
        return 'bg-purple-500';
    }
  };

  const getStatusIcon = (category) => {
    switch (category) {
      case '기본':
        return '📚';
      case '업무':
        return '💼';
      case '피드':
        return '💬';
      case '간트차트':
        return '📊';
      case '캘린더':
        return '📅';
      case '파일':
        return '📁';
      default:
        return '📋';
    }
  };

  return (
    <div 
      className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-50 hover:shadow-md rounded-xl transition-all group"
      onClick={onClick}
    >
      <div className={`w-10 h-10 ${getStatusColor(project.status)} rounded-lg flex items-center justify-center text-white shadow-md`}>
        <span className="text-sm">{getStatusIcon(project.category)}</span>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="font-medium text-gray-800 group-hover:text-purple-600 transition-colors truncate">
          {project.title}
        </div>
        <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
          <span>{project.category}</span>
          <span>•</span>
          <span className={`px-2 py-1 rounded-full text-xs ${
            project.status === '완료' ? 'bg-green-100 text-green-700' :
            project.status === '진행중' ? 'bg-blue-100 text-blue-700' :
            project.status === '예정' ? 'bg-yellow-100 text-yellow-700' :
            'bg-gray-100 text-gray-700'
          }`}>
            {project.status}
          </span>
        </div>
      </div>
      
      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
      </div>
    </div>
  );
};

export default TaskWidget;