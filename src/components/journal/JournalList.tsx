import React from 'react';
import Card from '../common/Card';
import { useNavigate } from 'react-router-dom';
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

const JournalList: React.FC = () => {
  const { journalEntries } = useAppContext();
  const navigate = useNavigate();
  
  const sortedEntries = [...journalEntries].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  return (
    <div className="space-y-4">
      {sortedEntries.length === 0 ? (
        <Card>
          <div className="p-6 text-center">
            <p className="text-gray-500">아직 작성된 매수 일기가 없습니다.</p>
          </div>
        </Card>
      ) : (
        sortedEntries.map(entry => (
          <Card 
            key={entry.id} 
            className="cursor-pointer"
            onClick={() => navigate(`/journal/${entry.id}`)}
          >
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium text-gray-900">{entry.name}</h3>
                  <p className="text-sm text-gray-500">{entry.date}</p>
                </div>
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100">
                  <span className="text-lg" role="img" aria-label={emotionLabels[entry.emotion]}>
                    {emotionEmojis[entry.emotion]}
                  </span>
                </div>
              </div>
              
              <p className="text-sm font-medium text-gray-800 mb-1">매수 이유: {entry.reason}</p>
              
              <p className="text-sm text-gray-600 line-clamp-2">
                {entry.analysis}
              </p>
              
              {entry.result && (
                <div className={`mt-3 p-2 rounded text-sm font-medium ${
                  entry.result.profitLoss >= 0 
                    ? 'bg-green-50 text-green-800' 
                    : 'bg-red-50 text-red-800'
                }`}>
                  수익률: {entry.result.profitLoss >= 0 ? '+' : ''}
                  {entry.result.profitLossPercent.toFixed(2)}%
                </div>
              )}
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

export default JournalList;