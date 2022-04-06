import { logError } from '@edx/frontend-platform/logging';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth'

import * as Sentry from '@sentry/react';

export function initSentry(projectEnvPrefix) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: `${projectEnvPrefix}_${process.env.SENTRY_ENVIRONMENT}`,
  });
}

export function reportError(error, info) {
  logError(error);
  if (process.env.NODE_ENV !== 'production') return;

  Sentry.withScope((scope) => {
    scope.setExtras(info);

    const { userId, username } = getAuthenticatedUser();

    scope.setUser({ id: userId, username });

    Sentry.captureException(error);
  });
}