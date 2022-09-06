import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { getConfig } from '@edx/frontend-platform/config';

export const fetchEnterpriseCatalogData = (uuid) => {
  const config = getConfig();
  const url = `${config.LMS_BASE_URL}/dojo_enterprise_catalog/api/catalog/${uuid}/`;
  return getAuthenticatedHttpClient().get(url);
};

export const fetchLearningPathData = () => {
  const config = getConfig();
  const url = `${config.LMS_BASE_URL}/dojo_enterprise_catalog/api/learner-courses/`;
  return getAuthenticatedHttpClient().get(url);
};

export const requestCourse = (courseId) => {
  const config = getConfig();
  const url = `${config.LMS_BASE_URL}/dojo_enterprise_catalog/api/learner-courses/request-access/`;
  return getAuthenticatedHttpClient().post(
    url,
    { course_id: courseId },
  );
};
