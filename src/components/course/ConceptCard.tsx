import React, { useState } from 'react';
import Card, { CardHeader, CardContent, CardFooter } from '../common/Card';
import Button from '../common/Button';
import QuizCard from '../common/QuizCard';
import { DailyConcept } from '../../types';
import { useAppContext } from '../../context/AppContext';

interface ConceptCardProps {
  concept: DailyConcept;
  isCompleted: boolean;
}

const ConceptCard: React.FC<ConceptCardProps> = ({ concept, isCompleted }) => {
  const { markDayComplete } = useAppContext();
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizResults, setQuizResults] = useState<boolean[]>([]);
  const [isCompleting, setIsCompleting] = useState(false);
  
  const handleStartQuiz = () => {
    setShowQuiz(true);
    setQuizResults([]);
  };
  
  const handleQuizComplete = (isCorrect: boolean) => {
    setQuizResults(prev => [...prev, isCorrect]);
  };
  
  const handleFinishQuiz = () => {
    const score = quizResults.filter(result => result).length;
    markDayComplete(concept.day, score);
    setIsCompleting(true);
    
    // Simulate delay for completion animation
    setTimeout(() => {
      setIsCompleting(false);
    }, 1500);
  };
  
  const allQuizzesAnswered = quizResults.length === concept.quizzes.length;
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">
            Day {concept.day}: {concept.title}
          </h3>
          {isCompleted && (
            <div className="rounded-full bg-green-100 px-2 py-0.5">
              <span className="text-xs font-medium text-green-800">완료</span>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        {showQuiz ? (
          <div className="space-y-6">
            {concept.quizzes.map((quiz, index) => (
              <div key={quiz.id}>
                {(index === 0 || quizResults.length >= index) && (
                  <QuizCard
                    quiz={quiz}
                    onComplete={handleQuizComplete}
                  />
                )}
              </div>
            ))}
            
            {allQuizzesAnswered && (
              <div className="mt-6">
                <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">퀴즈 결과</h4>
                  <p className="text-gray-700">
                    {quizResults.filter(result => result).length}개 맞았습니다! 
                    ({Math.round((quizResults.filter(result => result).length / quizResults.length) * 100)}%)
                  </p>
                </div>
                
                <Button
                  variant="primary"
                  fullWidth
                  onClick={handleFinishQuiz}
                  disabled={isCompleting}
                >
                  {isCompleting ? '완료 처리 중...' : '학습 완료하기'}
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="prose prose-sm max-w-none">
              {concept.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700">
                  {paragraph}
                </p>
              ))}
            </div>
            
            <div className="mt-4">
              <Button
                variant="primary"
                fullWidth
                onClick={handleStartQuiz}
                disabled={isCompleting}
              >
                {isCompleted ? '퀴즈 다시 풀기' : '개념 이해했어요, 퀴즈 풀기'}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ConceptCard;