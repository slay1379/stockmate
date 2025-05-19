import React from 'react';
import { EmotionType } from '../../types';

interface EmotionPickerProps {
  selectedEmotion: EmotionType | null;
  onSelect: (emotion: EmotionType) => void;
}

const emotions: { type: EmotionType; emoji: string; label: string }[] = [
  { type: 'excited', emoji: '😆', label: '신나는' },
  { type: 'confident', emoji: '😊', label: '자신감' },
  { type: 'neutral', emoji: '😐', label: '평온함' },
  { type: 'anxious', emoji: '😟', label: '불안한' },
  { type: 'fearful', emoji: '😨', label: '두려운' },
];

const EmotionPicker: React.FC<EmotionPickerProps> = ({ selectedEmotion, onSelect }) => {
  return (
    <div className="flex flex-wrap justify-between gap-2">
      {emotions.map(({ type, emoji, label }) => (
        <button
          key={type}
          onClick={() => onSelect(type)}
          className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 ${
            selectedEmotion === type
              ? 'bg-blue-100 border-2 border-blue-400 transform scale-105'
              : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
          }`}
        >
          <span className="text-2xl mb-1">{emoji}</span>
          <span className="text-xs font-medium text-gray-700">{label}</span>
        </button>
      ))}
    </div>
  );
};

export default EmotionPicker;