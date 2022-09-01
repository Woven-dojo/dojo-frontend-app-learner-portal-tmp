import React, { useEffect } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import useHotjar from 'react-use-hotjar';
import { AppProvider, AuthenticatedPageRoute, PageRoute } from '@edx/frontend-platform/react';

import NotFoundPage from '../NotFoundPage';
import NoticesProvider from '../notices-provider';
import {
  EnterprisePageRedirect,
} from '../enterprise-redirects';
import { DashboardPage } from '../dashboard';
import { CoursePage } from '../course';
import { EnterpriseInvitePage } from '../enterprise-invite';

import { ToastsProvider } from '../Toasts';

export default function App() {
  if (process.env.HOTJAR_APP_ID) {
    const { initHotjar } = useHotjar();
    useEffect(() => {
      initHotjar(process.env.HOTJAR_APP_ID, process.env.HOTJAR_VERSION, process.env.HOTJAR_DEBUG);
    }, [initHotjar]);
  }

  return (
    <AppProvider>
      <NoticesProvider>
        <ToastsProvider>
          <Switch>
            <AuthenticatedPageRoute exact path="/r/:redirectPath+" component={EnterprisePageRedirect} />
            <PageRoute exact path="/invite/:enterpriseCustomerInviteKey" component={EnterpriseInvitePage} />
            <PageRoute exact path="/" component={DashboardPage} />
            <Redirect from="/search" to="/" />
            <PageRoute exact path="/:enterpriseSlug/course/:courseKey" component={CoursePage} />
            <PageRoute path="*" component={NotFoundPage} />
          </Switch>
        </ToastsProvider>
      </NoticesProvider>
    </AppProvider>
  );
}
