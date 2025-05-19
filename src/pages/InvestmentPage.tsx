import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import PortfolioSummary from '../components/investment/PortfolioSummary';
import PortfolioList from '../components/investment/PortfolioList';
import StockSearch from '../components/investment/StockSearch';

const InvestmentPage: React.FC = () => {
  return (
    <PageLayout>
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800">가상 투자 연습</h2>
        <p className="text-sm text-gray-600">
          1,000만원의 가상 자산으로 실전 투자를 연습해보세요.
        </p>
      </div>
      
      <PortfolioSummary />
      <PortfolioList />
      <StockSearch />
    </PageLayout>
  );
};

export default InvestmentPage;