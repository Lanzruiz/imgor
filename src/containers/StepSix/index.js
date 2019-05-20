// Modules
import find from 'lodash/find';
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
import LocaleString from '../../components/LocaleString';
import DatePickerReduxForm from '../../components/DatePicker';
import Image from '../../components/Image';
import AirportHasArrivalFlightBookedCheckbox from './components/AirportHasArrivalFlightBookedCheckbox';
import AirportHasDepartingFlightBookedCheckbox from './components/AirportHasDepartingFlightBookedCheckbox';
import AirportPickupCheckboxContainer from './components/AirportPickupCheckboxContainer';
import ArrivalFlightNumberTextInput from './components/ArrivalFlightNumberTextInput';
import FlightNumberDepartingTextInput from './components/FlightNumberDepartingTextInput';
import UnaccompaniedCheckboxContainer from './components/UnaccompaniedCheckboxContainer';
import TransportRadioContainer from './components/TransportRadioContainer';
import AirlinesDepartingDropdownContainer from './components/AirlinesDepartingDropdownContainer';
import AirlinesDropdownContainer from './components/AirlinesDropdownContainer';
import AOSFadeInContainer from '../../components/AOSFadeInContainer';
import Paragraph from './components/Paragraph';
// Images
import stubImage from '../../assets/img/2018-Suburban.png';
import planeImage from '../../assets/img/plane.svg';
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
  stepSixArrivalFlightNumberSelector,
  stepSixArrivalDateTimeSelector,
  stepSixDepartingFlightNumberSelector,
  stepSixDepartingDateTimeSelector,
  stepSixDropoffOtherLocationSelector,
  stepSixTransportCartData,
  stepSixHasArrivalBookedFlightSelector,
  stepSixHasDepartingBookedFlightSelector,
  stepSixArrivalUnaccompaniedSelector,
  stepSixDepartureUnaccompaniedSelector,
  departingFormFieldNames,
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
    //this.scrollToCurrentComponent()
    this.sendStepToDrupal();
  }

  sendStepToDrupal = () => {
    if(window.updateBookingSteps) {
      window.updateBookingSteps(6);
    }
  };

  componentDidUpdate(prevProps) {
    const { step } = this.props;
    if ((step !== prevProps.step) && (prevProps.step > step) && ((prevProps.step - 1) === step)) {
      scrollToComponent(this.stepSix.current, { align: 'top', duration: 500 });
    }
  }

  scrollToCurrentComponent = () => {
    scrollToComponent(this, { align: 'top', duration: 500 });
  };

  componentWillUnmount() {
    this.setDefaultState();
  }
  
  setDepartingAirlines = (id) => {
    this.props.stepSixActions.stepSixSetDepartingAirlines(id);
  };
  
  setDefaultState = () => {
    const { dispatch } = this.props;
    for (let key in stepSixFormFieldNames) {
      dispatch( change('wizard', stepSixFormFieldNames[key], ''), );
    }
    // if (cartStepSixArrivalProductId) {
    //   this.props.stepSixActions.stepSixDeleteProductInTheCart({ cartId, participantId, productId: cartStepSixArrivalProductId, type: 'arrival_transport' });
    // }
    // if (cartStepSixDepartingProductId) {
    //   this.props.stepSixActions.stepSixDeleteProductInTheCart({ cartId, participantId, productId: cartStepSixDepartingProductId, type: 'departing_transport' });
    // }
    // if (cartStepSixUnnacompaniedProductId) {
    //   this.props.stepSixActions.stepSixDeleteProductInTheCart({ cartId, participantId, productId: cartStepSixUnnacompaniedProductId, type: 'unacompannied' });
    // }
    
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
    this.props.stepSixActions.stepSixUnselectTransportationOption({
      cartId: this.props.cartId,
      participantId: this.props.participantId,
    });
  };
  
  addTransportDataToCart = async () => {
    await this.props.stepSixActions.stepSixAddTransportToCart({
      cartId: this.props.cartId,
      participantId: this.props.participantId
    });
  };
  
  handlePickupChange = () => {
    const { airportPickup } = this.props;
    
    if(!airportPickup){
      this.selectTransportationOption(0);
    }
    
    this.props.stepSixActions.stepSixClearTransportCart();
  };

  render() {
    const {
      airlines, airportPickup, transport, dropoff, departing, transportUnaccompanied,
      departingTransport, selectedTransportValue, stepFourData, hasArrivalBookedFlight, arrivalFlightNumber,
      arrivalDateTime, airportPickupAirline, airportDepartingAirline, departingFlightNumber, departingDateTime,
      hasTransportationCartData, hasDepartingBookedFlight, arrivalUnaccompanied, departureUnaccompanied
    } = this.props;
    
    const airportPickupArrivalAndDeparting = isEqual(airportPickup, airportPickupInformation.both);
    const airportPickupArrivalOnly = isEqual(airportPickup, airportPickupInformation.arrival);
    const airportPickupDepartingOnly = isEqual(airportPickup, airportPickupInformation.departing);

    const currentStepNumber = (stepFourData.length > 0) ? stepsEnum.six : stepsEnum.five;
    
    const parsedTransport = transport.map(v => ({
      id: v.id,
      display_name: `${v.airport} - $${v.price}`,
      name: v.package_product_id,
    }));
    
    const shouldDisplayArrival = airportPickupArrivalAndDeparting || airportPickupArrivalOnly;
    const shouldDisplayDeparture = airportPickupArrivalAndDeparting || airportPickupDepartingOnly;
  
    
    const arrivalData = [
      selectedTransportValue,
      arrivalUnaccompanied,
      ...(hasArrivalBookedFlight ? [airportPickupAirline, arrivalDateTime, arrivalFlightNumber] : [])
    ];
    const departureData = [
      departingTransport,
      departureUnaccompanied,
      ...(hasDepartingBookedFlight ? [airportDepartingAirline, departingDateTime, departingFlightNumber] : [])
    ];
    
    const dataToCheck = [...(shouldDisplayArrival ? arrivalData : []), ...(shouldDisplayDeparture ? departureData : [])];
    
    const shouldDisplaySummary = airportPickup && dataToCheck.filter(v => !v).length === 0;
    
    const locations = {
      [departingFormFieldNames.imgaCampusCenter]: 'step_six.campus_center',
      [departingFormFieldNames.imgaClubHouse]: 'step_six.club_house',
      [departingFormFieldNames.other]: 'step_six.other',
    };
    
    return (
      <AOSFadeInContainer className="step-six" id="step-6" ref={this.stepSix}>
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
          <Col>
            <Row style={{display: 'flex'}}>
              <Col lg={6} md={6} xs={12} style={{ paddingRight: 0, paddingLeft: 0, marginBottom: 15, zIndex: 15 }}>
                <div className="section transport">
                  <div className="transport__header">
                    <div className="transport__header__title">
                      Airport Shuttle
                    </div>
                    <div className="transport__header__price">
                      <div className="price">$99</div>
                      <div className="starting">Starting At</div>
                    </div>
                  </div>
                  <div className="transport__image">
                    <Image
                      className="card-content__img"
                      defaultSrc={stubImage}
                      src="step_six.transport.image_path"
                    />
                  </div>
                  <div className="transport__options">
                    <div className="transport__options__title">
                      Schedule Airport Transportation
                    </div>
                    <AirportPickupCheckboxContainer
                      handleChange={this.handlePickupChange}
                      airportPickup={airportPickup}
                    />
                  </div>
                </div>
  
                {shouldDisplayArrival && (
                  <div className="section pick-up">
                    <div className="content">
                      <div className="title">
                        <Image
                          defaultSrc={planeImage}
                          src="step_six.plane"
                          className="icon-airplane"
                        />
                        <LocaleString stringKey="step_six.arrival.title" />
                      </div>
                      <div className="airport">
                        <div className="airport__title">
                          <LocaleString stringKey="step_six.arrival.airport" />
                        </div>
                        <div className="dropdown">
                          <TransportRadioContainer
                            name={stepSixFormFieldNames.transport}
                            options={parsedTransport}
                            value={selectedTransportValue}
                          />
                        </div>
                      </div>
                      {/*<div className="location">*/}
                      {/*  <div className="location__title">*/}
                      {/*    <LocaleString stringKey="step_six.arrival.location" />*/}
                      {/*  </div>*/}
                      {/*  <DropoffCheckboxContainer dropoff={dropoff} />*/}
                      {/*  <DropoffLocationTextField dropoff={dropoff} />*/}
                      {/*</div>*/}
                      <div className="unaccompanied">
                        <div className="unaccompanied__title">
                          <LocaleString stringKey="step_six.unaccompanied" />
                        </div>
                        <Paragraph>
                          <LocaleString stringKey="step_six.airlines_service" />
                        </Paragraph>
                        <div className="unaccompanied__has-unaccompanied">
                          <UnaccompaniedCheckboxContainer
                            name={stepSixFormFieldNames.arrivalUnaccompanied}
                            unaccompanied={arrivalUnaccompanied}
                            transportUnaccompanied={transportUnaccompanied}
                          />
                        </div>
                        <div className="unaccompanied__booked-flight">
                          <AirportHasArrivalFlightBookedCheckbox />
                        </div>
                        {hasArrivalBookedFlight && (
                          <div className="unaccompanied__flight-details">
                            <div className="flight-details__box">
                              <div className="unaccompanied__subtitle">
                                <LocaleString stringKey="step_six.arrival.flight_number" />
                              </div>
                              <ArrivalFlightNumberTextInput />
                            </div>
                            <div className="flight-details">
                              <div className="flight-details__box">
                                <div className="unaccompanied__subtitle">
                                  <LocaleString stringKey="step_six.arrival.airline" />
                                </div>
                                <AirlinesDropdownContainer airlines={airlines} />
                              </div>
                              <div className="flight-details__box">
                                <div className="unaccompanied__subtitle">
                                  <LocaleString stringKey="step_six.arrival.date" />
                                </div>
                                <DatePickerReduxForm
                                  isClearable
                                  name={stepSixFormFieldNames.arrivalDateTime}
                                  className="step-six__text-input step-six__form-field"
                                  placeholder="Arrival Date & Time"
                                  minDate={new Date()}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                        <p className="description step-six__paragraph step-six__paragraph--small">
                          <LocaleString stringKey={'step_six.provide_later_description'} />
                        </p>
                      </div>
                    </div>
                  </div>
                )}
  
                {shouldDisplayDeparture && (
                  <div className="section drop-off">
                    <div className="content">
                      <div className="title">
                        <Image
                          defaultSrc={planeImage}
                          src="step_six.plane"
                          className="icon-airplane"
                        />
                        <LocaleString stringKey="step_six.departure.title" />
                      </div>
                      <div className="airport">
                        <div className="airport__title">
                          <LocaleString stringKey="step_six.departure.airport" />
                        </div>
                        <TransportRadioContainer
                          name={stepSixFormFieldNames.departingTransport}
                          options={parsedTransport}
                          value={departingTransport}
                        />
                      </div>
                      
                      {/*<div className="location">*/}
                      {/*  <div className="location__title">*/}
                      {/*    <LocaleString stringKey="step_six.departure.location" />*/}
                      {/*  </div>*/}
                      {/*  <DepartingCheckboxContainer departing={departing} />*/}
                      {/*  <PickUpLocationTextField departing={departing} />*/}
                      {/*</div>*/}
                      
                      <div className="unaccompanied">
                        <div className="unaccompanied__title">
                          <LocaleString stringKey="step_six.unaccompanied" />
                        </div>
                        <Paragraph>
                          <LocaleString stringKey="step_six.airlines_service" />
                        </Paragraph>
                        <div className="unaccompanied__has-unaccompanied">
                          <UnaccompaniedCheckboxContainer
                            name={stepSixFormFieldNames.departureUnaccompanied}
                            unaccompanied={departureUnaccompanied}
                            transportUnaccompanied={transportUnaccompanied}
                          />
                        </div>
                        <div className="unaccompanied__booked-flight">
                          <AirportHasDepartingFlightBookedCheckbox />
                        </div>
                        {hasDepartingBookedFlight && (
                          <div className="unaccompanied__flight-details">
                            <div className="flight-details__box">
                              <div className="unaccompanied__subtitle">
                                <LocaleString stringKey="step_six.departure.flight_number" />
                              </div>
                              <FlightNumberDepartingTextInput />
                            </div>
                            
                            <div className="flight-details">
                              <div className="flight-details__box">
                                <div className="unaccompanied__subtitle">
                                  <LocaleString stringKey="step_six.departure.airline" />
                                </div>
                                <AirlinesDepartingDropdownContainer airlines={airlines} />
                              </div>
                              <div className="flight-details__box">
                                <div className="unaccompanied__subtitle">
                                  <LocaleString stringKey="step_six.departure.date" />
                                </div>
                                <DatePickerReduxForm
                                  isClearable
                                  name={stepSixFormFieldNames.departingDateTime}
                                  className="step-six__text-input step-six__form-field"
                                  placeholder="Departing Date & Time"
                                  minDate={new Date()}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                        <p className="description step-six__paragraph step-six__paragraph--small">
                          <LocaleString stringKey={'step_six.provide_later_description'} />
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {shouldDisplaySummary && (
                  <div className="section summary">
                    <div className="content">
                      <div className="title">
                        <LocaleString stringKey="step_six.summary" />
                      </div>
                      {shouldDisplayArrival && (
                        <div className="summary__box">
                          <div className="subtitle">
                            <LocaleString stringKey="step_six.summary.arrival" />
                          </div>
                          <div className="summary__item">
                            <div className="label">
                              <LocaleString stringKey="step_six.summary.arrival.airport" />
                            </div>
                            { (find(parsedTransport, [ 'name', selectedTransportValue ]) || {}).display_name  }
                          </div>
                          <div className="summary__item">
                            <div className="label">
                              <LocaleString stringKey="step_six.summary.arrival.location" />
                            </div>
                            { locations[dropoff] ?  <LocaleString stringKey={locations[dropoff]} /> : dropoff }
                          </div>
                          {hasArrivalBookedFlight && (
                            <Fragment>
                              <div className="summary__item">
                                <div className="label">
                                  <LocaleString stringKey="step_six.summary.arrival.airline" />
                                </div>
                                { airportPickupAirline }
                              </div>
                              <div className="summary__item">
                                <div className="label">
                                  <LocaleString stringKey="step_six.summary.arrival.date" />
                                </div>
                                { arrivalDateTime }
                              </div>
                              <div className="summary__item">
                                <div className="label">
                                  <LocaleString stringKey="step_six.summary.arrival.flight_number" />
                                </div>
                                { arrivalFlightNumber }
                              </div>
                            </Fragment>
                          )}
                          <div className="summary__item">
                            <div className="label">
                              <LocaleString stringKey="step_six.summary.arrival.unaccompanied" />
                            </div>
                            {arrivalUnaccompanied === 'true'
                              ? `Yes +$${transportUnaccompanied && transportUnaccompanied.price}`
                              : `No`
                            }
                          </div>
                        </div>
                      )}
    
                      {shouldDisplayDeparture && (
                        <div className="summary__box">
                          <div className="subtitle">
                            <LocaleString stringKey="step_six.summary.departure" />
                          </div>
                          <div className="summary__item">
                            <div className="label">
                              <LocaleString stringKey="step_six.summary.departure.airport" />
                            </div>
                            { (find(parsedTransport, [ 'name', departingTransport ]) || {}).display_name }
                          </div>
                          <div className="summary__item">
                            <div className="label">
                              <LocaleString stringKey="step_six.summary.departure.location" />
                            </div>
                            { locations[departing] ?  <LocaleString stringKey={locations[departing]} /> : departing }
                          </div>
                          {hasDepartingBookedFlight && (
                            <Fragment>
                              <div className="summary__item">
                                <div className="label">
                                  <LocaleString stringKey="step_six.summary.departure.airline" />
                                </div>
                                { airportDepartingAirline }
                              </div>
                              <div className="summary__item">
                                <div className="label">
                                  <LocaleString stringKey="step_six.summary.departure.date" />
                                </div>
                                { departingDateTime }
                              </div>
                              <div className="summary__item">
                                <div className="label">
                                  <LocaleString stringKey="step_six.summary.departure.flight_number" />
                                </div>
                                { departingFlightNumber }
                              </div>
                            </Fragment>
                          )}
                          <div className="summary__item">
                            <div className="label">
                              <LocaleString stringKey="step_six.summary.departure.unaccompanied" />
                            </div>
                            {departureUnaccompanied === 'true'
                              ? `Yes +$${transportUnaccompanied && transportUnaccompanied.price}`
                              : `No`
                            }
                          </div>
                        </div>
                      )}
                    </div>
                    
                  </div>
                )}
                
                {shouldDisplaySummary && (
                  <Button className="transport-button" onClick={hasTransportationCartData ? this.unselectTransportationOption : this.addTransportDataToCart}>
                    { hasTransportationCartData ? 'Remove' : 'Select' }
                  </Button>
                )}
              </Col>
              
            </Row>
          </Col>
        </Container>
      </AOSFadeInContainer>
    );
  }
}

StepSix.propTypes = {
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


function mapStateToProps(state) {
  return {
    airportPickup: stepSixAirportPickupSelector(state),
    airlines: stepSixAirlinesSelector(state),
    transport: stepSixTransportSelector(state),
    unaccompanied: stepSixUnaccompaniedSelector(state),
    arrivalUnaccompanied: stepSixArrivalUnaccompaniedSelector(state),
    departureUnaccompanied: stepSixDepartureUnaccompaniedSelector(state),
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
    hasArrivalBookedFlight: stepSixHasArrivalBookedFlightSelector(state),
    hasDepartingBookedFlight: stepSixHasDepartingBookedFlightSelector(state),
    airportPickupAirline: stepSixAirportPickupAirlineSelector(state),
    arrivalFlightNumber :stepSixArrivalFlightNumberSelector(state),
    arrivalDateTime: stepSixArrivalDateTimeSelector(state),
    airportDepartingAirline: stepSixDepartingAirlineSelector(state),
    departingFlightNumber: stepSixDepartingFlightNumberSelector(state),
    departingDateTime: stepSixDepartingDateTimeSelector(state),
    dropoffOtherLocation: stepSixDropoffOtherLocationSelector(state),
    departingOtherLocation: stepSixPickUpOtherLocationSelector(state),
    hasTransportationCartData: stepSixTransportCartData(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    stepSixActions: bindActionCreators(stepSixActions, dispatch),
    stepsActions: bindActionCreators(stepsActions, dispatch),
  };
}

export default reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(
  connect(mapStateToProps, mapDispatchToProps)(StepSix)
);
