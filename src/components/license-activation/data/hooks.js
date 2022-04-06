import { useEffect, useState } from 'react';

import { activateLicense } from './service';
import { reportFatalError } from '../../../utils/errorHandling';

export function useLicenseActivation(activationKey) {
  const [activationSuccess, setActivationSuccess] = useState(false);
  const [activationError, setActivationError] = useState(false);

  useEffect(() => {
    activateLicense(activationKey)
      .then(() => {
        setActivationSuccess(true);
        setActivationError(false);
      })
      .catch((error) => {
        reportFatalError(new Error(error));
        setActivationError(true);
        setActivationSuccess(false);
      });
  }, [activationKey]);

  return [activationSuccess, activationError];
}
