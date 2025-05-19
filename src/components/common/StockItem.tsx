import React from 'react';
import { Stock } from '../../types';

interface StockItemProps {
  stock: Stock;
  onClick?: () => void;
}

const StockItem: React.FC<StockItemProps> = ({ stock, onClick }) => {
  const isPositive = stock.change > 0;
  const isNeutral = stock.change === 0;
  
  return (
    <div 
      className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-col">
        <div className="flex items-center">
          <span className="font-semibold text-gray-900">{stock.name}</span>
          <span className="ml-2 text-xs text-gray-500">{stock.symbol}</span>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <span className="font-medium text-gray-900">
          {stock.currentPrice.toLocaleString()}원
        </span>
        <div 
          className={`text-sm ${
            isPositive 
              ? 'text-red-600' 
              : isNeutral 
                ? 'text-gray-600' 
                : 'text-blue-600'
          }`}
        >
          {isPositive ? '+' : ''}{stock.change.toLocaleString()}원 ({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)
        </div>
      </div>
    </div>
  );
};

export default StockItem;