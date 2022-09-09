import { useContext } from 'react';
import { ToastsContext } from './utils';

export const useToast = () => {
  const context = useContext(ToastsContext);

  return {
    addToast: (content, options = {}) => {
      context.addToast(content, options);
    },
  };
};
