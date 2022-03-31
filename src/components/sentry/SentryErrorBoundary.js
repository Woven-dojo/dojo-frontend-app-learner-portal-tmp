import React, { PureComponent } from 'react'

import * as Sentry from '@sentry/react';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';

import { ErrorReportContext } from '../../utils/sentry';

const isProduction = process.env.NODE_ENV === 'production';

class SentryErrorBoundary extends PureComponent {
  state = { error: null, eventId: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  reportError = (error, info) => {
    if (!isProduction) {
      console.error(error, info);
      return;
    };

    Sentry.withScope((scope) => {
      scope.setExtras(info);

      const { userId, username } = getAuthenticatedUser()

      scope.setUser({ id: userId, username });

      const eventId = Sentry.captureException(error);
      this.setState({ eventId });
    });
  };
   
  componentDidCatch(error, info) {
    this.reportError(error, info);
  }

  onReportFeedback = (e) => {
    e.preventDefault();
    Sentry.showReportDialog({
      eventId: this.state.eventId,
    });
  };

  render() {
    const { children, renderError } = this.props;

    if (error) return renderError(error);

    return (
      <ErrorReportContext.Provider value={this.reportError}>
        {children}
      </ErrorReportContext.Provider>
    );
  }
}

export default ErrorBoundary;
