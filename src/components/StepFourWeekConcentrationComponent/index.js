// Modules
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-grid-system';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Components
import Card from '../Card';
import LocaleString from '../LocaleString';
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
// Styles
import './styles.scss';

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
      setWeekPrice: PropTypes.func.isRequired,
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
          const computedLabel = age_range ? `ages ${age_range}` : '';
          return (
            <Col md={4} key={id}>
              <Card
                id={id}
                cardHeader="training"
                color="dark"
                header={secondary_program_type}
                label={computedLabel}
                price={price}
                onClick={this.customizeWeek}
                selectedId={customizeId}
              >
                {this.renderCardContent(secondary_program_type)}
              </Card>
            </Col>
          );
        })}
      </Row>
    );
  }

  renderCardContent = (secondaryProgramType) => {
    switch(secondaryProgramType) {
      case 'Leadership': {
        return (
          <Content>
            <Paragraph stringKey="concentration.leadership_training_focusing" />
            <List>
              <ListItem stringKey="concentration.effective_communication" />
              <ListItem stringKey="concentration.authentic_leadership" />
              <ListItem stringKey="concentration.interview_skills" />
              <ListItem stringKey="concentration.developing_identity" />
              <ListItem stringKey="concentration.media_training" />
              <ListItem stringKey="concentration.power_of_collaboration" />
              <ListItem stringKey="concentration.building_team_culture" />
            </List>
          </Content>
        );
      }

      case 'Mental/Vision': {
        return (
          <Content>
            <Paragraph stringKey="concentration.mental_vision_conditioning" />
            <List>
              <ListItem stringKey="concentration.mental_toughness" />
              <ListItem stringKey="concentration.awareness" />
              <ListItem stringKey="concentration.energy_thought_management" />
              <ListItem stringKey="concentration.teamwork" />
              <ListItem stringKey="concentration.hand_eye_coordination" />
              <ListItem stringKey="concentration.peripheral_vision" />
              <ListItem stringKey="concentration.reaction_time" />
            </List>
          </Content>
        );
      }

      case 'Nutrition': {
        return (
          <Content>
            <Paragraph stringKey="concentration.nutrition_education_focusing" />
            <List>
              <ListItem stringKey="concentration.optimal_everyday_nutrition" />
              <ListItem stringKey="concentration.athlete_eating_plans" />
              <ListItem stringKey="concentration.nutrient_intake_and_timing" />
              <ListItem stringKey="concentration.dietary_supplements" />
              <ListItem stringKey="concentration.body_composition_and_framework" />
              <ListItem stringKey="concentration.body_weight_issues" />
              <ListItem stringKey="concentration.energy_balance" />
            </List>
          </Content>
        );
      }

      case 'Speed': {
        return (
          <Content>
            <Paragraph stringKey="concentration.speed_training_focusing" />
            <List>
              <ListItem stringKey="concentration.agility_and_movement" />
              <ListItem stringKey="concentration.explosiveness" />
              <ListItem stringKey="concentration.sport_specific_techniques" />
              <ListItem stringKey="concentration.proper_mechanics" />
            </List>
          </Content>
        );
      }

      case 'Strength/Power': {
        return (
          <Content>
            <Paragraph stringKey="concentration.strength_power_training_focusing" />
            <List>
              <ListItem stringKey="concentration.endurance_conditioning" />
              <ListItem stringKey="concentration.strength_and_power" />
              <ListItem stringKey="concentration.flexibility" />
              <ListItem stringKey="concentration.balance" />
              <ListItem stringKey="concentration.core" />
            </List>
          </Content>
        );
      }

      case 'ESL': {
        return (
          <Content>
            <Paragraph stringKey="concentration.english_language_learning" />
            <Paragraph stringKey="concentration.toefl_test_site" />
          </Content>
        );
      }

      case 'SAT': {
        return (
          <Content>
            <Paragraph stringKey="concentration.college_testing" />
            <Paragraph stringKey="concentration.sat_college" />
          </Content>
        );
      }

      default:
        return false;
    }
  };

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
    const { weekId } = this.props;
    const data = this.props[`week_${weekId}_data`];
    const selectedItem = data.find((item) => item.id === id);
    const price = selectedItem && selectedItem.price;
    this.props.weeksActions.customizeWeek(id);
    this.props.weeksActions.setWeekPrice(price);
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
};

function mapDispatchToProps(dispatch) {
  return {
    weeksActions: bindActionCreators(weeksActions, dispatch),
    stepFourActions: bindActionCreators(stepFourActions, dispatch),
  };
};

function Paragraph({ stringKey }) {
  return (
    <p className="week-concentration-component__paragraph">
      <LocaleString stringKey={stringKey} />
    </p>
  );
};

function List({ children }) {
  return (
    <ul className="week-concentration-component__list">
      {children}
    </ul>
  );
};

function ListItem({ stringKey }) {
  return (
    <li className="week-concentration-component__list-item">
      <LocaleString stringKey={stringKey} />
    </li>
  );
}

function Content({ children }) {
  return (
    <div className="week-concentration-component__content">
      {children}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(StepFourWeekConcentrationComponent);
