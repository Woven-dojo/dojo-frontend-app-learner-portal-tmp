import React from 'react';
import '@testing-library/jest-dom';
import { screen, act } from '@testing-library/react';
import { AppContext } from '@edx/frontend-platform/react';
import '@testing-library/jest-dom/extend-expect';
import { SearchContext } from '@edx/frontend-enterprise-catalog-search';
import { UserSubsidyContext } from '../../enterprise-user-subsidy';
import SearchProgramCard from '../SearchProgramCard';

import { renderWithRouter } from '../../../utils/tests';
import { TEST_ENTERPRISE_SLUG } from '../../search/tests/constants';
import { NO_PROGRAMS_ALERT_MESSAGE } from '../constants';
import { SkillsContext } from '../SkillsContextProvider';

const userId = 'batman';

jest.mock('@edx/frontend-platform/auth', () => ({
  ...jest.requireActual('@edx/frontend-platform/auth'),
  getAuthenticatedUser: () => ({ username: 'b.wayne', userId }),
}));

jest.mock('@edx/frontend-enterprise-utils', () => ({
  ...jest.requireActual('@edx/frontend-enterprise-utils'),
  sendEnterpriseTrackEvent: jest.fn(),
}));

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
const SearchProgramCardWithContext = ({
  initialAppState,
  initialSkillsState,
  initialUserSubsidyState,
  searchContext,
  index,
}) => (
  <AppContext.Provider value={initialAppState}>
    <UserSubsidyContext.Provider value={initialUserSubsidyState}>
      <SearchContext.Provider value={searchContext}>
        <SkillsContext.Provider value={initialSkillsState}>
          <SearchProgramCard index={index} />
        </SkillsContext.Provider>
      </SearchContext.Provider>
    </UserSubsidyContext.Provider>
  </AppContext.Provider>
);
/* eslint-enable react/prop-types */

const PROGRAM_UUID = 'a9cbdeb6-5fc0-44ef-97f7-9ed605a149db';
const PROGRAM_TITLE = 'Intro to BatVerse';
const PROGRAM_TYPE_DISPLAYED = 'MicroMasters® Program';
const PROGRAM_CARD_IMG_URL = 'http://card.image';
const PROGRAM_PARTNER_LOGO_IMG_URL = 'http://logo.image';
const PROGRAM_COURSES_COUNT_TEXT = '2 Courses';
const PROGRAM_AUTHOR_ORG = {
  key: 'Hogwarts',
  name: 'Hogwarts',
  logo_image_url: PROGRAM_PARTNER_LOGO_IMG_URL,
};
const TEST_COURSE_KEYS = ['HarvardX+CS50x', 'HarvardX+CS50AI'];

const programs = {
  hits: [
    {
      aggregation_key: `program:${PROGRAM_UUID}`,
      authoring_organizations: [
        PROGRAM_AUTHOR_ORG,
      ],
      card_image_url: PROGRAM_CARD_IMG_URL,
      course_keys: TEST_COURSE_KEYS,
      title: PROGRAM_TITLE,
      type: 'MicroMasters',
      skill_names: [],
    },
  ],
  nbHits: 1,
};

const testIndex = {
  indexName: 'test-index-name',
  search: jest.fn().mockImplementation(() => Promise.resolve(programs)),
};

const initialAppState = {
  enterpriseConfig: {
    slug: TEST_ENTERPRISE_SLUG,
    uuid: '5d3v5ee2-761b-49b4-8f47-f6f51589d815',
  },
};

const searchContext = {
  refinements: { skill_names: ['test-skill-1', 'test-skill-2'] },
  dispatch: () => null,
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
            name: 'test-skill-1',
          },
          {
            name: 'test-skill-2',
          },
        ],
      },
    ],
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

describe('<SearchProgramCard />', () => {
  test('renders the correct data', async () => {
    let containerDOM = {};
    await act(async () => {
      const { container } = renderWithRouter(
        <SearchProgramCardWithContext
          initialAppState={initialAppState}
          initialSkillsState={initialSkillsState}
          initialUserSubsidyState={initialUserSubsidyState}
          index={testIndex}
          searchContext={searchContext}
        />,
      );
      containerDOM = container;
    });

    expect(screen.getByText(PROGRAM_TITLE)).toBeInTheDocument();
    expect(screen.getByAltText(PROGRAM_AUTHOR_ORG.name)).toBeInTheDocument();

    expect(containerDOM.querySelector('.search-result-card > a')).toHaveAttribute(
      'href',
      `/${TEST_ENTERPRISE_SLUG}/program/${PROGRAM_UUID}`,
    );

    expect(containerDOM.querySelector('p.partner')).toHaveTextContent(PROGRAM_AUTHOR_ORG.name);
    expect(containerDOM.querySelector('.card-img-top')).toHaveAttribute('src', PROGRAM_CARD_IMG_URL);
    expect(containerDOM.querySelector('.partner-logo')).toHaveAttribute('src', PROGRAM_PARTNER_LOGO_IMG_URL);
    expect(containerDOM.querySelector('span.badge-text')).toHaveTextContent(PROGRAM_TYPE_DISPLAYED);
    expect(containerDOM.querySelector('span.program-courses-count-text')).toHaveTextContent(PROGRAM_COURSES_COUNT_TEXT);
  });

  test('renders the correct data with skills', async () => {
    const skillNames = ['test-skill-1', 'test-skill-2'];
    const programWithSkills = {
      hits: [
        {
          aggregation_key: `program:${PROGRAM_UUID}`,
          authoring_organizations: [
            PROGRAM_AUTHOR_ORG,
          ],
          card_image_url: PROGRAM_CARD_IMG_URL,
          course_keys: TEST_COURSE_KEYS,
          title: PROGRAM_TITLE,
          type: 'MicroMasters',
          skill_names: skillNames,
        },
      ],
      nbHits: 1,
    };
    const index = {
      indexName: 'test-index-name',
      search: jest.fn().mockImplementation(() => Promise.resolve(programWithSkills)),
    };
    await act(async () => {
      renderWithRouter(
        <SearchProgramCardWithContext
          initialAppState={initialAppState}
          initialSkillsState={initialSkillsState}
          initialUserSubsidyState={initialUserSubsidyState}
          index={index}
          searchContext={searchContext}
        />,
      );
    });
    expect(screen.getByText(skillNames[0])).toBeInTheDocument();
    expect(screen.getByText(skillNames[1])).toBeInTheDocument();
  });

  test('only show course skills that match job-skills', async () => {
    const irrelevantSkill = 'test-skills-3';
    const skillNames = ['test-skill-1', 'test-skill-2'];
    skillNames.push(irrelevantSkill);
    const programWithSkills = {
      hits: [
        {
          aggregation_key: `program:${PROGRAM_UUID}`,
          authoring_organizations: [
            PROGRAM_AUTHOR_ORG,
          ],
          card_image_url: PROGRAM_CARD_IMG_URL,
          course_keys: TEST_COURSE_KEYS,
          title: PROGRAM_TITLE,
          type: 'MicroMasters',
          skill_names: skillNames,
        },
      ],
      nbHits: 1,
    };
    const index = {
      indexName: 'test-index-name',
      search: jest.fn().mockImplementation(() => Promise.resolve(programWithSkills)),
    };
    await act(async () => {
      renderWithRouter(
        <SearchProgramCardWithContext
          initialAppState={initialAppState}
          initialSkillsState={initialSkillsState}
          initialUserSubsidyState={initialUserSubsidyState}
          index={index}
          searchContext={searchContext}
        />,
      );
    });
    expect(screen.getByText(skillNames[0])).toBeInTheDocument();
    expect(screen.getByText(skillNames[1])).toBeInTheDocument();
    expect(screen.queryByText(irrelevantSkill)).not.toBeInTheDocument();
  });

  test('renders an alert in case of no programs returned', async () => {
    const noPrograms = {
      hits: [],
      nbHits: 0,
    };
    const index = {
      indexName: 'test-index-name',
      search: jest.fn().mockImplementation(() => Promise.resolve(noPrograms)),
    };
    await act(async () => {
      renderWithRouter(
        <SearchProgramCardWithContext
          initialAppState={initialAppState}
          initialSkillsState={initialSkillsState}
          initialUserSubsidyState={initialUserSubsidyState}
          index={index}
          searchContext={searchContext}
        />,
      );
    });
    expect(screen.getByText(NO_PROGRAMS_ALERT_MESSAGE)).toBeTruthy();
  });
});