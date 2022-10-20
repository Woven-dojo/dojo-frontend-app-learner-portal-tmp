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
  return getAuthenticatedHttpClient().post(url, { course_id: courseId });
};

export function fetchShowLearningPathFlag() {
  const config = getConfig();
  const slug = window.location.host.split('.')[0];
  const url = `${config.LMS_BASE_URL}/api/features/${slug}/`;
  const httpClient = getAuthenticatedHttpClient({
    useCache: config.USE_API_CACHE,
  });
  return httpClient.get(url);
}
