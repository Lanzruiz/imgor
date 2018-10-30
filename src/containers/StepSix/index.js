// Modules
import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import ReactHeight from 'react-height';
import Img from 'react-image';
// Components
import Header from '../../components/Header';
import Card, { CardContent, CardContentRow, CardContentCol, CardContentText } from '../../components/Card';
import LocaleString from '../../components/LocaleString';
import Radio from '../../components/Radio';
// Images
import stubImage from '../../assets/img/2018-Suburban.png';
// Styles
import './styles.scss';

class StepSix extends React.Component {
  state = {
    height: 100,
  };

  render() {
    const { height } = this.state;
    const cardContentTextStyles = { minHeight: `${height}px` };
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
                <CardContentText style={cardContentTextStyles}>
                  <ReactHeight onHeightReady={this.setMinHeight}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi viverra mattis sapien sed sollicitudin.
                    Phasellus id massa ac sapien gravida bibendum. Nulla pellentesque hendrerit turpis, in cursus eros lacinia
                    sit amet. Morbi consectetur nibh ut eros luctus, nec consectetur nibh rhoncus. Pellentesque at diam ante.
                    Nullam sagittis tempor nibh sit amet eleifend. Vestibulum eu commodo ex, ut pretium nulla.
                  </ReactHeight>
                </CardContentText>
              </CardContent>
            </Card>
          </Col>
          <Col md={8} style={{ border: '1px solid #4481a3', padding: 0, marginBottom: '15px' }}>
            slider
          </Col>
        </Row>
      </Container>
    );
  }

  setMinHeight = (height) => {
    if (this.state.height < height) {
      this.setState(() => ({ height }));
    }
  };
}

export default StepSix;
