import React from 'react';
import Card, { CardHeader, CardContent } from '../common/Card';
import ProgressBar from '../common/ProgressBar';
import { useAppContext } from '../../context/AppContext';

const CourseProgress: React.FC = () => {
  const { userProgress, dailyConcepts } = useAppContext();
  
  const totalDays = dailyConcepts.length;
  const completedDays = userProgress.completedDays.length;
  const progressPercentage = Math.round((completedDays / totalDays) * 100);
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <h3 className="font-semibold text-gray-800">학습 진행 상황</h3>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <ProgressBar progress={progressPercentage} height={8} showLabel />
        </div>
        
        <div className="flex justify-between text-sm text-gray-600">
          <div>
            <span className="font-medium">{completedDays}</span>일 완료
          </div>
          <div>
            <span className="font-medium">{totalDays - completedDays}</span>일 남음
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            {completedDays > 0 
              ? `멋져요! 이미 ${completedDays}일 동안 꾸준히 학습하셨네요.` 
              : '오늘부터 하루 5분, 주식이 쉬워집니다.'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseProgress;