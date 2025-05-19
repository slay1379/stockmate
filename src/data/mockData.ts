import { DailyConcept, Stock, Portfolio, JournalEntry, UserProgress, EmotionAnalysis } from '../types';

export const dailyQuizzes = [
  {
    id: 'q1',
    question: '주식시장에서 PER이란 무엇을 의미하나요?',
    options: [
      '주가를 순이익으로 나눈 값',
      '주가를 매출액으로 나눈 값',
      '순이익을 주가로 나눈 값',
      '매출액을 주가로 나눈 값'
    ],
    correctAnswer: 0,
    explanation: 'PER(Price-to-Earnings Ratio)는 주가를 주당순이익(EPS)으로 나눈 값으로, 주식의 상대적 가치를 평가하는 지표입니다.'
  },
  {
    id: 'q2',
    question: '다음 중 분산투자의 주요 목적은?',
    options: [
      '수익률 최대화',
      '위험 최소화',
      '배당금 극대화',
      '거래비용 절감'
    ],
    correctAnswer: 1,
    explanation: '분산투자의 주요 목적은 여러 자산에 투자함으로써 특정 자산의 손실이 전체 포트폴리오에 미치는 영향을 줄여 위험을 최소화하는 것입니다.'
  },
  {
    id: 'q3',
    question: '블루칩 주식이란?',
    options: [
      '신생 기술 기업의 주식',
      '변동성이 높은 소형주',
      '안정적이고 신뢰할 수 있는 대형 기업의 주식',
      '배당금을 지급하지 않는 성장주'
    ],
    correctAnswer: 2,
    explanation: '블루칩 주식은 재무적으로 안정적이고, 오랜 역사와 신뢰성을 갖춘 대형 기업의 주식을 의미합니다.'
  }
];

export const dailyConcepts: DailyConcept[] = [
  {
    id: 'day1',
    day: 1,
    title: '주식이란 무엇인가?',
    content: `주식은 회사의 소유권을 나타내는 증서입니다. 주식을 소유한다는 것은 해당 기업의 일부분을 소유한다는 의미이며, 그에 따른 권리와 책임을 갖게 됩니다.

주식을 보유함으로써 얻을 수 있는 이익은 크게 두 가지입니다:
1. 배당금: 회사가 이익의 일부를 주주에게 나누어 주는 것
2. 자본이득: 주식 가격이 상승했을 때 매도하여 얻는 이익

주식 투자는 반드시 기업에 대한 이해를 바탕으로 해야 합니다. 단순히 주가의 등락만을 보고 투자한다면 투기에 가까워질 수 있습니다.`,
    quizzes: [
      {
        id: 'day1-q1',
        question: '주식을 보유함으로써 얻을 수 있는 수익은?',
        options: [
          '이자수익과 자본이득',
          '배당금과 자본이득',
          '임대수익과 배당금',
          '이자수익과 임대수익'
        ],
        correctAnswer: 1,
        explanation: '주식 투자로 얻을 수 있는 수익은 기업이 이익을 배분하는 배당금과 주가 상승 시 매도하여 얻는 자본이득입니다.'
      },
      {
        id: 'day1-q2',
        question: '주식을 소유한다는 것의 의미는?',
        options: [
          '회사에 돈을 빌려준 채권자가 된다',
          '회사의 일부분을 소유하는 주주가 된다',
          '회사의 직원이 된다',
          '회사의 상품을 구매할 권리를 얻는다'
        ],
        correctAnswer: 1,
        explanation: '주식을 소유한다는 것은 해당 기업의 일부분을 소유하는 주주가 된다는 의미입니다. 회사에 돈을 빌려주는 것은 채권 투자입니다.'
      },
      {
        id: 'day1-q3',
        question: '다음 중 주식 투자의 올바른 접근 방식은?',
        options: [
          '주가의 등락만 보고 빠르게 거래한다',
          '친구나 지인의 추천만으로 투자한다',
          '기업에 대한 이해를 바탕으로 투자한다',
          '모든 자산을 한 종목에 집중 투자한다'
        ],
        correctAnswer: 2,
        explanation: '주식 투자는 기업에 대한 이해를 바탕으로 해야 합니다. 기업의 사업 모델, 재무 상태, 경쟁력 등을 분석하고 투자하는 것이 중요합니다.'
      }
    ]
  },
  {
    id: 'day2',
    day: 2,
    title: '주식 시장의 구조',
    content: `주식 시장은 크게 발행시장(일차시장)과 유통시장(이차시장)으로 나뉩니다.

발행시장은 기업이 처음으로 주식을 발행하여 투자자로부터 자금을 조달하는 시장입니다. 대표적인 예로 기업공개(IPO)가 있습니다.

유통시장은 이미 발행된 주식이 투자자들 사이에서 거래되는 시장입니다. 대부분의 일반 투자자들이 주식을 매매하는 곳이 바로 이 유통시장입니다.

한국의 주식 시장은 크게 유가증권시장(KOSPI)과 코스닥(KOSDAQ)으로 구분됩니다.
- KOSPI: 대형 기업 위주의 시장
- KOSDAQ: 중소형, 벤처 기업 위주의 시장`,
    quizzes: [
      {
        id: 'day2-q1',
        question: '다음 중 발행시장(일차시장)에 대한 설명으로 옳은 것은?',
        options: [
          '투자자들 사이에서 주식이 거래되는 시장',
          '주식 매매를 중개하는 증권사들의 시장',
          '기업이 처음으로 주식을 발행하여 자금을 조달하는 시장',
          '국가 간 주식 거래가 이루어지는 시장'
        ],
        correctAnswer: 2,
        explanation: '발행시장(일차시장)은 기업이 처음으로 주식을 발행하여 투자자로부터 자금을 조달하는 시장입니다.'
      },
      {
        id: 'day2-q2',
        question: 'KOSPI와 KOSDAQ의 주요 차이점은?',
        options: [
          '거래 시간의 차이',
          '거래 통화의 차이',
          '상장 기업의 규모와 특성의 차이',
          '투자 가능한 투자자 유형의 차이'
        ],
        correctAnswer: 2,
        explanation: 'KOSPI는 주로 대형 기업 위주의 시장이며, KOSDAQ은 중소형 및 벤처 기업 위주의 시장입니다.'
      },
      {
        id: 'day2-q3',
        question: '일반 투자자들이 주로 주식을 매매하는 시장은?',
        options: [
          '발행시장(일차시장)',
          '유통시장(이차시장)',
          'IPO 시장',
          '사모 시장'
        ],
        correctAnswer: 1,
        explanation: '일반 투자자들이 주로 주식을 매매하는 곳은 이미 발행된 주식이 투자자들 사이에서 거래되는 유통시장(이차시장)입니다.'
      }
    ]
  },
];

export const mockStocks: Stock[] = [
  { 
    symbol: '005930', 
    name: '삼성전자', 
    currentPrice: 70200, 
    previousClose: 69800, 
    change: 400, 
    changePercent: 0.57 
  },
  { 
    symbol: '000660', 
    name: 'SK하이닉스', 
    currentPrice: 158500, 
    previousClose: 156000, 
    change: 2500, 
    changePercent: 1.60 
  },
  { 
    symbol: '035720', 
    name: '카카오', 
    currentPrice: 42300, 
    previousClose: 43500, 
    change: -1200, 
    changePercent: -2.76 
  },
  { 
    symbol: '035420', 
    name: 'NAVER', 
    currentPrice: 186500, 
    previousClose: 185000, 
    change: 1500, 
    changePercent: 0.81 
  },
  { 
    symbol: '051910', 
    name: 'LG화학', 
    currentPrice: 423000, 
    previousClose: 410000, 
    change: 13000, 
    changePercent: 3.17 
  },
  { 
    symbol: '207940', 
    name: '삼성바이오로직스', 
    currentPrice: 830000, 
    previousClose: 835000, 
    change: -5000, 
    changePercent: -0.60 
  },
  { 
    symbol: '005380', 
    name: '현대자동차', 
    currentPrice: 178000, 
    previousClose: 175500, 
    change: 2500, 
    changePercent: 1.42 
  },
  { 
    symbol: '068270', 
    name: '셀트리온', 
    currentPrice: 172000, 
    previousClose: 173500, 
    change: -1500, 
    changePercent: -0.86 
  }
];

export const mockPortfolio: Portfolio = {
  cash: 8750000,
  items: [
    {
      symbol: '005930',
      name: '삼성전자',
      averagePrice: 69500,
      quantity: 10,
      currentPrice: 70200,
      value: 702000,
      profit: 7000,
      profitPercent: 1.01
    },
    {
      symbol: '035720',
      name: '카카오',
      averagePrice: 44000,
      quantity: 5,
      currentPrice: 42300,
      value: 211500,
      profit: -8500,
      profitPercent: -3.86
    },
    {
      symbol: '051910',
      name: 'LG화학',
      averagePrice: 418000,
      quantity: 1,
      currentPrice: 423000,
      value: 423000,
      profit: 5000,
      profitPercent: 1.20
    }
  ],
  totalValue: 10086500,
  totalProfit: 86500,
  totalProfitPercent: 0.87
};

export const mockJournalEntries: JournalEntry[] = [
  {
    id: 'j1',
    symbol: '005930',
    name: '삼성전자',
    date: '2025-01-15',
    reason: '글로벌 반도체 수요 증가 전망',
    analysis: '메모리 반도체 가격 상승 추세와 AI 관련 수요 증가로 실적 개선 기대',
    emotion: 'confident',
    result: {
      profitLoss: 7000,
      profitLossPercent: 1.01,
      reflection: '예상대로 실적 개선 신호가 나타나고 있음. 조금 더 보유할 예정'
    }
  },
  {
    id: 'j2',
    symbol: '035720',
    name: '카카오',
    date: '2025-01-20',
    reason: '신규 서비스 출시 호재',
    analysis: '신규 핀테크 서비스 출시 발표로 인한 주가 상승 기대',
    emotion: 'excited',
    result: {
      profitLoss: -8500,
      profitLossPercent: -3.86,
      reflection: '예상과 달리 시장 반응이 부정적. 감정적 판단이 개입된 것 같음'
    }
  },
  {
    id: 'j3',
    symbol: '051910',
    name: 'LG화학',
    date: '2025-01-25',
    reason: '전기차 배터리 사업 성장',
    analysis: '글로벌 전기차 시장 확대로 배터리 사업 호조 전망',
    emotion: 'neutral',
    result: {
      profitLoss: 5000,
      profitLossPercent: 1.20,
      reflection: '차분하게 분석한 결과 적절한 투자였던 것 같음'
    }
  }
];

export const mockUserProgress: UserProgress = {
  currentDay: 7,
  completedDays: [1, 2, 3, 4, 5, 6],
  quizResults: [
    { day: 1, score: 3, date: '2025-01-10' },
    { day: 2, score: 2, date: '2025-01-11' },
    { day: 3, score: 3, date: '2025-01-12' },
    { day: 4, score: 2, date: '2025-01-13' },
    { day: 5, score: 3, date: '2025-01-14' },
    { day: 6, score: 3, date: '2025-01-15' },
  ],
  streak: 6,
  lastAttendance: '2025-01-15'
};

export const mockEmotionAnalysis: EmotionAnalysis = {
  emotions: [
    { emotion: 'confident', count: 12, profitLoss: 178500 },
    { emotion: 'neutral', count: 8, profitLoss: 93000 },
    { emotion: 'excited', count: 5, profitLoss: -43200 },
    { emotion: 'anxious', count: 3, profitLoss: -15600 },
    { emotion: 'fearful', count: 2, profitLoss: -86000 }
  ],
  mostProfitable: 'confident',
  leastProfitable: 'fearful'
};