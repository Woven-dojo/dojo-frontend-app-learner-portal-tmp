import * as Sentry from '@sentry/react';

export default function initSentry(projectEnvPrefix) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: `${projectEnvPrefix}_${process.env.SENTRY_ENVIRONMENT}`,
  });
}

