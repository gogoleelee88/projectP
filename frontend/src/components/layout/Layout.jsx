import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

/**
 * Layout 컴포넌트
 * 전체 애플리케이션의 레이아웃 구조를 담당
 * Header + Sidebar + Main Content 영역으로 구성
 */
const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Fixed at top */}
      <Header />
      
      {/* Sidebar - Fixed at left */}
      <Sidebar />
      
      {/* Main Content Area */}
      <main className="ml-64 mt-16 min-h-[calc(100vh-64px)]">
        {/* Page Content */}
        <div className="w-full h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;