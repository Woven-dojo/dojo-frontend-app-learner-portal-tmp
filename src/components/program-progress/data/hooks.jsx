import { useEffect, useState } from 'react';
import { camelCaseObject } from '@edx/frontend-platform/utils';

import { reportFatalError } from '../../../utils/errorHandling';
import { getLearnerProgramProgressDetail } from './service';

export function useLearnerProgramProgressData(programUUID) {
  const [learnerProgramProgressData, setLearnerProgramProgressData] = useState();
  const [fetchError, setFetchError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      if (programUUID) {
        try {
          const data = await getLearnerProgramProgressDetail(programUUID);
          setLearnerProgramProgressData(data);
        } catch (error) {
          reportFatalError(error);
          setFetchError(error);
        }
      }
      return undefined;
    };
    fetchData();
  }, [programUUID]);
  return [camelCaseObject(learnerProgramProgressData), fetchError];
}
