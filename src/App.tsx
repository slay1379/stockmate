import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { CommunityProvider } from './context/CommunityContext';
import TabMenu from './components/common/TabMenu';

// Pages
import HomePage from './pages/HomePage';
import CoursePage from './pages/CoursePage';
import InvestmentPage from './pages/InvestmentPage';
import TradeDetailPage from './pages/TradeDetailPage';
import JournalPage from './pages/JournalPage';
import JournalFormPage from './pages/JournalFormPage';
import JournalDetailPage from './pages/JournalDetailPage';
import MyPage from './pages/MyPage';
import WritePostPage from './pages/WritePostPage';
import PostDetailPage from './pages/PostDetailPage';
import CommunityTabPage from './pages/CommunityTabPage';

function App() {
  return (
    <AppProvider>
      <CommunityProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/course" element={<CoursePage />} />
            <Route path="/investment" element={<InvestmentPage />} />
            <Route path="/investment/trade/:symbol" element={<TradeDetailPage />} />
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/journal/new" element={<JournalFormPage />} />
            <Route path="/journal/:id" element={<JournalDetailPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/community" element={<CommunityTabPage />} />
            <Route path="/community/write" element={<WritePostPage />} />
            <Route path="/community/:id" element={<PostDetailPage />} />
          </Routes>
          <TabMenu />
        </Router>
      </CommunityProvider>
    </AppProvider>
  );
}

export default App;