import * as Sentry from '@sentry/react';
import { logError } from '@edx/frontend-platform/logging';

import sendExceptionToSentry from '../sendExceptionToSentry';
import { reportError, reportFatalError, reportWarning } from '../reportError';

const ERROR_MESSAGE = 'Test error';
const EXTRAS = {
  animalType: 'Cat',
  action: 'Atacc',
}

jest.mock('../sendExceptionToSentry', () => ({
  default: jest.fn(),
}));

describe('Test report error', () => {
  jest.mock('@edx/frontend-platform/logging', () => ({
    logError: jest.fn(),
  }));

  const testErrorReport = (severityLevel, reportCall) => {
    const error = new Error(ERROR_MESSAGE);

    reportCall(error, EXTRAS);

    expect(logError).toBeCalledWith(error, { extra: EXTRAS });
    expect(sendExceptionToSentry).toBeCalledTimes(1);
    expect(sendExceptionToSentry).toBeCalledWith(error, severityLevel, EXTRAS)
  };

  test('Report fatal error', () => {
    testErrorReport(Sentry.Severity.Fatal, reportFatalError)
  });

  test('Report error', () => {
    testErrorReport(Sentry.Severity.Error, reportError)
  });

  test('Report warning', () => {
    testErrorReport(Sentry.Severity.Warning, reportWarning)
  });
})