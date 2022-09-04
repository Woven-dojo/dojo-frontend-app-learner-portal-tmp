import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AppContext } from '@edx/frontend-platform/react';
import { SearchContext } from '@edx/frontend-enterprise-catalog-search';
import SearchResults from '../SearchResults';
import SearchCourseCard from '../SearchCourseCard';
import { UserSubsidyContext } from '../../enterprise-user-subsidy';

import {
  NUM_RESULTS_COURSE, COURSE_TITLE, CONTENT_TYPE_COURSE,
} from '../constants';
import { TEST_ENTERPRISE_SLUG, TEST_IMAGE_URL } from './constants';

import {
  renderWithRouter,
} from '../../../utils/tests';
import { getNoResultsMessage, getSearchErrorMessage } from '../../utils/search';

jest.mock('react-loading-skeleton', () => ({
  __esModule: true,
  // eslint-disable-next-line react/prop-types
  default: (props = {}) => <div data-testid={props['data-testid']} />,
}));

jest.mock('@edx/frontend-platform/auth', () => ({
  ...jest.requireActual('@edx/frontend-platform/auth'),
  getAuthenticatedUser: () => ({ username: 'myspace-tom' }),
}));

jest.mock('@edx/frontend-enterprise-utils', () => ({
  ...jest.requireActual('@edx/frontend-enterprise-utils'),
  sendEnterpriseTrackEvent: jest.fn(),
}));

jest.mock('@edx/frontend-enterprise-catalog-search', () => ({
  ...jest.requireActual('@edx/frontend-enterprise-catalog-search'),
  deleteRefinementAction: jest.fn(),
  setRefinementAction: jest.fn(),
  removeFromRefinementArray: jest.fn(),
}));

const searchContext = {
  refinements: { skill_names: ['test-skill-1', 'test-skill-2'] },
  dispatch: () => null,
};

const initialAppState = {
  enterpriseConfig: {
    name: 'BearsRUs',
    slug: TEST_ENTERPRISE_SLUG,
  },
  config: {
    LMS_BASE_URL: process.env.LMS_BASE_URL,
  },
};

const defaultOffersState = {
  offers: [],
  loading: false,
  offersCount: 0,
};

const initialUserSubsidyState = {
  offers: defaultOffersState,
};

/* eslint-enable react/prop-types */
const SearchResultsWithContext = (props) => (
  <AppContext.Provider value={initialAppState}>
    <UserSubsidyContext.Provider value={initialUserSubsidyState}>
      <SearchContext.Provider value={searchContext}>
        <SearchResults {...props} />
      </SearchContext.Provider>
    </UserSubsidyContext.Provider>
  </AppContext.Provider>
);
/* eslint-enable react/prop-types */

const TEST_COURSE_KEY = 'test-course-key';
const TEST_TITLE = 'Test Title';
const TEST_CARD_IMG_URL = 'http://fake.image';
const TEST_PARTNER = {
  name: 'Partner Name',
  logoImgUrl: TEST_IMAGE_URL,
};

const SEARCH_RESULT_COURSES = {
  nbHits: 1,
  hits: [
    {
      key: TEST_COURSE_KEY,
      title: TEST_TITLE,
      card_image_url: TEST_CARD_IMG_URL,
      partners: [TEST_PARTNER],
    },

  ],
};

const propsForCourseResults = {
  searchResults: SEARCH_RESULT_COURSES,
  isSearchStalled: false,
  error: undefined,
  searchState: {
    page: 1,
  },
  hitComponent: SearchCourseCard,
  title: COURSE_TITLE,
  contentType: CONTENT_TYPE_COURSE,
};

const propsForError = {
  searchResults: undefined,
  isSearchStalled: false,
  error: {
    body: 'Test Error String',
  },
  contentType: CONTENT_TYPE_COURSE,
  title: COURSE_TITLE,
};

const propsForNoResults = {
  searchResults: {
    nbHits: 0,
    hits: [],
  },
  isSearchStalled: false,
  error: undefined,
  searchState: {
    page: 1,
  },
  hitComponent: SearchCourseCard,
  title: COURSE_TITLE,
  contentType: CONTENT_TYPE_COURSE,
};

describe('<SearchResults />', () => {
  test('renders correct results for courses', () => {
    renderWithRouter(
      <SearchResultsWithContext {...propsForCourseResults} />,
    );
    // Algolia Hits widget is mocked to return 'HIT'
    expect(screen.getByText('HIT')).toBeInTheDocument();
  });

  test('renders loading component for courses correctly when search is stalled', () => {
    const propsForLoadingCourses = { ...propsForCourseResults, isSearchStalled: true };
    renderWithRouter(
      <SearchResultsWithContext {...propsForLoadingCourses} />,
    );
    const titles = screen.queryAllByTestId('course-title-loading');
    expect(titles.length).toEqual(NUM_RESULTS_COURSE);
  });

  test('renders an alert in case of an error for courses', () => {
    const searchErrorMessage = getSearchErrorMessage(COURSE_TITLE);
    renderWithRouter(
      <SearchResultsWithContext {...propsForError} />,
    );
    expect(screen.getByText(new RegExp(searchErrorMessage.messageTitle, 'i'))).toBeTruthy();
    expect(screen.getByText(new RegExp(searchErrorMessage.messageContent, 'i'))).toBeTruthy();
  });

  test('renders an alert in case of no results for courses', () => {
    const noResultsMessage = getNoResultsMessage(COURSE_TITLE);
    renderWithRouter(
      <SearchResultsWithContext {...propsForNoResults} />,
    );
    expect(screen.getByText(new RegExp(noResultsMessage.messageTitle, 'i'))).toBeTruthy();
    expect(screen.getByText(new RegExp(noResultsMessage.messageContent, 'i'))).toBeTruthy();
  });
});
