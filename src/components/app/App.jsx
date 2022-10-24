import React, { useEffect } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import useHotjar from 'react-use-hotjar';
import { AppProvider, PageRoute } from '@edx/frontend-platform/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import NotFoundPage from '../NotFoundPage';
import { DashboardPage } from '../dashboard';
import { ToastsProvider } from '../Toasts';

export default function App() {
  const { initHotjar } = useHotjar();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  useEffect(() => {
    if (process.env.HOTJAR_APP_ID) {
      initHotjar(process.env.HOTJAR_APP_ID, process.env.HOTJAR_VERSION, process.env.HOTJAR_DEBUG);
    }
  }, [initHotjar]);

  return (
    <AppProvider>
      <QueryClientProvider client={queryClient}>
        <ToastsProvider>
          <Switch>
            <PageRoute exact path="/" component={DashboardPage} />
            <Redirect from="/search" to="/" />
            <PageRoute path="*" component={NotFoundPage} />
          </Switch>
        </ToastsProvider>
      </QueryClientProvider>
    </AppProvider>
  );
}
