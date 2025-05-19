import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import CourseProgress from '../components/course/CourseProgress';
import ConceptCard from '../components/course/ConceptCard';
import { useAppContext } from '../context/AppContext';

const CoursePage: React.FC = () => {
  const { dailyConcepts, userProgress } = useAppContext();
  
  return (
    <PageLayout>
      <CourseProgress />
      
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800">30일 주식 입문 코스</h2>
        <p className="text-sm text-gray-600">
          매일 하나의 개념과 퀴즈로 주식 투자의 기초를 쌓아보세요.
        </p>
      </div>
      
      {dailyConcepts
        .filter(concept => concept.day <= userProgress.currentDay)
        .sort((a, b) => b.day - a.day) // Most recent first
        .map(concept => (
          <ConceptCard
            key={concept.id}
            concept={concept}
            isCompleted={userProgress.completedDays.includes(concept.day)}
          />
        ))}
    </PageLayout>
  );
};

export default CoursePage;