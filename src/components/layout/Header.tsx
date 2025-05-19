import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  showBackButton = false 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const getTitle = () => {
    if (title) return title;
    
    // Default titles based on route
    switch (location.pathname) {
      case '/':
        return '스톡메이트';
      case '/course':
        return '30일 주식 입문 코스';
      case '/investment':
        return '가상 투자 연습';
      case '/journal':
        return '매수 일기';
      case '/mypage':
        return '마이페이지';
      default:
        return '스톡메이트';
    }
  };
  
  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-10 border-b border-gray-200">
      <div className="max-w-screen-md mx-auto px-4 h-14 flex items-center justify-center relative">
        {showBackButton && (
          <button 
            className="absolute left-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>
        )}
        <h1 className="text-lg font-semibold text-gray-900">{getTitle()}</h1>
      </div>
    </header>
  );
};

export default Header;