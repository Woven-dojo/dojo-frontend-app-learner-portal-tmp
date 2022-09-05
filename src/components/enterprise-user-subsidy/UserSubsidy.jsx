import React, {
  createContext, useCallback, useContext, useMemo, useState,
} from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '@edx/frontend-platform/react';
import { Container } from '@edx/paragon';

import { LoadingSpinner } from '../loading-spinner';

import {
  useCatalogData, useLearningPathData,
} from './data/hooks';
import {
  LOADING_SCREEN_READER_TEXT, filterInitial, filterOptions, filterOptionsExpanded,
} from './data/constants';

export const UserSubsidyContext = createContext();

const UserSubsidy = ({ children }) => {
  const { enterpriseConfig } = useContext(AppContext);
  const [catalogFilter, setCatalogFilter] = useState(filterInitial);
  const [catalogData, isLoadingCatalogData] = useCatalogData({
    enterpriseId: enterpriseConfig.uuid,
    filter: catalogFilter,
  });
  const [learningPathData, isLoadingLearningPathdata] = useLearningPathData();

  const isLoading = isLoadingCatalogData || isLoadingLearningPathdata;

  const toggleFilter = useCallback((group, options) => {
    setCatalogFilter(currentFilter => {
      let newFilterValues = [...currentFilter[group]];
      const allOptions = filterOptionsExpanded[group] ? filterOptionsExpanded[group][options] : options;
      allOptions.forEach(option => {
        newFilterValues = newFilterValues.includes(option)
          ? newFilterValues.filter(value => value !== option) : [...newFilterValues, option];
      });
      return {
        ...currentFilter,
        [group]: newFilterValues,
      };
    });
  }, []);
  const contextValue = useMemo(
    () => {
      if (isLoading) {
        return {};
      }
      return {
        catalogData, // deprecated, please use catalog.data
        learningPathData,
        catalog: {
          data: catalogData,
          filter: {
            current: catalogFilter,
            options: filterOptions,
            toggle: toggleFilter,
          },
        },
      };
    },
    [
      isLoading,
      enterpriseConfig.uuid,
      catalogData,
      learningPathData,
      catalogFilter,
    ],
  );

  if (isLoading) {
    return (
      <Container className="py-5">
        <LoadingSpinner screenReaderText={LOADING_SCREEN_READER_TEXT} />
      </Container>
    );
  }
  return (
    <>
      {/* Render the children so the rest of the page shows */}
      <UserSubsidyContext.Provider value={contextValue}>
        {children}
      </UserSubsidyContext.Provider>
    </>
  );
};

UserSubsidy.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserSubsidy;
