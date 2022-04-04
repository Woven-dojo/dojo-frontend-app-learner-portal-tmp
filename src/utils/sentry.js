import { logError } from '@edx/frontend-platform/logging';

import * as Sentry from '@sentry/react';

export function initSentry(projectEnvPrefix) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: `${projectEnvPrefix}_${process.env.SENTRY_ENVIRONMENT}`,
  });
}

export function reportError(error, info) {
  logError(error);
  if (!isProduction) return;

  Sentry.withScope((scope) => {
    scope.setExtras(info);

    const { userId, username } = getAuthenticatedUser()

    scope.setUser({ id: userId, username });
  });
}