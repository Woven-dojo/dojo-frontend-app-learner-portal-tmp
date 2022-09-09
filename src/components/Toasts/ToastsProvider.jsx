import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import { ToastsContext } from './utils';
import Toasts from './Toasts';

const ToastsProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (content, options = {}) => {
    setToasts((prevToasts) => [
      ...prevToasts,
      {
        id: uuidv4(),
        content,
        options,
      },
    ]);
  };

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastsContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <Toasts />
    </ToastsContext.Provider>
  );
};

ToastsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ToastsProvider;
