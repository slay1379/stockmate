import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  TrendingUp, 
  BookmarkCheck, 
  User,
  Users // ← 추가
} from 'lucide-react';

const TabMenu: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const tabs = [
    { path: '/', icon: Home, label: '홈' },
    { path: '/course', icon: BookOpen, label: '입문코스' },
    { path: '/investment', icon: TrendingUp, label: '모의투자' },
    { path: '/journal', icon: BookmarkCheck, label: '매수일기' },
    // ↓↓↓ 커뮤니티 탭 추가 ↓↓↓
    { path: '/community', icon: Users, label: '커뮤니티' },
    { path: '/mypage', icon: User, label: '마이페이지' },
  ];
  
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-sm">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => {
          const isActive = currentPath === tab.path;
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
                isActive ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className={`h-5 w-5 ${isActive ? 'transform scale-110' : ''}`} />
              <span className="text-xs mt-1 font-medium">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TabMenu;