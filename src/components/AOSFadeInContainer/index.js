// Modules
import React from 'react';
import VisibilitySensor from 'react-visibility-sensor';

class AOSFadeInContainer extends React.Component {
  render() {
    const { children, ...rest } = this.props;
    return (
      <VisibilitySensor>
        <div
          children={children}
          data-aos="fade-down"
          data-aos-offset="200"
          data-aos-duration="400"
          data-aos-easing="linear"
          data-aos-delay="200"
          {...rest}
        />
      </VisibilitySensor>
    );
  }
};

export default AOSFadeInContainer;
