// Modules
import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
// Styles
import './styles.scss';

const TabRow = (props) => {
  const { transparent, className } = props;
  const tabRowClassNames = cx('tab-row', {
    'tab-row--transparent': transparent,
    [className]: className,
  });
  return (
    <div className={tabRowClassNames}>
      {props.children}
    </div>
  );
};

TabRow.propTypes = {
  transparent: PropTypes.bool,
  className: PropTypes.string,
};

TabRow.defaultProps = {
  transparent: false,
  className: '',
};

export default TabRow;
