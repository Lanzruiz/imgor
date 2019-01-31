// Modules
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
// Styles
import './styles.scss';

const Checkbox = (props) => {
  const { children, name, className, ...rest } = props;
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
        type="checkbox"
        name={name}
        onBlur={() => {}}
        onFocus={() => {}}
        checked={props.checked}
        onChange={() => { props.onChange(!props.checked) }}
      />
      {children}
    </label>
  );
};

Checkbox.propTypes = {
  name: PropTypes.string.isRequired
};

Checkbox.defaultProps = {};

export default Checkbox;
