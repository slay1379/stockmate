import React from 'react';
import Card, { CardHeader, CardContent } from '../common/Card';
import Button from '../common/Button';
import { useAppContext } from '../../context/AppContext';

const AttendanceSection: React.FC = () => {
  const { userProgress, checkAttendance } = useAppContext();
  const [checked, setChecked] = React.useState(
    userProgress.lastAttendance === new Date().toISOString().split('T')[0]
  );
  
  const handleAttendanceCheck = () => {
    checkAttendance();
    setChecked(true);
  };
  
  return (
    <section className="mb-8">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">출석 체크</h2>
            <div className="flex items-center px-2 py-1 bg-blue-100 rounded-full">
              <span className="text-sm font-medium text-blue-700">{userProgress.streak}일 연속</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4">
              <div className="text-2xl mb-2">
                {checked ? '✅' : '📝'}
              </div>
              <p className="text-gray-700">
                {checked 
                  ? '오늘 출석체크를 완료했습니다.' 
                  : '출석체크를 통해 매일 투자 습관을 기르세요!'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {checked 
                  ? `현재 ${userProgress.streak}일 연속 출석 중입니다.` 
                  : '출석체크 시 10포인트가 적립됩니다.'}
              </p>
            </div>
            
            {!checked && (
              <Button 
                variant="primary" 
                onClick={handleAttendanceCheck}
              >
                출석 체크하기
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default AttendanceSection;