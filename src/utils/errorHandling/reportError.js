import { Severity } from '@sentry/react';
import sendExceptionToSentry from "./sendExceptionToSentry";

export function reportError(error, extra, severityLevel = Severity.Error) {
  logError(error, { extra });

  console.log('Send exception to sentry', sendExceptionToSentry, logError);
  sendExceptionToSentry(error, severityLevel, extra);
}

export function reportFatalError(error, extra) {
  reportError(error, extra, Severity.Fatal);
}

export function reportWarning(error, extra) {
  reportError(error, extra, Severity.Warning);
}