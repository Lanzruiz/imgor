// Modules
import React from 'react';
import Img from 'react-image';
import VisibilitySensor from 'react-visibility-sensor';
import cx from 'classnames';
// Components
import { ReactLocalizationConsumer } from '../../providers/ReactLocalization';
// Styles
import './styles.scss';

export default class Image extends React.Component {
  state = {
    landscape: true,
    portrait: false,
    square: false,
  };

  render() {
    const { src, alt, defaultSrc } = this.props;
    const { landscape, portrait, square } = this.state;
    const imageContainerClassNames = cx('image__container', {
      'image__container--landscape': landscape,
      'image__container--portrait': portrait,
      'image__container--square': square,
    });
    return (
      <ReactLocalizationConsumer>
        {({ strings }) => {
          if (strings) {
            return (
              <VisibilitySensor>
                <Img
                  className={imageContainerClassNames}
                  onLoad={this.onImgLoad}
                  src={strings[src] ? strings[src] : defaultSrc}
                  alt={alt}
                  data-aos="zoom-in"
                  data-delay="800"
                />
              </VisibilitySensor>
            );
          }
        }}
      </ReactLocalizationConsumer>
    );
  }

  onImgLoad = ({ target: img }) => {
    const isLandscape = img.offsetWidth > img.offsetHeight;
    const isPortrait = img.offsetWidth < img.offsetHeight;
    const isSquare = img.offsetWidth === img.offsetHeight;
    if (!isLandscape) {
      this.setState({
        landscape: isLandscape,
        portrait: isPortrait,
        square: isSquare,
      });
    }
  }
}

