// Modules
import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-grid-system';
import Img from 'react-image';
import { ReactHeight } from 'react-height';
// Components
import Header from '../../components/Header';
import Card, { CardContent, CardContentRow, CardContentCol, CardContentText } from '../../components/Card';
import LocaleString from '../../components/LocaleString';
import Dropdown from '../../components/Dropdown';
// Images
import eliteUpdateStubImage from '../../assets/img/030118-Men_s-Elite-Update_760x.png';
import gtmkStubImage from '../../assets/img/gt-mk.png';
import premierUpdateStubImage from '../../assets/img/0318-Men_s-Premier-Update_1024x1024.png';
import gtuoStubImage from '../../assets/img/gt-uo.png';
import elitePackageStubImage from '../../assets/img/Camp_Essentials_Elite_Package_760x.png';
import bg8StubImage from '../../assets/img/bg8.png';
// Styles
import './styles.scss';

class StepFive extends React.Component {
  state = {
    height: 100,
  };

  static propTypes = {};

  render() {
    const { height } = this.state;
    const cardContentTextStyles = { minHeight: `${height}px` };
    const dropdownOptions = [
      { label: 'small', value: 'small' },
      { label: 'medium', value: 'medium' },
      { label: 'large', value: 'large' },
    ];
    return (
      <Container style={{ marginBottom: '65px' }}>
        <Row>
          <Col>
            <Header
              header="step_five.header"
              subHeader="step_five.sub_header"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Card
              id={0}
              cardHeader={<LocaleString stringKey="step_five.apparel" />}
              color="dark"
              header={<LocaleString stringKey="step_five.elite_gear_kit" />}
              label={<LocaleString stringKey="step_five.popular_item" />}
              price="299"
              selectedId={null}
              headerSize="extra-small"
            >
              <CardContent>
                <CardContentRow>
                  <CardContentCol>
                    <Img
                      className="card-content__img"
                      src={eliteUpdateStubImage}
                    />
                  </CardContentCol>
                  <CardContentCol>
                    <div style={{ width: '100%', padding: '0 35px', boxSizing: 'border-box' }}>
                      <Dropdown
                        label="Size"
                        options={dropdownOptions}
                        handleChange={(value) => this.selectDropdownItem({ id: 0, value })}
                      />
                    </div>
                  </CardContentCol>
                </CardContentRow>
                <CardContentText style={cardContentTextStyles}>
                  <ReactHeight onHeightReady={this.setMinHeight}>
                    Coming for camp or training at home get the gear. 1 Backpack with water repellent finish.
                    3 performance T-shirts. 3 pairs of  shorts. 1 Long sleeve shirt. 1 IMG sport towel and Gatorade water bottle.
                    All items are Under Armour HeatGear apparel to keep you cool, dry and light on the field and in the gym.
                    Men's & Kid's. Colors may Vary.
                  </ReactHeight>
                </CardContentText>
              </CardContent>
            </Card>
            <Card
              id={1}
              cardHeader={<LocaleString stringKey="step_five.off_campus_excursion" />}
              color="dark"
              header={<LocaleString stringKey="step_five.magic_kingdom" />}
              label={<LocaleString stringKey="step_five.popular_item" />}
              price="225"
              selectedId={null}
              headerSize="extra-small"
            >
              <CardContent>
                <CardContentRow>
                  <CardContentCol>
                    <Img
                      className="card-content__img"
                      src={gtmkStubImage}
                    />
                  </CardContentCol>
                  <CardContentCol>
                    content here
                  </CardContentCol>
                </CardContentRow>
                <CardContentText style={cardContentTextStyles}>
                  <ReactHeight onHeightReady={this.setMinHeight}>
                    Coming for camp or training at home get the gear. 3 performance T-shirts. 3 pairs of shorts.
                    All items are Under Armour HeatGear apparel to keep you cool, dry and light on the field and in the gym.
                    Men's & Kid's.  Colors may Vary.
                  </ReactHeight>
                </CardContentText>
              </CardContent>
            </Card>
          </Col>
          <Col>
            <Card
              id={2}
              cardHeader={<LocaleString stringKey="step_five.apparel" />}
              color="dark"
              header={<LocaleString stringKey="step_five.essential_gear_kit" />}
              price="199"
              selectedId={null}
              headerSize="extra-small"
            >
              <CardContent>
                <CardContentRow>
                  <CardContentCol>
                    <Img
                      className="card-content__img"
                      src={premierUpdateStubImage}
                    />
                  </CardContentCol>
                  <CardContentCol>
                    content here
                  </CardContentCol>
                </CardContentRow>
                <CardContentText style={cardContentTextStyles}>
                  <ReactHeight onHeightReady={this.setMinHeight}>
                    Coming for camp or training at home get the gear. 3 performance T-shirts. 3 pairs of shorts.
                    All items are Under Armour HeatGear apparel to keep you cool, dry and light on the field and in the gym.
                    Men's & Kid's.  Colors may Vary.
                  </ReactHeight>
                </CardContentText>
              </CardContent>
            </Card>
            <Card
              id={3}
              cardHeader={<LocaleString stringKey="step_five.off_campus_excursion" />}
              color="dark"
              header={<LocaleString stringKey="step_five.universal_studios" />}
              price="225"
              selectedId={null}
              headerSize="extra-small"
            >
              <CardContent>
                <CardContentRow>
                  <CardContentCol>
                    <Img
                      className="card-content__img"
                      src={gtuoStubImage}
                    />
                  </CardContentCol>
                  <CardContentCol>
                    content here
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
          <Col>
            <Card
              id={4}
              cardHeader={<LocaleString stringKey="step_five.apparel" />}
              color="dark"
              header={<LocaleString stringKey="step_five.starter_gear_kit" />}
              price="99"
              selectedId={null}
              headerSize="extra-small"
            >
              <CardContent>
                <CardContentRow>
                  <CardContentCol>
                    <Img
                      className="card-content__img"
                      src={elitePackageStubImage}
                    />
                  </CardContentCol>
                  <CardContentCol>
                    content here
                  </CardContentCol>
                </CardContentRow>
                <CardContentText style={cardContentTextStyles}>
                  <ReactHeight onHeightReady={this.setMinHeight}>
                    3 Laundry Bags, 1 set of Sheets, 2 Bath Towels, 1 Tooth Brush, 1 Tooth Paste, 1 Gatorade Water Bottle and 1
                    Combination Lock
                  </ReactHeight>
                </CardContentText>
              </CardContent>
            </Card>
            <Card
              id={5}
              cardHeader={<LocaleString stringKey="step_five.off_campus_excursion" />}
              color="dark"
              header={<LocaleString stringKey="step_five.busch_gardens" />}
              price="225"
              selectedId={null}
              headerSize="extra-small"
            >
              <CardContent>
                <CardContentRow>
                  <CardContentCol>
                    <Img
                      className="card-content__img"
                      src={bg8StubImage}
                      style={{ padding: '37px 0', backgroundColor: '#fff' }}
                    />
                  </CardContentCol>
                  <CardContentCol>
                    content here
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
        </Row>
      </Container>
    );
  }

  setMinHeight = (height) => {
    if (this.state.height < height) {
      this.setState(() => ({ height }));
    }
  };

  selectDropdownItem = ({ id, value }) => {
    console.log(`card_id: ${id}, value: ${value}`);
  }
}

export default StepFive;
