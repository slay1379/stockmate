import React from 'react';
import Card, { CardHeader, CardContent } from '../common/Card';
import { useAppContext } from '../../context/AppContext';

const emotionEmojis = {
  excited: '😆',
  confident: '😊',
  neutral: '😐',
  anxious: '😟',
  fearful: '😨'
};

const emotionLabels = {
  excited: '신나는',
  confident: '자신감',
  neutral: '평온함',
  anxious: '불안한',
  fearful: '두려운'
};

const EmotionReport: React.FC = () => {
  const { emotionAnalysis } = useAppContext();
  
  // Sort emotions by count (descending)
  const sortedEmotions = [...emotionAnalysis.emotions]
    .sort((a, b) => b.count - a.count);
  
  const totalCount = sortedEmotions.reduce((sum, emotion) => sum + emotion.count, 0);
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <h3 className="font-semibold text-gray-800">감정 분석 리포트</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-around mb-4">
            {sortedEmotions.slice(0, 3).map((emotion) => (
              <div key={emotion.emotion} className="flex flex-col items-center">
                <div className="w-10 h-10 flex items-center justify-center text-xl bg-gray-100 rounded-full mb-1">
                  {emotionEmojis[emotion.emotion]}
                </div>
                <span className="text-xs font-medium text-gray-600">
                  {emotionLabels[emotion.emotion]}
                </span>
                <span className="text-xs text-gray-500">
                  {Math.round((emotion.count / totalCount) * 100)}%
                </span>
              </div>
            ))}
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="text-sm font-medium text-blue-800 mb-2">투자 인사이트</h4>
            <p className="text-sm text-gray-700 mb-3">
              당신의 가장 수익률이 높은 감정 상태는 
              <span className="font-medium text-blue-700"> {emotionLabels[emotionAnalysis.mostProfitable]} </span>
              일 때입니다.
            </p>
            <p className="text-sm text-gray-700">
              반면, 
              <span className="font-medium text-red-600"> {emotionLabels[emotionAnalysis.leastProfitable]} </span>
              상태일 때는 수익률이 낮은 경향이 있습니다.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">감정별 평균 수익률</h4>
            <div className="space-y-2">
              {sortedEmotions.map((emotion) => {
                const averageProfitLoss = emotion.count > 0 
                  ? emotion.profitLoss / emotion.count 
                  : 0;
                const isPositive = averageProfitLoss > 0;
                
                return (
                  <div key={emotion.emotion} className="flex items-center">
                    <div className="flex-shrink-0 w-6 text-center mr-2">
                      {emotionEmojis[emotion.emotion]}
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between mb-1">
                        <span className="text-xs font-medium text-gray-700">
                          {emotionLabels[emotion.emotion]}
                        </span>
                        <span className={`text-xs font-medium ${
                          isPositive ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {isPositive ? '+' : ''}{Math.round(averageProfitLoss).toLocaleString()}원/건
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            isPositive ? 'bg-green-500' : 'bg-red-500'
                          }`}
                          style={{ 
                            width: `${Math.min(100, Math.abs(averageProfitLoss / 1000))}%` 
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmotionReport;