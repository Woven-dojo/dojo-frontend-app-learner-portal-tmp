import { hasFeatureFlagEnabled } from '@edx/frontend-enterprise-utils';

import {
  FEATURE_ENROLL_WITH_CODES,
  FEATURE_ENABLE_PATHWAYS,
  FEATURE_ENABLE_AUTO_APPLIED_LICENSES,
  FEATURE_BROWSE_AND_REQUEST,
} from './constants';

const features = {
  ENABLE_AUTO_APPLIED_LICENSES: (
    process.env.ENABLE_AUTO_APPLIED_LICENSES || hasFeatureFlagEnabled(FEATURE_ENABLE_AUTO_APPLIED_LICENSES)
  ),
  ENROLL_WITH_CODES: process.env.FEATURE_ENROLL_WITH_CODES || hasFeatureFlagEnabled(FEATURE_ENROLL_WITH_CODES),
  ENABLE_PATHWAYS: process.env.FEATURE_ENABLE_PATHWAYS || hasFeatureFlagEnabled(FEATURE_ENABLE_PATHWAYS),
  FEATURE_BROWSE_AND_REQUEST: process.env.FEATURE_BROWSE_AND_REQUEST
    || hasFeatureFlagEnabled(FEATURE_BROWSE_AND_REQUEST),
};

export { features };
