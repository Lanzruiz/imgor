// Modules
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
// Styles
import './styles.scss';

const Radio = (props) => {
  const { children, name, value, className, ...rest } = props;
  const radioBtnContainer = cx('radio-btn__container radio-btn__container--regular', {
    'radio-btn__container--not-allowed': rest.disabled,
    'radio-btn__container--pointer': !rest.disabled,
    [className]: className,
  });
  return (
    <label className={radioBtnContainer}>
      <input
        {...rest}
        className="radio-btn__btn"
        type="radio"
        name={name}
        value={value}
      />
      {children}
    </label>
  );
};

Radio.propTypes = {
  name: PropTypes.string.isRequired
};

Radio.defaultProps = {};

export default Radio;
