// Modules
import React, { Fragment } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { connect } from 'react-redux';
import scrollToComponent from 'react-scroll-to-component';
import PropTypes from 'prop-types';
import { reduxForm, change } from 'redux-form';
import { bindActionCreators } from 'redux';
import isEqual from 'lodash/isEqual';
import Button from '../../components/Button';
// Components
import Header from '../../components/Header';
import Card, { CardContent, CardContentRow, CardContentCol, CardContentText } from '../../components/Card';
import LocaleString from '../../components/LocaleString';
import Carousel, { CarouselItem } from '../../components/Carousel';
import DatePickerReduxForm from '../../components/DatePicker';
import Image from '../../components/Image';
import AirportHasFlightBookedCheckbox from './components/AirportHasFlightBookedCheckbox';
import AirportPickupCheckboxContainer from './components/AirportPickupCheckboxContainer';
import DropoffLocationTextField from './components/DropoffLocationTextField';
import PickUpLocationTextField from './components/PickUpLocationTextField';
import DepartingCheckboxContainer from './components/DepartingCheckboxContainer';
import DropoffCheckboxContainer from './components/DropoffCheckboxContainer';
import ArrivalFlightNumberTextInput from './components/ArrivalFlightNumberTextInput';
import FlightNumberDepartingTextInput from './components/FlightNumberDepartingTextInput';
import SlideHeader from './components/SlideHeader';
import SliderSubHeader from './components/SliderSubHeader';
import Paragraph from './components/Paragraph';
import UnaccompaniedCheckboxContainer from './components/UnaccompaniedCheckboxContainer';
import TransportRadioContainer from './components/TransportRadioContainer';
import DepartingTransportRadioContainer from './components/DepartingTransportRadioContainer';
import AirlinesDepartingDropdownContainer from './components/AirlinesDepartingDropdownContainer';
import AirlinesDropdownContainer from './components/AirlinesDropdownContainer';
import AOSFadeInContainer from '../../components/AOSFadeInContainer';
// Images
import stubImage from '../../assets/img/2018-Suburban.png';
// Actions
import * as stepSixActions from '../../actions/step.six';
import * as stepsActions from '../../actions/steps';
// Selectors
import {
  participantIdSelector, cartIdSelector, cartStepSixUnnacompaniedProductIdSelector, cartStepSixDepartingProductIdSelector,
  cartStepSixArrivalProductIdSelector,
} from '../../containers/StepOne/selectors';
import {
  stepSixAirportPickupSelector,
  stepSixTransportSelector,
  stepSixUnaccompaniedSelector,
  stepSixAirlinesSelector,
  stepSixDropoffSelector,
  stepSixDepartingSelector,
  stepSixDepartingTransportSelector,
  stepSixPickUpOtherLocationSelector,
  stepSixSelectedArrivalAirlineSelector,
  stepSixSelectedDepartingAirlineSelector,
  stepSixSelectedTransportSelector,
  stepSixTransportUnaccompaniedSelector,
  stepSixTransportationIdSelector,
  stepSixAirportPickupAirlineSelector,
  stepSixDepartingAirlineSelector,
  stepSixHasBookedFlightSelector,
  stepSixArrivalFlightNumberSelector,
  stepSixArrivalDateTimeSelector,
  stepSixDepartingFlightNumberSelector,
  stepSixDepartingDateTimeSelector,
  stepSixDropoffOtherLocationSelector,
  stepSixTransportCartData,
} from './selectors';
import { stepFiveDataPerPageSelector } from '../StepFive/selectors';
import { sportSelector, businessTypeSelector, packageTypeSelector } from '../InitialComponent/selectors';
import { stepFourDataSelector } from '../StepFour/selectors';
// Constants
import { stepsEnum } from '../../constants/steps';
import { stepSixFormFieldNames, airportPickupInformation } from './selectors';
// Styles
import './styles.scss';

class StepSix extends React.Component {
  static propTypes = {
    airportPickup: PropTypes.string,
    airlines: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        display_name: PropTypes.string,
        name: PropTypes.string,
      }),
    ),
    stepSixActions: PropTypes.shape({
      stepSixSetDefaultState: PropTypes.func.isRequired,
      stepSixGetCatalogTransportRequest: PropTypes.func.isRequired,
      stepSixGetCatalogAirlinesRequest: PropTypes.func.isRequired,
      stepSixSetArrivalAirlines: PropTypes.func.isRequired,
      stepSixSetDepartingAirlines: PropTypes.func.isRequired,
      stepSixGetCatalogTransportUnaccompaniedRequest: PropTypes.func.isRequired,
      stepSixSelectTransportationOption: PropTypes.func.isRequired,
      stepSixUnselectTransportationOption: PropTypes.func.isRequired,
      stepSixDeleteProductInTheCart: PropTypes.func.isRequired,
      stepSixAddTransportToCart: PropTypes.func.isRequired,
      stepSixClearTransportCart: PropTypes.func.isRequired,
    }),
    transport: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        package_product_id: PropTypes.string,
        airport: PropTypes.string,
        vehicle: PropTypes.string,
        price: PropTypes.number,
      }),
    ).isRequired,
    dropoff: PropTypes.string,
    departing: PropTypes.string,
    departingTransport: PropTypes.string,
    pickUp: PropTypes.string,
    selectedArrivalAirline: PropTypes.shape({
      id: PropTypes.string,
      display_name: PropTypes.string,
      name: PropTypes.string,
    }),
    selectedDepartingAirline: PropTypes.shape({
      id: PropTypes.string,
      display_name: PropTypes.string,
      name: PropTypes.string,
    }),
    selectedTransportValue: PropTypes.string,
    unaccompanied: PropTypes.string,
    transportationId: PropTypes.number,
  };

  static defaultProps = {
    transportation: 'false',
    transport: [],
    selectedArrivalAirline: {},
    selectedDepartingAirline: {},
  };

  constructor(props) {
    super(props);
    this.stepSix = React.createRef();
  }

  componentDidMount() {
    this.stepSixGetCatalogTransportUnaccompanied();
    this.getCatalogTransport();
    this.getCatalogAirlines();
  }

  componentDidUpdate(prevProps) {
    const { step } = this.props;
    if ((step !== prevProps.step) && (prevProps.step > step) && ((prevProps.step - 1) === step)) {
      scrollToComponent(this.stepSix.current, { align: 'top', duration: 500 });
    }
  }

  componentWillUnmount() {
    this.setDefaultState();
  }
  
  setDepartingAirlines = (id) => {
    this.props.stepSixActions.stepSixSetDepartingAirlines(id);
  };
  
  setDefaultState = () => {
    const {
      dispatch, cartId, participantId, cartStepSixArrivalProductId, cartStepSixDepartingProductId, cartStepSixUnnacompaniedProductId,
    } = this.props;
    for (let key in stepSixFormFieldNames) {
      dispatch( change('wizard', stepSixFormFieldNames[key], ''), );
    }
    if (cartStepSixArrivalProductId) {
      this.props.stepSixActions.stepSixDeleteProductInTheCart({ cartId, participantId, productId: cartStepSixArrivalProductId, type: 'arrival_transport' });
    }
    if (cartStepSixDepartingProductId) {
      this.props.stepSixActions.stepSixDeleteProductInTheCart({ cartId, participantId, productId: cartStepSixDepartingProductId, type: 'departing_transport' });
    }
    if (cartStepSixUnnacompaniedProductId) {
      this.props.stepSixActions.stepSixDeleteProductInTheCart({ cartId, participantId, productId: cartStepSixUnnacompaniedProductId, type: 'unacompannied' });
    }
    
    this.props.stepSixActions.stepSixSetDefaultState();
  };
  
  getCatalogTransport = () => {
    this.props.stepSixActions.stepSixGetCatalogTransportRequest();
  };
  
  getCatalogAirlines = () => {
    this.props.stepSixActions.stepSixGetCatalogAirlinesRequest();
  };
  
  goingToFinalStep = () => {
    this.props.stepsActions.setStepsCounter(stepsEnum.seven);
  };
  
  stepSixGetCatalogTransportUnaccompanied = () => {
    this.props.stepSixActions.stepSixGetCatalogTransportUnaccompaniedRequest();
  };
  
  selectTransportationOption = (id) => {
    this.props.stepSixActions.stepSixSelectTransportationOption(id);
  };
  
  unselectTransportationOption = () => {
    this.props.stepSixActions.stepSixUnselectTransportationOption();
  };
  
  addTransportDataToCart = () => {
    this.props.stepSixActions.stepSixAddTransportToCart({
      cartId: this.props.cartId,
      participantId: this.props.participantId
    });
  };
  
  handlePickupChange = () => {
    this.props.stepSixActions.stepSixClearTransportCart();
  };

  render() {
    const {
      airlines, airportPickup, transport, unaccompanied, dropoff, departing, transportUnaccompanied, transportationId,
      departingTransport, selectedTransportValue, stepFourData, hasBookedFlight, arrivalFlightNumber, arrivalDateTime,
      airportPickupAirline, airportDepartingAirline, departingFlightNumber, departingDateTime, dropoffOtherLocation,
      departingOtherLocation, hasTransportationCartData
    } = this.props;
    
    const airportPickupArrivalAndDeparting = isEqual(airportPickup, airportPickupInformation.both);
    const airportPickupArrivalOnly = isEqual(airportPickup, airportPickupInformation.arrival);
    const airportPickupDepartingOnly = isEqual(airportPickup, airportPickupInformation.departing);

    const maxStepCount = (
      airportPickupArrivalAndDeparting ? 5 : airportPickup ? 3 : 1
    );

    const currentStepNumber = (stepFourData.length > 0) ? stepsEnum.six : stepsEnum.five;
    
    const typeOfPickupTitle = {
      [airportPickupInformation.both]: 'Roundtrip',
      [airportPickupInformation.arrival]: 'Arrival Only',
      [airportPickupInformation.departing]: 'Departing Only',
    };

    return (
      <AOSFadeInContainer className="step-six" ref={this.stepSix}>
        <Container style={{ marginBottom: '65px' }}>
          <Row>
            <Col>
              <Header
                header="step_six.header"
                subHeader="step_six.sub_header"
                formatString={{ stepNumber: currentStepNumber }}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Row style={{display: 'flex'}}>
                <Col md={5} lg={4} style={{ paddingRight: 0, paddingLeft: 0, marginBottom: 15, zIndex: 15 }}>
                  <Card
                    id={0}
                    className="step-six__transportation-card-container"
                    cardHeader={<LocaleString stringKey="step_six.travel" />}
                    color="dark"
                    header={<LocaleString stringKey="step_six.airport_pickup" />}
                    label={<LocaleString stringKey="step_five.popular_item" />}
                    price="99"// TODO: rewrite that!
                    selectedId={transportationId}
                    headerSize="extra-small"
                    priceDescription={<LocaleString stringKey="step_six.starting_at" />}
                    onClick={this.selectTransportationOption}
                    onRemove={this.unselectTransportationOption}
                  >
                    <CardContent className="step-six__transportation-card">
                      <CardContentRow>
                        <CardContentCol>
                          
                          <Image
                            className="card-content__img"
                            defaultSrc={stubImage}
                            src="step_six.transport.image_path"
                          />
                        </CardContentCol>
                        <CardContentCol>
                          <AirportPickupCheckboxContainer
                            handleChange={this.handlePickupChange}
                            airportPickup={airportPickup}
                          />
                        </CardContentCol>
                      </CardContentRow>
                      <CardContentText>
                        <Fragment>
                          <AirportHasFlightBookedCheckbox />
                          <p className="has-booked-description">
                            <LocaleString stringKey={'step_six.has_booked_flight.description'} />
                          </p>
                        </Fragment>
                      </CardContentText>
                    </CardContent>
                  </Card>
                </Col>
                <Col md={7} lg={8} style={{ padding: 0, marginBottom: '15px', marginTop: '30px' }}>
                  <Carousel render={!!airportPickup}>
                    <CarouselItem>
                      <SlideHeader>
                        <LocaleString
                          stringKey="step_six.step_of"
                          formatString={{ current: 1, max: maxStepCount }}
                        />
                      </SlideHeader>
                      <SliderSubHeader>
                        <LocaleString stringKey="step_six.unaccompanied" />
                      </SliderSubHeader>
                      <UnaccompaniedCheckboxContainer
                        unaccompanied={unaccompanied}
                        transportUnaccompanied={transportUnaccompanied}
                      />
                      <div className="step-six__text-container">
                        <Paragraph>
                          <LocaleString stringKey="step_six.airlines_service" />
                        </Paragraph>
                        <Paragraph>
                          <LocaleString stringKey="step_six.ages" />
                        </Paragraph>
                      </div>
                    </CarouselItem>
                    {(airportPickupArrivalAndDeparting || airportPickupArrivalOnly) && (
                      <CarouselItem>
                        <Row>
                          <Col>
                            <SlideHeader>
                              <LocaleString
                                stringKey="step_six.step_of"
                                formatString={{ current: 2, max: maxStepCount }}
                              />
                            </SlideHeader>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={12} lg={5} xl={6}>
                            <SliderSubHeader>
                              <LocaleString stringKey="step_six.arrival_flight_information" />
                            </SliderSubHeader>
                            <TransportRadioContainer
                              options={transport}
                              value={selectedTransportValue}
                            />
                          </Col>
                          <Col md={12} lg={7} xl={6}>
                            
                            {!hasBookedFlight && (
                              <Fragment>
                                <AirlinesDropdownContainer airlines={airlines} />
                                <ArrivalFlightNumberTextInput />
                                <DatePickerReduxForm
                                  isClearable
                                  name={stepSixFormFieldNames.arrivalDateTime}
                                  className="step-six__text-input step-six__form-field"
                                  placeholder="Arrival Date & Time"
                                />
                              </Fragment>
                            )}
                            <Paragraph medium className="step-six__step-paragraph">
                              <LocaleString
                                stringKey="step_six.schedule"
                                formatString={{ phone: '941-840-8092' }}
                              />
                            </Paragraph>
                          </Col>
                        </Row>
                      </CarouselItem>
                    )}
                    {(airportPickupArrivalAndDeparting && !airportPickupDepartingOnly) && (
                      <CarouselItem>
                        <Row>
                          <Col>
                            <SlideHeader>
                              <LocaleString
                                stringKey="step_six.step_of"
                                formatString={{ current: 3, max: maxStepCount }}
                              />
                            </SlideHeader>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={12} lg={6}>
                            <SliderSubHeader>
                              <LocaleString stringKey="step_six.dropoff_location" />
                            </SliderSubHeader>
                            <DropoffCheckboxContainer dropoff={dropoff} />
                            <DropoffLocationTextField dropoff={dropoff} />
                          </Col>
                          <Col md={12} lg={6}>
                            <Paragraph medium className="step-six__step-paragraph">
                            <LocaleString
                              stringKey="step_six.schedule"
                              formatString={{ phone: '941-840-8092' }}
                            />
                            </Paragraph>
                          </Col>
                        </Row>
                      </CarouselItem>
                    )}
                    {(airportPickupArrivalAndDeparting || airportPickupDepartingOnly) && (
                      <CarouselItem>
                        <Row>
                          <Col>
                            <SlideHeader>
                              <LocaleString
                                stringKey="step_six.step_of"
                                formatString={{
                                  current: airportPickupArrivalAndDeparting ? 4 : 2,
                                  max: maxStepCount,
                                }}
                              />
                            </SlideHeader>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={12} lg={5} xl={6}>
                            <SliderSubHeader>
                              <LocaleString stringKey="step_six.departing_airport_location" />
                            </SliderSubHeader>
                            <DepartingTransportRadioContainer
                              options={transport}
                              value={departingTransport}
                            />
                          </Col>
                          <Col md={12} lg={7} xl={6}>
                            {!hasBookedFlight && (
                              <Fragment>
                                <AirlinesDepartingDropdownContainer airlines={airlines} />
                                <FlightNumberDepartingTextInput />
                                <DatePickerReduxForm
                                  isClearable
                                  name={stepSixFormFieldNames.departingDateTime}
                                  className="step-six__text-input step-six__form-field"
                                  placeholder="Departing Date & Time"
                                />
                              </Fragment>
                            )}
                            <Paragraph medium className="step-six__step-paragraph">
                              <LocaleString
                                stringKey="step_six.schedule"
                                formatString={{ phone: '941-840-8092' }}
                              />
                            </Paragraph>
                          </Col>
                        </Row>
                      </CarouselItem>
                    )}
                    {(!airportPickupArrivalAndDeparting && airportPickupDepartingOnly) && (
                      <CarouselItem>
                        <Row>
                          <Col>
                            <SlideHeader>
                              <LocaleString
                                stringKey="step_six.step_of"
                                formatString={{ current: 3, max: maxStepCount }}
                              />
                            </SlideHeader>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={12} lg={6}>
                            <SliderSubHeader>
                              <LocaleString stringKey="step_six.dropoff_location" />
                            </SliderSubHeader>
                            <DropoffCheckboxContainer dropoff={dropoff} />
                            <DropoffLocationTextField dropoff={dropoff} />
                          </Col>
                          <Col md={12} lg={6}>
                            <Paragraph medium className="step-six__step-paragraph">
                              <LocaleString
                                stringKey="step_six.schedule"
                                formatString={{ phone: '941-840-8092' }}
                              />
                            </Paragraph>
                          </Col>
                        </Row>
                      </CarouselItem>
                    )}
                    {(airportPickupArrivalAndDeparting || airportPickupArrivalOnly) && (
                      <CarouselItem>
                        <Row>
                          <Col>
                            <SlideHeader>
                              <LocaleString
                                stringKey="step_six.step_of"
                                formatString={{
                                  current: airportPickupArrivalAndDeparting ? 5 : 3,
                                  max: maxStepCount,
                                }}
                              />
                            </SlideHeader>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={12} lg={6}>
                            <SliderSubHeader>
                              <LocaleString stringKey="step_six.pick_up_location" />
                            </SliderSubHeader>
                            <DepartingCheckboxContainer departing={departing} />
                            <PickUpLocationTextField departing={departing} />
                          </Col>
                          <Col md={12} lg={6}>
                            <Paragraph medium className="step-six__step-paragraph">
                            <LocaleString
                              stringKey="step_six.schedule"
                              formatString={{ phone: '941-840-8092' }}
                            />
                            </Paragraph>
                          </Col>
                        </Row>
                      </CarouselItem>
                    )}
                    <CarouselItem>
                      <Row>
                        <Col>
                          <SlideHeader>
                            <LocaleString stringKey="step_six.summary" /> / {typeOfPickupTitle[airportPickup]}
                          </SlideHeader>
                        </Col>
                      </Row>
                      {unaccompanied === 'true' && (
                        <Row>
                          <Col className="step-six__summary__box">
                            <LocaleString stringKey="step_six.unaccompanied.clear" />:
                            <span className="step-six__summary__box__unaccompanied-price">
                              + {`$${transportUnaccompanied && transportUnaccompanied.price}`}
                            </span>
                          </Col>
                        </Row>
                      )}
                      
                      <Row>
                        <Fragment>
                          {(airportPickupArrivalAndDeparting || airportPickupArrivalOnly) && (
                            <Col md={12} lg={6} className="step-six__summary__box">
                              <SliderSubHeader>
                                Arrival
                              </SliderSubHeader>
                              <Row>
                                <Col md={12} className="box-item">
                                  <div>Transport:</div>
                                  <div>
                                   { (transport.find(v => Number(v.id) === Number(selectedTransportValue)) || {}).airport }
                                  </div>
                                </Col>
                                {!hasBookedFlight && (
                                  <Fragment>
                                    <Col md={12} className="box-item">
                                      <div>Airline: </div>
                                      <div>{ airportPickupAirline }</div>
                                    </Col>
                                    <Col md={12} className="box-item">
                                      <div>Flight Number: </div>
                                      <div> { arrivalFlightNumber }</div>
                                    </Col>
                                    <Col md={12} className="box-item">
                                      <div>Arrival Date: </div>
                                      <div> { arrivalDateTime }</div>
                                    </Col>
                                  </Fragment>
                                )}
                                <Col md={12} className="box-item">
                                  <div>Dropoff Location:</div>
                                  <div>{ dropoff !== 'other' ? dropoff : `Other: ${dropoffOtherLocation}` }</div>
                                </Col>
                              </Row>
                            </Col>
                          )}
                          {(airportPickupArrivalAndDeparting || airportPickupDepartingOnly) && (
                            <Col md={12} lg={6} className="step-six__summary__box">
                              <SliderSubHeader>
                                Departing
                              </SliderSubHeader>
                              <Row>
                                <Col md={12} className="box-item">
                                  <div>Transport:</div>
                                  <div>
                                    { (transport.find(v => Number(v.id) === Number(departingTransport)) || {}).airport }
                                  </div>
                                </Col>
                                {!hasBookedFlight && (
                                  <Fragment>
                                    <Col md={12} className="box-item">
                                      <div>Airline: </div>
                                      <div>{ airportDepartingAirline }</div>
                                    </Col>
                                    <Col md={12} className="box-item">
                                      <div>Flight Number: </div>
                                      <div> { departingFlightNumber }</div>
                                    </Col>
                                    <Col md={12} className="box-item">
                                      <div>Arrival Date: </div>
                                      <div> { departingDateTime }</div>
                                    </Col>
                                  </Fragment>
                                )}
                                <Col md={12} className="box-item">
                                  <div>Dropoff Location:</div>
                                  <div>{ departing !== 'other' ? departing : `Other: ${departingOtherLocation}` }</div>
                                </Col>
                              </Row>
                            </Col>
                          )}
                        </Fragment>
                      </Row>
                      <Row>
                        <Col className="add-to-cart">
                          <Button
                            className="add-to-cart__button card-body__button card-body__button--selected"
                            onClick={hasTransportationCartData ? this.unselectTransportationOption : this.addTransportDataToCart}
                          >
                            { hasTransportationCartData ? 'Remove' : 'Add to cart' }
                          </Button>
                        </Col>
                      </Row>
                    </CarouselItem>
                  </Carousel>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </AOSFadeInContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    airportPickup: stepSixAirportPickupSelector(state),
    airlines: stepSixAirlinesSelector(state),
    transport: stepSixTransportSelector(state),
    unaccompanied: stepSixUnaccompaniedSelector(state),
    dropoff: stepSixDropoffSelector(state),
    departing: stepSixDepartingSelector(state),
    departingTransport: stepSixDepartingTransportSelector(state),
    pickUp: stepSixPickUpOtherLocationSelector(state),
    selectedArrivalAirline: stepSixSelectedArrivalAirlineSelector(state),
    selectedDepartingAirline: stepSixSelectedDepartingAirlineSelector(state),
    selectedTransportValue: stepSixSelectedTransportSelector(state),
    stepFiveDataPerPage: stepFiveDataPerPageSelector(state),
    transportUnaccompanied: stepSixTransportUnaccompaniedSelector(state),
    sport: sportSelector(state),
    businessType: businessTypeSelector(state),
    packageType: packageTypeSelector(state),
    transportationId: stepSixTransportationIdSelector(state),
    step: state.steps.currentStep,
    stepFourData: stepFourDataSelector(state),
    cartId: cartIdSelector(state),
    participantId: participantIdSelector(state),
    cartStepSixUnnacompaniedProductId: cartStepSixUnnacompaniedProductIdSelector(state),
    cartStepSixDepartingProductId: cartStepSixDepartingProductIdSelector(state),
    cartStepSixArrivalProductId: cartStepSixArrivalProductIdSelector(state),
    departingPickupAirline: stepSixDepartingAirlineSelector(state),
    hasBookedFlight: stepSixHasBookedFlightSelector(state),
    airportPickupAirline: stepSixAirportPickupAirlineSelector(state),
    arrivalFlightNumber :stepSixArrivalFlightNumberSelector(state),
    arrivalDateTime: stepSixArrivalDateTimeSelector(state),
    airportDepartingAirline: stepSixDepartingAirlineSelector(state),
    departingFlightNumber: stepSixDepartingFlightNumberSelector(state),
    departingDateTime: stepSixDepartingDateTimeSelector(state),
    dropoffOtherLocation: stepSixDropoffOtherLocationSelector(state),
    departingOtherLocation: stepSixPickUpOtherLocationSelector(state),
    hasTransportationCartData: stepSixTransportCartData(state)
  };
};

function mapDispatchToProps(dispatch) {
  return {
    stepSixActions: bindActionCreators(stepSixActions, dispatch),
    stepsActions: bindActionCreators(stepsActions, dispatch),
  };
};

export default reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(
  connect(mapStateToProps, mapDispatchToProps)(StepSix)
);
