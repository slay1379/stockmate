import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card, { CardHeader, CardContent, CardFooter } from '../common/Card';
import Button from '../common/Button';
import EmotionPicker from '../common/EmotionPicker';
import { EmotionType, JournalEntry } from '../../types';
import { mockStocks } from '../../data/mockData';
import { useAppContext } from '../../context/AppContext';

interface JournalFormProps {
  existingEntry?: JournalEntry;
}

const JournalForm: React.FC<JournalFormProps> = ({ existingEntry }) => {
  const navigate = useNavigate();
  const { addJournalEntry } = useAppContext();
  
  const [formData, setFormData] = useState({
    symbol: existingEntry?.symbol || '',
    reason: existingEntry?.reason || '',
    analysis: existingEntry?.analysis || '',
    emotion: existingEntry?.emotion || null as EmotionType | null,
  });
  
  const [errors, setErrors] = useState({
    symbol: '',
    reason: '',
    analysis: '',
    emotion: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    let hasError = false;
    const newErrors = { ...errors };
    
    if (!formData.symbol) {
      newErrors.symbol = '종목을 선택해주세요';
      hasError = true;
    }
    
    if (!formData.reason) {
      newErrors.reason = '매수 이유를 입력해주세요';
      hasError = true;
    }
    
    if (!formData.analysis) {
      newErrors.analysis = '판단 근거를 입력해주세요';
      hasError = true;
    }
    
    if (!formData.emotion) {
      newErrors.emotion = '감정 상태를 선택해주세요';
      hasError = true;
    }
    
    if (hasError) {
      setErrors(newErrors);
      return;
    }
    
    const selectedStock = mockStocks.find(stock => stock.symbol === formData.symbol);
    
    if (!selectedStock) {
      setErrors(prev => ({ ...prev, symbol: '유효한 종목을 선택해주세요' }));
      return;
    }
    
    const newEntry: Omit<JournalEntry, 'id'> = {
      symbol: formData.symbol,
      name: selectedStock.name,
      date: new Date().toISOString().split('T')[0],
      reason: formData.reason,
      analysis: formData.analysis,
      emotion: formData.emotion as EmotionType,
    };
    
    addJournalEntry(newEntry);
    navigate('/journal');
  };
  
  const handleEmotionSelect = (emotion: EmotionType) => {
    setFormData(prev => ({ ...prev, emotion }));
    setErrors(prev => ({ ...prev, emotion: '' }));
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <Card className="mb-6">
        <CardHeader>
          <h3 className="font-semibold text-gray-800">매수 일기 작성</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label htmlFor="symbol" className="block text-sm font-medium text-gray-700 mb-1">
                종목 선택
              </label>
              <select
                id="symbol"
                name="symbol"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={formData.symbol}
                onChange={handleChange}
              >
                <option value="">종목을 선택하세요</option>
                {mockStocks.map(stock => (
                  <option key={stock.symbol} value={stock.symbol}>
                    {stock.name} ({stock.symbol})
                  </option>
                ))}
              </select>
              {errors.symbol && (
                <p className="mt-1 text-sm text-red-600">{errors.symbol}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                매수 이유
              </label>
              <input
                type="text"
                id="reason"
                name="reason"
                placeholder="예: 신규 사업 호재, 실적 개선 기대 등"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={formData.reason}
                onChange={handleChange}
              />
              {errors.reason && (
                <p className="mt-1 text-sm text-red-600">{errors.reason}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="analysis" className="block text-sm font-medium text-gray-700 mb-1">
                판단 근거
              </label>
              <textarea
                id="analysis"
                name="analysis"
                rows={4}
                placeholder="매수 결정을 내린 이유와 분석 내용을 자세히 적어보세요."
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={formData.analysis}
                onChange={handleChange}
              />
              {errors.analysis && (
                <p className="mt-1 text-sm text-red-600">{errors.analysis}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                매수 당시 감정 상태
              </label>
              <EmotionPicker
                selectedEmotion={formData.emotion}
                onSelect={handleEmotionSelect}
              />
              {errors.emotion && (
                <p className="mt-1 text-sm text-red-600">{errors.emotion}</p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col space-y-2">
            <Button type="submit" variant="primary" fullWidth>
              저장하기
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              fullWidth
              onClick={() => navigate('/journal')}
            >
              취소
            </Button>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
};

export default JournalForm;