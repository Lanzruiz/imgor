// Modules
import React from 'react';
import PropTypes from 'prop-types';
// Styles
import './styles.scss';

const Radio = (props) => {
  const { children, name, ...rest } = props;
  return (
    <label className="radio-btn__container radio-btn__container--regular">
      <input
        {...rest}
        className="radio-btn__btn"
        type="radio"
        name={name}
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
