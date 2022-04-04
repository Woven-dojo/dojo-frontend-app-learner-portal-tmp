import { useEffect, useState } from 'react';

import { activateLicense } from './service';
import { reportError } from '../../../utils/sentry';

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
        reportError(new Error(error));
        setActivationError(true);
        setActivationSuccess(false);
      });
  }, [activationKey]);

  return [activationSuccess, activationError];
}
