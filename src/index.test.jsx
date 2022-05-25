import React from 'react';
import { render, screen } from '@testing-library/react';
import AxiosMockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { mergeConfig, getConfig, setConfig } from '@edx/frontend-platform/config';
import { initializeMockApp, history } from '@edx/frontend-platform';
import { App } from './components/app';
import { delay } from './utils/common';

const mergeTestConfig = () => mergeConfig({
  USE_API_CACHE: process.env.USE_API_CACHE || null,
  ENTERPRISE_ACCESS_BASE_URL: process.env.ENTERPRISE_ACCESS_BASE_URL || null,
  ENTERPRISE_CATALOG_API_BASE_URL: process.env.ENTERPRISE_CATALOG_API_BASE_URL || null,
  LICENSE_MANAGER_URL: process.env.LICENSE_MANAGER_URL || null,
  ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID || null,
  ALGOLIA_SEARCH_API_KEY: process.env.ALGOLIA_SEARCH_API_KEY || null,
  ALGOLIA_INDEX_NAME: process.env.ALGOLIA_INDEX_NAME || null,
  ALGOLIA_INDEX_NAME_JOBS: process.env.ALGOLIA_INDEX_NAME_JOBS || null,
  INTEGRATION_WARNING_DISMISSED_COOKIE_NAME: process.env.INTEGRATION_WARNING_DISMISSED_COOKIE_NAME || null,
  IS_MAINTENANCE_ALERT_ENABLED: process.env.IS_MAINTENANCE_ALERT_ENABLED || null,
  MAINTENANCE_ALERT_MESSAGE: process.env.MAINTENANCE_ALERT_MESSAGE || null,
  MAINTENANCE_ALERT_START_TIMESTAMP: process.env.MAINTENANCE_ALERT_START_TIMESTAMP || null,
  ENABLE_SKILLS_QUIZ: process.env.ENABLE_SKILLS_QUIZ || false,
  ENABLE_NOTICES: process.env.ENABLE_NOTICES || null,
  LEARNER_SUPPORT_URL: process.env.LEARNER_SUPPORT_URL || null,
  SENTRY_DSN: process.env.SENTRY_DSN || null,
  SENTRY_ENVIRONMENT: process.env.SENTRY_ENVIRONMENT || '',
  SENTRY_PROJECT_ENV_PREFIX: 'dojo-frontend-app-learner-portal',
});

const axiosMock = new AxiosMockAdapter(axios);
const {
  ECOMMERCE_BASE_URL,
  LMS_BASE_URL,
  LICENSE_MANAGER_URL,
} = process.env;

const ENTERPRISE_SLUG = 'test-enterprise-id';
const ENTERPRISE_UUID = '55b3a044-c9f9-4550-9ce4-3ab366b2e9a6';
const SUBSCRIPTION_UUID = ENTERPRISE_UUID;
const ENTERPRISE_CUSTOMER_UUID = ENTERPRISE_UUID;
const ENTERPRISE_CATALOG_UUID = 'f62ce957-8f5a-452d-bc79-b5ef2651aab8';

const ENTERPRISE = {
  uuid: ENTERPRISE_UUID,
  name: 'Test Enterprise',
  slug: ENTERPRISE_SLUG,
  active: true,
  site: { domain: 'example.com', name: 'example.com' },
  enable_data_sharing_consent: true,
  enforce_data_sharing_consent: 'at_enrollment',
  branding_configuration: {
    enterprise_customer: ENTERPRISE_CUSTOMER_UUID,
    enterprise_slug: ENTERPRISE_SLUG,
    logo: 'http://localhost:18000/static/dojo-theme/images/logo.png',
    primary_color: '#00262B',
    secondary_color: '#EFF8FA',
    tertiary_color: '#0A7DA3',
  },
  identity_provider: null,
  enable_audit_enrollment: false,
  replace_sensitive_sso_username: false,
  enable_portal_code_management_screen: true,
  sync_learner_profile_data: false,
  enable_audit_data_reporting: false,
  enable_learner_portal: true,
  enable_portal_reporting_config_screen: true,
  enable_portal_saml_configuration_screen: true,
  contact_email: null,
  enable_portal_subscription_management_screen: true,
  hide_course_original_price: false,
  enable_analytics_screen: false,
  enable_integrated_customer_learner_portal_search: true,
  enable_portal_lms_configurations_screen: true,
  sender_alias: null,
  identity_providers: [],
  enterprise_customer_catalogs: [ENTERPRISE_CATALOG_UUID],
  reply_to: null,
  enterprise_notification_banner: { title: '', text: '' },
  hide_labor_market_data: false,
};

const ENTERPRISE_CUSTOMER_REPLY = {
  next: null,
  previous: null,
  count: 1,
  num_pages: 1,
  current_page: 1,
  start: 0,
  results: [ENTERPRISE],
};
axiosMock.onGet(new RegExp(`${LMS_BASE_URL}/enterprise/api/v1/enterprise-customer/*`))
  .reply(200, ENTERPRISE_CUSTOMER_REPLY);

const OFFER_ASSIGNMENT_SUMMARY_REPLY = {
  count: 0,
  current_page: 1,
  next: null,
  num_pages: 1,
  previous: null,
  results: [],
  start: 0,
};
axiosMock.onGet(`${ECOMMERCE_BASE_URL}/offer_assignment_summary/`)
  .reply(200, OFFER_ASSIGNMENT_SUMMARY_REPLY);

const CATALOGS_REPLY = {
  enterprise_uuid: ENTERPRISE_UUID,
  programs: [],
  subscription_uuid: SUBSCRIPTION_UUID,
};
axiosMock.onGet(new RegExp(`${LMS_BASE_URL}/api/catalogs/*`))
  .reply(200, CATALOGS_REPLY);

const CUSTOMER_AGREEMENT_REPLY = {
  count: 0,
  next: null,
  previous: null,
  results: [],
};
axiosMock.onGet(`${LICENSE_MANAGER_URL}/api/v1/customer-agreement/`)
  .reply(200, CUSTOMER_AGREEMENT_REPLY);

const generateProfileImage = () => {
  const profileImage = { hasImage: false };
  const sizes = {
    largeUrlFull: 500,
    largeUrlLarge: 100,
    largeUrlMedium: 50,
    largeUrlSmall: 30,
  };

  Object.entries(sizes).forEach(([field, size]) => {
    profileImage[field] = `${LMS_BASE_URL}/static/images/profile/default_${size}.png`;
  });

  return profileImage;
};

jest.mock('./colors.scss', () => ({
  dark: 'grey',
  white: 'white',
  primary: 'blue',
  info100: 'blue',
  info500: 'blue',
}));

describe('Smoke test', () => {
  let prevConfig = {};

  afterAll(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    prevConfig = getConfig();
    mergeTestConfig();
  });

  afterEach(() => {
    setConfig(prevConfig);
  });

  it('Page renders', async () => {
    history.push({ pathname: ENTERPRISE_SLUG });

    initializeMockApp({
      messages: [],
      authenticatedUser: {
        username: 'jobread',
        name: 'John Doe',
        roles: [],
        profileImage: generateProfileImage(),
      },
    });

    render(<App />);

    // wait for loading;
    await delay(5000);

    expect(screen.getByText(ENTERPRISE.name));
  });
});
