import * as Sentry from '@sentry/react';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';

function getAuthUserForSentry() {
  const { userId, username } = getAuthenticatedUser();

  return { id: userId, username };
}

export default function sendExceptionToSentry(exception, severityLevel, extras) {
  if (process.env.NODE_ENV !== 'production') return;

  Sentry.withScope((scope) => {
    scope.setExtras(extras);
    scope.setLevel(severityLevel);

    scope.setUser(getAuthUserForSentry())

    Sentry.captureException(exception);
  });
}