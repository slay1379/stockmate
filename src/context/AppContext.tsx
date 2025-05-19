import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  Portfolio, 
  JournalEntry, 
  UserProgress, 
  EmotionAnalysis,
  DailyConcept
} from '../types';
import { 
  mockPortfolio, 
  mockJournalEntries, 
  mockUserProgress, 
  mockEmotionAnalysis,
  dailyConcepts,
  dailyQuizzes
} from '../data/mockData';

interface AppContextType {
  portfolio: Portfolio;
  journalEntries: JournalEntry[];
  userProgress: UserProgress;
  emotionAnalysis: EmotionAnalysis;
  dailyConcepts: DailyConcept[];
  dailyQuizzes: any[];
  addJournalEntry: (entry: Omit<JournalEntry, 'id'>) => void;
  updatePortfolio: (newPortfolio: Portfolio) => void;
  markDayComplete: (day: number, score: number) => void;
  checkAttendance: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [portfolio, setPortfolio] = useState<Portfolio>(mockPortfolio);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(mockJournalEntries);
  const [userProgress, setUserProgress] = useState<UserProgress>(mockUserProgress);
  const [emotionAnalysis, setEmotionAnalysis] = useState<EmotionAnalysis>(mockEmotionAnalysis);

  const addJournalEntry = (entry: Omit<JournalEntry, 'id'>) => {
    const newEntry = {
      ...entry,
      id: `j${journalEntries.length + 1}`
    };
    setJournalEntries([newEntry, ...journalEntries]);
  };

  const updatePortfolio = (newPortfolio: Portfolio) => {
    setPortfolio(newPortfolio);
  };

  const markDayComplete = (day: number, score: number) => {
    if (!userProgress.completedDays.includes(day)) {
      setUserProgress(prev => ({
        ...prev,
        completedDays: [...prev.completedDays, day],
        currentDay: Math.max(prev.currentDay, day + 1),
        quizResults: [
          ...prev.quizResults,
          {
            day,
            score,
            date: new Date().toISOString().split('T')[0]
          }
        ]
      }));
    }
  };

  const checkAttendance = () => {
    const today = new Date().toISOString().split('T')[0];
    
    if (userProgress.lastAttendance !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      
      const newStreak = userProgress.lastAttendance === yesterdayStr 
        ? userProgress.streak + 1 
        : 1;
      
      setUserProgress(prev => ({
        ...prev,
        streak: newStreak,
        lastAttendance: today
      }));
    }
  };

  const value = {
    portfolio,
    journalEntries,
    userProgress,
    emotionAnalysis,
    dailyConcepts,
    dailyQuizzes,
    addJournalEntry,
    updatePortfolio,
    markDayComplete,
    checkAttendance
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};