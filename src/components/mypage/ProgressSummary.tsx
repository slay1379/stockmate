import React from 'react';
import Card, { CardHeader, CardContent } from '../common/Card';
import ProgressBar from '../common/ProgressBar';
import { useAppContext } from '../../context/AppContext';

const ProgressSummary: React.FC = () => {
  const { userProgress, dailyConcepts } = useAppContext();
  
  const totalDays = dailyConcepts.length;
  const completedDays = userProgress.completedDays.length;
  const progressPercentage = Math.round((completedDays / totalDays) * 100);
  
  // Calculate average score
  const totalScores = userProgress.quizResults.reduce((sum, result) => sum + result.score, 0);
  const averageScore = userProgress.quizResults.length > 0
    ? (totalScores / userProgress.quizResults.length).toFixed(1)
    : '0.0';
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <h3 className="font-semibold text-gray-800">학습 통계</h3>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-3 rounded-lg bg-blue-50">
            <p className="text-sm text-gray-600 mb-1">연속 학습</p>
            <p className="text-xl font-bold text-blue-700">{userProgress.streak}일</p>
          </div>
          <div className="p-3 rounded-lg bg-green-50">
            <p className="text-sm text-gray-600 mb-1">평균 점수</p>
            <p className="text-xl font-bold text-green-700">{averageScore} / 3</p>
          </div>
          <div className="p-3 rounded-lg bg-purple-50">
            <p className="text-sm text-gray-600 mb-1">완료한 일수</p>
            <p className="text-xl font-bold text-purple-700">{completedDays}일</p>
          </div>
          <div className="p-3 rounded-lg bg-amber-50">
            <p className="text-sm text-gray-600 mb-1">남은 일수</p>
            <p className="text-xl font-bold text-amber-700">{totalDays - completedDays}일</p>
          </div>
        </div>
        
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">입문 코스 진행률</p>
          <ProgressBar progress={progressPercentage} height={8} />
          <p className="text-xs text-gray-500 mt-2 text-center">{progressPercentage}% 완료</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressSummary;