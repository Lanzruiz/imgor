// Modules
import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
// Styles
import './styles.scss';

const Button = (props) => {
  const { className, children, buttonClassName, type, onClick, ...rest } = props;
  const buttonClassNames = cx('button', {
    [buttonClassName]: buttonClassName,
  });
  return (
    <div className={className} {...rest}>
      <button type={type} className={buttonClassNames} onClick={onClick}>
        {children}
      </button>
    </div>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  buttonClassName: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
};

Button.defaultProps = {
  className: '',
  buttonClassName: '',
  type: 'button',
  onClick: () => {},
  style: {},
};

export default Button;
