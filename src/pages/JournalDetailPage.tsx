import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import JournalDetail from '../components/journal/JournalDetail';
import { useAppContext } from '../context/AppContext';

const JournalDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { journalEntries } = useAppContext();
  
  const entry = journalEntries.find(entry => entry.id === id);
  
  if (!entry) {
    return <Navigate to="/journal" />;
  }
  
  return (
    <PageLayout title="매수 일기" showBackButton>
      <JournalDetail entry={entry} />
    </PageLayout>
  );
};

export default JournalDetailPage;