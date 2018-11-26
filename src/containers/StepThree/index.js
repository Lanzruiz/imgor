// Modules
import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import isEquel from 'lodash/isEqual';
// Components
import Header from '../../components/Header';
import BreakthroughCard from '../../components/BreakthroughCard';
import CoreCard from '../../components/CoreCard';
import TotalAthleteCard from '../../components/TotalAthleteCard';
import GameChangerCard from '../../components/GameChangerCard';
// Helpers
import validation from '../../helpers/validate';
import { stepOneFormValueSelector } from '../StepOne';
// Actions
import * as trainingActions from '../../actions/training';
import * as stepThreeActions from '../../actions/step.three';
import * as stepsActions from '../../actions/steps';
// Constants
import { weekly_camp } from '../StepOne';
// Selectors
import { stepThreeDataSelector, stepTreeSelectedIdSelector } from './selector';
// Styles
import './styles.scss';

class StepThree extends React.Component {
  static propTypes = {
    selectedId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    trainingActions: PropTypes.shape({
      saveTrainingId: PropTypes.func.isRequired,
    }),
    stepThreeActions: PropTypes.shape({
      getCatalogCampsLevelsRequest: PropTypes.func.isRequired,
      stepThreeSetDefaultState: PropTypes.func.isRequired,
    }),
    stepsActions: PropTypes.shape({
      incrementStepsCounter: PropTypes.func.isRequired,
    }),
    gender: PropTypes.string,
    boarding: PropTypes.string,
    lengthProgram: PropTypes.string,
    age: PropTypes.string,
    date: PropTypes.string,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        age_range: PropTypes.string,
        business_type: PropTypes.string,
        capacity_available: PropTypes.number,
        capacity_id: PropTypes.string,
        display_business_type: PropTypes.string,
        display_length_program: PropTypes.string,
        display_name: PropTypes.string,
        display_package_type: PropTypes.string,
        display_sport: PropTypes.string,
        has_secondary_program: PropTypes.bool,
        id: PropTypes.number,
        length_program: PropTypes.string,
        name: PropTypes.string,
        package_type: PropTypes.string,
        price: PropTypes.number,
        price_refundable: PropTypes.number,
        sold_out: PropTypes.bool,
        sport: PropTypes.string,
      }),
    ),
    group: PropTypes.string,
    secondaryGroup: PropTypes.string,
    currentStep: PropTypes.number,
    selectedDate: PropTypes.shape({
      capacity_start_date: PropTypes.date,
      capacity_end_date: PropTypes.date,
    }),
  };

  componentDidMount() {
    const { selectedId, currentStep } = this.props;

    this.getCatalogCampsLevels();

    if (selectedId && (currentStep === 3)) {
      this.props.stepsActions.incrementStepsCounter();
    }
  }

  componentDidUpdate(prevProps) {
    const { currentStep, selectedId, selectedDate } = this.props;

    if ((selectedId && selectedId !== prevProps.selectedId) && (currentStep === 3)) {
      this.props.stepsActions.incrementStepsCounter();
    }

    if (!isEquel(selectedDate, prevProps.selectedDate)) {
      this.getCatalogCampsLevels();
    }
  }

  componentWillUnmount() {
    this.setDefaultState();
  }

  render() {
    const { selectedId, data } = this.props;
    return (
      <Container style={{ marginBottom: '65px' }}>
        <Row>
          <Col>
            <Header
              header="step_three.header"
              subHeader="step_three.sub_header"
            />
          </Col>
        </Row>
        <Row>
          {data.map(({ age_range, display_name, price, id, name }) => {
            return (
              <Col xl={6} key={id}>
                {this.renderCurrentCard({ age_range, display_name, price, id, name, selectedId })}
              </Col>
            );
          })}
        </Row>
      </Container>
    );
  }

  renderCurrentCard = ({ age_range, display_name, name = '', price, id, selectedId }) => {
    const computedLabel = age_range ? `ages ${age_range}` : '';
    const nameLowerCase = name.toLowerCase();

    const cardProps = {
      id,
      price,
      selectedId,
      header: display_name,
      key: id,
      onClick: this.selectCard,
      label: computedLabel,
    };

    switch(nameLowerCase) {
      case 'breakthrough': {
        return (
          <BreakthroughCard {...cardProps} />
        );
      }

      case 'core': {
        return (
          <CoreCard {...cardProps} />
        );
      }

      case 'total athlete': {
        return (
          <TotalAthleteCard {...cardProps} />
        );
      }

      case 'game changer': {
        return (
          <GameChangerCard {...cardProps} />
        );
      }

      default:
        return false;
    }
  };

  selectCard = (id) => {
    this.props.trainingActions.saveTrainingId(id);
  };

  createProductBySelectedId = ({ cartId, id }) => {
    this.props.stepThreeActions.postCartCartIdParticipantIdProductRequest({ cartId, id });
  };

  getCatalogCampsLevels = () => {
    const {
      sport, packageType, businessType, gender, boarding, age, date, group, secondaryGroup, lengthProgram,
    } = this.props;

    const getCatalogCampsLevelsRequestArgs = {
      age,
      date,
      sport,
      gender,
      boarding,
      group,
      business_type: businessType,
      package_type: packageType,
      secondary_group: secondaryGroup,
      length_program: lengthProgram,
    };

    if (group === weekly_camp) {
      delete getCatalogCampsLevelsRequestArgs.group;
      delete getCatalogCampsLevelsRequestArgs.secondary_group;
    }

    this.props.stepThreeActions.getCatalogCampsLevelsRequest(getCatalogCampsLevelsRequestArgs);
  };

  setDefaultState = () => {
    this.props.stepThreeActions.stepThreeSetDefaultState();
    this.props.trainingActions.saveTrainingId(null);
  }
}

function mapStateToProps(state) {
  return {
    selectedId: stepTreeSelectedIdSelector(state),
    lengthProgram: state.stepOne.lengthProgram,
    gender: stepOneFormValueSelector(state, 'gender'),
    boarding: stepOneFormValueSelector(state, 'sleepaway'),
    age: stepOneFormValueSelector(state, 'age'),
    date: state.stepTwo.selectedDate.capacity_start_date,
    data: stepThreeDataSelector(state),
    group: state.stepOne.group,
    secondaryGroup: state.stepOne.secondary_group,
    currentStep: state.steps.currentStep,
    selectedDate: state.stepTwo.selectedDate,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    trainingActions: bindActionCreators(trainingActions, dispatch),
    stepThreeActions: bindActionCreators(stepThreeActions, dispatch),
    stepsActions: bindActionCreators(stepsActions, dispatch),
  };
};

export default reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate: validation, // <------ validation
})(
  connect(mapStateToProps, mapDispatchToProps)(StepThree)
);
