import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import Card, { CardHeader, CardContent, CardFooter } from '../components/common/Card';
import Button from '../components/common/Button';
import { mockStocks } from '../data/mockData';
import { useAppContext } from '../context/AppContext';

const TradeDetailPage: React.FC = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const navigate = useNavigate();
  const { portfolio, updatePortfolio } = useAppContext();
  
  const stock = mockStocks.find(s => s.symbol === symbol);
  
  const [quantity, setQuantity] = useState(1);
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [error, setError] = useState('');
  
  if (!stock) {
    return (
      <PageLayout showBackButton>
        <div className="h-64 flex items-center justify-center">
          <p className="text-gray-600">종목을 찾을 수 없습니다.</p>
        </div>
      </PageLayout>
    );
  }
  
  const portfolioItem = portfolio.items.find(item => item.symbol === symbol);
  const maxSellQuantity = portfolioItem?.quantity || 0;
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < 1) {
      setQuantity(1);
    } else {
      setQuantity(value);
    }
    setError('');
  };
  
  const totalAmount = stock.currentPrice * quantity;
  const canBuy = portfolio.cash >= totalAmount;
  const canSell = maxSellQuantity >= quantity;
  
  const handleTrade = () => {
    if (tradeType === 'buy') {
      if (!canBuy) {
        setError('보유 현금이 부족합니다.');
        return;
      }
      
      // Create updated portfolio
      const updatedPortfolio = { ...portfolio };
      updatedPortfolio.cash -= totalAmount;
      
      const existingItemIndex = updatedPortfolio.items.findIndex(
        item => item.symbol === stock.symbol
      );
      
      if (existingItemIndex !== -1) {
        // Update existing position
        const item = updatedPortfolio.items[existingItemIndex];
        const totalValue = item.value + totalAmount;
        const totalQuantity = item.quantity + quantity;
        
        updatedPortfolio.items[existingItemIndex] = {
          ...item,
          quantity: totalQuantity,
          averagePrice: totalValue / totalQuantity,
          value: totalValue,
          profit: totalValue - (totalQuantity * item.averagePrice),
          profitPercent: ((totalValue / (totalQuantity * item.averagePrice)) - 1) * 100
        };
      } else {
        // Add new position
        updatedPortfolio.items.push({
          symbol: stock.symbol,
          name: stock.name,
          averagePrice: stock.currentPrice,
          quantity,
          currentPrice: stock.currentPrice,
          value: totalAmount,
          profit: 0,
          profitPercent: 0
        });
      }
      
      // Update total values
      const totalValue = updatedPortfolio.cash + 
        updatedPortfolio.items.reduce((sum, item) => sum + item.value, 0);
      
      updatedPortfolio.totalValue = totalValue;
      updatedPortfolio.totalProfit = totalValue - 10000000; // Assuming starting capital is 10M
      updatedPortfolio.totalProfitPercent = ((totalValue / 10000000) - 1) * 100;
      
      updatePortfolio(updatedPortfolio);
      navigate('/investment');
      
    } else if (tradeType === 'sell') {
      if (!canSell) {
        setError('보유 수량이 부족합니다.');
        return;
      }
      
      // Create updated portfolio
      const updatedPortfolio = { ...portfolio };
      updatedPortfolio.cash += totalAmount;
      
      const existingItemIndex = updatedPortfolio.items.findIndex(
        item => item.symbol === stock.symbol
      );
      
      if (existingItemIndex !== -1) {
        const item = updatedPortfolio.items[existingItemIndex];
        
        if (item.quantity === quantity) {
          // Remove the item if selling all shares
          updatedPortfolio.items.splice(existingItemIndex, 1);
        } else {
          // Update existing position
          const remainingQuantity = item.quantity - quantity;
          const remainingValue = item.value - totalAmount;
          
          updatedPortfolio.items[existingItemIndex] = {
            ...item,
            quantity: remainingQuantity,
            value: remainingValue,
            profit: remainingValue - (remainingQuantity * item.averagePrice),
            profitPercent: ((remainingValue / (remainingQuantity * item.averagePrice)) - 1) * 100
          };
        }
      }
      
      // Update total values
      const totalValue = updatedPortfolio.cash + 
        updatedPortfolio.items.reduce((sum, item) => sum + item.value, 0);
      
      updatedPortfolio.totalValue = totalValue;
      updatedPortfolio.totalProfit = totalValue - 10000000; // Assuming starting capital is 10M
      updatedPortfolio.totalProfitPercent = ((totalValue / 10000000) - 1) * 100;
      
      updatePortfolio(updatedPortfolio);
      navigate('/investment');
    }
  };
  
  return (
    <PageLayout title={stock.name} showBackButton>
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-gray-800">{stock.name}</h3>
              <p className="text-xs text-gray-500">{stock.symbol}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-gray-900">
                {stock.currentPrice.toLocaleString()}원
              </p>
              <p className={`text-sm ${
                stock.change > 0 
                  ? 'text-red-600' 
                  : stock.change === 0 
                    ? 'text-gray-600' 
                    : 'text-blue-600'
              }`}>
                {stock.change > 0 ? '+' : ''}{stock.change.toLocaleString()}원 ({stock.change > 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex justify-center mb-4">
              <div className="inline-flex rounded-md shadow-sm">
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                    tradeType === 'buy' 
                      ? 'bg-red-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  onClick={() => setTradeType('buy')}
                >
                  매수
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                    tradeType === 'sell' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  onClick={() => setTradeType('sell')}
                  disabled={maxSellQuantity === 0}
                >
                  매도
                </button>
              </div>
            </div>
            
            <div className="mb-4">
              <label 
                htmlFor="quantity" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                수량
              </label>
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {tradeType === 'sell' && maxSellQuantity > 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  보유 수량: {maxSellQuantity}주
                </p>
              )}
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">단가</span>
                <span className="text-sm font-medium">{stock.currentPrice.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">수량</span>
                <span className="text-sm font-medium">{quantity}주</span>
              </div>
              <div className="pt-2 mt-2 border-t border-gray-200 flex justify-between">
                <span className="font-medium text-gray-800">총 금액</span>
                <span className="font-bold text-gray-900">{totalAmount.toLocaleString()}원</span>
              </div>
            </div>
            
            {tradeType === 'buy' && (
              <div className="mt-2 text-sm text-gray-600 flex justify-between">
                <span>보유 현금</span>
                <span>{portfolio.cash.toLocaleString()}원</span>
              </div>
            )}
            
            {error && (
              <div className="mt-3 text-sm text-red-600">
                {error}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <div className="space-y-2">
            <Button
              variant={tradeType === 'buy' ? 'danger' : 'primary'}
              fullWidth
              onClick={handleTrade}
              disabled={(tradeType === 'buy' && !canBuy) || (tradeType === 'sell' && !canSell)}
            >
              {tradeType === 'buy' ? '매수하기' : '매도하기'}
            </Button>
            <Button
              variant="outline"
              fullWidth
              onClick={() => navigate('/investment')}
            >
              취소
            </Button>
          </div>
        </CardFooter>
      </Card>
    </PageLayout>
  );
};

export default TradeDetailPage;