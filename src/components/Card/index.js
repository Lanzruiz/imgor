// Modules
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Img from 'react-image';
// Components
import Button from '../Button';
import GreenBlock from '../GreenBlock';
// Styles
import './styles.scss';

const headerSizeEnum = {
  small: 'small',
  regular: 'regular',
  large: 'large',
};

const colorEnum = {
  'light-blue': 'light-blue',
  'dark-blue': 'dark-blue',
  'blue': 'blue',
  'red': 'red',
  'dark': 'dark',
};

class Card extends React.Component {
  static propTypes = {
    header: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string,
    ]),
    label: PropTypes.string,
    headerSize: PropTypes.oneOf([
      headerSizeEnum.small,
      headerSizeEnum.regular,
      headerSizeEnum.large,
    ]),
    color: PropTypes.oneOf([
      colorEnum['light-blue'],
      colorEnum['dark-blue'],
      colorEnum['blue'],
      colorEnum['red'],
      colorEnum['dark'],
    ]),
    via: PropTypes.bool,
    cardHeader: PropTypes.string,
    price: PropTypes.string,
    imgSrc: PropTypes.string,
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    onClick: PropTypes.func,
    selectedId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  };

  static defaultProps = {
    header: '',
    label: '',
    headerSize: headerSizeEnum.small,
    color: colorEnum['light-blue'],
    via: false,
    cardHeader: '',
    price: '0',
    imgSrc: '',
    onClick: () => {},
    selectedId: null,
  };

  render() {
    const {
      children, header, label, headerSize, color, cardHeader, price, imgSrc, id, onClick, selectedId,
    } = this.props;

    const isSelectedIdExists = (typeof selectedId === 'number' || typeof selectedId === 'string');
    const isCurrentCardSelected = (id === selectedId);

    const cardContainerClassNames = cx('card__container', {
      'card__container--opacity': isSelectedIdExists && !isCurrentCardSelected,
    });

    const headerClassNames = cx('card__header', {
      'card__header--small': headerSize === headerSizeEnum.small,
      'card__header--regular': headerSize === headerSizeEnum.regular,
      'card__header--large': headerSize === headerSizeEnum.large,
      [`card__header--${color}`]: true,
    });

    const cardBodyHeadClassNames = cx('card-body__head', {
      [`card-body__head--${color}`]: true,
    });

    const buttonClassNames = cx('card-body__button', {
      'card-body__button--regular': !isCurrentCardSelected,
      'card-body__button--selected': isCurrentCardSelected,
    });

    const contentBlockClassNames = cx('card-body__content', {
      'card-body__content--width-70': imgSrc,
      'card-body__content--width-100': !imgSrc,
    });

    return (
      <div className={cardContainerClassNames} onClick={() => onClick(id)}>
        <div className="card__head">
          <h2 className={headerClassNames}>{header}</h2>
          {this.renderLabel(label)}
        </div>
        <div className="card__body card-body">
          <div className={cardBodyHeadClassNames}>
            <h4 className="card-body__text">{cardHeader}</h4>
            <span className="card-body__text">&#36;{price}</span>
          </div>
          <div className="card-body__body">
            {this.renderImage(imgSrc)}
            <div className={contentBlockClassNames}>
              {children}
            </div>
          </div>
          <div className="card-body__footer">
            <Button
              children="selected"
              className={buttonClassNames}
            />
          </div>
        </div>
      </div>
    );
  }

  renderViaBlock = () => {
    const { via, headerSize } = this.props;
    const cardLabelViaClassName = cx('card-label__text card-label__text--serifa-bold', {
      'card-label__text--regular': headerSize === headerSizeEnum.small,
      'card-label__text--medium': headerSize === headerSizeEnum.large,
    });
    return via && (
      <span className="card-label__via">
        <span className={cardLabelViaClassName}>via</span>
        <span className="card-label__text card-label__text--small card-label__text--serifa-roman">approved</span>
      </span>
    );
  };

  renderLabel = (label) => {
    const { headerSize } = this.props;
    const cardLabelHeaderClassNames = cx('card-label__header', {
      'card-label__header--small': headerSize === headerSizeEnum.small,
      'card-label__header--regular': headerSize === headerSizeEnum.regular,
      'card-label__header--large': headerSize === headerSizeEnum.large,
    });
    return label && (
      <GreenBlock className="card__label card-label">
        <span className={cardLabelHeaderClassNames}>{label}</span>
        {this.renderViaBlock()}
      </GreenBlock>
    );
  };

  renderImage = (src) => src && (
    <div className="card-body__image">
      <Img
        className="card-body__image-item"
        src={src}
      />
    </div>
  );
}

export default Card;
