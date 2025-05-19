import React, { useState } from 'react';
import { Quiz } from '../../types';
import Card, { CardHeader, CardContent, CardFooter } from './Card';
import Button from './Button';

interface QuizCardProps {
  quiz: Quiz;
  onComplete?: (isCorrect: boolean) => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz, onComplete }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const isCorrect = selectedOption === quiz.correctAnswer;

  const handleSubmit = () => {
    if (selectedOption !== null) {
      setIsSubmitted(true);
      if (onComplete) {
        onComplete(isCorrect);
      }
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-800">{quiz.question}</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {quiz.options.map((option, index) => (
            <div
              key={index}
              className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                selectedOption === index
                  ? isSubmitted
                    ? isCorrect
                      ? 'bg-green-100 border-green-400'
                      : 'bg-red-100 border-red-400'
                    : 'bg-blue-100 border-blue-400'
                  : isSubmitted && index === quiz.correctAnswer
                  ? 'bg-green-100 border-green-400'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
              onClick={() => !isSubmitted && setSelectedOption(index)}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 mr-2">
                  {selectedOption === index && (
                    <div className="h-full w-full rounded-full bg-blue-500" />
                  )}
                </div>
                <p className="text-sm text-gray-700">{option}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      {isSubmitted ? (
        <CardFooter className={isCorrect ? 'bg-green-50' : 'bg-red-50'}>
          <p className={`text-sm font-medium ${isCorrect ? 'text-green-800' : 'text-red-800'} mb-2`}>
            {isCorrect ? '정답입니다! 👏' : '틀렸습니다. 😔'}
          </p>
          <p className="text-sm text-gray-700">{quiz.explanation}</p>
        </CardFooter>
      ) : (
        <CardFooter>
          <Button
            variant="primary"
            fullWidth
            disabled={selectedOption === null}
            onClick={handleSubmit}
          >
            제출하기
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default QuizCard;