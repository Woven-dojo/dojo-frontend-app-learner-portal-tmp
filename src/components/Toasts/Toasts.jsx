import React, { useContext } from 'react';
import { Toast } from '@edx/paragon';

import { ToastsContext } from './utils';

const Toasts = () => {
  const { toasts, removeToast } = useContext(ToastsContext);
  return toasts.map(({ id, content, options }) => (
    <Toast key={id} {...options} onClose={() => removeToast(id)} show>
      {content}
    </Toast>
  ));
};

export default Toasts;
