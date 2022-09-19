import React from 'react';

import { TourProvider } from '@reactour/tour';
import Dashboard from './Dashboard';
import AuthenticatedUserSubsidyPage from '../app/AuthenticatedUserSubsidyPage';

export default function DashboardPage() {
  const steps = [
    {
      selector: '.first-step',
      content: 'This is my first Step',
    },
    {
      selector: '.second-step',
      content: 'This is my second Step',
    },
  ];

  return (
    <AuthenticatedUserSubsidyPage>
      <TourProvider steps={steps}>
        <Dashboard />
      </TourProvider>
    </AuthenticatedUserSubsidyPage>
  );
}
