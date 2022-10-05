import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function DashboardDrawer({ children, open }) {
  return (
    <div className="drawer-wrap">
      <div tabIndex="-1" className={classNames('drawer', { 'drawer-hidden': !open }, { 'drawer-animate': open })}>
        {children}
      </div>
    </div>
  );
}

DashboardDrawer.propTypes = {
  children: PropTypes.node,
  open: PropTypes.bool.isRequired,
};

DashboardDrawer.defaultProps = {
  children: null,
};
