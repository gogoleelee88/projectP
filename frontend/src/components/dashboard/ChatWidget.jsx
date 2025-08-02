import React, { useState, useEffect } from 'react';
import { MessageCircle, Send, Plus, Users, MoreHorizontal } from 'lucide-react';
import { useAppContext } from '../../App';

const ChatWidget = () => {
  const { currentUser } = useAppContext();
  const [activeChats, setActiveChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [showChatList, setShowChatList] = useState(true);

  useEffect(() => {
    generateMockChats();
  }, [currentUser]);

  const generateMockChats = () => {
    const mockChats = [
      {
        id: 1,
        name: 'Flow 개발팀',
        type: 'group',
        avatar: '👥',
        lastMessage: '새로운 기능 개발 회의가 예정되어 있습니다.',
        lastMessageTime: '방금 전',
        unreadCount: 2,
        isOnline: true,
        members: ['LEES00', 'FlowBot', '개발자A']
      },
      {
        id: 2,
        name: 'AI 협업툴 연구',
        type: 'group',
        avatar: '🤖',
        lastMessage: 'OpenAI API 통합 작업이 완료되었습니다.',
        lastMessageTime: '10분 전',
        unreadCount: 0,
        isOnline: true,
        members: ['LEES00', 'AI연구원']
      },
      {
        id: 3,
        name: 'FlowBot',
        type: 'bot',
        avatar: '🤖',
        lastMessage: '안녕하세요! 도움이 필요하시면 말씀해주세요.',
        lastMessageTime: '1시간 전',
        unreadCount: 0,
        isOnline: true,
        members: ['LEES00', 'FlowBot']
      }
    ];

    setActiveChats(mockChats);
  };

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    setShowChatList(false);
    
    // Mark as read
    setActiveChats(prev => 
      prev.map(c => 
        c.id === chat.id 
          ? { ...c, unreadCount: 0 }
          : c
      )
    );
  };

  const handleBackToList = () => {
    setShowChatList(true);
    setSelectedChat(null);
  };

  const totalUnreadCount = activeChats.reduce((sum, chat) => sum + chat.unreadCount, 0);

  if (showChatList) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <MessageCircle size={20} className="text-blue-500" />
            <h3 className="text-xl font-bold text-gray-800">채팅방</h3>
            {totalUnreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                {totalUnreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button 
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="새 채팅"
            >
              <Plus size={16} className="text-gray-500" />
            </button>
            <button 
              className="w-2 h-6 bg-gray-300 rounded-full cursor-pointer hover:bg-gray-400 transition-colors"
              title="위젯 설정"
            >
            </button>
          </div>
        </div>

        {/* Chat List */}
        <div className="space-y-3">
          {activeChats.length > 0 ? (
            activeChats.map(chat => (
              <ChatListItem
                key={chat.id}
                chat={chat}
                onClick={() => handleChatSelect(chat)}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="text-6xl opacity-20 mb-4">💬</div>
              <div className="text-gray-500 mb-4">활성 채팅방이 없습니다</div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                새 채팅 시작하기
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {activeChats.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">
                {activeChats.length}개의 활성 채팅방
              </span>
              <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                모든 채팅 보기 →
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <ChatDetailView 
      chat={selectedChat} 
      onBack={handleBackToList}
      currentUser={currentUser}
    />
  );
};

// Chat List Item Component
const ChatListItem = ({ chat, onClick }) => {
  return (
    <div 
      className="flex items-center gap-4 p-4 rounded-xl cursor-pointer hover:bg-gray-50 hover:shadow-md transition-all group"
      onClick={onClick}
    >
      {/* Avatar */}
      <div className="relative">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg ${
          chat.type === 'group' ? 'bg-blue-100' : 
          chat.type === 'bot' ? 'bg-purple-100' : 'bg-gray-100'
        }`}>
          {chat.avatar}
        </div>
        {chat.isOnline && (
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
        )}
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="font-semibold text-gray-800 truncate">{chat.name}</span>
          <span className="text-xs text-gray-500 flex-shrink-0">{chat.lastMessageTime}</span>
        </div>
        <div className="text-sm text-gray-600 truncate">{chat.lastMessage}</div>
        <div className="flex items-center gap-2 mt-1">
          <Users size={12} className="text-gray-400" />
          <span className="text-xs text-gray-400">{chat.members.length}명</span>
        </div>
      </div>
      
      {/* Unread Count */}
      {chat.unreadCount > 0 && (
        <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium min-w-[20px] text-center">
          {chat.unreadCount}
        </div>
      )}
    </div>
  );
};

// Chat Detail View Component
const ChatDetailView = ({ chat, onBack, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (chat) {
      generateMockMessages();
    }
  }, [chat]);

  const generateMockMessages = () => {
    const mockMessages = [
      {
        id: 1,
        sender: 'FlowBot',
        content: '안녕하세요! Flow 프로젝트 관리 시스템에 오신 것을 환영합니다.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60),
        isBot: true
      },
      {
        id: 2,
        sender: currentUser?.displayName || 'LEES00',
        content: '안녕하세요! 프로젝트 관리에 대해 궁금한 점이 있습니다.',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        isBot: false
      },
      {
        id: 3,
        sender: 'FlowBot',
        content: '물론입니다! 무엇을 도와드릴까요? 프로젝트 생성, 업무 관리, 팀 협업 등 다양한 기능에 대해 안내해드릴 수 있습니다.',
        timestamp: new Date(Date.now() - 1000 * 60 * 25),
        isBot: true
      }
    ];

    setMessages(mockMessages);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        sender: currentUser?.displayName || 'LEES00',
        content: newMessage,
        timestamp: new Date(),
        isBot: false
      };

      setMessages(prev => [...prev, message]);
      setNewMessage('');

      // Simulate bot response
      setTimeout(() => {
        const botResponse = {
          id: Date.now() + 1,
          sender: 'FlowBot',
          content: '메시지를 받았습니다! 곧 답변해드리겠습니다.',
          timestamp: new Date(),
          isBot: true
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col h-96">
      {/* Chat Header */}
      <div className="flex items-center gap-4 p-6 border-b">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          ←
        </button>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          chat?.type === 'group' ? 'bg-blue-100' : 
          chat?.type === 'bot' ? 'bg-purple-100' : 'bg-gray-100'
        }`}>
          {chat?.avatar}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800">{chat?.name}</h3>
          <span className="text-sm text-gray-500">{chat?.members.length}명 참여</span>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <MoreHorizontal size={16} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map(message => (
          <MessageBubble 
            key={message.id} 
            message={message} 
            isOwn={message.sender === (currentUser?.displayName || 'LEES00')}
          />
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="메시지를 입력하세요..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button 
            onClick={handleSendMessage}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Message Bubble Component
const MessageBubble = ({ message, isOwn }) => {
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-xs px-4 py-2 rounded-lg ${
        isOwn 
          ? 'bg-blue-600 text-white' 
          : message.isBot 
            ? 'bg-purple-100 text-purple-800'
            : 'bg-gray-100 text-gray-800'
      }`}>
        {!isOwn && (
          <div className="text-xs font-semibold mb-1">{message.sender}</div>
        )}
        <div className="text-sm">{message.content}</div>
        <div className={`text-xs mt-1 ${
          isOwn ? 'text-blue-100' : 'text-gray-500'
        }`}>
          {message.timestamp.toLocaleTimeString('ko-KR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;