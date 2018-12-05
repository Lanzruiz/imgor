// Modules
import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import Img from 'react-image';
import { connect } from 'react-redux';
import scrollToComponent from 'react-scroll-to-component';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { bindActionCreators } from 'redux';
import cx from 'classnames';
// Components
import Header from '../../components/Header';
import Card, { CardContent, CardContentRow, CardContentCol, CardContentText } from '../../components/Card';
import LocaleString from '../../components/LocaleString';
import Radio from '../../components/Radio';
import Carousel, { CarouselItem } from '../../components/Carousel';
import GreenBlock from '../../components/GreenBlock';
import Dropdown from '../../components/Dropdown';
import Input from '../../components/Input';
import DatePickerReduxForm from '../../components/DatePicker';
// Images
import stubImage from '../../assets/img/2018-Suburban.png';
// Actions
import * as stepSixActions from '../../actions/step.six';
// Selectors
import {
  stepSixTransportationSelector, stepSixAirportPickupSelector, stepSixTransportSelector,
  stepSixUnaccompaniedSelector, stepSixAirlinesSelector, stepSixDropoffSelector,
  stepSixDepartingSelector, stepSixDepartingTransportSelector, stepSixPickUpOtherLocationSelector,
  stepSixSelectedArrivalAirlineSelector, stepSixSelectedDepartingAirlineSelector,
  stepSixSelectedTransportSelector,
} from './selectors';
// Constants
import { stepSixFormFieldNames } from './selectors';
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
    scrollToComponent(this.stepSix.current);
    // request /api/v1/catalog/transport/unaccompanied 500 error
    this.getCatalogTransport();
    this.getCatalogAirlines();
  }

  componentWillUnmount() {
    this.setDefaultState();
  }

  render() {
    const {
      airlines, transportation, airportPickup, transport, unaccompanied, dropoff, departing,
      departingTransport, selectedArrivalAirline, selectedDepartingAirline, selectedTransportValue,
    } = this.props;
    const airportPickupArrivalAndDeparting = airportPickup === 'both';
    const airportPickupArrivalOnly = airportPickup === 'arrival';
    const airportPickupDepartingOnly = airportPickup === 'departing';
    const maxStepCount = (
      airportPickupArrivalAndDeparting
        ? 5
        : airportPickup
          ? 3
          : 1
    );
    return (
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
            {transportation === 'false' && (
              <div className="step-six__initial-question">
                <h3 className="step-six__initial-header">
                  <LocaleString stringKey="step_six.initial_header" />
                </h3>
                <TransportationCheckboxContainer transportation={transportation} />
              </div>
            )}
            {transportation === 'true' && (
              <Row>
                <Col md={4} style={{ paddingRight: 0, marginBottom: '15px' }}>
                  <Card
                    id={0}
                    cardHeader={<LocaleString stringKey="step_six.travel" />}
                    color="dark"
                    header={<LocaleString stringKey="step_six.airport_pickup" />}
                    label={<LocaleString stringKey="step_five.popular_item" />}
                    price="99"
                    selectedId={null}
                    headerSize="extra-small"
                    priceDescription={<LocaleString stringKey="step_six.starting_at" />}
                    buttonBlock={false}
                  >
                    <CardContent>
                      <CardContentRow>
                        <CardContentCol>
                          <Img
                            className="card-content__img"
                            src={stubImage}
                          />
                        </CardContentCol>
                        <CardContentCol>
                          <AirportPickupCheckboxContainer airportPickup={airportPickup} />
                        </CardContentCol>
                      </CardContentRow>
                      <CardContentText>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi viverra mattis sapien sed sollicitudin.
                        Phasellus id massa ac sapien gravida bibendum. Nulla pellentesque hendrerit turpis, in cursus eros lacinia
                        sit amet. Morbi consectetur nibh ut eros luctus, nec consectetur nibh rhoncus. Pellentesque at diam ante.
                        Nullam sagittis tempor nibh sit amet eleifend. Vestibulum eu commodo ex, ut pretium nulla.
                      </CardContentText>
                    </CardContent>
                  </Card>
                </Col>
                <Col md={8} style={{ border: '1px solid #4481a3', padding: 0, marginBottom: '15px', marginTop: '30px' }}>
                  <Carousel>
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
                      <UnaccompaniedCheckboxContainer unaccompanied={unaccompanied} />
                      <GreenBlock className="step-six__text-container">
                        <Paragraph>
                          <LocaleString stringKey="step_six.airlines_service" />
                        </Paragraph>
                        <Paragraph>
                          <LocaleString stringKey="step_six.ages" />
                        </Paragraph>
                      </GreenBlock>
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
                            <TransportRadioContainer options={transport} value={selectedTransportValue} />
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
                            <DepartingTransportRadioContainer options={transport} value={departingTransport} />
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
  }
}

function AirportPickupCheckboxContainer(args) {
  const { airportPickup } = args;
  const options = [
    { value: 'both', stringKey: 'step_six.roundtrip' },
    { value: 'arrival', stringKey: 'step_six.pickup' },
    { value: 'departing', stringKey: 'step_six.dropoff' },
  ];
  return (
    <div className="step-six__card-content">
      <Field
        name={stepSixFormFieldNames.airportPickup}
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
                checked={airportPickup === value}
                children={<LocaleString stringKey={stringKey} />}
              />
            );
          })
        )}
      />
    </div>
  );
}

function DropoffLocationTextField(args) {
  const { dropoff } = args;
  const isDisabled = dropoff !== 'other';
  return (
    <div className="step-six__text-input step-six__form-field">
      <Input
        name={stepSixFormFieldNames.dropoffOtherLocation}
        label={<LocaleString stringKey="step_six.other_location" />}
        disabled={isDisabled}
      />
    </div>
  );
}

function PickUpLocationTextField(args) {
  const { departing } = args;
  const isDisabled = departing !== 'other';
  return (
    <div className="step-six__text-input step-six__form-field">
      <Input
        name={stepSixFormFieldNames.pickUpOtherLocation}
        label={<LocaleString stringKey="step_six.other_location" />}
        disabled={isDisabled}
      />
    </div>
  );
}

function DepartingCheckboxContainer(args) {
  const { departing } = args;
  const options = [
    { value: 'imga campus center', stringKey: 'step_six.campus_center' },
    { value: 'imga сlub рouse', stringKey: 'step_six.club_house' },
    { value: 'other', stringKey: 'step_six.other' },
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
  const options = [
    { value: 'imga campus center', stringKey: 'step_six.campus_center' },
    { value: 'imga сlub рouse', stringKey: 'step_six.club_house' },
    { value: 'other', stringKey: 'step_six.other' },
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
        label={<LocaleString stringKey="step_six.flight_number" />}
      />
    </div>
  );
}

function FlightNumberDepartingTextInput() {
  return (
    <div className="step-six__text-input step-six__form-field">
      <Input
        name={stepSixFormFieldNames.departingFlightNumber}
        label={<LocaleString stringKey="step_six.flight_number" />}
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
  const { unaccompanied } = args;
  const options = [
    { value: 'true', stringKey: 'step_six.yes', price: 50 },
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
          options.map(({ value, stringKey }) => {
            return (
              <Radio
                {...input}
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
    <ul className="">
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
    <ul className="">
      <Field
        name={stepSixFormFieldNames.departingTransport}
        type="radio"
        options={options}
        component={({ input, options }) => (
          options.map(({ id, airport, price }) => {
            const computedLabel = price ? `${airport} - $${price}` : airport;
            return (
              <li key={id} className="">
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
  };
};

function mapDispatchToProps(dispatch) {
  return {
    stepSixActions: bindActionCreators(stepSixActions, dispatch),
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
