// Modules
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
//import Img from 'react-image';
// Components
import Button from '../Button';
//import GreenBlock from '../GreenBlock';
import LocaleString from '../LocaleString';
import Tooltip from '../Tooltip';
//import Image from '../Image';
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

class CardProduct extends React.Component {
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
      children, label, cardHeader, id, soldOut,
      selectedId, cardHeaderCapitalize, style, className, overRideButtonName
    } = this.props;

    const isSelectedIdExists = (typeof selectedId === 'number' || typeof selectedId === 'string');
    const isCurrentCardSelected = (id === selectedId);

    const cardContainerClassNames = cx('card__container', {
      'card__container--opacity': isSelectedIdExists && !isCurrentCardSelected,
      [className]: className,
    });

    const buttonClassNames = cx('card-body__button', {
      'card-body__button--regular': !isCurrentCardSelected && !soldOut,
      'card-body__button--selected': isCurrentCardSelected && !soldOut,
      'card-body__button--sold-out': soldOut,
    });

    const contentBlockClassNames = cx('card-body__content');

    const cardHeaderClassNames = cx('card-body__text', {
      'card-body__text--capitalize': cardHeaderCapitalize,
    });

    const overRideButtonNames = overRideButtonName;

    return (
      <div className={cardContainerClassNames} style={style}>
        {this.renderButtonBlock(buttonClassNames, isCurrentCardSelected, overRideButtonNames)}
        <div className="card__body card-body">
          <h4 className={cardHeaderClassNames}>{cardHeader} &mdash; {label}</h4>
          <div className="card-body__body">
            <div className={contentBlockClassNames}>
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  };


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

  onClickHandler = () => {
    const { id, onClick, onRemove, selectedId } = this.props;
    const isCurrentCardSelected = id === selectedId;
    isCurrentCardSelected ? onRemove(id) : onClick(id);
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

export default CardProduct;
