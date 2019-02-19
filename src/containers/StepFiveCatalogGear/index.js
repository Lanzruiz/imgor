// Modules
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-grid-system';
import { bindActionCreators } from 'redux';
import VisibilitySensor from 'react-visibility-sensor';
import { CSSTransitionGroup } from 'react-transition-group';
import Img from 'react-image';
import find from 'lodash/find';
import isEqual from 'lodash/isEqual';
// Components
import Button from '../../components/Button';
import Card, { CardContent, CardContentRow, CardContentCol, CardContentText } from '../../components/Card';
import LocaleString from '../../components/LocaleString';
import Dropdown from '../../components/Dropdown';
// Actions
import * as stepFiveActions from '../../actions/step.five';
// Selectors
import { cartIdSelector, participantIdSelector, stepOneGenderSelector } from '../StepOne/selectors';
import { stepFiveDataPerPageSelector, stepFiveSelectedGearsSelector, stepFiveProductsSelector } from '../StepFive/selectors';
// Constants
import { productTypesEnum } from '../../constants/cart';

class StepFiveCatalogGear extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        price: PropTypes.number,
        image_url: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
        id: PropTypes.number,
        categories: PropTypes.arrayOf(
          PropTypes.shape({
            display_name: PropTypes.string,
          }),
        ),
        description: PropTypes.string,
        display_name: PropTypes.string,
        attributes: PropTypes.arrayOf(
          PropTypes.shape({
            key: PropTypes.string,
            name: PropTypes.string,
            display_name: PropTypes.string,
            options: PropTypes.arrayOf(
              PropTypes.shape({
                id: PropTypes.string,
                name: PropTypes.string,
                display_name: PropTypes.string,
              }),
            ),
          }),
        ),
        could_be_selected: PropTypes.bool,
        selected_option_id: PropTypes.string,
        quantity: PropTypes.number,
        need_to_update: PropTypes.bool,
      }),
    ),
    shouldRenderLoadMoreButton: PropTypes.bool,
    stepFiveActions: PropTypes.shape({
      stepFiveIncreaseItemsPerPage: PropTypes.func.isRequired,
      postCartCartIdParticipantParticipantIdProductRequest: PropTypes.func.isRequired,
      putCartCartIdParticipantParticipantIdProductIdRequest: PropTypes.func.isRequired,
      deleteCartCartIdParticipantParticipantIdProductIdRequest: PropTypes.func.isRequired,
      stepFiveIncrementSelectedGearQuantity: PropTypes.func.isRequired,
      stepFiveDecrementSelectedGearQuantity: PropTypes.func.isRequired,
      stepFiveSelectDropdownItem: PropTypes.func.isRequired,
      getCatalogGearRequest: PropTypes.func.isRequired,
    }),
    selectedGear: PropTypes.objectOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
        participantProductId: PropTypes.number
      }),
    ),
  };

  static defaultProps = {
    data: [],
  };

  componentDidMount() {
    const { gender } = this.props;
    this.getCatalogGear({ gender });
  }

  componentWillUnmount() {
    const { selectedGear } = this.props;
    for (let key in selectedGear) {
      this.removeGear(key);
    }
  }

  render() {
    const { data } = this.props;
    const isCatalogGearDataAvailable = data.length > 0;
    return (
      <div className="catalog-gear">
        <CSSTransitionGroup
          className="align-items-stretch"
          component={Row}
          transitionName="slide-top"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          {isCatalogGearDataAvailable
            ? data.map(this.renderCardItem)
            : this.renderNoGearAvailableBlock()
          }
        </CSSTransitionGroup>
      </div>
    );
  }

  renderNoGearAvailableBlock = () => {
    return (
      <Col>
        <div className="step-five__no-items">
          <LocaleString stringKey="no_gear_available" />!
        </div>
      </Col>
    );
  };

  renderCardItem = (card) => {
    const { selectedGear } = this.props;
    const { price, image_url, id, categories = [], description, display_name, attributes = [], could_be_selected, selected_option_id, quantity, need_to_update } = card;
    const [ label = {}, header = {} ] = categories;
    const selectedGearId = selectedGear[id] ? selectedGear[id].id : null;

    const onClickHandler = (
      (could_be_selected && (quantity > 0))
        ? this.setGear
        : () => {}
    );

    const customButtonTitle = (
      need_to_update
        ? (quantity > 0)
          ? <LocaleString stringKey="update" />
          : <LocaleString stringKey="remove" />
        : selectedGearId
          ? <LocaleString stringKey="remove" />
          : <LocaleString stringKey="selected" />
    );

    const onRemoveHandler = (
      need_to_update
        ? (quantity > 0)
          ? this.updateGearItem
          : this.removeGear
        : this.removeGear
    );

    let tooltipMessage;

    if (attributes.length && !selected_option_id) {
      tooltipMessage =  <LocaleString stringKey="please_first_choose_size" />;
    } else if (!quantity && !selectedGearId) {
      tooltipMessage = <LocaleString stringKey="please_choose_quantity" />;
    } else {
      tooltipMessage = null;
    }

    return (
      <Col md={6} lg={4} key={id} className="card-column">
        <Card
          id={id}
          cardHeader={display_name}
          color="dark"
          header={header.display_name}
          label={label.display_name}
          price={price}
          selectedId={selectedGearId}
          headerSize="extra-small"
          onClick={onClickHandler}
          customButtonTitle={customButtonTitle}
          onRemove={onRemoveHandler}
          tooltipMessage={tooltipMessage}
        >
          <CardContent>
            <CardContentRow>
              <CardContentCol className="card-content__img-container">
                <VisibilitySensor>
                  <Img className="card-content__img" src={image_url} data-aos="flip-left" data-aos-duration="600" />
                </VisibilitySensor>
              </CardContentCol>
              <CardContentCol className="react-center-center react-flex-1">
                {attributes.map(attribute => this.renderCardAttributes(attribute, id, selected_option_id))}
                {(selected_option_id || !attributes.length) && (
                  <CardCounter
                    selectedGearId={id}
                    quantity={quantity}
                    incrementHandler={this.incrementSelectedGearCounter}
                    decrementHandler={this.decrementSelectedGearCounter}
                  />
                )}
              </CardContentCol>
            </CardContentRow>
              <CardContentText>
                {description}
              </CardContentText>
          </CardContent>
        </Card>
      </Col>
    );
  };

  setGear = (productId) => {
    const { cartId, participantId, data, stepFiveProducts } = this.props;
    const gearItem = find(data, ['id', productId]);
    const currentProduct = stepFiveProducts[productId];
    if (gearItem) {
      const args = {
        cartId,
        participantId,
        productId,
        product: currentProduct,
        type: productTypesEnum.gear,
        attributes: [{
          name: isEqual(gearItem.attributes.length, 1) ? gearItem.attributes[0].name : '',
          value: gearItem.selected_option_id,
        }],
        quantity: gearItem.quantity,
      };
      if (isEqual(gearItem.attributes.length, 0)) {
        delete args.attributes;
      }
      this.props.stepFiveActions.postCartCartIdParticipantParticipantIdProductRequest(args);
    }
  };

  updateGearItem = (productId) => {
    const { cartId, participantId, data, stepFiveProducts, selectedGear } = this.props;
    const gearItem = find(data, ['id', productId]);
    const currentProduct = stepFiveProducts[productId];
    if (gearItem) {
      const args = {
        cartId,
        participantId,
        productId,
        product: currentProduct,
        type: productTypesEnum.gear,
        attributes: [{
          name: isEqual(gearItem.attributes.length, 1) ? gearItem.attributes[0].name : '',
          value: gearItem.selected_option_id,
        }],
        quantity: gearItem.quantity,
        participantProductId: selectedGear[productId].participantProductId,
      };
      if (isEqual(gearItem.attributes.length, 0)) {
        delete args.attributes;
      }
      this.props.stepFiveActions.putCartCartIdParticipantParticipantIdProductIdRequest(args);
    }
  };

  removeGear = (productId) => {
    const { cartId, participantId, selectedGear } = this.props;
    const args = {
      cartId,
      participantId,
      productId,
      participantProductId: selectedGear[productId].participantProductId,
    };
    this.props.stepFiveActions.deleteCartCartIdParticipantParticipantIdProductIdRequest(args);
  };

  renderCardAttributes = (attribute, selectedGearId, selectedOptionId) => {
    const { display_name, key, options } = attribute;
    const selectedOption = find(options, ['id', selectedOptionId]);
    const selectedOptionValue = selectedOption ? selectedOption.display_name : undefined;
    return (
      <div key={key} className="step-five__card-attributes">
        <Dropdown
          selectedOption={selectedOptionValue}
          options={options}
          label={display_name}
          handleChange={id => this.selectDropdownItem({ selectedOptionId: id, selectedGearId })}
        />
      </div>
    );
  };

  incrementSelectedGearCounter = (selectedGearId) => {
    this.props.stepFiveActions.stepFiveIncrementSelectedGearQuantity(selectedGearId);
  };

  decrementSelectedGearCounter = (selectedGearId) => {
    this.props.stepFiveActions.stepFiveDecrementSelectedGearQuantity(selectedGearId);
  };

  selectDropdownItem = ({ selectedOptionId, selectedGearId }) => {
    this.props.stepFiveActions.stepFiveSelectDropdownItem({ selectedOptionId, selectedGearId });
  };

  getCatalogGear = ({ gender }) => {
    this.props.stepFiveActions.getCatalogGearRequest({ gender });
  };
}

function CardCounter(args) {
  const { quantity, selectedGearId, incrementHandler, decrementHandler } = args;
  return (
    <div className="card-counter__container">
      <div className="card-counter__header-container">
        <span className="card-counter__header">
          <LocaleString stringKey="quantity" />
        </span>
      </div>
      <div className="card-counter__counter">
        <Button
          className="card-counter__counter--btn"
          onClick={() => decrementHandler(selectedGearId)}
          children="-"
        />
        <span>{quantity}</span>
        <Button
          className="card-counter__counter--btn"
          onClick={() => incrementHandler(selectedGearId)}
          children="+"
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    cartId: cartIdSelector(state),
    data: stepFiveDataPerPageSelector(state),
    gender: stepOneGenderSelector(state),
    participantId: participantIdSelector(state),
    stepFiveProducts: stepFiveProductsSelector(state),
    selectedGear: stepFiveSelectedGearsSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    stepFiveActions: bindActionCreators(stepFiveActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StepFiveCatalogGear);
