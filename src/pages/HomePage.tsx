import React, { useEffect } from 'react';
import PageLayout from '../components/layout/PageLayout';
import DailyQuizSection from '../components/home/DailyQuizSection';
import AttendanceSection from '../components/home/AttendanceSection';
import JournalPromptSection from '../components/home/JournalPromptSection';
import CommunityPostsSection from '../components/home/CommunityPostsSection';
import { useAppContext } from '../context/AppContext';

const HomePage: React.FC = () => {
  const { checkAttendance } = useAppContext();
  
  useEffect(() => {
    // Check if user visited today
    const today = new Date().toISOString().split('T')[0];
    const lastVisit = localStorage.getItem('lastVisit');
    
    if (lastVisit !== today) {
      localStorage.setItem('lastVisit', today);
    }
  }, []);
  
  return (
    <PageLayout>
      <DailyQuizSection />
      <AttendanceSection />
      <JournalPromptSection />
      <CommunityPostsSection />
    </PageLayout>
  );
};

export default HomePage;