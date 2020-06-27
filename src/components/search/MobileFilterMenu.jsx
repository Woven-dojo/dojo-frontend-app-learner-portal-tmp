import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@edx/paragon';

import ClearCurrentRefinements from './ClearCurrentRefinements';

const MobileFilterMenu = ({ children, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={className}>
      {!isOpen && (
        <Button
          className="btn btn-block bg-white rounded-0 d-flex align-items-center justify-content-between"
          onClick={() => setIsOpen(true)}
        >
          <span className="mr-2">Filters</span>
          <FontAwesomeIcon icon={faCaretDown} />
        </Button>
      )}
      <div
        className={classNames(
          'modal fade mobile-filter-menu',
          { 'd-block show': isOpen },
          { 'd-none': !isOpen },
        )}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header d-flex align-items-center">
              <h5 className="modal-title text-center w-100">All Filters</h5>
              <Button
                buttonType="link"
                className="btn-close position-absolute px-2"
                onClick={() => setIsOpen(false)}
              >
                <FontAwesomeIcon
                  icon={faTimes}
                  id="icon-close-mobile-filter-menu"
                />
                <span className="sr-only">close filter menu</span>
              </Button>
            </div>
            <div className="modal-body p-0">
              {children}
            </div>
            <div className="modal-footer py-3">
              <div className="col">
                <ClearCurrentRefinements className="bg-white btn-block" />
              </div>
              <div className="col">
                <button
                  type="button"
                  className="btn btn-primary btn-brand-primary btn-block py-2 m-0"
                  onClick={() => setIsOpen(false)}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

MobileFilterMenu.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

MobileFilterMenu.defaultProps = {
  className: undefined,
};

export default MobileFilterMenu;
