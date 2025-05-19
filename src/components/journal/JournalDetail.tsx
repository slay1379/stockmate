import React from 'react';
import Card, { CardHeader, CardContent, CardFooter } from '../common/Card';
import Button from '../common/Button';
import { JournalEntry } from '../../types';
import { useNavigate } from 'react-router-dom';

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

interface JournalDetailProps {
  entry: JournalEntry;
}

const JournalDetail: React.FC<JournalDetailProps> = ({ entry }) => {
  const navigate = useNavigate();
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-800">매수 일기</h3>
          <div className="text-sm text-gray-500">{entry.date}</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{entry.name}</h2>
              <p className="text-sm text-gray-500">{entry.symbol}</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl mb-1" role="img" aria-label={emotionLabels[entry.emotion]}>
                {emotionEmojis[entry.emotion]}
              </span>
              <span className="text-xs font-medium text-gray-700">
                {emotionLabels[entry.emotion]}
              </span>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-1">매수 이유</h4>
            <p className="text-gray-800 bg-gray-50 p-3 rounded-md">{entry.reason}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-1">판단 근거</h4>
            <p className="text-gray-800 bg-gray-50 p-3 rounded-md whitespace-pre-line">
              {entry.analysis}
            </p>
          </div>
          
          {entry.result && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">매수 결과</h4>
              <div className={`p-3 rounded-md ${
                entry.result.profitLoss >= 0 
                  ? 'bg-green-50'
                  : 'bg-red-50'
              }`}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">수익률</span>
                  <span className={`font-medium ${
                    entry.result.profitLoss >= 0 
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}>
                    {entry.result.profitLoss >= 0 ? '+' : ''}
                    {entry.result.profitLossPercent.toFixed(2)}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">수익금</span>
                  <span className={`font-medium ${
                    entry.result.profitLoss >= 0 
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}>
                    {entry.result.profitLoss >= 0 ? '+' : ''}
                    {entry.result.profitLoss.toLocaleString()}원
                  </span>
                </div>
                
                {entry.result.reflection && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <h5 className="text-xs font-medium mb-1">나의 복기</h5>
                    <p className="text-sm text-gray-700">{entry.result.reflection}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          fullWidth
          onClick={() => navigate('/journal')}
        >
          목록으로 돌아가기
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JournalDetail;