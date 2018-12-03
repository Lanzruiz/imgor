// Modules
import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import Img from 'react-image';
import { connect } from 'react-redux';
import scrollToComponent from 'react-scroll-to-component';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
// Components
import Header from '../../components/Header';
import Card, { CardContent, CardContentRow, CardContentCol, CardContentText } from '../../components/Card';
import LocaleString from '../../components/LocaleString';
import Radio from '../../components/Radio';
import Carousel, { CarouselItem } from '../../components/Carousel';
import GreenBlock from '../../components/GreenBlock';
// Images
import stubImage from '../../assets/img/2018-Suburban.png';
// Selectors
import { transportationSelector, airportPickupSelector } from './selectors';
// Helpers
import validation from '../../helpers/validate';
// Styles
import './styles.scss';

class StepSix extends React.Component {
  static propTypes = {
    transportation: PropTypes.string.isRequired,
    airportPickup: PropTypes.string,
  };

  static defaultProps = {
    transportation: false,
  };

  constructor(props) {
    super(props);
    this.stepSix = React.createRef();
  }

  componentDidMount() {
    scrollToComponent(this.stepSix.current);
    // request /api/v1/catalog/transport/unaccompanied 500 error
    // request /api/v1/catalog/transport
    // request /api/v1/catalog/airlines
  }

  render() {
    const { transportation, airportPickup } = this.props;
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
                <div className="step-six__initial-checkbox">
                  <Field
                    name="transportation"
                    type="radio"
                    options={[{ value: 'true', stringKey: 'step_six.yes' }, { value: 'false', stringKey: 'step_six.no' }]}
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
              </div>
            )}
            {transportation === 'true' && (
              <Row>
                <Col md={4} style={{ paddingRight: 0 }}>
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
                      <h3 className="step-six__slide-header">step 1 of 5</h3>
                      <h4 className="step-six__slide-sub-header">*Unaccompanied Minor?</h4>
                      <div className="step-six__radio-container">
                        <div className="step-six__radio-block">
                          <Radio name="unaccompanied">Yes + $50</Radio>
                        </div>
                        <div className="step-six__radio-block">
                          <Radio name="unaccompanied">No + $0</Radio>
                        </div>
                      </div>
                      <GreenBlock className="step-six__text-container">
                        <p className="step-six__paragraph">
                          *This is a separate service from the airlines. To avoid complications it is highly recommended
                          that you setup the unaccompanied minor service with the airline as well.
                        </p>
                        <p className="step-six__paragraph">
                          *Ages 12 and under.
                        </p>
                      </GreenBlock>
                    </CarouselItem>
                    <CarouselItem>
                      <h3 className="step-six__slide-header">step 2 of 5</h3>
                      <h4 className="step-six__slide-sub-header">Arrival Flight Information</h4>
                    </CarouselItem>
                    <CarouselItem>
                      <h3 className="step-six__slide-header">step 3 of 5</h3>
                      <h4 className="step-six__slide-sub-header">Dropoff Location</h4>
                    </CarouselItem>
                    <CarouselItem>
                      <h3 className="step-six__slide-header">step 4 of 5</h3>
                      <h4 className="step-six__slide-sub-header">Dropoff Location</h4>
                    </CarouselItem>
                    <CarouselItem>
                      <h3 className="step-six__slide-header">step 5 of 5</h3>
                      <h4 className="step-six__slide-sub-header">Dropoff Location</h4>
                    </CarouselItem>
                  </Carousel>
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </Container>
    );
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
        name="airport_pickup"
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

function mapStateToProps(state) {
  return {
    airportPickup: airportPickupSelector(state),
    transportation: transportationSelector(state),
  };
};

function mapDispatchToProps(dispatch) {
  return {};
};

export default reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate: validation, // <------ validation
})(
  connect(mapStateToProps, mapDispatchToProps)(StepSix)
);
