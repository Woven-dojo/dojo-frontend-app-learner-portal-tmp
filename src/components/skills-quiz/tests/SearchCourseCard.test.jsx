import React from 'react';
import '@testing-library/jest-dom';
import { screen, act } from '@testing-library/react';
import { AppContext } from '@edx/frontend-platform/react';
import '@testing-library/jest-dom/extend-expect';
import { SearchContext } from '@edx/frontend-enterprise-catalog-search';

import SearchCourseCard from '../SearchCourseCard';

import { renderWithRouter } from '../../../utils/tests';
import { TEST_IMAGE_URL, TEST_ENTERPRISE_SLUG } from '../../search/tests/constants';
import { SkillsContext } from '../SkillsContextProvider';

jest.mock('react-truncate', () => ({
  __esModule: true,
  default: ({ children }) => children,
}));

jest.mock('react-loading-skeleton', () => ({
  __esModule: true,
  // eslint-disable-next-line react/prop-types
  default: (props = {}) => <div data-testid={props['data-testid']} />,
}));

/* eslint-disable react/prop-types */
const SearchCourseCardWithContext = ({
  initialAppState,
  initialSkillsState,
  searchContext,
  index,
}) => (
  <AppContext.Provider
    value={initialAppState}
  >
    <SearchContext.Provider value={searchContext}>
      <SkillsContext.Provider value={initialSkillsState}>
        <SearchCourseCard index={index} />
      </SkillsContext.Provider>
    </SearchContext.Provider>
  </AppContext.Provider>
);
/* eslint-enable react/prop-types */

const TEST_COURSE_KEY = 'test-course-key';
const TEST_TITLE = 'Test Title';
const TEST_CARD_IMG_URL = 'http://fake.image';
const TEST_PARTNER = {
  name: 'Partner Name',
  logo_image_url: TEST_IMAGE_URL,
};

const courses = {
  hits: [
    {
      key: TEST_COURSE_KEY,
      title: TEST_TITLE,
      card_image_url: TEST_CARD_IMG_URL,
      partners: [TEST_PARTNER],
      skill_names: [],
    },
  ],
};

const testIndex = {
  indexName: 'test-index-name',
  search: jest.fn().mockImplementation(() => Promise.resolve(courses)),
};

const initialAppState = {
  enterpriseConfig: {
    slug: 'test-enterprise-slug',
  },
};

const searchContext = {
  refinements: { skill_names: ['test-skill-1', 'test-skill-2'] },
};

const initialSkillsState = {
  state: {
    goal: 'Goal',
    selectedJob: 'job-1',
    interestedJobs: [
      {
        name: 'job-1',
        skills: [
          {
            name: 'test-skill-3',
          },
        ],
      },
    ],
  },
};

describe('<SearchCourseCard />', () => {
  test('renders the correct data', async () => {
    let containerDOM = {};
    await act(async () => {
      const { container } = renderWithRouter(
        <SearchCourseCardWithContext
          initialAppState={initialAppState}
          initialSkillsState={initialSkillsState}
          index={testIndex}
          searchContext={searchContext}
        />,
      );
      containerDOM = container;
    });

    expect(screen.getByText(TEST_TITLE)).toBeInTheDocument();
    expect(screen.getByAltText(TEST_PARTNER.name)).toBeInTheDocument();

    expect(containerDOM.querySelector('.course-card-result > a')).toHaveAttribute(
      'href',
      `/${TEST_ENTERPRISE_SLUG}/course/${TEST_COURSE_KEY}`,
    );
    expect(containerDOM.querySelector('p.partner')).toHaveTextContent(TEST_PARTNER.name);
    expect(containerDOM.querySelector('.card-img-top')).toHaveAttribute('src', TEST_CARD_IMG_URL);
  });

  test('renders the correct data with skills', async () => {
    const skillNames = ['Research', 'Algorithms'];
    const coursesWithSkills = {
      hits: [
        {
          key: TEST_COURSE_KEY,
          title: TEST_TITLE,
          card_image_url: TEST_CARD_IMG_URL,
          partners: [TEST_PARTNER],
          skill_names: skillNames,
        },
      ],
    };
    const courseIndex = {
      indexName: 'test-index-name',
      search: jest.fn().mockImplementation(() => Promise.resolve(coursesWithSkills)),
    };
    await act(async () => {
      renderWithRouter(
        <SearchCourseCardWithContext
          initialAppState={initialAppState}
          initialSkillsState={initialSkillsState}
          index={courseIndex}
          searchContext={searchContext}
        />,
      );
    });
    expect(screen.getByText(skillNames[0])).toBeInTheDocument();
    expect(screen.getByText(skillNames[1])).toBeInTheDocument();
  });
});