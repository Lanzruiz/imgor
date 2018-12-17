// Modules
import React from 'react';
import AnimateHeight from 'react-animate-height';
import PropTypes from 'prop-types';

export default class AnimateHeightComponent extends React.Component {
  static propTypes = {
    duration: PropTypes.number,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  static defaultProps = {
    duration: 500,
    height: 'auto',
  };

  render() {
    const { children, duration, height } = this.props;
    return (
      <AnimateHeight
        children={children}
        duration={duration}
        height={height}
      />
    );
  }
}
