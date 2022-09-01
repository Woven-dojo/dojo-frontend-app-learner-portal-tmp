import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function DashboardDrawer({
  children,
  open,
  onClose,
}) {
  return (
    <div className="drawer-wrap">
      <div
        className={classNames('drawer-overlay', { 'drawer-overlay-hidden': !open }, { 'drawer-overlay-open': open })}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        tabIndex="-1"
        className={classNames('drawer', { 'drawer-hidden': !open }, { 'drawer-animate': open })}
      >
        {children}
      </div>
    </div>
  );
}

DashboardDrawer.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
