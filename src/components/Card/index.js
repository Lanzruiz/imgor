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
  extraSmall: 'extra-small',
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
    label: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string,
    ]),
    headerSize: PropTypes.oneOf([
      headerSizeEnum.extraSmall,
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
    cardHeader: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string,
    ]),
    price: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
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
    priceDescription: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
    buttonBlock: PropTypes.bool,
    priceBlock: PropTypes.bool,
    cardHeaderCapitalize: PropTypes.bool,
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
    priceDescription: '',
    buttonBlock: true,
    priceBlock: true,
    cardHeaderCapitalize: false,
  };

  render() {
    const {
      children, header, label, headerSize, color, cardHeader, imgSrc, id, onClick, selectedId, priceDescription, cardHeaderCapitalize, style,
    } = this.props;

    const isSelectedIdExists = (typeof selectedId === 'number' || typeof selectedId === 'string');
    const isCurrentCardSelected = (id === selectedId);

    const cardContainerClassNames = cx('card__container', {
      'card__container--opacity': isSelectedIdExists && !isCurrentCardSelected,
    });

    const cardBodyHeadClassNames = cx('card-body__head', {
      [`card-body__head--${color}`]: true,
      'card-body__head--flex-end': priceDescription,
    });

    const buttonClassNames = cx('card-body__button', {
      'card-body__button--regular': !isCurrentCardSelected,
      'card-body__button--selected': isCurrentCardSelected,
    });

    const contentBlockClassNames = cx('card-body__content', {
      'card-body__content--width-70': imgSrc,
      'card-body__content--width-100': !imgSrc,
    });

    const cardHeaderClassNames = cx('card-body__text', {
      'card-body__text--capitalize': cardHeaderCapitalize,
    });

    return (
      <div className={cardContainerClassNames} onClick={() => onClick(id)} style={style}>
        {this.renderCardHead({ header, label, headerSize, color })}
        <div className="card__body card-body">
          <div className={cardBodyHeadClassNames}>
            <h4 className={cardHeaderClassNames}>{cardHeader}</h4>
            {this.renderPriceBlock(priceDescription)}
          </div>
          <div className="card-body__body">
            {this.renderImage(imgSrc)}
            <div className={contentBlockClassNames}>
              {children}
            </div>
          </div>
          {this.renderButtonBlock(buttonClassNames)}
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

  renderPriceBlock = (priceDescription) => {
    const { price, priceBlock } = this.props;
    if (!priceBlock) {
      return false;
    }
    return (
      priceDescription
        ? (
            <div className="card-body__price">
              <span className="card-body__text">&#36;{price}</span>
              <span className="card-body__price-description">{priceDescription}</span>
            </div>
          )
        : (
            <span className="card-body__text">&#36;{price}</span>
          )
    );
  };

  renderButtonBlock = (buttonClassNames) => {
    return this.props.buttonBlock && (
      <div className="card-body__footer">
        <Button
          children="selected"
          className={buttonClassNames}
        />
      </div>
    );
  };

  renderCardHead = ({ header, label, headerSize, color }) => {
    if (!header && !label) {
      return false;
    }

    const cardHeadClassNames = cx('card__head', {
      'card__head--min-height-30px': !label && (headerSize === headerSizeEnum.extraSmall || headerSize === headerSizeEnum.small),
    });

    const headerClassNames = cx('card__header', {
      'card__header--extra-small': headerSize === headerSizeEnum.extraSmall,
      'card__header--small': headerSize === headerSizeEnum.small,
      'card__header--regular': headerSize === headerSizeEnum.regular,
      'card__header--large': headerSize === headerSizeEnum.large,
      [`card__header--${color}`]: true,
    });

    return (
      <div className={cardHeadClassNames}>
        <h2 className={headerClassNames}>{header}</h2>
        {this.renderLabel(label)}
      </div>
    );
  }
}

export function CardContent({ children, ...rest }) {
  return (
    <div className="card-content" {...rest}>
      {children}
    </div>
  );
};

export function CardContentRow({ children, ...rest }) {
  return (
    <div className="card-content__row" {...rest}>
      {children}
    </div>
  );
};

export function CardContentCol({ children, ...rest }) {
  return (
    <div className="card-content__col" {...rest}>{children}</div>
  );
};

export function CardContentText({ children, ...rest }) {
  return (
    <div className="card-content__text" {...rest}>{children}</div>
  );
};

export default Card;
