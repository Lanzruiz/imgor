// Modules
import React from 'react';

const SlideHeader = (props) => {
  return (
    <h3 className="step-six__slide-header">
      {props.children}
    </h3>
  );
};

SlideHeader.displayName = 'SlideHeader';

SlideHeader.propTypes = {};

SlideHeader.defaultProps = {};

export default SlideHeader;
