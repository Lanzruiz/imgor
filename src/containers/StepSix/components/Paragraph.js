// Modules
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const Paragraph = (props) => {
  const { children, small, medium, className } = props;
  const classNames = cx('step-six__paragraph', {
    'step-six__paragraph--small': small || (!small && !medium),
    'step-six__paragraph--medium': medium,
    [className]: className,
  });
  return (
    <p className={classNames}>
      {children}
    </p>
  );
};

Paragraph.displayName = 'Paragraph';

Paragraph.propTypes = {
  small: PropTypes.bool,
  medium: PropTypes.bool,
  className: PropTypes.string,
};

Paragraph.defaultProps = {};

export default Paragraph;
