// Modules
import React from 'react';
import PropTypes from 'prop-types';
// Styles
import './styles.scss';

const Header = (props) => {
  const { header, subHeader } = props;
  return (
    <div className="header__container">
      <h2 className="header__h2">{header}</h2>
      <h6 className="header__h6">{subHeader}</h6>
    </div>
  );
};

Header.propTypes = {
  header: PropTypes.string,
  subHeader: PropTypes.string,
};

Header.defaultProps = {
  header: '',
  subHeader: '',
};

export default Header;
