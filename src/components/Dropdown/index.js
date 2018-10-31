// Modules
import React from 'react';
import PropTypes from 'prop-types';
import Img from 'react-image';
import OutsideClickHandler from 'react-outside-click-handler';
// Images
import arrowDownSmall from '../../assets/img/arrow-down-small.png';
// Styles
import './styles.scss';

export default class Dropdown extends React.Component {
  static propTypes = {
    options: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string,
      }),
    ).isRequired,
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    handleChange: PropTypes.func,
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
    const { options, selectedOption, handleChange, label } = this.props;
    const { isOpen } = this.state;
    return (
      <OutsideClickHandler onOutsideClick={this.closeDropdown}>
        <div className="dropdown__label" onClick={this.toggleDropdown}>{label}</div>
        <div className="dropdown__container" onClick={this.toggleDropdown}>
          <div className="dropdown__option dropdown__option--selected">
            {selectedOption}
            <Img src={arrowDownSmall} />
          </div>
          {isOpen && (
            <div className="dropdown__options">
              {options.map((option, idx) => (
                <div
                  className="dropdown__option"
                  key={idx}
                  children={option.value}
                  onClick={() => handleChange(option.value)}
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
