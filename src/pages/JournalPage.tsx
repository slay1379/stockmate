import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import Button from '../components/common/Button';
import JournalList from '../components/journal/JournalList';
import { PlusCircle } from 'lucide-react';

const JournalPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <PageLayout>
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-800">매수 일기</h2>
          <p className="text-sm text-gray-600">
            매수 결정과 감정 상태를 기록하고 분석해보세요.
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => navigate('/journal/new')}
          className="flex items-center"
        >
          <PlusCircle className="h-4 w-4 mr-1" />
          <span>작성</span>
        </Button>
      </div>
      
      <JournalList />
    </PageLayout>
  );
};

export default JournalPage;