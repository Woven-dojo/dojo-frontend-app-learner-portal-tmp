import React from 'react';
import { screen } from '@testing-library/react';
import { AppContext } from '@edx/frontend-platform/react';
import '@testing-library/jest-dom/extend-expect';

import SearchProgramCard from '../SearchProgramCard';

import { renderWithRouter } from '../../../utils/tests';
import { TEST_ENTERPRISE_SLUG } from './constants';

jest.mock('react-truncate', () => ({
  __esModule: true,
  default: ({ children }) => children,
}));

jest.mock('react-loading-skeleton', () => ({
  __esModule: true,
  // eslint-disable-next-line react/prop-types
  default: (props = {}) => <div data-testid={props['data-testid']} />,
}));

jest.mock('@edx/frontend-platform/auth', () => ({
  ...jest.requireActual('@edx/frontend-platform/auth'),
  getAuthenticatedUser: () => ({ username: 'b.wayne' }),
}));

const SearchProgramCardWithAppContext = (props) => (
  <AppContext.Provider
    value={{
      enterpriseConfig: { slug: TEST_ENTERPRISE_SLUG },
    }}
  >
    <SearchProgramCard {...props} />
  </AppContext.Provider>
);

const PROGRAM_UUID = 'a9cbdeb6-5fc0-44ef-97f7-9ed605a149db';
const PROGRAM_TITLE = 'Intro to BatVerse';
const PROGRAM_TYPE_DISPLAYED = 'MicroMasters® Program';
const PROGRAM_CARD_IMG_URL = 'http://card.image';
const PROGRAM_PARTNER_LOGO_IMG_URL = 'http://logo.image';
const PROGRAM_COURSES_COUNT_TEXT = '2 Courses';
const PROGRAM_AUTHOR_ORG = {
  key: 'BatmanX',
  name: 'Batman',
  logo_image_url: PROGRAM_PARTNER_LOGO_IMG_URL,
};

const defaultProps = {
  hit: {
    aggregation_key: `program:${PROGRAM_UUID}`,
    authoring_organizations: [
      PROGRAM_AUTHOR_ORG,
    ],
    card_image_url: PROGRAM_CARD_IMG_URL,
    course_keys: [
      'BatX+BAT100x',
      'BatX+BAT101x',
    ],
    title: PROGRAM_TITLE,
    type: 'MicroMasters',
  },
};

const propsForLoading = {
  hit: {},
  isLoading: true,
};

describe('<SearchProgramCard />', () => {
  test('renders the correct data', () => {
    const { container } = renderWithRouter(<SearchProgramCardWithAppContext {...defaultProps} />);

    expect(screen.getByText(PROGRAM_TITLE)).toBeInTheDocument();
    expect(screen.getByText(PROGRAM_AUTHOR_ORG.key)).toBeInTheDocument();

    expect(container.querySelector('.search-program-card > a')).toHaveAttribute(
      'href',
      `/${TEST_ENTERPRISE_SLUG}/program/${PROGRAM_UUID}`,
    );
    expect(container.querySelector('p.partner')).toHaveTextContent(PROGRAM_AUTHOR_ORG.key);
    expect(container.querySelector('.card-img-top')).toHaveAttribute('src', PROGRAM_CARD_IMG_URL);
    expect(container.querySelector('.partner-logo')).toHaveAttribute('src', PROGRAM_PARTNER_LOGO_IMG_URL);
    expect(container.querySelector('span.badge-text')).toHaveTextContent(PROGRAM_TYPE_DISPLAYED);
    expect(container.querySelector('span.program-courses-count-text')).toHaveTextContent(PROGRAM_COURSES_COUNT_TEXT);
  });

  test('renders the correct program type', () => {
    const programTypes = {
      MicroBachelors: 'MicroBachelors® Program',
      MicroMasters: 'MicroMasters® Program',
      XSeries: 'XSeries Program',
      Masters: 'Master\'s Degree Program',
      'Professional Certificate': 'Professional Certificate',
    };

    Object.keys(programTypes).forEach((type) => {
      const value = programTypes[type];
      const props = { ...defaultProps, ...{ hit: { ...defaultProps.hit, type } } };
      const { container } = renderWithRouter(<SearchProgramCardWithAppContext {...props} />);
      expect(container.querySelector('span.badge-text')).toHaveTextContent(value);
    });
  });

  test('does not render course count if no courses', () => {
    const props = { ...defaultProps, ...{ hit: { ...defaultProps.hit, course_keys: [] } } };
    const { container } = renderWithRouter(<SearchProgramCardWithAppContext {...props} />);
    expect(container.querySelector('span.program-courses-count-text')).toBe(null);
  });

  test('renders the loading state', () => {
    renderWithRouter(<SearchProgramCardWithAppContext {...propsForLoading} />);

    // assert <Skeleton /> loading components render to verify
    // program card is properly in a loading state.
    expect(screen.queryByTestId('card-img-loading')).toBeInTheDocument();
    expect(screen.queryByTestId('partner-logo-loading')).toBeInTheDocument();
    expect(screen.queryByTestId('program-title-loading')).toBeInTheDocument();
    expect(screen.queryByTestId('partner-key-loading')).toBeInTheDocument();
    expect(screen.queryByTestId('program-type-loading')).toBeInTheDocument();
    expect(screen.queryByTestId('program-courses-count-loading')).toBeInTheDocument();
  });
});