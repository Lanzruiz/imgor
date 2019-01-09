// Modules
import React from 'react';
import PropTypes from 'prop-types';
import OutsideClickHandler from 'react-outside-click-handler';
// Components
import AnimatedHeightComponent from '../AnimateHeightComponent';
// Styles
import './styles.scss';

export default class Dropdown extends React.Component {
  static propTypes = {
    options: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        display_name: PropTypes.string,
        name: PropTypes.string,
      }),
    ).isRequired,
    handleChange: PropTypes.func,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    whiteArrow: PropTypes.bool,
  };

  static defaultProps = {
    options: [],
    selectedOption: 'select',
    handleChange: () => {},
    label: '',
  };

  state = {
    isOpen: false,
  };

  render() {
    const { whiteArrow, options, selectedOption, handleChange, label } = this.props;
    const { isOpen } = this.state;
    const image = whiteArrow
      ? <span className="icon-arrow-down2 white-background" />
      : <span className="icon-arrow-down2" />;
    
    return (
      <OutsideClickHandler onOutsideClick={this.closeDropdown}>
        <div className="dropdown__label" onClick={this.toggleDropdown}>{label}</div>
        <div className="dropdown__container" onClick={this.toggleDropdown}>
          <div className="dropdown__option dropdown__option--selected">
            {selectedOption}
            {image}
          </div>
          <AnimatedHeightComponent>
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
          </AnimatedHeightComponent>
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
