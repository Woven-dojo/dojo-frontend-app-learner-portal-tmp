import { useEffect, useState } from 'react';
import { camelCaseObject } from '@edx/frontend-platform/utils';

import { reportError } from '../../../utils/sentry';
import ProgramService from './service';

export function useAllProgramData({ enterpriseUuid, programUuid }) {
  const [programData, setProgramData] = useState();
  const [fetchError, setFetchError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      if (programUuid) {
        const programService = new ProgramService({ enterpriseUuid, programUuid });
        try {
          const data = await programService.fetchAllProgramData();
          setProgramData(data);
        } catch (error) {
          reportError(error);
          setFetchError(error);
        }
      }
      return undefined;
    };
    fetchData();
  }, [programUuid]);
  return [camelCaseObject(programData), fetchError];
}
