// Modules
import React from 'react';
import Slider from 'react-slick';
// Styles
import './styles.scss';

export default class Carousel extends React.Component {
  render() {
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      draggable: false,
    };

    return (
      <div className="carousel__container">
        <Slider {...settings}>
          {this.props.children}
        </Slider>
      </div>
    );
  }
}

export function CarouselItem(props) {
  return (
    <div className="carousel__item">
      {props.children}
    </div>
  );
};
