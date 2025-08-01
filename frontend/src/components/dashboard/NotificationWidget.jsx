import React, { useState, useEffect } from 'react';
import { Bell, ChevronDown, MoreHorizontal } from 'lucide-react';
import { useAppContext } from '../../App';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

const NotificationWidget = ({ projects = [] }) => {
  const { currentUser } = useAppContext();
  const [selectedFilter, setSelectedFilter] = useState('최근 활동');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const filters = ['최근 활동', '프로젝트', '언급', '시스템', '모든 알림'];

  useEffect(() => {
    generateNotifications();
  }, [projects, currentUser, selectedFilter]);

  const generateNotifications = () => {
    const mockNotifications = [
      {
        id: 1,
        type: 'system',
        title: '플:로봇',
        message: '안녕하세요! 프로젝트 관리에 도움이 필요하시면 언제든 말씀해주세요.',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30분 전
        avatar: '🤖',
        isRead: false,
        priority: 'normal'
      },
      {
        id: 2,
        type: 'project',
        title: '시스템',
        message: 'Flow PMS에 오신 것을 환영합니다! 협업툴 개발자의 꿈을 응원합니다.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2시간 전
        avatar: '⚡',
        isRead: true,
        priority: 'high'
      },
      {
        id: 3,
        type: 'project',
        title: '프로젝트 업데이트',
        message: '대시보드 UI 개선 작업이 완료되었습니다.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6시간 전
        avatar: '📊',
        isRead: true,
        priority: 'normal'
      }
    ];

    // Add project-related notifications
    projects.forEach((project, index) => {
      if (index < 2) { // Only show recent ones
        mockNotifications.push({
          id: `project-${project.id}`,
          type: 'project',
          title: '시스템',
          message: `프로젝트 "${project.title}"가 생성되었습니다.`,
          timestamp: new Date(project.createdAt || Date.now() - 1000 * 60 * 60 * (index + 1)),
          avatar: '🔔',
          isRead: index > 0,
          priority: 'normal'
        });
      }
    });

    // Filter notifications based on selected filter
    let filteredNotifications = mockNotifications;
    if (selectedFilter !== '모든 알림') {
      filteredNotifications = mockNotifications.filter(notif => {
        switch (selectedFilter) {
          case '프로젝트':
            return notif.type === 'project';
          case '시스템':
            return notif.type === 'system';
          case '언급':
            return notif.type === 'mention';
          case '최근 활동':
            return new Date() - notif.timestamp < 1000 * 60 * 60 * 24; // Last 24 hours
          default:
            return true;
        }
      });
    }

    setNotifications(filteredNotifications.sort((a, b) => b.timestamp - a.timestamp));
  };

  const handleNotificationClick = (notification) => {
    // Mark as read
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notification.id 
          ? { ...notif, isRead: true } 
          : notif
      )
    );

    // Handle navigation based on notification type
    if (notification.type === 'project') {
      // Navigate to projects or specific project
      console.log('Navigate to project:', notification);
    }
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Bell size={20} className="text-blue-500" />
            <h3 className="text-xl font-bold text-gray-800">알림</h3>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                {unreadCount}
              </span>
            )}
          </div>
          
          {/* Filter Dropdown */}
          <div className="relative">
            <button
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            >
              {selectedFilter}
              <ChevronDown size={14} className={`transform transition-transform ${showFilterDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            {showFilterDropdown && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[140px]">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                      selectedFilter === filter ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
                    }`}
                    onClick={() => {
                      setSelectedFilter(filter);
                      setShowFilterDropdown(false);
                    }}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors"
              onClick={markAllAsRead}
            >
              모두 읽음
            </button>
          )}
          <button 
            className="w-2 h-6 bg-gray-300 rounded-full cursor-pointer hover:bg-gray-400 transition-colors"
            title="위젯 설정"
          >
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4 max-h-80 overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onClick={() => handleNotificationClick(notification)}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="text-6xl opacity-20 mb-4">🔔</div>
            <div className="text-gray-500 mb-2">새로운 알림이 없습니다</div>
            <div className="text-sm text-gray-400">
              {selectedFilter !== '모든 알림' && `${selectedFilter} 알림이 없습니다`}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">
              총 {notifications.length}개의 알림
            </span>
            <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
              모든 알림 보기 →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Notification Item Component
const NotificationItem = ({ notification, onClick }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-400 bg-red-50';
      case 'medium':
        return 'border-l-yellow-400 bg-yellow-50';
      default:
        return 'border-l-blue-400 bg-blue-50';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'project':
        return '📋';
      case 'mention':
        return '@';
      case 'system':
        return '⚙️';
      default:
        return '🔔';
    }
  };

  return (
    <div 
      className={`flex gap-4 p-4 rounded-xl border-l-4 cursor-pointer hover:shadow-md transition-all ${
        notification.isRead 
          ? 'bg-gray-50 border-l-gray-300' 
          : `${getPriorityColor(notification.priority)} border-l-4`
      }`}
      onClick={onClick}
    >
      {/* Avatar */}
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${
        notification.isRead ? 'bg-gray-200' : 'bg-white shadow-md'
      }`}>
        {notification.avatar || getTypeIcon(notification.type)}
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1">
          <span className={`font-semibold text-sm ${
            notification.isRead ? 'text-gray-600' : 'text-gray-800'
          }`}>
            {notification.title}
          </span>
          <span className={`text-xs ${
            notification.isRead ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {formatDistanceToNow(notification.timestamp, { 
              addSuffix: true, 
              locale: ko 
            })}
          </span>
        </div>
        <div className={`text-sm leading-relaxed ${
          notification.isRead ? 'text-gray-500' : 'text-gray-700'
        }`}>
          {notification.message}
        </div>
        
        {/* Type Badge */}
        <div className="flex items-center gap-2 mt-2">
          <span className={`text-xs px-2 py-1 rounded-full ${
            notification.type === 'project' ? 'bg-blue-100 text-blue-700' :
            notification.type === 'system' ? 'bg-gray-100 text-gray-700' :
            notification.type === 'mention' ? 'bg-purple-100 text-purple-700' :
            'bg-gray-100 text-gray-700'
          }`}>
            {notification.type === 'project' ? '프로젝트' :
             notification.type === 'system' ? '시스템' :
             notification.type === 'mention' ? '언급' : '일반'}
          </span>
          
          {!notification.isRead && (
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          )}
        </div>
      </div>
      
      {/* Action Menu */}
      <div className="flex-shrink-0">
        <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-all">
          <MoreHorizontal size={16} />
        </button>
      </div>
    </div>
  );
};

export default NotificationWidget;