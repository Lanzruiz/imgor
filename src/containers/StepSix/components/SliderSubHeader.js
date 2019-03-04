// Modules
import React from 'react';

const SliderSubHeader = (props) => {
  return (
    <h4 className="step-six__slide-sub-header">
      {props.children}
    </h4>
  );
};

SliderSubHeader.displayName = 'SliderSubHeader';

SliderSubHeader.propTypes = {};

SliderSubHeader.defaultProps = {};

export default SliderSubHeader;
