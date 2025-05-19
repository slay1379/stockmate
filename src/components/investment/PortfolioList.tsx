import React from 'react';
import Card, { CardHeader, CardContent } from '../common/Card';
import { useAppContext } from '../../context/AppContext';

const PortfolioList: React.FC = () => {
  const { portfolio } = useAppContext();
  
  if (portfolio.items.length === 0) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <h3 className="font-semibold text-gray-800">보유 종목</h3>
        </CardHeader>
        <CardContent>
          <div className="py-8 text-center">
            <p className="text-gray-500">아직 보유 중인 종목이 없습니다.</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <h3 className="font-semibold text-gray-800">보유 종목</h3>
      </CardHeader>
      <CardContent className="p-0">
        {portfolio.items.map((item) => {
          const isPositive = item.profit > 0;
          const isNeutral = item.profit === 0;
          
          return (
            <div 
              key={item.symbol}
              className="p-4 border-b border-gray-100 last:border-b-0"
            >
              <div className="flex justify-between mb-1">
                <div>
                  <span className="font-medium text-gray-900">{item.name}</span>
                  <span className="text-xs text-gray-500 ml-1">{item.symbol}</span>
                </div>
                <div className={`text-sm ${
                  isPositive 
                    ? 'text-red-600' 
                    : isNeutral 
                      ? 'text-gray-600' 
                      : 'text-blue-600'
                }`}>
                  {isPositive ? '+' : ''}{item.profitPercent.toFixed(2)}%
                </div>
              </div>
              
              <div className="flex justify-between text-sm">
                <div className="text-gray-600">
                  {item.quantity}주 × {item.currentPrice.toLocaleString()}원
                </div>
                <div className="font-medium text-gray-900">
                  {item.value.toLocaleString()}원
                </div>
              </div>
              
              <div className="flex justify-between text-xs mt-1">
                <div className="text-gray-500">
                  평균단가: {item.averagePrice.toLocaleString()}원
                </div>
                <div className={`${
                  isPositive 
                    ? 'text-red-600' 
                    : isNeutral 
                      ? 'text-gray-600' 
                      : 'text-blue-600'
                }`}>
                  {isPositive ? '+' : ''}{item.profit.toLocaleString()}원
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default PortfolioList;