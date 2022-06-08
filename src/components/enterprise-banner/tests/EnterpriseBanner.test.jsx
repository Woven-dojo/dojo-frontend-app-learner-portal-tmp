import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { screen, render } from '@testing-library/react';
import { AppContext } from '@edx/frontend-platform/react';
import { useLocation } from 'react-router-dom';
import EnterpriseBanner from '../EnterpriseBanner';

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
}));

describe('<EnterpriseBanner />', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('renders banner content', () => {
    useLocation.mockImplementation(() => ({
      pathname: '/slug/search',
    }));

    render(
      <AppContext.Provider
        value={{
          enterpriseConfig: {
            slug: 'slug',
            uuid: 'uuid',
            name: 'test enterprise',
          },
        }}
      >
        <EnterpriseBanner />
      </AppContext.Provider>,
    );

    expect(screen.getByText('test enterprise'));
  });
});
