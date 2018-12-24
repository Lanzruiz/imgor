// Modules
import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Col, Row } from 'react-grid-system';
import ReactHeight from 'react-height';
import VisibilitySensor from 'react-visibility-sensor';
import isEqual from 'lodash/isEqual';
// Components
import Card, { CardContent, CardContentCol, CardContentRow, CardContentText } from '../../components/Card';
import Image from '../../components/Image';
import LocaleString from '../../components/LocaleString';
import Dropdown from '../../components/Dropdown';
// Actions
import * as stepFiveActions from '../../actions/step.five';
// Selectors
import { stepFiveCatalogExcursionsNewSelector } from '../StepFive/selectors';
// Helpers
import dateFormat from '../../helpers/dateFormat';

class StepFiveCatalogExcursionsNew extends React.Component {
  state = {
    cardHeadHeight: 44,
    contentHeight: 40,
    cardBodyHeight: 40,
  };

  static propTypes = {
    excursions: PropTypes.arrayOf(
      PropTypes.shape({
        categories: PropTypes.arrayOf(
          PropTypes.shape({
            display_name: PropTypes.string,
          }),
        ),
        name: PropTypes.string,
        description: PropTypes.string,
        image_url: PropTypes.string,
        dates: PropTypes.arrayOf(
          PropTypes.shape({
            capacity_price: PropTypes.number,
          }),
        ),
      }),
    ).isRequired,
  };

  static defaultProps = {
    excursions: [],
  };

  componentDidMount() {
    // TODO: rewrite that
    this.getCatalogExcursionsNew({ startDate: '2017-10-10', endDate: '2019-10-10' });
  }

  render() {
    const { excursions } = this.props;
    if (isEqual(excursions.length, 0)) return null;
    return (
      <div className="excursions">
        <Row>
          {excursions.map(this.renderExcursionItem)}
        </Row>
      </div>
    );
  }

  getCatalogExcursionsNew = ({ startDate, endDate }) => {
    this.props.stepFiveActions.stepFiveGetCatalogExcursionsNewRequest({ startDate, endDate });
  };

  renderExcursionItem = (item, idx) => {
    const { cardHeadHeight, contentHeight, cardBodyHeight } = this.state;
    const { categories, description, name, image_url, dates } = item;
    const [ header ] = categories;
    const price = dates.length && dates[0].capacity_price;
    const onClickHandler = () => {};
    const customButtonTitle = 'select';
    const onRemoveHandler = () => {};
    const cardBobyHeadStyles = { minHeight: cardHeadHeight };
    const cardBodyStyles = { minHeight: cardBodyHeight };
    const cardContentTextStyles = { minHeight: contentHeight };
    const tooltipMessage = '';
    return (
      <Col key={idx} md={6} lg={4}>
        <Card
          id={idx}
          cardHeader={name}
          color="dark"
          header={header.display_name}
          price={price}
          selectedId={null}
          headerSize="extra-small"
          onClick={onClickHandler}
          customButtonTitle={customButtonTitle}
          onRemove={onRemoveHandler}
          onCardBodyHeadHeightReady={this.setCatdHeadHeight}
          cardBobyHeadStyles={cardBobyHeadStyles}
          cardBodyStyles={cardBodyStyles}
          onCardBodyHeightReady={this.setCardBodyHeight}
          tooltipMessage={tooltipMessage}
        >
          <CardContent>
            <CardContentRow>
              <CardContentCol className="card-content__img-container">
                <Image
                  className="card-content__img"
                  src={image_url}
                />
              </CardContentCol>
              <CardContentCol className="center-center flex-1">
                {this.renderDates(dates)}
              </CardContentCol>
            </CardContentRow>
            <CardContentText>
              <VisibilitySensor>
                <ReactHeight
                  onHeightReady={this.setMinHeight}
                  children={description}
                  style={cardContentTextStyles}
                />
              </VisibilitySensor>
            </CardContentText>
          </CardContent>
        </Card>
      </Col>
    );
  }

  renderDates = (dates) => {
    const options = dates.map(({ id, capacity_start_date }) => {
      return {
        id,
        name: capacity_start_date,
        display_name: dateFormat({ date: capacity_start_date, dateFormat: 'YYYY-MM-DD', resultFormat: 'MMM, DD YYYY' })
      };
    });
    return (
      <div className="step-five__card-attributes">
        <Dropdown
          selectedOption={'Date'}// TODO: from redux
          options={options}
          label={<LocaleString stringKey="date" />}
          handleChange={this.setUpsellGearItemDate}
        />
      </div>
    );
  };

  setMinHeight = (height) => {
    if (this.state.contentHeight < height) {
      this.setState(() => ({ contentHeight: height }));
    }
  };

  setCatdHeadHeight = (height) => {
    if (this.state.cardHeadHeight < height) {
      this.setState(() => ({ cardHeadHeight: height }));
    }
  };

  setCardBodyHeight = (height) => {
    if (this.state.cardBodyHeight < height) {
      this.setState(() => ({ cardBodyHeight: height }));
    }
  };
}

function mapStateToProps(state) {
  return {
    excursions: stepFiveCatalogExcursionsNewSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    stepFiveActions: bindActionCreators(stepFiveActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StepFiveCatalogExcursionsNew);
