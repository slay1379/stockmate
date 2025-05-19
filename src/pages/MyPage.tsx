import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import ProgressSummary from '../components/mypage/ProgressSummary';
import EmotionReport from '../components/mypage/EmotionReport';
import Card, { CardHeader, CardContent } from '../components/common/Card';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const { journalEntries } = useAppContext();
  
  // Get the recent journal entries
  const recentEntries = [...journalEntries]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);
  
  return (
    <PageLayout>
      <div className="mb-6 text-center">
        <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
          <span className="text-2xl">👨‍💼</span>
        </div>
        <h2 className="text-xl font-bold text-gray-800">홍길동님</h2>
        <p className="text-sm text-gray-600">투자 입문 2주차</p>
      </div>
      
      <ProgressSummary />
      <EmotionReport />
      
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">최근 매수 일기</h3>
            <button
              className="text-sm text-blue-600 hover:text-blue-800"
              onClick={() => navigate('/journal')}
            >
              전체보기
            </button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {recentEntries.length > 0 ? (
            recentEntries.map((entry) => (
              <div 
                key={entry.id}
                className="p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => navigate(`/journal/${entry.id}`)}
              >
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{entry.name}</h4>
                    <p className="text-xs text-gray-500">{entry.date}</p>
                  </div>
                  {entry.result && (
                    <div className={`text-sm font-medium ${
                      entry.result.profitLoss >= 0 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {entry.result.profitLoss >= 0 ? '+' : ''}
                      {entry.result.profitLossPercent.toFixed(2)}%
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center">
              <p className="text-gray-500">작성된 매수 일기가 없습니다.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default MyPage;