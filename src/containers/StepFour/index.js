// Modules
import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import cx from 'classnames';
import PropTypes from 'prop-types';
import scrollToComponent from 'react-scroll-to-component';
import isEqual from 'lodash/isEqual';
import find from 'lodash/find';
// Components
import Header from '../../components/Header';
import LocaleString from '../../components/LocaleString';
import StepFourWeekConcentrationComponent from '../../components/StepFourWeekConcentrationComponent';
import StepFourEslSecondaryProgram from './components/StepFourEslSecondaryProgram';
import StepFourPerformanceSecondaryProgram from './components/StepFourPerformanceSecondaryProgram';
import StepFourSatSecondaryProgram from './components/StepFourSatSecondaryProgram';
// Action
import * as weeksActions from '../../actions/weeks';
import * as stepsActions from '../../actions/steps';
import * as stepFourActions from '../../actions/step.four';
// Selectors
import { stepThreeHasSecondaryProgram, stepThreeSecondaryProgramsSelector } from '../StepThree/selector';
import { stepTwoStartDateSelector, stepTwoEndDateSelector } from '../StepTwo/selectors';
import {
  weeksItemsSelector, stepOneAgeSelector, stepOneGenderSelector, weeksSelectedWeekIdSelector,
  cartIdSelector, participantIdSelector,
} from '../StepOne/selectors';
import { stepFourDataSelector } from './selectors';
// Constants
import { stepsEnum } from '../../constants/steps';
// Styles
import './styles.scss';

class StepFour extends React.Component {
  constructor(props) {
    super(props);
    this.stepFour = React.createRef();
  }

  static propTypes = {
    stepsActions: PropTypes.shape({
      incrementStepsCounter: PropTypes.func.isRequired,
    }),
    stepFourActions: PropTypes.shape({
      getCatalogCampRequest: PropTypes.func.isRequired,
      stepFourSetDefaultState: PropTypes.func.isRequired,
    }),
    businessType: PropTypes.string.isRequired,
    programType: PropTypes.string.isRequired,
    sport: PropTypes.string.isRequired,
    age: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    weeksLengthNumber: PropTypes.number,
    hasSecondaryProgram: PropTypes.bool,
    currentStep: PropTypes.number.isRequired,
    data: PropTypes.array,
    weeks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        customize_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      }),
    ),
  };

  static defaultProps = {
    weeksLengthNumber: 0,
    hasSecondaryProgram: false,
    selectedWeekId: 0,
    data: [],
    weeks: [],
  };

  componentDidMount() {
    const { hasSecondaryProgram } = this.props;
    if (!hasSecondaryProgram) {
      this.getCatalogCamp();
    }
    this.sctollToCurrentComponent();
  }

  componentDidUpdate() {
    const { data, weeks, currentStep } = this.props;
    const shouldRenderStepFour = data.length > 0;
    const currentStepGreatherThenFour = currentStep > stepsEnum.four;
    if (shouldRenderStepFour && currentStepGreatherThenFour) {
      const unselectedWeek = find(weeks, ({ customize_id }) => !customize_id);
      if (unselectedWeek) {
        this.props.stepsActions.setStepsCounter(stepsEnum.four);
      }
    }
  }

  componentWillUnmount() {
    this.setDefaultProps();
  }

  render() {
    const {
      age, businessType, gender, weeks, selectedWeekId, sport, programType, data, hasSecondaryProgram,
      stepThreeSecondaryPrograms,
    } = this.props;

    const tabsList = [];
    const tabPanels = [];

    const tabListClassName = cx('step-four-tabs__tab-list', { 'hidden': isEqual(weeks.length, 1) });

    if (hasSecondaryProgram) {
      return (
        <div className="step-four" ref={this.stepFour}>
          <Container>
            <Row>
              <Col>
                <Header
                  header="step_four.header"
                  subHeader="step_four.secondary_programs.sub_header"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="step-four__secondary-programs">
                  <Row className="align-items-stretch">
                    {stepThreeSecondaryPrograms.map((item) => (
                      <Col md={6} lg={4} key={item.id} className="card-column">
                        {this.renderSecondaryPrograms(item)}
                      </Col>
                    ))}
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }

    if (isEqual(data.length, 0)) return false;

    weeks.forEach(({ id, customize_id, end_date, start_date }) => {
      tabsList.push(
        <Tab key={id} className="step-four-tabs__tab">
          <LocaleString stringKey="week" /> {id}
        </Tab>
      );
      tabPanels.push(
        <TabPanel key={id} className="step-four-tabs__tab-panel">
          <StepFourWeekConcentrationComponent
            age={age}
            businessType={businessType}
            customizeId={customize_id}
            endDate={end_date}
            gender={gender}
            startDate={start_date}
            sport={sport}
            programType={programType}
            weekId={id}
            maxWeekCounter={weeks.length}
          />
        </TabPanel>
      );
    });
    return (
      <div className="step-four">
        <Container style={{ marginBottom: '65px' }} ref={this.stepFour}>
          <Row>
            <Col>
              <Header
                header="step_four.header"
                subHeader="step_four.sub_header"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Tabs
                className="step-four__tabs step-four-tabs"
                selectedTabClassName="step-four-tabs__tab--selected"
                selectedTabPanelClassName="step-four-tabs__tab-tanel--selected"
                selectedIndex={selectedWeekId}
                onSelect={this.selectWeek}
              >
                <TabList className={tabListClassName}>
                  {tabsList}
                </TabList>
                {tabPanels}
              </Tabs>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  customizeWeek = (id) => {
    this.props.weeksActions.customizeWeek(id);
  };

  selectWeek = (id) => {
    this.props.weeksActions.selectWeek(id);
  };

  nextStep = () => {
    this.props.stepsActions.incrementStepsCounter();
  };

  getCatalogCamp = () => {
    const { age, businessType, gender, sport, programType, startDate, endDate } = this.props;
    const getCatalogCampArgs = {
      age,
      gender,
      sport,
      business_type: businessType,
      program_type: programType,
      start_date: startDate,
      end_date: endDate,
    };
    this.props.stepFourActions.getCatalogCampRequest(getCatalogCampArgs);
  };

  setDefaultProps = () => {
    this.props.stepFourActions.stepFourSetDefaultState();
    this.selectWeek(0);
  };

  renderSecondaryPrograms = (secondaryProgram) => {
    switch(secondaryProgram.name) {
      case 'ESL': {
        return (
          <StepFourEslSecondaryProgram {...secondaryProgram} />
        );
      }
      case 'Performance': {
        return (
          <StepFourPerformanceSecondaryProgram {...secondaryProgram} />
        );
      }
      case 'SAT': {
        return (
          <StepFourSatSecondaryProgram {...secondaryProgram} />
        );
      }
      default:
        return false;
    }
  };

  sctollToCurrentComponent = () => {
    const { hasSecondaryProgram, data } = this.props;
    if (hasSecondaryProgram || data.length > 0) {
      scrollToComponent(this.stepFour.current, { align: 'top' });
    }
  }
}

function mapStateToProps(state) {
  return {
    weeks: weeksItemsSelector(state),
    selectedWeekId: weeksSelectedWeekIdSelector(state),
    age: stepOneAgeSelector(state),
    gender: stepOneGenderSelector(state),
    startDate: stepTwoStartDateSelector(state),
    endDate: stepTwoEndDateSelector(state),
    weeksLengthNumber: state.stepOne.weeksLengthNumber,
    hasSecondaryProgram: stepThreeHasSecondaryProgram(state),
    currentStep: state.steps.currentStep,
    data: stepFourDataSelector(state),
    stepThreeSecondaryPrograms: stepThreeSecondaryProgramsSelector(state),
    cartId: cartIdSelector(state),
    participantId: participantIdSelector(state),
  };
};

function mapDispatchToProps(dispatch) {
  return {
    weeksActions: bindActionCreators(weeksActions, dispatch),
    stepsActions: bindActionCreators(stepsActions, dispatch),
    stepFourActions: bindActionCreators(stepFourActions, dispatch),
  };
};

export function FifteenHoursSentence() {
  return (
    <span className="step-four__fifteen-hours">
      <LocaleString stringKey="step_four.15_hours" />
    </span>
  );
};

export function EducationSentence() {
  return (
    <span className="step-four__education">
      <LocaleString stringKey="step_four.education" />
    </span>
  );
};

export function PerWeekSentence() {
  return (
    <span className="step-four__per-week">
      <LocaleString stringKey="step_four.per_week" />
    </span>
  );
};

export function OneHourSentence() {
  return (
    <span className="step-four__one-hour">
      <LocaleString stringKey="step_four.1_hour" />
    </span>
  );
}

export function TrainingSentence() {
  return (
    <span className="step-four__training">
      <LocaleString stringKey="training" />
    </span>
  );
}

export function DailySessionsSentence() {
  return (
    <span className="step-four__daily-sessions">
      <LocaleString stringKey="step_four.daily_sessions" />
    </span>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(StepFour);
