import sentryTestkit from "sentry-testkit"
import * as Sentry from '@sentry/react';

import { logError } from '@edx/frontend-platform/logging';

import { reportError } from "../errorHandling";

const { testkit, sentryTransport } = sentryTestkit();

const USER = { username: 'b.wayne', userId: 1 };

jest.mock('@edx/frontend-platform/auth', () => ({
  ...jest.requireActual('@edx/frontend-platform/auth'),
  getAuthenticatedUser: () => USER,
}));

jest.mock('@edx/frontend-platform/logging', () => ({
  logError: jest.fn(),
}));


Sentry.init({
  dsn: "https://3dd7bd8f4e8e46809c418cfd87c3d6ac@o661260.ingest.sentry.io/5764654",
  transport: sentryTransport,
  //... other configurations
});


function resetTestEnv() {
  const oldEnv = process.env;

  beforeEach(() => {
    jest.resetModules() // Most important - it clears the cache
    process.env = { ...oldEnv }; // Make a copy
  });

  afterAll(() => {
    process.env = oldEnv; // Restore old environment
  });
}

describe('Test sentry report', () => {
  resetTestEnv();

  test('Error gets logged if development', () => {
    process.env.NODE_ENV = 'development';

    const error = new Error('Test error');
    reportError(error);

    expect(logError).toBeCalledWith(error);

    expect(testkit.reports()).toHaveLength(0);
  });

  test('Error gets logged and reported if production', () => {
    process.env.NODE_ENV = 'production';

    const error = new Error('Test error');
    reportError(error);

    expect(logError).toBeCalledWith(error);

    expect(testkit.reports()).toHaveLength(1);

    const report = testkit.reports()[0];
    
    expect(report).toHaveProperty('user');
    expect(report.user.id).toBe(USER.userId);
    expect(report.user.username).toBe(USER.username);
  });
  
});
