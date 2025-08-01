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