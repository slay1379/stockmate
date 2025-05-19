import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import JournalForm from '../components/journal/JournalForm';

const JournalFormPage: React.FC = () => {
  return (
    <PageLayout title="매수 일기 작성" showBackButton>
      <JournalForm />
    </PageLayout>
  );
};

export default JournalFormPage;