import React from 'react';
import Card, { CardHeader, CardContent } from '../common/Card';
import QuizCard from '../common/QuizCard';
import { useAppContext } from '../../context/AppContext';

const DailyQuizSection: React.FC = () => {
  const { dailyQuizzes } = useAppContext();
  
  return (
    <section className="mb-8">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold text-gray-800">오늘의 퀴즈</h2>
          <p className="text-sm text-gray-600 mt-1">
            오늘의 퀴즈를 풀고 투자 지식을 확인해보세요!
          </p>
        </CardHeader>
        <CardContent>
          {dailyQuizzes.slice(0, 1).map((quiz) => (
            <QuizCard 
              key={quiz.id} 
              quiz={quiz} 
            />
          ))}
        </CardContent>
      </Card>
    </section>
  );
};

export default DailyQuizSection;