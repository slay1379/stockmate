import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  TrendingUp, 
  BookmarkCheck, 
  User,
  Users
} from 'lucide-react';

const TabMenu: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const tabs = [
    { path: '/', icon: Home, label: '홈' },
    { path: '/course', icon: BookOpen, label: '입문코스' },
    { path: '/investment', icon: TrendingUp, label: '모의투자' },
    { path: '/journal', icon: BookmarkCheck, label: '매수일기' },
    { path: '/community', icon: Users, label: '커뮤니티' },
    { path: '/mypage', icon: User, label: '마이페이지' },
  ];
  
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-blue-200 shadow-md z-50">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => {
          const isActive = currentPath === tab.path;
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors font-semibold ${
                isActive ? 'text-blue-600' : 'text-gray-400 hover:text-blue-500'
              }`}
            >
              <tab.icon className={`h-6 w-6 mb-1 ${isActive ? 'scale-110' : ''}`} />
              <span className="text-xs mt-1">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TabMenu;