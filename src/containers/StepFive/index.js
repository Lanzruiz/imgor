// Modules
import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import Img from 'react-image';
import { ReactHeight } from 'react-height';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Components
import Header from '../../components/Header';
import Card, { CardContent, CardContentRow, CardContentCol, CardContentText } from '../../components/Card';
import Dropdown from '../../components/Dropdown';
// Actions
import { getCatalogGearRequest } from '../../actions/step.five';
// Helpers
import splitArray from '../../helpers/splitArray';
// Styles
import './styles.scss';

class StepFive extends React.Component {
  static propTypes = {
    stepFiveActions: PropTypes.shape({
      getCatalogGearRequest: PropTypes.func.isRequired,
    }),
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
        is_package: PropTypes.oneOf([ 0, 1 ]),
        package_product_id: PropTypes.string,
        primary_product_id: PropTypes.string,
        name: PropTypes.string,
        package_type: PropTypes.string,
        business: PropTypes.string,
        business_type: PropTypes.string,
        gender: PropTypes.oneOf([ 'Male', 'Female' ]),
        length: PropTypes.string,
        length_program: PropTypes.string,
        length_days: PropTypes.number,
        from_age: PropTypes.number,
        to_age: PropTypes.number,
        age_range: PropTypes.string,
        capacity_id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
        capacity_start_date: PropTypes.data,
        capacity_end_date: PropTypes.data,
        sort_order: PropTypes.number,
        group: PropTypes.string,
        secondary_group: PropTypes.string,
        price: PropTypes.number,
        price_refundable: PropTypes.number,
        capacity_available: PropTypes.number,
        attributes: PropTypes.arrayOf({
          key: PropTypes.string,
            name: PropTypes.string,
            display_name: PropTypes.string,
            options: PropTypes.arrayOf({
              id: PropTypes.string,
              name: PropTypes.string,
              display_name: PropTypes.string,
            }),
        }),
        image_url: PropTypes.string,
        weight: PropTypes.number,
        description: PropTypes.string,
        categories: PropTypes.arrayOf({
          name: PropTypes.string,
          display_name: PropTypes.string,
          weight: PropTypes.string,
        }),
        display_name: PropTypes.string,
        display_length_program: PropTypes.string,
        display_length: PropTypes.string,
        display_business: PropTypes.string,
        display_business_type: PropTypes.string,
        display_gender: PropTypes.string,
        display_package_type: PropTypes.string,
      }),
    ),
  };

  state = {
    height: 100,
  };

  componentDidMount() {
    // TODO: Api calls here!
    this.props.stepFiveActions.getCatalogGearRequest({});
  }

  render() {
    const { data } = this.props;
    const { array_1, array_2, array_3 } = splitArray({ array: data, arrayCount: 3 });
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
          <Col>{array_1.map(this.renderCardItem)}</Col>
          <Col>{array_2.map(this.renderCardItem)}</Col>
          <Col>{array_3.map(this.renderCardItem)}</Col>
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
  };

  renderCardItem = (card) => {
    const { height } = this.state;
    const cardContentTextStyles = { minHeight: `${height}px` };
    const { price, image_url, id, categories, description, display_name, attributes, } = card;
    const [ label = {}, header = {} ] = categories;
    return (
      <Card
        key={id}
        id={id}
        cardHeader={display_name}
        color="dark"
        header={header.display_name}
        label={label.display_name}
        price={price}
        selectedId={null}
        headerSize="extra-small"
      >
        <CardContent>
          <CardContentRow>
            <CardContentCol>
              <Img className="card-content__img" src={image_url} />
            </CardContentCol>
            <CardContentCol>
              {attributes.map(this.renderCardAttributes)}
            </CardContentCol>
          </CardContentRow>
          <CardContentText style={cardContentTextStyles}>
            <ReactHeight onHeightReady={this.setMinHeight} children={description} />
          </CardContentText>
        </CardContent>
      </Card>
    );
  };

  renderCardAttributes = (attripute) => {
    const { display_name, key, options } = attripute;
    const styles = {
      width: '100%',
      padding: '0 35px',
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      height: '100%',
    };
    return (
      <div key={key} style={styles}>
        <Dropdown options={options} label={display_name} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.stepFive.data,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    stepFiveActions: bindActionCreators({ getCatalogGearRequest }, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StepFive);
