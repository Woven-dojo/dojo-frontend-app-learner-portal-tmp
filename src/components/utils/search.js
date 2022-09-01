import React from 'react';
import {
  CONTENT_TYPE_COURSE, CONTENT_TYPE_PATHWAY,
  COURSE_TITLE, NUM_RESULTS_COURSE, NUM_RESULTS_PATHWAY,
  PATHWAY_TITLE,
} from '../search/constants';
import SearchCourseCard from '../search/SearchCourseCard';
import SearchPathwayCard from '../pathway/SearchPathwayCard';

export const getContentTypeFromTitle = (title) => {
  switch (title) {
      case COURSE_TITLE:
        return CONTENT_TYPE_COURSE;
      case PATHWAY_TITLE:
        return CONTENT_TYPE_PATHWAY;
      default:
          return null;
  }
};

export const getHitComponentFromTitle = (title) => {
  switch (title) {
      case COURSE_TITLE:
        return SearchCourseCard;
      case PATHWAY_TITLE:
        return SearchPathwayCard;
      default:
        return null;
  }
};

export const getNoOfResultsFromTitle = (title) => {
  switch (title) {
    case COURSE_TITLE:
      return NUM_RESULTS_COURSE;
    case PATHWAY_TITLE:
      return NUM_RESULTS_PATHWAY;
    default:
      return 0;
  }
};

export const getSkeletonCardFromTitle = (title) => {
  switch (title) {
      case COURSE_TITLE:
          // eslint-disable-next-line react/jsx-filename-extension
        return <SearchCourseCard.Skeleton />;
      case PATHWAY_TITLE:
        return <SearchPathwayCard.Skeleton />;
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
