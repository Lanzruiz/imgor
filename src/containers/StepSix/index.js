// Modules
import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { connect } from 'react-redux';
import scrollToComponent from 'react-scroll-to-component';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { bindActionCreators } from 'redux';
import cx from 'classnames';
import isEqual from 'lodash/isEqual';
// Components
import Header from '../../components/Header';
import Card, { CardContent, CardContentRow, CardContentCol, CardContentText } from '../../components/Card';
import LocaleString from '../../components/LocaleString';
import Radio from '../../components/Radio';
import Carousel, { CarouselItem } from '../../components/Carousel';
import Dropdown from '../../components/Dropdown';
import Input from '../../components/Input';
import DatePickerReduxForm from '../../components/DatePicker';
import Image from '../../components/Image';
import AirportPickupCheckboxContainer from './components/AirportPickupCheckboxContainer';
// Images
import stubImage from '../../assets/img/2018-Suburban.png';
// Actions
import * as stepSixActions from '../../actions/step.six';
import * as stepsActions from '../../actions/steps';
// Selectors
import {
  stepSixTransportationSelector, stepSixAirportPickupSelector, stepSixTransportSelector,
  stepSixUnaccompaniedSelector, stepSixAirlinesSelector, stepSixDropoffSelector,
  stepSixDepartingSelector, stepSixDepartingTransportSelector, stepSixPickUpOtherLocationSelector,
  stepSixSelectedArrivalAirlineSelector, stepSixSelectedDepartingAirlineSelector,
  stepSixSelectedTransportSelector, stepSixTransportUnaccompaniedSelector,
} from './selectors';
import { stepFiveDataPerPageSelector } from '../StepFive/selectors';
// Constants
import { stepsEnum } from '../../constants/steps';
import { stepSixFormFieldNames, airportPickupInformation, departingFormFieldNames } from './selectors';
// Helpers
import validation from '../../helpers/validate';
// Styles
import './styles.scss';

class StepSix extends React.Component {
  static propTypes = {
    transportation: PropTypes.string.isRequired,
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
    const { stepFiveDataPerPage } = this.props;
    if (isEqual(stepFiveDataPerPage.length, 0)) {
      scrollToComponent(this.stepSix.current);
    }
    this.stepSixGetCatalogTransportUnaccompanied();
    this.getCatalogTransport();
    this.getCatalogAirlines();
  }

  componentDidUpdate(prevProps) {
    const { transportation } = this.props;
    if (isEqual(transportation, 'true') && !isEqual(transportation, prevProps.transportation)) {
      this.props.stepsActions.setStepsCounter(stepsEnum.six);
    }
  }

  componentWillUnmount() {
    this.setDefaultState();
  }

  render() {
    const {
      airlines, transportation, airportPickup, transport, unaccompanied, dropoff, departing, transportUnaccompanied,
      departingTransport, selectedArrivalAirline, selectedDepartingAirline, selectedTransportValue,
    } = this.props;

    const airportPickupArrivalAndDeparting = isEqual(airportPickup, airportPickupInformation.both);
    const airportPickupArrivalOnly = isEqual(airportPickup, airportPickupInformation.arrival);
    const airportPickupDepartingOnly = isEqual(airportPickup, airportPickupInformation.departing);

    const maxStepCount = (
      airportPickupArrivalAndDeparting
        ? 5
        : airportPickup
          ? 3
          : 1
    );

    const shouldRenderSlides =  !isEqual(airportPickupInformation.noPickup, airportPickup) ? !!airportPickup : false;

    return (
      <div className="step-six">
        <Container style={{ marginBottom: '65px' }} ref={this.stepSix}>
          <Row>
            <Col>
              <Header
                header="step_six.header"
                subHeader="step_six.sub_header"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              {isEqual(transportation, 'false') && (
                <div className="step-six__initial-question">
                  <h3 className="step-six__initial-header">
                    <LocaleString stringKey="step_six.initial_header" />
                  </h3>
                  <TransportationCheckboxContainer transportation={transportation} />
                </div>
              )}
              {isEqual(transportation, 'true') && (
                <Row style={{ marginLeft: 0, overflow: 'hidden' }}>
                  <Col md={4} style={{ paddingRight: 0, paddingLeft: 0, marginBottom: 15, zIndex: 15 }}>
                    <Card
                      id={0}
                      className="step-six__transportation-card-container"
                      cardHeader={<LocaleString stringKey="step_six.travel" />}
                      color="dark"
                      header={<LocaleString stringKey="step_six.airport_pickup" />}
                      label={<LocaleString stringKey="step_five.popular_item" />}
                      price="99"// TODO: rewrite that!
                      selectedId={null}
                      headerSize="extra-small"
                      priceDescription={<LocaleString stringKey="step_six.starting_at" />}
                      buttonBlock={false}
                    >
                      <CardContent className="step-six__transportation-card">
                        <CardContentRow>
                          <CardContentCol>
                            <Image className="card-content__img" src={stubImage} />
                          </CardContentCol>
                          <CardContentCol>
                            <AirportPickupCheckboxContainer airportPickup={airportPickup} />
                          </CardContentCol>
                        </CardContentRow>
                        <CardContentText>
                          {/*
                          // TODO: rewrite that!
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi viverra mattis sapien sed sollicitudin.
                          Phasellus id massa ac sapien gravida bibendum. Nulla pellentesque hendrerit turpis, in cursus eros lacinia
                          sit amet. Morbi consectetur nibh ut eros luctus, nec consectetur nibh rhoncus. Pellentesque at diam ante.
                          Nullam sagittis tempor nibh sit amet eleifend. Vestibulum eu commodo ex, ut pretium nulla.
                          */}
                        </CardContentText>
                      </CardContent>
                    </Card>
                  </Col>
                  <Col md={8} style={{ padding: 0, marginBottom: '15px', marginTop: '30px' }}>
                    <Carousel render={shouldRenderSlides}>
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
                            <Col>
                              <SliderSubHeader>
                                <LocaleString stringKey="step_six.arrival_flight_information" />
                              </SliderSubHeader>
                              <TransportRadioContainer
                                options={transport}
                                value={selectedTransportValue}
                              />
                            </Col>
                            <Col>
                              <AirlinesDropdownContainer
                                airlines={airlines}
                                handleChange={this.setArrivalAirlines}
                                selectedOption={selectedArrivalAirline.display_name}
                              />
                              <ArrivalFlightNumberTextInput />
                              <DatePickerReduxForm
                                isClearable
                                name={stepSixFormFieldNames.arrivalDateTime}
                                className="step-six__text-input step-six__form-field"
                                placeholder="Arrival Date & Time"
                              />
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
                                  formatString={{ current: 3, max: maxStepCount }}
                                />
                              </SlideHeader>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <SliderSubHeader>
                                <LocaleString stringKey="step_six.dropoff_location" />
                              </SliderSubHeader>
                              <DropoffCheckboxContainer dropoff={dropoff} />
                              <DropoffLocationTextField dropoff={dropoff} />
                            </Col>
                            <Col>
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
                            <Col>
                              <SliderSubHeader>
                                <LocaleString stringKey="step_six.departing_airport_location" />
                              </SliderSubHeader>
                              <DepartingTransportRadioContainer
                                options={transport}
                                value={departingTransport}
                              />
                            </Col>
                            <Col>
                              <AirlinesDepartingDropdownContainer
                                airlines={airlines}
                                handleChange={this.setDepartingAirlines}
                                selectedOption={selectedDepartingAirline.display_name}
                              />
                              <FlightNumberDepartingTextInput />
                              <DatePickerReduxForm
                                isClearable
                                name={stepSixFormFieldNames.departingDateTime}
                                className="step-six__text-input step-six__form-field"
                                placeholder="Departing Date & Time"
                              />
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
                                    current: airportPickupArrivalAndDeparting ? 5 : 3,
                                    max: maxStepCount,
                                  }}
                                />
                              </SlideHeader>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <SliderSubHeader>
                                <LocaleString stringKey="step_six.pick_up_location" />
                              </SliderSubHeader>
                              <DepartingCheckboxContainer departing={departing} />
                              <PickUpLocationTextField departing={departing} />
                            </Col>
                            <Col>
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
                    </Carousel>
                  </Col>
                </Row>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  setArrivalAirlines = (id) => {
    this.props.stepSixActions.stepSixSetArrivalAirlines(id);
  };

  setDepartingAirlines = (id) => {
    this.props.stepSixActions.stepSixSetDepartingAirlines(id);
  };

  setDefaultState = () => {
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
  }
}

function DropoffLocationTextField(args) {
  const { dropoff } = args;
  const isDisabled = dropoff !== departingFormFieldNames.other;
  return (
    <div className="step-six__text-input step-six__form-field">
      <Input
        name={stepSixFormFieldNames.dropoffOtherLocation}
        label="step_six.other_location"
        disabled={isDisabled}
      />
    </div>
  );
}

function PickUpLocationTextField(args) {
  const { departing } = args;
  const isDisabled = departing !== departingFormFieldNames.other;
  return (
    <div className="step-six__text-input step-six__form-field">
      <Input
        name={stepSixFormFieldNames.pickUpOtherLocation}
        label="step_six.other_location"
        disabled={isDisabled}
      />
    </div>
  );
}

function DepartingCheckboxContainer(args) {
  const { departing } = args;
  const { imgaCampusCenter, imgaClubHouse, other } = departingFormFieldNames;
  const options = [
    { value: imgaCampusCenter, stringKey: 'step_six.campus_center' },
    { value: imgaClubHouse, stringKey: 'step_six.club_house' },
    { value: other, stringKey: 'step_six.other' },
  ];
  return (
    <ul className="step-six__radio-list">
      <Field
        name={stepSixFormFieldNames.departing}
        type="radio"
        options={options}
        component={({ input, options }) => (
          options.map(({ value, stringKey }, idx) => {
            return (
              <li className="step-six__radio-list-item" key={idx}>
                <Radio
                  {...input}
                  key={idx}
                  className="step-six__initial-label"
                  value={value}
                  checked={departing === value}
                  children={<LocaleString stringKey={stringKey} />}
                />
              </li>
            );
          })
        )}
      />
    </ul>
  );
}

function DropoffCheckboxContainer(args) {
  const { dropoff } = args;
  const { imgaCampusCenter, imgaClubHouse, other } = departingFormFieldNames;
  const options = [
    { value: imgaCampusCenter, stringKey: 'step_six.campus_center' },
    { value: imgaClubHouse, stringKey: 'step_six.club_house' },
    { value: other, stringKey: 'step_six.other' },
  ];
  return (
    <ul className="step-six__radio-list">
      <Field
        name={stepSixFormFieldNames.dropoff}
        type="radio"
        options={options}
        component={({ input, options }) => (
          options.map(({ value, stringKey }, idx) => {
            return (
              <li className="step-six__radio-list-item" key={idx}>
                <Radio
                  {...input}
                  key={idx}
                  className="step-six__initial-label"
                  value={value}
                  checked={dropoff === value}
                  children={<LocaleString stringKey={stringKey} />}
                />
              </li>
            );
          })
        )}
      />
    </ul>
  );
}

function ArrivalFlightNumberTextInput() {
  return (
    <div className="step-six__text-input step-six__form-field">
      <Input
        name={stepSixFormFieldNames.arrivalFlightNumber}
        label="step_six.flight_number"
      />
    </div>
  );
}

function FlightNumberDepartingTextInput() {
  return (
    <div className="step-six__text-input step-six__form-field">
      <Input
        name={stepSixFormFieldNames.departingFlightNumber}
        label="step_six.flight_number"
      />
    </div>
  );
}

function SlideHeader({ children }) {
  return (
    <h3 className="step-six__slide-header">
      {children}
    </h3>
  );
}


function SliderSubHeader({ children }) {
  return (
    <h4 className="step-six__slide-sub-header">
      {children}
    </h4>
  );
}

function Paragraph({ children, small, medium, className }) {
  const classNames = cx('step-six__paragraph', {
    'step-six__paragraph--small': small || (!small && !medium),
    'step-six__paragraph--medium': medium,
    [className]: className,
  });
  return (
    <p className={classNames}>
      {children}
    </p>
  );
}

function AirlinesDropdownContainer(args) {
  const { airlines, handleChange, selectedOption } = args;
  return (
    <div className="step-six__form-field step-six__select-container">
      <Dropdown
        whiteArrow
        selectedOption={selectedOption ? selectedOption : <LocaleString stringKey="step_six.select_airline" />}
        options={airlines}
        handleChange={handleChange}
      />
    </div>
  );
}

function AirlinesDepartingDropdownContainer(args) {
  const { airlines, selectedOption, handleChange } = args;
  return (
    <div className="step-six__form-field step-six__select-container">
      <Dropdown
        whiteArrow
        options={airlines}
        selectedOption={selectedOption ? selectedOption : <LocaleString stringKey="step_six.select_airline" />}
        handleChange={handleChange}
      />
    </div>
  );
}

function UnaccompaniedCheckboxContainer(args) {
  const { unaccompanied, transportUnaccompanied } = args;
  const options = [
    { value: 'true', stringKey: 'step_six.yes', price: transportUnaccompanied && transportUnaccompanied.price },
    { value: 'false', stringKey: 'step_six.no', price: 0 },
  ];
  return (
    <div className="step-six__radio-container">
      <Field
        name={stepSixFormFieldNames.unaccompanied}
        type="radio"
        options={options}
        component={({ input, options }) => (
          options.map(({ value, stringKey, price }) => {
            return (
              <div key={value} className="step-six__radio-block">
                <Radio
                  {...input}
                  checked={unaccompanied === value}
                  value={value}
                >
                  <LocaleString stringKey={stringKey} />
                  {` + $${price}`}
                </Radio>
              </div>
            );
          })
        )}
      />
    </div>
  );
}

function TransportationCheckboxContainer(args) {
  const { transportation } = args;
  const options = [
    { value: 'true', stringKey: 'step_six.yes' },
    { value: 'false', stringKey: 'step_six.no' },
  ];
  return (
    <div className="step-six__initial-checkbox">
      <Field
        name={stepSixFormFieldNames.transportation}
        type="radio"
        options={options}
        component={({ input, options }) => (
          options.map(({ value, stringKey }, idx) => {
            return (
              <Radio
                {...input}
                key={idx}
                className="step-six__initial-label"
                value={value}
                checked={transportation === value}
                children={<LocaleString stringKey={stringKey} />}
              />
            );
          })
        )}
      />
    </div>
  );
}

function TransportRadioContainer(args) {
  const { options, value } = args;
  return (
    <ul className="step-six__radio-list">
      <Field
        name={stepSixFormFieldNames.transport}
        type="radio"
        options={options}
        component={({ input, options }) => (
          options.map(({ id, airport, price }) => {
            const computedLabel = price ? `${airport} - $${price}` : airport;
            return (
              <li key={id} className="step-six__radio-list-item">
                <Radio
                  {...input}
                  className=""
                  value={id}
                  checked={('' + value) === ('' + id)}
                  children={computedLabel}
                />
              </li>
            );
          })
        )}
      />
    </ul>
  );
};

function DepartingTransportRadioContainer(args) {
  const { options, value } = args;
  return (
    <ul className="step-six__radio-list">
      <Field
        name={stepSixFormFieldNames.departingTransport}
        type="radio"
        options={options}
        component={({ input, options }) => (
          options.map(({ id, airport, price }) => {
            const computedLabel = price ? `${airport} - $${price}` : airport;
            return (
              <li key={id} className="step-six__radio-list-item">
                <Radio
                  {...input}
                  className=""
                  value={id}
                  checked={('' + value) === ('' + id)}
                  children={computedLabel}
                />
              </li>
            );
          })
        )}
      />
    </ul>
  );
};

function mapStateToProps(state) {
  return {
    airportPickup: stepSixAirportPickupSelector(state),
    airlines: stepSixAirlinesSelector(state),
    transportation: stepSixTransportationSelector(state),
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
  validate: validation, // <------ validation
})(
  connect(mapStateToProps, mapDispatchToProps)(StepSix)
);
