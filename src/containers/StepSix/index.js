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
import Image from '../../components/Image';
import AirportPickupCheckboxContainer from './components/AirportPickupCheckboxContainer';
import AOSFadeInContainer from '../../components/AOSFadeInContainer';
import StepFiveCatalogExcursionsNew from '../StepFiveCatalogExcursionsNew'
import StepFiveCatalogGearUpsellNew from '../StepFiveCatalogGearUpsellNew'
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
import DropOffSection from './sections/DropOffSection';
import PickUpSection from './sections/PickUpSection';
import SummarySection from './sections/SummarySection';
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
      dropoff,
      ...(hasArrivalBookedFlight ? [airportPickupAirline, arrivalDateTime, arrivalFlightNumber] : [])
    ];
    const departureData = [
      departingTransport,
      departureUnaccompanied,
      departing,
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
      <Fragment>
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
            <Row style={{ display: 'flex' }}>
              <Col lg={6} md={6} xs={12} style={{ paddingRight: 15, paddingLeft: 15, marginBottom: 15, zIndex: 15 }}>
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
                  <PickUpSection
                    options={parsedTransport} value={selectedTransportValue} dropoff={dropoff}
                    unaccompanied={arrivalUnaccompanied} transportUnaccompanied={transportUnaccompanied}
                    hasArrivalBookedFlight={hasArrivalBookedFlight} airlines={airlines}
                  />
                )}
              
                {shouldDisplayDeparture && (
                  <DropOffSection
                    options={parsedTransport} value={departingTransport} departing={departing}
                    unaccompanied={departureUnaccompanied}
                    transportUnaccompanied={transportUnaccompanied}
                    hasDepartingBookedFlight={hasDepartingBookedFlight} airlines={airlines}
                  />
                )}
              
                {shouldDisplaySummary && (
                  <SummarySection
                    shouldDisplayArrival={shouldDisplayArrival} parsedTransport={parsedTransport}
                    selectedTransportValue={selectedTransportValue} locations={locations}
                    dropoff={dropoff} hasArrivalBookedFlight={hasArrivalBookedFlight}
                    airportPickupAirline={airportPickupAirline} arrivalDateTime={arrivalDateTime}
                    arrivalFlightNumber={arrivalFlightNumber}
                    arrivalUnaccompanied={arrivalUnaccompanied}
                    transportUnaccompanied={transportUnaccompanied}
                    shouldDisplayDeparture={shouldDisplayDeparture}
                    departingTransport={departingTransport} departing={departing}
                    hasDepartingBookedFlight={hasDepartingBookedFlight}
                    airportDepartingAirline={airportDepartingAirline}
                    departingDateTime={departingDateTime} departingFlightNumber={departingFlightNumber}
                    departureUnaccompanied={departureUnaccompanied}
                  />
                )}
              
                {shouldDisplaySummary && (
                  <Button className="transport-button"
                          onClick={hasTransportationCartData ? this.unselectTransportationOption : this.addTransportDataToCart}>
                    {hasTransportationCartData ? 'Remove' : 'Confirm'}
                  </Button>
                )}
              </Col>
          
            </Row>
          </Container>
        </AOSFadeInContainer>
      
        <StepFiveCatalogGearUpsellNew/>
        <StepFiveCatalogExcursionsNew/>
      </Fragment>
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
