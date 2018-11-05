// Modules
import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import Img from 'react-image';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Components
import Header from '../../components/Header';
import Card, { CardContent, CardContentRow, CardContentCol, CardContentText } from '../../components/Card';
import LocaleString from '../../components/LocaleString';
import Radio from '../../components/Radio';
import Carousel, { CarouselItem } from '../../components/Carousel';
import GreenBlock from '../../components/GreenBlock';
// Images
import stubImage from '../../assets/img/2018-Suburban.png';
// Styles
import './styles.scss';

class StepSix extends React.Component {
  render() {
    return (
      <Container style={{ marginBottom: '65px' }}>
        <Row>
          <Col>
            <Header
              header="step_six.header"
              subHeader="step_six.sub_header"
            />
          </Col>
        </Row>
        <Row>
          <Col md={4} style={{ padding: 0 }}>
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
                    <div className="step-six__card-content">
                      <Radio name="airport_pickup">Roundtrip</Radio>
                      <Radio name="airport_pickup">Pickup only</Radio>
                      <Radio name="airport_pickup">Dropoff only</Radio>
                    </div>
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
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(StepSix);
