import sentryTestkit from "sentry-testkit"
import * as Sentry from '@sentry/react';
import sendExceptionToSentry from "../sendExceptionToSentry";

const ERROR_MESSAGE = 'Test error';
const EXTRAS = {
  animalType: 'Cat',
  action: 'Atacc',
}
const USER = { username: 'b.wayne', userId: 1 };
  
const { testkit, sentryTransport } = sentryTestkit();

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

jest.mock('@edx/frontend-platform/auth', () => ({
  ...jest.requireActual('@edx/frontend-platform/auth'),
  getAuthenticatedUser: () => USER,
}));

Sentry.init({
  dsn: "https://3dd7bd8f4e8e46809c418cfd87c3d6ac@o661260.ingest.sentry.io/5764654",
  transport: sentryTransport,
  //... other configurations
});

describe('Test send exception to sentry', () => {

  resetTestEnv();

  beforeEach(() => {
    testkit.reset();
  })

  test('Error gets logged if development', () => {
    process.env.NODE_ENV = 'development';

    const error = new Error(ERROR_MESSAGE);
    sendExceptionToSentry(error, Sentry.Severity.Fatal);

    expect(testkit.reports()).toHaveLength(0);
  });

  test('Error gets logged and reported if production and have fatal severity', () => {
    process.env.NODE_ENV = 'production';

    const error = new Error(ERROR_MESSAGE);

    const expectedLevel = Sentry.Severity.Fatal;

    sendExceptionToSentry(error, expectedLevel, EXTRAS);

    expect(testkit.reports()).toHaveLength(1);

    const report = testkit.reports()[0];
    
    expect(report).toHaveProperty('user');
    expect(report.user.id).toBe(USER.userId);
    expect(report.user.username).toBe(USER.username);

    expect(report.level).toBe(expectedLevel);
    expect(report.extra).toEqual(EXTRAS);
  });
  
  test('Error has error severity', () => {
    process.env.NODE_ENV = 'production';

    const error = new Error(ERROR_MESSAGE);

    const expectedLevel = Sentry.Severity.Error;
    sendExceptionToSentry(error, expectedLevel);

    expect(testkit.reports()).toHaveLength(1);

    const report = testkit.reports()[0];

    expect(report.level).toBe(expectedLevel);
  }) 
});
