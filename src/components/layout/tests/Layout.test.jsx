import React from 'react';
import renderer from 'react-test-renderer';
import { AppContext } from '@edx/frontend-platform/react';
import { MemoryRouter } from 'react-router-dom';

import { Layout } from '../index';

jest.mock('@edx/frontend-component-footer', () => () => <footer>SiteFooter</footer>);

jest.mock('../../../colors.scss', () => ({
  white: 'white',
  dark: 'gray',
}));

const APP_CONTEXT = {
  authenticatedUser: {
    userId: 1,
    roles: [],
  },
  config: {},
  enterpriseConfig: {
    branding: {
      colors: {
        primary: 'blue',
        secondary: 'purple',
        tertiary: 'gray',
      },
    },
  },
};

describe('Layout', () => {
  it('should render the expected HTML', async () => {
    let tree = null;

    await renderer.act(async () => {
      tree = await renderer.create(
        <MemoryRouter>
          <div>
            <AppContext.Provider value={APP_CONTEXT}>
              <Layout>
                <div>Content</div>
              </Layout>
            </AppContext.Provider>
          </div>
        </MemoryRouter>,
      );
    });

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
