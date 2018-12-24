// Modules
import React from 'react';
import Img from 'react-image';
import VisibilitySensor from 'react-visibility-sensor';
import cx from 'classnames';
// Styles
import './styles.scss';

export default class Image extends React.Component {
  state = {
    landscape: false,
    portrait: false,
    square: false,
  };

  render() {
    const { src, alt } = this.props;
    const { landscape, portrait, square } = this.state;
    const imageContainerClassNames = cx('image__container', {
      'image__container--landscape': landscape,
      'image__container--portrait': portrait,
      'image__container--square': square,
    });
    return (
      <VisibilitySensor>
        <Img
          className={imageContainerClassNames}
          onLoad={this.onImgLoad}
          src={src}
          alt={alt}
        />
      </VisibilitySensor>
    );
  }

  onImgLoad = ({ target: img }) => {
    this.setState({
      landscape: img.offsetWidth > img.offsetHeight,
      portrait: img.offsetWidth < img.offsetHeight,
      square: img.offsetWidth === img.offsetHeight,
    });
  }
}

