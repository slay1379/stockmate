import React from 'react';
import Card, { CardHeader, CardContent } from '../common/Card';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';

const JournalPromptSection: React.FC = () => {
  const navigate = useNavigate();
  
  const goToJournal = () => {
    navigate('/journal/new');
  };
  
  return (
    <section className="mb-8">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold text-gray-800">매매일지 작성</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-700">
              오늘의 매매를 기록하고 나중에 돌아볼 수 있어요.
              매매 기록을 통해 투자 패턴과 감정 상태를 분석할 수 있습니다.
            </p>
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                "왜 매수했는지 기록하면, 나중에 판단이 옳았는지 확인할 수 있어요."
              </p>
            </div>
            <Button 
              variant="outline" 
              fullWidth 
              onClick={goToJournal}
            >
              매매일지 작성하기
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default JournalPromptSection;