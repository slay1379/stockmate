import React from 'react';
import Card, { CardHeader, CardContent } from '../common/Card';
import { useAppContext } from '../../context/AppContext';

const PortfolioSummary: React.FC = () => {
  const { portfolio } = useAppContext();
  
  const isPositive = portfolio.totalProfit > 0;
  const isNeutral = portfolio.totalProfit === 0;
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <h3 className="font-semibold text-gray-800">내 포트폴리오</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600">총 자산</p>
            <p className="text-2xl font-bold text-gray-900">
              {portfolio.totalValue.toLocaleString()}원
            </p>
            <div className={`text-sm ${
              isPositive 
                ? 'text-red-600' 
                : isNeutral 
                  ? 'text-gray-600' 
                  : 'text-blue-600'
            }`}>
              {isPositive ? '+' : ''}{portfolio.totalProfit.toLocaleString()}원 ({isPositive ? '+' : ''}{portfolio.totalProfitPercent.toFixed(2)}%)
            </div>
          </div>
          
          <div className="flex justify-between pt-4 border-t border-gray-100">
            <div>
              <p className="text-sm text-gray-600">보유 현금</p>
              <p className="text-lg font-semibold text-gray-900">
                {portfolio.cash.toLocaleString()}원
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">보유 주식</p>
              <p className="text-lg font-semibold text-gray-900">
                {(portfolio.totalValue - portfolio.cash).toLocaleString()}원
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioSummary;