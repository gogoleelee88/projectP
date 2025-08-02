import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Plus } from 'lucide-react';
import { useAppContext } from '../../App';

const CalendarWidget = () => {
  const { projects } = useAppContext();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(24); // Today is 24th
  const [events, setEvents] = useState([]);

  useEffect(() => {
    generateEvents();
  }, [projects, selectedDate]);

  const generateEvents = () => {
    const mockEvents = [
      {
        id: 1,
        title: 'Flow PMS 개발 회의',
        type: 'meeting',
        time: '14:00',
        date: 24,
        color: 'purple'
      },
      {
        id: 2,
        title: '프로젝트 리뷰',
        type: 'review',
        time: '16:30',
        date: 24,
        color: 'blue'
      },
      {
        id: 3,
        title: '협업툴 데모',
        type: 'demo',
        time: '10:00',
        date: 25,
        color: 'green'
      }
    ];

    // Add project-based events
    projects.forEach((project, index) => {
      if (index < 2) {
        mockEvents.push({
          id: `project-${project.id}`,
          title: `${project.title} 작업`,
          type: 'task',
          time: `${9 + index}:00`,
          date: 26 + index,
          color: 'orange'
        });
      }
    });

    setEvents(mockEvents);
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date) => {
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
  };

  const navigateMonth = (direction) => {
    setSelectedDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(selectedDate);
    const firstDay = getFirstDayOfMonth(selectedDate);
    const days = [];
    const today = new Date();
    const isCurrentMonth = selectedDate.getMonth() === today.getMonth() && 
                          selectedDate.getFullYear() === today.getFullYear();
    
    // Previous month days
    const prevMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 0);
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = prevMonth.getDate() - i;
      days.push(
        <CalendarDay
          key={`prev-${day}`}
          day={day}
          isCurrentMonth={false}
          isToday={false}
          isSelected={false}
          events={[]}
          onClick={() => {}}
        />
      );
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = isCurrentMonth && day === today.getDate();
      const isSelected = day === selectedDay;
      const dayEvents = events.filter(event => event.date === day);
      
      days.push(
        <CalendarDay
          key={day}
          day={day}
          isCurrentMonth={true}
          isToday={isToday}
          isSelected={isSelected}
          events={dayEvents}
          onClick={() => setSelectedDay(day)}
        />
      );
    }
    
    // Next month days
    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
    for (let day = 1; days.length < totalCells; day++) {
      days.push(
        <CalendarDay
          key={`next-${day}`}
          day={day}
          isCurrentMonth={false}
          isToday={false}
          isSelected={false}
          events={[]}
          onClick={() => {}}
        />
      );
    }
    
    return days;
  };

  const getSelectedDayEvents = () => {
    return events.filter(event => event.date === selectedDay);
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <CalendarIcon size={20} className="text-green-500" />
          <h3 className="text-xl font-bold text-gray-800">캘린더</h3>
        </div>
        <button 
          className="w-2 h-6 bg-gray-300 rounded-full cursor-pointer hover:bg-gray-400 transition-colors"
          title="위젯 설정"
        >
        </button>
      </div>

      {/* Calendar Header */}
      <div className="text-xl font-bold text-gray-800 text-center mb-6">
        {formatDate(selectedDate)}
      </div>
      
      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <button 
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          onClick={() => navigateMonth(-1)}
          title="이전 달"
        >
          <ChevronLeft size={20} className="text-gray-600" />
        </button>
        
        <button className="px-4 py-2 text-sm text-gray-500 border border-gray-300 rounded-full hover:border-green-400 hover:text-green-600 transition-all">
          오늘
        </button>
        
        <button 
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          onClick={() => navigateMonth(1)}
          title="다음 달"
        >
          <ChevronRight size={20} className="text-gray-600" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="mb-6">
        {/* Week Days Header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
            <div key={index} className="h-8 flex items-center justify-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {renderCalendar()}
        </div>
      </div>

      {/* Selected Day Events */}
      <div className="border-t pt-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-gray-800">
            {selectedDay}일의 일정 
            {getSelectedDayEvents().length > 0 && (
              <span className="text-green-600">({getSelectedDayEvents().length})</span>
            )}
          </h4>
          <button 
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            title="일정 추가"
          >
            <Plus size={16} className="text-gray-500" />
          </button>
        </div>
        
        <div className="space-y-3 max-h-32 overflow-y-auto">
          {getSelectedDayEvents().length > 0 ? (
            getSelectedDayEvents().map(event => (
              <EventItem key={event.id} event={event} />
            ))
          ) : (
            <div className="text-center py-4">
              <div className="text-gray-400 text-sm">일정이 없습니다</div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-green-600">{events.length}</div>
            <div className="text-xs text-gray-500">이번 달 일정</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-600">
              {events.filter(e => e.type === 'meeting').length}
            </div>
            <div className="text-xs text-gray-500">회의</div>
          </div>
          <div>
            <div className="text-lg font-bold text-purple-600">
              {events.filter(e => e.type === 'task').length}
            </div>
            <div className="text-xs text-gray-500">업무</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Calendar Day Component
const CalendarDay = ({ day, isCurrentMonth, isToday, isSelected, events, onClick }) => {
  return (
    <div 
      className={`
        h-10 flex flex-col items-center justify-center text-sm cursor-pointer rounded-lg transition-all relative
        ${isCurrentMonth 
          ? isSelected 
            ? 'bg-green-500 text-white font-semibold shadow-md' 
            : isToday 
              ? 'bg-blue-100 text-blue-600 font-semibold' 
              : 'text-gray-800 hover:bg-gray-100'
          : 'text-gray-400 hover:bg-gray-50'
        }
      `}
      onClick={onClick}
    >
      <span className="leading-none">{day}</span>
      
      {/* Event Indicators */}
      {events.length > 0 && (
        <div className="absolute bottom-1 flex gap-0.5">
          {events.slice(0, 3).map((event, index) => (
            <div 
              key={index}
              className={`w-1 h-1 rounded-full ${
                event.color === 'purple' ? 'bg-purple-400' :
                event.color === 'blue' ? 'bg-blue-400' :
                event.color === 'green' ? 'bg-green-400' :
                event.color === 'orange' ? 'bg-orange-400' :
                'bg-gray-400'
              } ${isSelected ? 'bg-white' : ''}`}
            />
          ))}
          {events.length > 3 && (
            <div className={`w-1 h-1 rounded-full ${isSelected ? 'bg-white' : 'bg-gray-300'}`} />
          )}
        </div>
      )}
    </div>
  );
};

// Event Item Component
const EventItem = ({ event }) => {
  const getEventIcon = (type) => {
    switch (type) {
      case 'meeting':
        return '👥';
      case 'task':
        return '📋';
      case 'review':
        return '🔍';
      case 'demo':
        return '🎯';
      default:
        return '📅';
    }
  };

  const getEventColor = (color) => {
    switch (color) {
      case 'purple':
        return 'bg-purple-100 border-purple-200 text-purple-800';
      case 'blue':
        return 'bg-blue-100 border-blue-200 text-blue-800';
      case 'green':
        return 'bg-green-100 border-green-200 text-green-800';
      case 'orange':
        return 'bg-orange-100 border-orange-200 text-orange-800';
      default:
        return 'bg-gray-100 border-gray-200 text-gray-800';
    }
  };

  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg border ${getEventColor(event.color)} hover:shadow-sm transition-all cursor-pointer`}>
      <div className="text-lg">{getEventIcon(event.type)}</div>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm truncate">{event.title}</div>
        <div className="text-xs opacity-75">{event.time}</div>
      </div>
      <div className={`w-3 h-3 rounded-full ${
        event.color === 'purple' ? 'bg-purple-400' :
        event.color === 'blue' ? 'bg-blue-400' :
        event.color === 'green' ? 'bg-green-400' :
        event.color === 'orange' ? 'bg-orange-400' :
        'bg-gray-400'
      }`}></div>
    </div>
  );
};

export default CalendarWidget;