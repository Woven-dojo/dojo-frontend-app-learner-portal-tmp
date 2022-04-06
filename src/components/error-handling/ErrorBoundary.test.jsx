import ErrorBoundary from "./ErrorBoundary";
import '@testing-library/jest-dom/extend-expect';

import { reportError } from '../../utils/errorHandling';
import { render, screen } from "@testing-library/react";

const USER = { username: 'b.wayne', userId: 1 };
const ERROR_MESSAGE = 'Test error message';

jest.mock('@edx/frontend-platform/auth', () => ({
  ...jest.requireActual('@edx/frontend-platform/auth'),
  getAuthenticatedUser: () => USER,
}));

jest.mock('../../utils/errorHandling', () => ({
  reportError: jest.fn(),
}));

const Troublemaker = ({ error }) => {
  throw error;
  return <div>I'll never render</div>
}

const renderError = (error) => (
  <div>{error.message}</div>
);

describe('Error boundary', () => {
  test('Rendered', () => {
    const expectedText = 'Hello';

    render(
      <ErrorBoundary renderError={renderError}>
        <div>{expectedText}</div>
      </ErrorBoundary>
    )

    expect(reportError).not.toHaveBeenCalled();
    
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  test('Caught error', () => {
    const error = new Error(ERROR_MESSAGE);

    render(
      <ErrorBoundary renderError={renderError}>
        <Troublemaker error={error} />
      </ErrorBoundary>
    )

    reportError(error);

    expect(reportError).toBeCalledWith(error);
    
    expect(screen.getByText(ERROR_MESSAGE)).toBeInTheDocument();
  });
 
});
