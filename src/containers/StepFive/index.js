// Modules
import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import VisibilitySensor from 'react-visibility-sensor';
import Img from 'react-image';
import { ReactHeight } from 'react-height';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import scrollToComponent from 'react-scroll-to-component';
import isEqual from 'lodash/isEqual';
import find from 'lodash/find';
// Containers
import StepFiveCatalogExcursionsNew from '../StepFiveCatalogExcursionsNew';
// Components
import Header from '../../components/Header';
import Card, { CardContent, CardContentRow, CardContentCol, CardContentText } from '../../components/Card';
import Dropdown from '../../components/Dropdown';
import LocaleString from '../../components/LocaleString';
import Button from '../../components/Button';
// Actions
import * as stepFiveActions from '../../actions/step.five';
import * as stepsActions from '../../actions/steps';
// Selectors
import {
  stepFiveSelectedGearsSelector, stepFiveDataPerPageSelector, stepFiveShouldRenderLoadMoreButtonSelector, stepFiveProductsSelector,
  stepFiveGearUpsellNewSelector,
} from './selectors';
import {
  stepOneAgeSelector, stepOneBoardingBooleanSelector, stepOneGenderSelector, cartIdSelector, participantIdSelector,
} from '../StepOne/selectors';
import { stepTwoStartDateSelector, stepTwoEndDateSelector } from '../StepTwo/selectors';
// Helpers
import dateFormat from '../../helpers/dateFormat';
// Constants
import { productTypesEnum } from '../../constants/cart';
// Styles
import './styles.scss';

class StepFive extends React.Component {
  constructor(props) {
    super(props);
    this.stepFour = React.createRef();
    this.state = {
      cardHeadHeight: 44,
      contentHeight: 40,
      cardBodyHeight: 40,
    };
  }

  static propTypes = {
    stepFiveActions: PropTypes.shape({
      getCatalogGearRequest: PropTypes.func.isRequired,
      stepFiveSetGear: PropTypes.func.isRequired,
      stepFiveIncrementSelectedGearQuantity: PropTypes.func.isRequired,
      stepFiveDecrementSelectedGearQuantity: PropTypes.func.isRequired,
      stepFiveSetDefaultState: PropTypes.func.isRequired,
      stepFiveSelectDropdownItem: PropTypes.func.isRequired,
      getCatalogGearUpsellNewRequest: PropTypes.func.isRequired,
      stepFiveIncreaseItemsPerPage: PropTypes.func.isRequired,
      postCartCartIdParticipantParticipantIdProductRequest: PropTypes.func.isRequired,
      deleteCartCartIdParticipantParticipantIdProductIdRequest: PropTypes.func.isRequired,
      putCartCartIdParticipantParticipantIdProductIdRequest: PropTypes.func.isRequired,
      stepFiveGetCatalogExcursionsNewRequest: PropTypes.func.isRequired,
    }),
    stepsActions: PropTypes.shape({
      setStepsCounter: PropTypes.func.isRequired,
    }),
    shouldRenderLoadMoreButton: PropTypes.bool,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
        is_package: PropTypes.bool,
        package_product_id: PropTypes.string,
        primary_product_id: PropTypes.string,
        name: PropTypes.string,
        package_type: PropTypes.string,
        business: PropTypes.string,
        business_type: PropTypes.string,
        gender: PropTypes.oneOf([ 'Male', 'Female' ]),
        length: PropTypes.string,
        length_program: PropTypes.string,
        length_days: PropTypes.number,
        from_age: PropTypes.number,
        to_age: PropTypes.number,
        age_range: PropTypes.string,
        capacity_id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
        capacity_start_date: PropTypes.data,
        capacity_end_date: PropTypes.data,
        sort_order: PropTypes.number,
        group: PropTypes.string,
        secondary_group: PropTypes.string,
        price: PropTypes.number,
        price_refundable: PropTypes.number,
        capacity_available: PropTypes.number,
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
            image_url: PropTypes.string,
            weight: PropTypes.number,
            description: PropTypes.string,
            categories: PropTypes.arrayOf(
              PropTypes.shape({
                name: PropTypes.string,
                display_name: PropTypes.string,
                weight: PropTypes.string,
              }),
            ),
            display_length_program: PropTypes.string,
            display_length: PropTypes.string,
            display_business: PropTypes.string,
            display_business_type: PropTypes.string,
            display_gender: PropTypes.string,
            display_package_type: PropTypes.string,
          }),
        ),
      }),
    ),
    selectedGear: PropTypes.objectOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
        is_package: PropTypes.bool,
        package_product_id: PropTypes.string,
        primary_product_id: PropTypes.string,
        name: PropTypes.string,
        package_type: PropTypes.string,
        business: PropTypes.string,
        business_type: PropTypes.string,
        gender: PropTypes.oneOf([ 'Male', 'Female' ]),
        length: PropTypes.string,
        length_program: PropTypes.string,
        length_days: PropTypes.number,
        from_age: PropTypes.number,
        to_age: PropTypes.number,
        age_range: PropTypes.string,
        capacity_id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
        capacity_start_date: PropTypes.data,
        capacity_end_date: PropTypes.data,
        sort_order: PropTypes.number,
        group: PropTypes.string,
        secondary_group: PropTypes.string,
        price: PropTypes.number,
        price_refundable: PropTypes.number,
        capacity_available: PropTypes.number,
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
            image_url: PropTypes.string,
            weight: PropTypes.number,
            description: PropTypes.string,
            categories: PropTypes.arrayOf(
              PropTypes.shape({
                name: PropTypes.string,
                display_name: PropTypes.string,
                weight: PropTypes.string,
              }),
            ),
            display_length_program: PropTypes.string,
            display_length: PropTypes.string,
            display_business: PropTypes.string,
            display_business_type: PropTypes.string,
            display_gender: PropTypes.string,
            display_package_type: PropTypes.string,
          }),
        ),
      }),
    ),
  };

  componentDidMount() {
    const { businessType, packageType, sport, startDate, gender, boarding, age } = this.props;
    const getCatalogGearUpsellNewArgs = {
      sport,
      gender,
      boarding,
      age,
      business_type: businessType,
      package_type: packageType,
      start_date: '2017-10-10' || startDate, // TODO: remove that
      end_date: '2019-10-10', // TODO: remove that
    };
    this.getCatalogGear({ sport, gender });
    this.getCatalogGearUpsellNew(getCatalogGearUpsellNewArgs);
    scrollToComponent(this.stepFour.current);
  }

  componentWillUnmount() {
    this.setDefaultState();
  }

  render() {
    const { data, shouldRenderLoadMoreButton, stepFiveGearUpsellNew } = this.props;
    return (
      <Container style={{ marginBottom: '65px' }} ref={this.stepFive}>
        <Row>
          <Col>
            <Header
              header="step_five.header"
              subHeader="step_five.sub_header"
            />
          </Col>
        </Row>
        <Row>
          {
            (data.length > 0)
              ? data.map(this.renderCardItem)
              : (
                <Col>
                  <div className="step-five__no-items">
                    <LocaleString stringKey="no_gear_available" />!
                  </div>
                </Col>
              )
          }
        </Row>
        {shouldRenderLoadMoreButton && (
          <Row>
            <Col />
            <Col>
              <Button
                className="step-five__load-more-bth"
                onClick={this.increaseItemsPerPage}
                children={<LocaleString stringKey="load_more" />}
              />
            </Col>
            <Col />
          </Row>
        )}
        {(stepFiveGearUpsellNew.length > 0) && (
          <Row>
            {stepFiveGearUpsellNew.map(this.renderUpsellNew)}
          </Row>
        )}
        <StepFiveCatalogExcursionsNew />
      </Container>
    );
  }

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

  setMinHeight = (height) => {
    if (this.state.contentHeight < height) {
      this.setState(() => ({ contentHeight: height }));
    }
  };

  setCatdHeadHeight = (height) => {
    if (this.state.cardHeadHeight < height) {
      this.setState(() => ({ cardHeadHeight: height }));
    }
  };

  setCardBodyHeight = (height) => {
    if (this.state.cardBodyHeight < height) {
      this.setState(() => ({ cardBodyHeight: height }));
    }
  };

  selectDropdownItem = ({ selectedOptionId, selectedGearId }) => {
    this.props.stepFiveActions.stepFiveSelectDropdownItem({ selectedOptionId, selectedGearId });
  };

  increaseItemsPerPage = () => {
    this.props.stepFiveActions.stepFiveIncreaseItemsPerPage();
  };

  renderCardItem = (card) => {
    const { cardHeadHeight, cardBodyHeight, contentHeight } = this.state;
    const { selectedGear } = this.props;
    const cardBodyStyles = { minHeight: cardBodyHeight };
    const cardBobyHeadStyles = { minHeight: cardHeadHeight };
    const cardContentTextStyles = { minHeight: contentHeight };
    const { price, image_url, id, categories = [], description, display_name, attributes, could_be_selected, selected_option_id, quantity, need_to_update } = card;
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
        ? (quantity > 1)
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
      <Col md={6} lg={4} key={id}>
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
          onCardBodyHeadHeightReady={this.setCatdHeadHeight}
          cardBobyHeadStyles={cardBobyHeadStyles}
          cardBodyStyles={cardBodyStyles}
          onCardBodyHeightReady={this.setCardBodyHeight}
          tooltipMessage={tooltipMessage}
        >
          <CardContent>
            <CardContentRow>
              <CardContentCol className="card-content__img-container">
                <VisibilitySensor>
                  <Img className="card-content__img" src={image_url} />
                </VisibilitySensor>
              </CardContentCol>
              <CardContentCol className="center-center flex-1">
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
              <VisibilitySensor>
                <ReactHeight
                  onHeightReady={this.setMinHeight}
                  children={description}
                  style={cardContentTextStyles}
                />
              </VisibilitySensor>
            </CardContentText>
          </CardContent>
        </Card>
      </Col>
    );
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

  renderUpsellNew = (upsellNewItem) => {
    const { contentHeight } = this.state;
    const { id, categories, name, image_url, description, dates } = upsellNewItem;
    const [ header ] = categories;
    const cardContentTextStyles = { minHeight: contentHeight };
    const price = dates.length && dates[0].capacity_price;
    let tooltipMessage = <LocaleString stringKey="please_choose_date" />;
    return (
      <Col md={6} lg={4} key={id}>
        <Card
          id={id}
          cardHeader={name}
          color="dark"
          header={header.display_name}
          price={price}
          selectedId={null} // TODO: selected id from store
          headerSize="extra-small"
          onClick={() => {}} // TODO: on click handler
          customButtonTitle={null} // TODO: custom button title
          onRemove={() => {}} // TODO: on remove handler
          tooltipMessage={tooltipMessage}
        >
          <CardContent>
            <CardContentRow>
              <CardContentCol className="card-content__img-container">
                <VisibilitySensor>
                  <Img className="card-content__img" src={image_url} />
                </VisibilitySensor>
              </CardContentCol>
              <CardContentCol className="center-center flex-1">
                {this.renderDates(dates)}
              </CardContentCol>
            </CardContentRow>
            <CardContentText style={cardContentTextStyles}>
              <ReactHeight onHeightReady={this.setMinHeight} children={description} />
            </CardContentText>
          </CardContent>
        </Card>
      </Col>
    );
  };

  renderDates = (dates) => {
    const options = dates.map(({ id, capacity_start_date }) => {
      return {
        id,
        name: capacity_start_date,
        display_name: dateFormat({ date: capacity_start_date, dateFormat: 'YYYY-MM-DD', resultFormat: 'MMM, DD YYYY' })
      };
    });
    return (
      <div className="step-five__card-attributes">
        <Dropdown
          selectedOption={'Date'}// TODO: from redux
          options={options}
          label={<LocaleString stringKey="date" />}
          handleChange={this.setUpsellGearItemDate}
        />
      </div>
    );
  };

  getCatalogGear = ({ gender }) => {
    this.props.stepFiveActions.getCatalogGearRequest({ gender });
  };

  incrementSelectedGearCounter = (selectedGearId) => {
    this.props.stepFiveActions.stepFiveIncrementSelectedGearQuantity(selectedGearId);
  };

  decrementSelectedGearCounter = (selectedGearId) => {
    this.props.stepFiveActions.stepFiveDecrementSelectedGearQuantity(selectedGearId);
  };

  setDefaultState = () => {
    this.props.stepFiveActions.stepFiveSetDefaultState();
  };

  getCatalogGearUpsellNew = ({ business_type, package_type, sport, gender, boarding, age, start_date, end_date }) => {
    // TODO: rewrite that!
    // { business_type, package_type, sport, gender, boarding, age, start_date, end_date }
    this.props.stepFiveActions.getCatalogGearUpsellNewRequest({ sport, gender, start_date, end_date });
  };

  setUpsellGearItem = (id) => {
    // TODO: api call is required
    this.props.stepFiveActions.stepFiveSetUpsellGearItem(id);
  };

  setUpsellGearItemDate = (id) => {
    // TODO: api call is required
    this.props.stepFiveActions.stepFiveSetUpsellGearItemDate(id);
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
  }
}

function mapStateToProps(state) {
  return {
    data: stepFiveDataPerPageSelector(state),
    gender: stepOneGenderSelector(state),
    startDate: stepTwoStartDateSelector(state),
    endDate: stepTwoEndDateSelector(state),
    selectedGear: stepFiveSelectedGearsSelector(state),
    boarding: stepOneBoardingBooleanSelector(state),
    age: stepOneAgeSelector(state),
    shouldRenderLoadMoreButton: stepFiveShouldRenderLoadMoreButtonSelector(state),
    cartId: cartIdSelector(state),
    participantId: participantIdSelector(state),
    stepFiveProducts: stepFiveProductsSelector(state),
    stepFiveGearUpsellNew: stepFiveGearUpsellNewSelector(state),
  };
};

function mapDispatchToProps(dispatch) {
  return {
    stepFiveActions: bindActionCreators(stepFiveActions, dispatch),
    stepsActions: bindActionCreators(stepsActions, dispatch),
  };
};

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

export default connect(mapStateToProps, mapDispatchToProps)(StepFive);
