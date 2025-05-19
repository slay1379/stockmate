import React, { useState } from 'react';
import Card, { CardHeader, CardContent } from '../common/Card';
import { Search } from 'lucide-react';
import StockItem from '../common/StockItem';
import { Stock } from '../../types';
import { mockStocks } from '../../data/mockData';
import { useNavigate } from 'react-router-dom';

const StockSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  const filteredStocks = searchTerm
    ? mockStocks.filter(stock => 
        stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.symbol.includes(searchTerm)
      )
    : mockStocks;
  
  const handleStockClick = (stock: Stock) => {
    navigate(`/investment/trade/${stock.symbol}`);
  };
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <h3 className="font-semibold text-gray-800">종목 검색</h3>
      </CardHeader>
      <CardContent>
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="종목명 또는 종목코드 검색"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {filteredStocks.length > 0 ? (
            filteredStocks.map((stock) => (
              <StockItem
                key={stock.symbol}
                stock={stock}
                onClick={() => handleStockClick(stock)}
              />
            ))
          ) : (
            <div className="py-6 text-center">
              <p className="text-gray-500">검색 결과가 없습니다.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StockSearch;