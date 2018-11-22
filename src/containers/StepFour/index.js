// Modules
import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import cx from 'classnames';
import PropTypes from 'prop-types';
// Components
import Header from '../../components/Header';
import LocaleString from '../../components/LocaleString';
import Card from '../../components/Card';
// Action
import * as weeksActions from '../../actions/weeks';
import * as stepFourActions from '../../actions/step.four';
import * as stepsActions from '../../actions/steps';
// Helpers
import { stepOneFormValueSelector } from '../StepOne';
// Selectors
import { stepThreeHasSecondaryProgram } from '../StepThree/selector';
import { stepTwoStartDateSelector, stepTwoEndDateSelector } from '../StepTwo/selectors';
import { weeksItemsSelector } from '../StepOne/selectors';
// Styles
import './styles.scss';

class StepFour extends React.Component {
  static propTypes = {
    stepFourActions: PropTypes.shape({
      getCatalogCampRequest: PropTypes.func.isRequired,
    }),
    stepsActions: PropTypes.shape({
      incrementStepsCounter: PropTypes.func.isRequired,
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
  };

  static defaultProps = {
    weeksLengthNumber: 0,
    hasSecondaryProgram: false,
  };

  componentDidMount() {
    const {
      businessType, programType, sport, age, gender, startDate, endDate, hasSecondaryProgram,
      currentStep,
    } = this.props;

    const getCatalogCampRequestArgs = {
      sport,
      age,
      gender,
      business_type: businessType,
      program_type: programType,
      start_date: startDate,
      end_date: endDate,
    }

    this.props.stepFourActions.getCatalogCampRequest(getCatalogCampRequestArgs);

    if (!hasSecondaryProgram && (currentStep === 4)) {
      this.nextStep();
    }
  }

  componentDidUpdate(prevProps) {
    const { hasSecondaryProgram, currentStep } = this.props;
    if ((hasSecondaryProgram !== prevProps.hasSecondaryProgram) && !hasSecondaryProgram && (currentStep === 4)) {
      this.nextStep();
    }
  }

  render() {
    const { weeks, selectedWeekId, hasSecondaryProgram } = this.props;
    const tabsList = [];
    const tabPanels = [];

    const tabListClassName = cx('step-four-tabs__tab-list', {
      'hidden': weeks.length === 1,
    });

    if (!hasSecondaryProgram) return false;

    weeks.forEach(({ id, customize_id }) => {
      tabsList.push(
        <Tab key={id} className="step-four-tabs__tab">
          <LocaleString stringKey="week" /> {id}
        </Tab>
      );
      tabPanels.push(
        <TabPanel key={id} className="step-four-tabs__tab-panel">
          <Row>
            <Col>
              <Card
                id={0}
                cardHeader="training"
                color="dark"
                header={<LocaleString stringKey="strength" />}
                label="ages 11-18"
                price="400"
                onClick={this.customizeWeek}
                selectedId={customize_id}
              >
                <div>content here</div>
              </Card>
              <Card
                id={1}
                cardHeader="training"
                color="dark"
                header={<LocaleString stringKey="speed" />}
                label="ages 11-18"
                price="400"
                onClick={this.customizeWeek}
                selectedId={customize_id}
              >
                <div>content here</div>
              </Card>
              <Card
                id={2}
                cardHeader="class"
                color="dark"
                header={<LocaleString stringKey="esl" />}
                label="ages 11-18"
                via={true}
                price="400"
                onClick={this.customizeWeek}
                selectedId={customize_id}
              >
                <div>content here</div>
              </Card>
            </Col>
            <Col>
              <Card
                id={3}
                cardHeader="training"
                color="dark"
                header={<LocaleString stringKey="mental" />}
                label="ages 11-18"
                price="400"
                onClick={this.customizeWeek}
                selectedId={customize_id}
              >
                <div>content here</div>
              </Card>
              <Card
                id={4}
                cardHeader="training"
                color="dark"
                header={<LocaleString stringKey="nutrition" />}
                label="ages 11-18"
                price="400"
                onClick={this.customizeWeek}
                selectedId={customize_id}
              >
                <div>content here</div>
              </Card>
              <Card
                id={5}
                cardHeader="skip this week"
                color="dark"
                header={<LocaleString stringKey="no_daily_session" />}
                onClick={this.customizeWeek}
                selectedId={customize_id}
              >
                <div>content here</div>
              </Card>
            </Col>
            <Col>
              <Card
                id={6}
                cardHeader="training"
                color="dark"
                header={<LocaleString stringKey="vision" />}
                label="ages 11-18"
                price="400"
                onClick={this.customizeWeek}
                selectedId={customize_id}
              >
                <div>content here</div>
              </Card>
              <Card
                id={7}
                cardHeader="class"
                color="dark"
                header={<LocaleString stringKey="SAT/ACT" />}
                label="ages 15-18"
                price="400"
                onClick={this.customizeWeek}
                selectedId={customize_id}
              >
                <div>content here</div>
              </Card>
            </Col>
          </Row>
        </TabPanel>
      );
    });
    return (
      <Container style={{ marginBottom: '65px' }}>
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
  }
}

function mapStateToProps(state) {
  return {
    weeks: weeksItemsSelector(state),
    selectedWeekId: state.weeks.selectedWeekId,
    age: stepOneFormValueSelector(state, 'age'),
    gender: stepOneFormValueSelector(state, 'gender'),
    startDate: stepTwoStartDateSelector(state),
    endDate: stepTwoEndDateSelector(state),
    weeksLengthNumber: state.stepOne.weeksLengthNumber,
    hasSecondaryProgram: stepThreeHasSecondaryProgram(state),
    currentStep: state.steps.currentStep,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    weeksActions: bindActionCreators(weeksActions, dispatch),
    stepFourActions: bindActionCreators(stepFourActions, dispatch),
    stepsActions: bindActionCreators(stepsActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StepFour);
