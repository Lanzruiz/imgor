// Modules
import React from 'react';
import Slider from 'react-slick';
import { CSSTransitionGroup } from 'react-transition-group';
// Styles
import './slick.scss';
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
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
    };

    return (
      <CSSTransitionGroup
        component="div"
        className="h-100"
        transitionName="slide"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
      >
        {this.props.render && (
          <div className="slick-wrapper carousel carousel__container">
            <Slider {...settings}>
              {this.props.children}
            </Slider>
          </div>
        )}
      </CSSTransitionGroup>
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

function NextArrow({ onClick, style, className }) {
  return (
    <button
      type="button"
      data-role="none"
      style={style}
      className={className}
      children={<span className="icon-arrow-right"/>}
      onClick={onClick}
    />
  );
};

function PrevArrow({ onClick, style, className }) {
  return (
    <button
      type="button"
      data-role="none"
      style={style}
      className={className}
      children={<span className="icon-arrow-left"/>}
      onClick={onClick}
    />
  );
}
