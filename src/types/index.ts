export interface Quiz {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface DailyConcept {
  id: string;
  day: number;
  title: string;
  content: string;
  quizzes: Quiz[];
}

export interface Stock {
  symbol: string;
  name: string;
  currentPrice: number;
  previousClose: number;
  change: number;
  changePercent: number;
}

export interface TradeRecord {
  id: string;
  symbol: string;
  name: string;
  type: 'buy' | 'sell';
  price: number;
  quantity: number;
  total: number;
  date: string;
}

export interface PortfolioItem {
  symbol: string;
  name: string;
  averagePrice: number;
  quantity: number;
  currentPrice: number;
  value: number;
  profit: number;
  profitPercent: number;
}

export interface Portfolio {
  cash: number;
  items: PortfolioItem[];
  totalValue: number;
  totalProfit: number;
  totalProfitPercent: number;
}

export interface JournalEntry {
  id: string;
  symbol: string;
  name: string;
  date: string;
  reason: string;
  analysis: string;
  emotion: 'excited' | 'confident' | 'neutral' | 'anxious' | 'fearful';
  result?: {
    profitLoss: number;
    profitLossPercent: number;
    reflection: string;
  };
}

export interface UserProgress {
  currentDay: number;
  completedDays: number[];
  quizResults: {
    day: number;
    score: number;
    date: string;
  }[];
  streak: number;
  lastAttendance: string;
}

export type EmotionType = 'excited' | 'confident' | 'neutral' | 'anxious' | 'fearful';

export interface EmotionData {
  emotion: EmotionType;
  count: number;
  profitLoss: number;
}

export interface EmotionAnalysis {
  emotions: EmotionData[];
  mostProfitable: EmotionType;
  leastProfitable: EmotionType;
}