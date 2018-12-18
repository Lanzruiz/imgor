// Modules
import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import Img from 'react-image';
import { ReactHeight } from 'react-height';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import scrollToComponent from 'react-scroll-to-component';
// Components
import Header from '../../components/Header';
import Card, { CardContent, CardContentRow, CardContentCol, CardContentText } from '../../components/Card';
import Dropdown from '../../components/Dropdown';
import LocaleString from '../../components/LocaleString';
import Button from '../../components/Button';
import AnimateHeightComponent from '../../components/AnimateHeightComponent';
// Actions
import * as stepFiveActions from '../../actions/step.five';
import * as stepsActions from '../../actions/steps';
// Selectors
import {
  stepFiveSelectedGearsSelector, stepFiveDataPerPageSelector, stepFiveShouldRenderLoadMoreButtonSelector,
} from './selectors';
import { stepOneAgeSelector, stepOneBoardingBooleanSelector, stepOneGenderSelector } from '../StepOne/selectors';
import { stepTwoStartDateSelector, stepTwoEndDateSelector } from '../StepTwo/selectors';
// Styles
import './styles.scss';

class StepFive extends React.Component {
  constructor(props) {
    super(props);
    this.stepFour = React.createRef();
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

  state = {
    height: 100,
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
      start_date: startDate,
    };
    this.getCatalogGear();
    this.getCatalogGearUpsellNew(getCatalogGearUpsellNewArgs);
    scrollToComponent(this.stepFour.current);
  }

  componentWillUnmount() {
    this.setDefaultState();
  }

  render() {
    const { data, shouldRenderLoadMoreButton } = this.props;
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
      </Container>
    );
  }

  setGear = (id) => {
    this.props.stepFiveActions.stepFiveSetGear(id);
  };

  setMinHeight = (height) => {
    if (this.state.height < height) {
      this.setState(() => ({ height }));
    }
  };

  selectDropdownItem = ({ selectedOptionId, selectedGearId }) => {
    this.props.stepFiveActions.stepFiveSelectDropdownItem({ selectedOptionId, selectedGearId });
  };

  increaseItemsPerPage = () => {
    this.props.stepFiveActions.stepFiveIncreaseItemsPerPage();
  };

  renderCardItem = (card) => {
    const { height } = this.state;
    const { selectedGear } = this.props;
    const cardContentTextStyles = { minHeight: `${height}px` };
    const { price, image_url, id, categories = [], description, display_name, attributes } = card;
    const [ label = {}, header = {} ] = categories;
    const selectedGearId = selectedGear[id] ? selectedGear[id].id : null;
    const selectedQuantity = selectedGearId ? selectedGear[id].quantity : 0;
    const selectedOptionId = selectedGearId ? selectedGear[id].selected_option_id : null;
    return (
      <Col sm={6} md={4} key={id}>
        <AnimateHeightComponent>
          <Card
            id={id}
            cardHeader={display_name}
            color="dark"
            header={header.display_name}
            label={label.display_name}
            price={price}
            selectedId={selectedGearId}
            headerSize="extra-small"
            onClick={this.setGear}
          >
            <CardContent>
              <CardContentRow>
                <CardContentCol>
                  <Img className="card-content__img" src={image_url} />
                </CardContentCol>
                <CardContentCol className="center-center">
                  {attributes.map((attribute) => this.renderCardAttributes(attribute, id, selectedOptionId))}
                  {selectedGearId && (
                    <CardCounter
                      selectedGearId={selectedGearId}
                      quantity={selectedQuantity}
                      incrementHandler={this.incrementSelectedGearCounter}
                      decrementHandler={this.decrementSelectedGearCounter}
                    />
                  )}
                </CardContentCol>
              </CardContentRow>
              <CardContentText style={cardContentTextStyles}>
                <ReactHeight onHeightReady={this.setMinHeight} children={description} />
              </CardContentText>
            </CardContent>
          </Card>
        </AnimateHeightComponent>
      </Col>
    );
  };

  renderCardAttributes = (attribute, selectedGearId, selectedOptionId) => {
    const { display_name, key, options } = attribute;
    const selectedOption = options.find(({ id }) => selectedOptionId === id);
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

  getCatalogGear = () => {
    this.props.stepFiveActions.getCatalogGearRequest();
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

  getCatalogGearUpsellNew = ({ business_type, package_type, sport, gender, boarding, age, start_date }) => {
    this.props.stepFiveActions.getCatalogGearUpsellNewRequest({ business_type, package_type, sport, gender, boarding, age, start_date });
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
