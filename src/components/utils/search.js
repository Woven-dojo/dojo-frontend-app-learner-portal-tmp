import React from 'react';
import {
  CONTENT_TYPE_COURSE, COURSE_TITLE, NUM_RESULTS_COURSE,
} from '../search/constants';
import SearchCourseCard from '../search/SearchCourseCard';

export const getContentTypeFromTitle = (title) => {
  switch (title) {
      case COURSE_TITLE:
        return CONTENT_TYPE_COURSE;
      default:
          return null;
  }
};

export const getHitComponentFromTitle = (title) => {
  switch (title) {
      case COURSE_TITLE:
        return SearchCourseCard;
      default:
        return null;
  }
};

export const getNoOfResultsFromTitle = (title) => {
  switch (title) {
    case COURSE_TITLE:
      return NUM_RESULTS_COURSE;
    default:
      return 0;
  }
};

export const getSkeletonCardFromTitle = (title) => {
  switch (title) {
      case COURSE_TITLE:
          // eslint-disable-next-line react/jsx-filename-extension
        return <SearchCourseCard.Skeleton />;
      default:
        return null;
  }
};

export const getNoResultsMessage = (title) => {
  const lowerCaseTitle = title.toLowerCase();
  return {
    messageTitle: `No ${lowerCaseTitle} were found to match your search results.`,
    messageContent: `Check out some popular ${lowerCaseTitle} below.`,
  };
};

export const getSearchErrorMessage = (title) => {
  const lowerCaseTitle = title.toLowerCase();
  return {
    messageTitle: `An error occured while finding ${lowerCaseTitle} that match your search.`,
    messageContent: 'Please try again later.',
  };
};
