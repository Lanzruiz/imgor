// Modules
import React from 'react';
import PropTypes from 'prop-types';
import Img from 'react-image';
import OutsideClickHandler from 'react-outside-click-handler';
// Images
import arrowDownSmall from '../../assets/img/arrow-down-small.png';
import arrowDownSmallWhite from '../../assets/img/arrow-down-white.png';
// Styles
import './styles.scss';

export default class Dropdown extends React.Component {
  static propTypes = {
    options: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        display_name: PropTypes.string,
        name: PropTypes.string,
      }),
    ).isRequired,
    handleChange: PropTypes.func,
    label: PropTypes.string,
    whiteArrow: PropTypes.bool,
  };

  static defaultProps = {
    options: [],
    selectedOption: 'select',
    handleChange: () => {},
  };

  state = {
    isOpen: false,
  };

  render() {
    const { whiteArrow, options, selectedOption, handleChange, label } = this.props;
    const { isOpen } = this.state;
    const image = whiteArrow ? arrowDownSmallWhite : arrowDownSmall;
    // TODO: Write handler to select option
    return (
      <OutsideClickHandler onOutsideClick={this.closeDropdown}>
        <div className="dropdown__label" onClick={this.toggleDropdown}>{label}</div>
        <div className="dropdown__container" onClick={this.toggleDropdown}>
          <div className="dropdown__option dropdown__option--selected">
            {selectedOption}
            <Img src={image} />
          </div>
          {isOpen && (
            <div className="dropdown__options">
              {options.map(({ id, display_name }) => (
                <div
                  className="dropdown__option"
                  key={id}
                  children={display_name}
                  onClick={() => handleChange(id)}
                />
              ))}
            </div>
          )}
        </div>
      </OutsideClickHandler>
    );
  }

  toggleDropdown = () => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  };

  closeDropdown = () => {
    if (this.state.isOpen) {
      this.setState(() => ({ isOpen: false }));
    }
  }
}
