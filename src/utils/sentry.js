import { createContext, useContext } from 'react';
import * as Sentry from '@sentry/react';

export const ErrorReportContext = createContext((error, info) => {
  console.error(error, info);
});

export const useReportError = () => useContext(ErrorReportContext);

export function initSentry(projectEnvPrefix) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: `${projectEnvPrefix}_${process.env.SENTRY_ENVIRONMENT}`,
  });
}