// Modules
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Img from 'react-image';
// Components
import Button from '../Button';
import GreenBlock from '../GreenBlock';
import LocaleString from '../LocaleString';
import Tooltip from '../Tooltip';
import Image from '../Image';
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
    soldOut: PropTypes.bool,
    customButtonTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    customNonSelectedButtonTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    onRemove: PropTypes.func,
    tooltipMessage: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    overRideButtonName: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string,
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
    onRemove: () => {},
    selectedId: null,
    priceDescription: '',
    buttonBlock: true,
    priceBlock: true,
    cardHeaderCapitalize: false,
    soldOut: false,
    customButtonTitle: '',
    customNonSelectedButtonTitle: '',
    overRideButtonName: '',
  };

  render() {
    const {
      children, header, label, headerSize, color, cardHeader, imgSrc, id, soldOut,
      selectedId, priceDescription, cardHeaderCapitalize, style, className, overRideButtonName
    } = this.props;

    const isSelectedIdExists = (typeof selectedId === 'number' || typeof selectedId === 'string');
    const isCurrentCardSelected = (id === selectedId);

    const cardContainerClassNames = cx('card__container', {
      'card__container--opacity': isSelectedIdExists && !isCurrentCardSelected,
      [className]: className,
    });

    const cardBodyHeadClassNames = cx('card-body__head', {
      [`card-body__head--${color}`]: true,
      'card-body__head--flex-end': priceDescription,
    });

    const buttonClassNames = cx('card-body__button', {
      'card-body__button--regular': !isCurrentCardSelected && !soldOut,
      'card-body__button--selected': isCurrentCardSelected && !soldOut,
      'card-body__button--sold-out': soldOut,
    });

    const contentBlockClassNames = cx('card-body__content', {
      'card-body__content--width-70': imgSrc,
      'card-body__content--width-100': !imgSrc,
    });

    const cardHeaderClassNames = cx('card-body__text', {
      'card-body__text--capitalize': cardHeaderCapitalize,
    });

    const overRideButtonNames = overRideButtonName;

    return (
      <div className={cardContainerClassNames} style={style}>
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
          {this.renderButtonBlock(buttonClassNames, isCurrentCardSelected, overRideButtonNames)}
        </div>
      </div>
    );
  }

  renderViaBlock = () => {
    const { via, viaLogoPath } = this.props;
    // const { via, headerSize } = this.props;
    
    // const cardLabelViaClassName = cx('card-label__text card-label__text--serifa-bold', {
    //   'card-label__text--regular': headerSize === headerSizeEnum.small,
    //   'card-label__text--medium': headerSize === headerSizeEnum.large,
    // });
    return via && (
      <div className='label_via_container'>
        <Img className="label_via_img" src={viaLogoPath} alt=""/>
      </div>
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
        <span className={cardLabelHeaderClassNames}>
          {label}
        </span>
        {this.renderViaBlock()}
      </GreenBlock>
    );
  };

  renderImage = (src) => src && (
    <div className="card-body__image">
      <Image
        className="card-body__image-item"
        src={src}
        defaultSrc={this.props.defaultImageSrc}
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

  renderButtonBlock = (buttonClassNames, isCurrentCardSelected, overRideButtonNames) => {
    const { buttonBlock, soldOut, customButtonTitle, customNonSelectedButtonTitle, tooltipMessage } = this.props;

    const onClickHandler = soldOut && !isCurrentCardSelected ? null : this.onClickHandler;

    const buttonTitle = (
      !overRideButtonNames
        ? soldOut
          ? <LocaleString stringKey="sold_out" />
          : isCurrentCardSelected
            ? customButtonTitle
              ? customButtonTitle
              : <LocaleString stringKey="card.remove" />
            :  customNonSelectedButtonTitle ? customNonSelectedButtonTitle : <LocaleString stringKey="card.select" />
        : overRideButtonNames
    );
    return buttonBlock && (
      <div className="card-body__footer">
        <Button className={buttonClassNames} onClick={onClickHandler} buttonClassName="card-body__button--button">
          {tooltipMessage
            ? <Tooltip message={tooltipMessage} children={buttonTitle} />
            : buttonTitle
          }
        </Button>
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
  };

  onClickHandler = () => {
    const { id, onClick, onRemove, selectedId } = this.props;
    //const isCurrentCardSelected = id === selectedId;
    //isCurrentCardSelected ? onRemove(id) : onClick(id);
    if (selectedId === null) {
      return onClick(id)
    };
    if (id === selectedId) {
      return onRemove(id)
    };
    if (id !== selectedId) {
      onRemove(selectedId);
      onClick(id);
    };
  }
}

export function CardContent({ children, className, ...rest }) {
  const computedClassNames = cx('card-content', { [className]: className });
  return (
    <div className={computedClassNames} {...rest}>
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

export function CardContentCol({ children, className, ...rest }) {
  const classNames = cx('card-content__col', {
    [className]: className,
  });
  return (
    <div className={classNames} {...rest}>
      {children}
    </div>
  );
};

export function CardContentText({ children, ...rest }) {
  return (
    <div className="card-content__text" {...rest}>
      {children}
    </div>
  );
};

export function ImagePlus({ className, soldOut = false }) {
  return (
    <span className={cx('card-body__image-plus', { [className]: className })}>
      <span className={`icon-plus ${soldOut ? 'sold-out' : ''}`} />
    </span>
  );
}

export default Card;
