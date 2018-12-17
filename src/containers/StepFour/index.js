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
import Card, { CardContent, CardContentRow, CardContentCol, ImagePlus } from '../../components/Card';
// Action
import * as weeksActions from '../../actions/weeks';
import * as stepsActions from '../../actions/steps';
import * as stepFourActions from '../../actions/step.four';
// Selectors
import { stepThreeHasSecondaryProgram, stepThreeSecondaryProgramsSelector } from '../StepThree/selector';
import { stepTwoStartDateSelector, stepTwoEndDateSelector } from '../StepTwo/selectors';
import { weeksItemsSelector, stepOneAgeSelector, stepOneGenderSelector } from '../StepOne/selectors';
import { stepFourDataSelector, stepFourSecondaryProgramIdSelector } from './selectors';
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
      stepFourSetSecondaryProgramId: PropTypes.func.isRequired,
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
    const {
      age, businessType, gender, weeks, selectedWeekId, sport, programType, data, hasSecondaryProgram,
      stepThreeSecondaryPrograms, stepFourSecondaryProgramId,
    } = this.props;

    const tabsList = [];
    const tabPanels = [];

    const tabListClassName = cx('step-four-tabs__tab-list', {
      'hidden': weeks.length === 1,
    });

    if (hasSecondaryProgram) {
      return (
        <Container style={{ marginBottom: '65px' }} ref={this.stepFour}>
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
                <Row>
                  {stepThreeSecondaryPrograms.map((item, idx) => (
                    <Col md={4} key={idx}>
                      {this.renderSecondaryPrograms({ ...item, selectedId: stepFourSecondaryProgramId })}
                    </Col>
                  ))}
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      );
    }

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
    console.log(startDate, endDate);
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
  };

  setSecondaryProgramId = (id) => {
    this.props.stepFourActions.stepFourSetSecondaryProgramId(id);
  }

  renderSecondaryPrograms = (secondaryProgram) => {
    switch(secondaryProgram.name) {
      case 'ESL': {
        return (
          <StepFourEslSecondaryProgram
            {...secondaryProgram}
            onClickHandler={this.setSecondaryProgramId}
          />
        );
      }
      case 'Performance': {
        return (
          <StepFourPerformanceSecondaryProgram
            {...secondaryProgram}
            onClickHandler={this.setSecondaryProgramId}
          />
        );
      }
      case 'SAT': {
        return (
          <StepFourSatSecondaryProgram
            {...secondaryProgram}
            onClickHandler={this.setSecondaryProgramId}
          />
        );
      }
      default:
        return false;
    }
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
    stepThreeSecondaryPrograms: stepThreeSecondaryProgramsSelector(state),
    stepFourSecondaryProgramId: stepFourSecondaryProgramIdSelector(state),
  };
};

function mapDispatchToProps(dispatch) {
  return {
    weeksActions: bindActionCreators(weeksActions, dispatch),
    stepsActions: bindActionCreators(stepsActions, dispatch),
    stepFourActions: bindActionCreators(stepFourActions, dispatch),
  };
};

function StepFourEslSecondaryProgram(args) {
  const { id, sold_out, price, display_name, onClickHandler, selectedId } = args;
  const contentClassNames = cx('step-four__esl-secondary-program', {
    'step-four__secondary-program--available': !sold_out,
    'step-four__secondary-program--sold-out': sold_out,
  });
  return (
    <Card
      id={id}
      cardHeader={<LocaleString stringKey="class" />}
      color="dark"
      header={display_name}
      label="AGES 8-18"
      price={price}
      onClick={onClickHandler}
      selectedId={selectedId}
      soldOut={sold_out}
      via={true}
    >
      <CardContent>
        <CardContentRow>
          <CardContentCol>
            <div className={contentClassNames}>
              <div className="step-four__esl-image-container">
                <ImagePlus soldOut={sold_out} />
              </div>
              <div className="step-four__esl-content-container">
                <FifteenHoursSentence />
                <EducationSentence />
                <PerWeekSentence />
              </div>
            </div>
          </CardContentCol>
        </CardContentRow>
      </CardContent>
    </Card>
  );
}

function StepFourPerformanceSecondaryProgram(args) {
  const { id, sold_out, price, display_name, onClickHandler, selectedId } = args;
  const contentClassNames = cx('step-four__performance-secondary-program', {
    'step-four__secondary-program--available': !sold_out,
    'step-four__secondary-program--sold-out': sold_out,
  });
  const secondColumnContentClassNames = cx('step-four__performance-secondary-program step-four__performance-secondary-program-secondary-column', {
    'step-four__secondary-program--available': !sold_out,
    'step-four__secondary-program--sold-out': sold_out,
  });
  return (
    <Card
      id={id}
      cardHeader={<LocaleString stringKey="training" />}
      color="dark"
      header={display_name}
      label="AGES 8-18"
      price={price}
      onClick={onClickHandler}
      selectedId={selectedId}
      soldOut={sold_out}
    >
      <CardContent>
        <CardContentRow>
          <CardContentCol>
            <div className={contentClassNames}>
              <div className="step-four__performance-image-container">
                <ImagePlus soldOut={sold_out} />
              </div>
              <div className="step-four__performance-content-container">
                <OneHourSentence />
                <TrainingSentence />
                <PerWeekSentence />
              </div>
            </div>
          </CardContentCol>
          <CardContentCol>
            <div className={secondColumnContentClassNames}>
              <div className="step-four__performance-secondary-program-header">
                <DailySessionsSentence />
              </div>
              <div className="step-four__performance-list-container">
                <ul className="step-four__performance-list">
                  <li className="step-four__performance-list-item"><LocaleString stringKey="strength" /></li>
                  <li className="step-four__performance-list-item"><LocaleString stringKey="mental" /></li>
                  <li className="step-four__performance-list-item"><LocaleString stringKey="vision" /></li>
                </ul>
                <ul className="step-four__performance-list">
                  <li className="step-four__performance-list-item"><LocaleString stringKey="speed" /></li>
                  <li className="step-four__performance-list-item"><LocaleString stringKey="nutrition" /></li>
                </ul>
              </div>
            </div>
          </CardContentCol>
        </CardContentRow>
      </CardContent>
    </Card>
  );
}

function StepFourSatSecondaryProgram(args) {
  const { id, sold_out, price, display_name, onClickHandler, selectedId } = args;
  const contentClassNames = cx('step-four__sat-secondary-program', {
    'step-four__secondary-program--available': !sold_out,
    'step-four__secondary-program--sold-out': sold_out,
  });
  return (
    <Card
      id={id}
      cardHeader={<LocaleString stringKey="class" />}
      color="dark"
      header={display_name}
      label="AGES 15-18"
      price={price}
      onClick={onClickHandler}
      selectedId={selectedId}
      soldOut={sold_out}
    >
      <CardContent>
        <CardContentRow>
          <CardContentCol>
            <div className={contentClassNames}>
              <div className="step-four__sat-image-container">
                <ImagePlus soldOut={sold_out} />
              </div>
              <div className="step-four__sat-content-container">
                <FifteenHoursSentence />
                <EducationSentence />
                <PerWeekSentence />
              </div>
            </div>
          </CardContentCol>
        </CardContentRow>
      </CardContent>
    </Card>
  );
}

function FifteenHoursSentence() {
  return (
    <span className="step-four__fifteen-hours">
      <LocaleString stringKey="step_four.15_hours" />
    </span>
  );
};

function EducationSentence() {
  return (
    <span className="step-four__education">
      <LocaleString stringKey="step_four.education" />
    </span>
  );
};

function PerWeekSentence() {
  return (
    <span className="step-four__per-week">
      <LocaleString stringKey="step_four.per_week" />
    </span>
  );
};

function OneHourSentence() {
  return (
    <span className="step-four__one-hour">
      <LocaleString stringKey="step_four.1_hour" />
    </span>
  );
}

function TrainingSentence() {
  return (
    <span className="step-four__training">
      <LocaleString stringKey="training" />
    </span>
  );
}

function DailySessionsSentence() {
  return (
    <span className="step-four__daily-sessions">
      <LocaleString stringKey="step_four.daily_sessions" />
    </span>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(StepFour);
