// Modules
import React from 'react';
// Styles
import './styles.scss';

const TabRowHeader = ({ children, ...rest }) => {
  return (
    <span
      className="tab-row-group-header"
      children={children}
      {...rest}
    />
  );
};

TabRowHeader.displayName = 'TabRowHeader';

export default TabRowHeader;
