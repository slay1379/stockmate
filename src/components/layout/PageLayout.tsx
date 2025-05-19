import React, { ReactNode } from 'react';
import Header from './Header';
import TabMenu from '../common/TabMenu';

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  showBackButton?: boolean;
  hideTabMenu?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  showBackButton = false,
  hideTabMenu = false,
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title={title} showBackButton={showBackButton} />
      <main className="flex-1 max-w-screen-md mx-auto w-full px-4 py-4 mt-14 mb-16">
        {children}
      </main>
      {!hideTabMenu && <TabMenu />}
    </div>
  );
};

export default PageLayout;