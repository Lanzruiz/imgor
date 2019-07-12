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
import LocaleString from '../../components/LocaleString';
import Header from '../../components/Header';
import Image from '../../components/Image';
import Card, { CardContent, CardContentRow, CardContentCol, CardContentText } from '../../components/Card';
import AirportPickupCheckboxContainer from './components/AirportPickupCheckboxContainer';
// Images
import AOSFadeInContainer from '../../components/AOSFadeInContainer';
import StepFiveCatalogExcursionsNew from '../StepFiveCatalogExcursionsNew';
import StepFiveCatalogGearUpsellNew from '../StepFiveCatalogGearUpsellNew';
import StepFiveCatalogGear from '../StepFiveCatalogGear';
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
import { weeksWeeksSelector } from '../StepOne/selectors';
// Constants
import { stepsEnum } from '../../constants/steps';
import { stepSixFormFieldNames, airportPickupInformation } from './selectors';
import { productTypesEnum } from '../../constants/cart';
// Styles
import './styles.scss';

class StepSix extends React.Component {
  static defaultProps = {
    transportation: 'false',
    transport: [],
    selectedArrivalAirline: {},
    selectedDepartingAirline: {},
  };

  state = {
    laundryServiceQuantity: this.props.laundryServiceQuantity,
    selectedLaundryServiceId: null,
    shouldUpdateLaundryService: false,
    isProcessingLaundryService: false,
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
    this.getLaundryServiceData();
  }

  sendStepToDrupal = () => {
    if(window.updateBookingSteps) {
      window.updateBookingSteps(5);
    }
  };

  sendRemoveStepToDrupal = () => {
    if(window.updateBookingSteps) {
      window.updateBookingRemoveSteps(5);
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
    this.sendRemoveStepToDrupal();
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

  // Laundry service methods
  getLaundryServiceData = () => {
    this.props.stepSixActions.stepSixGetLaundryServiceRequest();
  }

  handleSelectLaundry = () => {
    if (this.state.isProcessingLaundryService) {
      return null;
    }

    this.setState({ isProcessingLaundryService: true });
  
    this.props.stepSixActions.stepSixAddLaundryServiceToCart({
      attributes: {},
      quantity: this.state.laundryServiceQuantity,
      cartId: this.props.cartId,
      participantId: this.props.participantId,
      productId: this.props.laundryService.list[0].id,
      type: productTypesEnum.gear,
      product: this.props.laundryService.list[0],
    }).then((data) => {
      this.setState({
        isLaundryServiceSelected: true,
        isProcessingLaundryService: false,
        selectedLaundryServiceId: data.participant_product_id,
      });
    });
  }

  handleRemoveLaundry = () => {
    if (this.state.isProcessingLaundryService) {
      return null;
    }

    this.setState({ isProcessingLaundryService: true });

    // Card component is designed like this, cannot change it for now
    // It should be agnostic of the item being selected and the click handlers from the parent
    // <Card onSelect={() => remove, update or add an item to card } />
    if (this.state.shouldUpdateLaundryService) {
      this.props.stepSixActions.stepSixUpdateLaundryServiceFromCart({
        quantity: this.state.laundryServiceQuantity,
        cartId: this.props.cartId,
        participantId: this.state.participantId,
        productId: this.state.selectedLaundryServiceId,
        type: productTypesEnum.gear,
        product: this.props.laundryService.list[0],
      }).then(() => {
        this.setState({
          shouldUpdateLaundryService: false,
          isProcessingLaundryService: false,
        });
      });

      return null;
    }
    
    this.props.stepSixActions.stepSixRemoveLaundryServiceFromCart({
      cartId: this.props.cartId,
      participantId: this.props.participantId,
      productId: this.state.selectedLaundryServiceId,
    }).then(() => {
      this.setState({
        isLaundryServiceSelected: false,
        laundryServiceQuantity: this.props.laundryServiceQuantity,
        isProcessingLaundryService: false
      });
    })
  }

  getLaundryServiceButtonElement() {
    if (this.state.isProcessingLaundryService) {
      return <LocaleString stringKey="loading" />;
    }

    if (!this.state.isLaundryServiceSelected) {
      return <LocaleString stringKey="select" />;
    }

    if (this.state.shouldUpdateLaundryService) {
      return <LocaleString stringKey="update" />;
    }

    return <LocaleString stringKey="remove" />;
  }

  render() {
    const {
      airlines, airportPickup, transport, dropoff, departing, transportUnaccompanied,
      departingTransport, selectedTransportValue, stepFourData, hasArrivalBookedFlight, arrivalFlightNumber,
      arrivalDateTime, airportPickupAirline, airportDepartingAirline, departingFlightNumber, departingDateTime,
      hasTransportationCartData, hasDepartingBookedFlight, arrivalUnaccompanied, departureUnaccompanied,
      laundryService,
    } = this.props;

    const { laundryServiceQuantity, isLaundryServiceSelected } = this.state;
    
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
      <Fragment>
        <AOSFadeInContainer className="step-six" id="step-5" ref={this.stepSix}>
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
              <Col className="service-card" lg={6} md={6} xs={12} style={{ paddingRight: 15, paddingLeft: 15, marginBottom: 15, zIndex: 15 }}>
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
          
              {/* XXX Pull this component into its own file */}
              {laundryService && (
                <Col className="service-card" lg={6} md={6} xs={12} style={{ paddingRight: 15, paddingLeft: 15, marginBottom: 15, zIndex: 15 }}>
                  <Card
                    id={laundryService.list[0].id}
                    selectedId={isLaundryServiceSelected ? laundryService.list[0].id : null}
                    cardHeader="Laundry Service"
                    color="dark-blue"
                    price={laundryService.startingPrice}
                    headerSize="extra-small"
                    customButtonTitle={this.getLaundryServiceButtonElement()}
                    className="laundry-card"
                    onClick={this.handleSelectLaundry}
                    onRemove={this.handleRemoveLaundry}
                  >
                    <CardContent>
                      <CardContentRow>
                        <CardContentCol className="card-content__img-container" style={{ background: '#fff' }}>
                          <Image className="card-content__img" defaultSrc={laundryService.list[0].image_url} />
                        </CardContentCol>
                        <CardContentCol className="react-center-left react-flex-1 laundry-card__right">
                          <span className="laundry-card__quantity-title">
                            <LocaleString stringKey="quantity" />
                          </span>
                          
                          <div className="laundry-card__quantity-input">
                            <Button
                            onClick={() => {
                              this.setState({ laundryServiceQuantity: laundryServiceQuantity - 1 });
                              if (isLaundryServiceSelected) {
                                this.setState({ shouldUpdateLaundryService: true });
                              }
                            }}
                            disabled={laundryServiceQuantity === 1}
                            children="-"
                            />
                            <span>{laundryServiceQuantity}</span>
                            <Button
                              onClick={() => {
                                this.setState({ laundryServiceQuantity: laundryServiceQuantity + 1 });
                                if (isLaundryServiceSelected) {
                                  this.setState({ shouldUpdateLaundryService: true });
                                }
                              }}
                              children="+"
                            />
                          </div>
                        </CardContentCol>

                      </CardContentRow>
                      <CardContentText>
                        {laundryService.list[0].description}
                      </CardContentText>
                    </CardContent>
                  </Card>
                </Col>
              )}
              
              <StepFiveCatalogGearUpsellNew />
            </Row>
          </Container>
        </AOSFadeInContainer>
      
        <StepFiveCatalogExcursionsNew/>
        <StepFiveCatalogGear/>

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
  laundryService: PropTypes.shape({
    startingPrice: PropTypes.number,
    list: PropTypes.array,
  }),
  weeksLength: PropTypes.number,
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
    laundry: participantIdSelector(state),
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
    laundryService: state.stepSix.laundryService,
    laundryServiceQuantity: weeksWeeksSelector(state).length > 1
      ? weeksWeeksSelector(state).length
      : 1,
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
