// Modules
import React from 'react';
import cx from 'classnames';
// Styles
import './styles.scss';


const GreenBlock = (props) => {
  const { children, className } = props;
  const classNames = cx('green-block', { [className]: className });
  return (
    <div className={classNames}>
      {children}
    </div>
  );
};

export default GreenBlock;
