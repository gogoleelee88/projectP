import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { userService } from '../../services/userService';

const StatusEditModal = ({ currentIcon, currentMessage, onSave, onClose }) => {
  const [selectedIcon, setSelectedIcon] = useState(currentIcon || '😊');
  const [statusMessage, setStatusMessage] = useState(currentMessage || '');
  const [isLoading, setIsLoading] = useState(false);

  // Get status icons from userService
  const statusIcons = userService.getProfileIcons();

  useEffect(() => {
    setSelectedIcon(currentIcon || '😊');
    setStatusMessage(currentMessage || '');
  }, [currentIcon, currentMessage]);

  const handleSave = async () => {
    try {
      setIsLoading(true);
      await onSave(selectedIcon, statusMessage);
    } catch (error) {
      console.error('상태 저장 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedIcon('😊');
    setStatusMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">상태 메시지 편집</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            disabled={isLoading}
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Current Status Preview */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">미리보기</label>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border">
              <span className="text-2xl">{selectedIcon}</span>
              <div className="flex-1">
                <div className="font-medium text-gray-800">
                  {statusMessage || "상태 메시지를 입력하세요"}
                </div>
                <div className="text-sm text-gray-500">현재 상태</div>
              </div>
            </div>
          </div>

          {/* Icon Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">상태 아이콘 선택</label>
            <div className="grid grid-cols-4 gap-3">
              {statusIcons.map((status) => (
                <button
                  key={status.icon}
                  className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                    selectedIcon === status.icon 
                      ? 'border-purple-500 bg-purple-50 shadow-md' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => {
                    setSelectedIcon(status.icon);
                    if (!statusMessage) {
                      setStatusMessage(status.label);
                    }
                  }}
                  disabled={isLoading}
                >
                  <span className="text-2xl">{status.icon}</span>
                  <span className="text-xs font-medium text-gray-600 text-center leading-tight">
                    {status.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">상태 메시지</label>
            <div className="relative">
              <textarea
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all resize-none"
                placeholder="상태 메시지를 입력하세요... (선택사항)"
                value={statusMessage}
                onChange={(e) => setStatusMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                maxLength={255}
                rows={3}
                disabled={isLoading}
              />
              <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                {statusMessage.length}/255
              </div>
            </div>
          </div>

          {/* Quick Status Options */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">빠른 설정</label>
            <div className="grid grid-cols-1 gap-2">
              {[
                { icon: '💻', message: '업무 중입니다' },
                { icon: '☕', message: '잠시 자리를 비웠습니다' },
                { icon: '🏖️', message: '휴가 중입니다' },
                { icon: '👥', message: '회의 중입니다' },
                { icon: '🚀', message: '프로젝트에 집중하고 있습니다' }
              ].map((preset, index) => (
                <button
                  key={index}
                  className="flex items-center gap-3 p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all"
                  onClick={() => {
                    setSelectedIcon(preset.icon);
                    setStatusMessage(preset.message);
                  }}
                  disabled={isLoading}
                >
                  <span className="text-lg">{preset.icon}</span>
                  <span className="text-sm text-gray-700">{preset.message}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-gray-200">
          <button
            onClick={handleReset}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            초기화
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            취소
          </button>
          <button
            onClick={handleSave}
            className="flex-1 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                저장 중...
              </>
            ) : (
              '저장'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusEditModal;