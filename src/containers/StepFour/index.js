// Modules
import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import cx from 'classnames';
import PropTypes from 'prop-types';
import scrollToComponent from 'react-scroll-to-component';
// Components
import Header from '../../components/Header';
import LocaleString from '../../components/LocaleString';
import StepFourWeekConcentrationComponent from '../../components/StepFourWeekConcentrationComponent';
// Action
import * as weeksActions from '../../actions/weeks';
import * as stepsActions from '../../actions/steps';
import * as stepFourActions from '../../actions/step.four';
// Selectors
import { stepThreeHasSecondaryProgram } from '../StepThree/selector';
import { stepTwoStartDateSelector, stepTwoEndDateSelector } from '../StepTwo/selectors';
import { weeksItemsSelector, stepOneAgeSelector, stepOneGenderSelector } from '../StepOne/selectors';
import { stepFourDataSelector } from './selectors';
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
  };

  static defaultProps = {
    weeksLengthNumber: 0,
    hasSecondaryProgram: false,
  };

  componentDidMount() {
    const { hasSecondaryProgram, currentStep } = this.props;
    if (!hasSecondaryProgram && (currentStep === 4)) {
      this.nextStep();
    }
    this.getCatalogCamp();
    scrollToComponent(this.stepFour.current);
  }

  componentDidUpdate(prevProps) {
    const { hasSecondaryProgram, currentStep } = this.props;
    if ((hasSecondaryProgram !== prevProps.hasSecondaryProgram) && !hasSecondaryProgram && (currentStep === 4)) {
      this.nextStep();
    }
  }

  componentWillUnmount() {
    this.setDefaultProps();
  }

  render() {
    const { age, businessType, gender, weeks, selectedWeekId, sport, programType, data } = this.props;
    const tabsList = [];
    const tabPanels = [];

    const tabListClassName = cx('step-four-tabs__tab-list', {
      'hidden': weeks.length === 1,
    });

    if (data.length === 0) return false;

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
          />
        </TabPanel>
      );
    });
    return (
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
  }
}

function mapStateToProps(state) {
  return {
    weeks: weeksItemsSelector(state),
    selectedWeekId: state.weeks.selectedWeekId,
    age: stepOneAgeSelector(state),
    gender: stepOneGenderSelector(state),
    startDate: stepTwoStartDateSelector(state),
    endDate: stepTwoEndDateSelector(state),
    weeksLengthNumber: state.stepOne.weeksLengthNumber,
    hasSecondaryProgram: stepThreeHasSecondaryProgram(state),
    currentStep: state.steps.currentStep,
    data: stepFourDataSelector(state),
  };
};

function mapDispatchToProps(dispatch) {
  return {
    weeksActions: bindActionCreators(weeksActions, dispatch),
    stepsActions: bindActionCreators(stepsActions, dispatch),
    stepFourActions: bindActionCreators(stepFourActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StepFour);
