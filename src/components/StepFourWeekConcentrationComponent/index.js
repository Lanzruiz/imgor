// Modules
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-grid-system';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Components
import Card from '../Card';
// Actions
import * as weeksActions from '../../actions/weeks';
import * as stepFourActions from '../../actions/step.four';
// Selectors
import {
  stepFourWeekOneDataSelector, stepFourWeekTwoDataSelector, stepFourWeekThreeDataSelector,
  stepFourWeekFourDataSelector, stepFourWeekFiveDataSelector, stepFourWeekSixDataSelector,
  stepFourWeekSevenDataSelector, stepFourWeekEightDataSelector, stepFourWeekNineDataSelector,
  stepFourWeekTenDataSelector, stepFourWeekElevenDataSelector, stepFourWeekTwelveDataSelector,
} from '../../containers/StepFour/selectors';

class StepFourWeekConcentrationComponent extends React.Component {
  static propTypes = {
    week_1_data: PropTypes.arrayOf(
      PropTypes.shape({}),
    ),
    week_2_data: PropTypes.arrayOf(
      PropTypes.shape({}),
    ),
    week_3_data: PropTypes.arrayOf(
      PropTypes.shape({}),
    ),
    week_4_data: PropTypes.arrayOf(
      PropTypes.shape({}),
    ),
    week_5_data: PropTypes.arrayOf(
      PropTypes.shape({}),
    ),
    week_6_data: PropTypes.arrayOf(
      PropTypes.shape({}),
    ),
    week_7_data: PropTypes.arrayOf(
      PropTypes.shape({}),
    ),
    week_8_data: PropTypes.arrayOf(
      PropTypes.shape({}),
    ),
    week_9_data: PropTypes.arrayOf(
      PropTypes.shape({}),
    ),
    week_10_data: PropTypes.arrayOf(
      PropTypes.shape({}),
    ),
    week_11_data: PropTypes.arrayOf(
      PropTypes.shape({}),
    ),
    week_12_data: PropTypes.arrayOf(
      PropTypes.shape({}),
    ),
    weeksActions: PropTypes.shape({
      customizeWeek: PropTypes.func.isRequired,
    }),
    stepFourActions: PropTypes.shape({
      getCatalogCampWeekOneRequest: PropTypes.func.isRequired,
      getCatalogCampWeekTwoRequest: PropTypes.func.isRequired,
      getCatalogCampWeekThreeRequest: PropTypes.func.isRequired,
      getCatalogCampWeekFourRequest: PropTypes.func.isRequired,
      getCatalogCampWeekFiveRequest: PropTypes.func.isRequired,
      getCatalogCampWeekSixRequest: PropTypes.func.isRequired,
      getCatalogCampWeekSevenRequest: PropTypes.func.isRequired,
      getCatalogCampWeekEightRequest: PropTypes.func.isRequired,
      getCatalogCampWeekNineRequest: PropTypes.func.isRequired,
      getCatalogCampWeekTenRequest: PropTypes.func.isRequired,
      getCatalogCampWeekElevenRequest: PropTypes.func.isRequired,
      getCatalogCampWeekTwelveRequest: PropTypes.func.isRequired,
    }),
  };

  componentDidMount() {
    this.getWeekData();
  }

  render() {
    const { weekId, customizeId } = this.props;
    const data = this.props[`week_${weekId}_data`];
    return (
      <Row>
        {data.map(({ id, price, length_program, age_range, secondary_program_type }) => {
          return (
            <Col md={4} key={id}>
              <Card
                id={id}
                cardHeader="training"
                color="dark"
                header={secondary_program_type}
                label={`ages ${age_range}`}
                price={price}
                onClick={this.customizeWeek}
                selectedId={customizeId}
              >
                {/* content here */}
              </Card>
            </Col>
          );
        })}
      </Row>
    );
  }

  getWeekData = () => {
    const { weekId, businessType, programType, sport, age, gender, startDate, endDate } = this.props;
    const getCatalogCampRequestArgs = {
      sport,
      age,
      gender,
      business_type: businessType,
      program_type: programType,
      start_date: startDate,
      end_date: endDate,
    };
    switch(weekId) {
      case 1:
        this.props.stepFourActions.getCatalogCampWeekOneRequest(getCatalogCampRequestArgs);
        break;

      case 2:
        this.props.stepFourActions.getCatalogCampWeekTwoRequest(getCatalogCampRequestArgs);
        break;

      case 3:
        this.props.stepFourActions.getCatalogCampWeekThreeRequest(getCatalogCampRequestArgs);
        break;

      case 4:
        this.props.stepFourActions.getCatalogCampWeekFourRequest(getCatalogCampRequestArgs);
        break;

      case 5:
        this.props.stepFourActions.getCatalogCampWeekFiveRequest(getCatalogCampRequestArgs);
        break;

      case 6:
        this.props.stepFourActions.getCatalogCampWeekSixRequest(getCatalogCampRequestArgs);
        break;

      case 7:
        this.props.stepFourActions.getCatalogCampWeekSevenRequest(getCatalogCampRequestArgs);
        break;

      case 8:
        this.props.stepFourActions.getCatalogCampWeekEightRequest(getCatalogCampRequestArgs);
        break;

      case 9:
        this.props.stepFourActions.getCatalogCampWeekNineRequest(getCatalogCampRequestArgs);
        break;

      case 10:
        this.props.stepFourActions.getCatalogCampWeekTenRequest(getCatalogCampRequestArgs);
        break;

      case 11:
        this.props.stepFourActions.getCatalogCampWeekElevenRequest(getCatalogCampRequestArgs);
        break;

      case 12:
        this.props.stepFourActions.getCatalogCampWeekTwelveRequest(getCatalogCampRequestArgs);
        break;

      default:
        return false;
    }
  };

  customizeWeek = (id) => {
    this.props.weeksActions.customizeWeek(id);
  }
}

function mapStateToProps(state) {
  return {
    week_1_data: stepFourWeekOneDataSelector(state),
    week_2_data: stepFourWeekTwoDataSelector(state),
    week_3_data: stepFourWeekThreeDataSelector(state),
    week_4_data: stepFourWeekFourDataSelector(state),
    week_5_data: stepFourWeekFiveDataSelector(state),
    week_6_data: stepFourWeekSixDataSelector(state),
    week_7_data: stepFourWeekSevenDataSelector(state),
    week_8_data: stepFourWeekEightDataSelector(state),
    week_9_data: stepFourWeekNineDataSelector(state),
    week_10_data: stepFourWeekTenDataSelector(state),
    week_11_data: stepFourWeekElevenDataSelector(state),
    week_12_data: stepFourWeekTwelveDataSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    weeksActions: bindActionCreators(weeksActions, dispatch),
    stepFourActions: bindActionCreators(stepFourActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StepFourWeekConcentrationComponent);
