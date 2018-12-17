// Modules
import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';
import isEqual from 'lodash/isEqual';
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';
// Components
import Footer from '../../components/Footer';
import LocaleString from '../../components/LocaleString';
// Actions
import * as stepActions from '../../actions/steps';
import * as stepOneActions from '../../actions/step.one';
import * as trainingActions from '../../actions/training';
// Selectors
import { stepTreeSelectedIdSelector, stepThreeSelectedCardWithSecondaryProgramsIdSelector } from '../StepThree/selector';
import { totalPriceSelector, currentStepSelector } from './selectors';
import {
  stepOneAgeSelector, stepOneSleepawaySelector, stepOneGenderSelector, stepOneAgeNumberSelector,
  stepOneGroupSelector, stepOneSecondaryGroupSelector, weeksCounterSelector, isWeeklyCampSelector,
} from '../StepOne/selectors';
import { stepTwoStartDateSelector, stepTwoEndDateSelector } from '../StepTwo/selectors';
import {
  finalStepFirstNameSelector, finalStepLastNameSelector, finalStepPositionSelector,
  finalStepShirtSizeSelector, finalStepGuardianFirstNameSelector, finalStepGuardianLastNameSelector,
  finalStepGuardianEmailSelector, finalStepGuardianPhoneSelector,
} from '../StepFinal/selectors';
// Constants
import { stepsEnum } from '../../constants/steps';
import { weekly_camp } from '../StepOne';

class WizardForm extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    step: PropTypes.number,
    stepActions: PropTypes.shape({
      incrementStepsCounter: PropTypes.func.isRequired,
      setStepsCounter: PropTypes.func.isRequired,
    }),
    stepOneActions: PropTypes.shape({
      stepOnePutCartCartIdParticipantParticipantIdRequest: PropTypes.func.isRequired,
    }),
    trainingActions: PropTypes.shape({
      getCatalogCampCampIdRequest: PropTypes.func.isRequired,
    }),
    participantId: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    sleepaway: PropTypes.string,
    gender: PropTypes.string,
    age: PropTypes.string,
    group: PropTypes.string,
    weeksCounter: PropTypes.number.isRequired,
    cartId: PropTypes.number,
    secondaryGroup: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    totalPrice: PropTypes.number,
    stepTreeSelectedId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isWeeklyCamp: PropTypes.bool,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    position: PropTypes.string,
    shirtSize: PropTypes.string,
    ageNumber: PropTypes.number,
    guardianFirstName: PropTypes.string,
    guardianLastName: PropTypes.string,
    guardianEmail: PropTypes.string,
    guardianPhone: PropTypes.string,
  };

  static defaultProps = {
    step: 0,
    stepTwoStartingPrice: 0,
    stepOnePrice: 0,
    weeksCounter: 0,
    stepThreePrice: 0,
    guardianEmail: '',
    guardianPhone: '',
  };

  componentDidMount() {
    const { step } = this.props;

    if (step === stepsEnum.one) {
      this.goingToStepTwo();
    }

    if (step === stepsEnum.two) {
      this.goingToStepThree();
    }

    if (step === stepsEnum.three) {
      this.goingToStepFour();
    }
  }

  componentDidUpdate(prevProps) {
    const {
      age, gender, group, step, startDate, endDate, stepTreeSelectedId, secondaryGroup, weeksCounter,
      stepThreeSelectedCardWithSecondaryProgramsId,
    } = this.props;
    const isStepOneGroupChanged = (group !== prevProps.group);
    const isStepOneSecondaryGroupChanged = (secondaryGroup !== prevProps.secondaryGroup);
    const isDateChanged = (prevProps.startDate !== startDate) || (prevProps.endDate !== endDate);
    const isStepTreeSelectedIdChanged = (prevProps.stepTreeSelectedId !== stepTreeSelectedId);
    const isWeeksCounterChanged = (weeksCounter !== prevProps.weeksCounter);
    const isAgeChanged = (age !== prevProps.age);
    const isGenderChanged = (gender !== prevProps.gender);

    const shouldGoingToStepTwo = (
      (step > stepsEnum.one) && (
        (isStepOneGroupChanged || isStepOneSecondaryGroupChanged) || isWeeksCounterChanged || isAgeChanged || isGenderChanged)
    );

    if (step === stepsEnum.one) {
      this.goingToStepTwo({
        group: prevProps.group,
        sleepaway: prevProps.sleepaway,
        gender: prevProps.gender,
        age: prevProps.age,
        weeks: prevProps.weeksCounter,
        secondaryGroup: prevProps.secondaryGroup,
      });
    }

    if (shouldGoingToStepTwo) {
      this.goingToStepByStepNymber(stepsEnum.one);
      this.goingToStepTwo({
        group: prevProps.group,
        sleepaway: prevProps.sleepaway,
        gender: prevProps.gender,
        age: prevProps.age,
        weeks: prevProps.weeksCounter,
        secondaryGroup: prevProps.secondaryGroup,
      });
    }

    if ((step > stepsEnum.two) && isDateChanged) {
      this.goingToStepByStepNymber(stepsEnum.two);
    }

    if ((step === stepsEnum.two) && startDate) {
      this.goingToStepThree();
    }

    if ((step === stepsEnum.three) && stepTreeSelectedId) {
      this.goingToStepFour();
    }

    if ((step === stepsEnum.three) && !stepTreeSelectedId && (typeof stepThreeSelectedCardWithSecondaryProgramsId === 'number')) {
      this.goingToStepByStepNymber(stepsEnum.four);
    }

    if ((step > stepsEnum.three) && (stepThreeSelectedCardWithSecondaryProgramsId !== prevProps.stepThreeSelectedCardWithSecondaryProgramsId)) {
      this.goingToStepByStepNymber(stepsEnum.three);
    }

    if ((step > stepsEnum.three) && (startDate && endDate) && isStepTreeSelectedIdChanged) {
      this.goingToStepByStepNymber(stepsEnum.three);
    }
  }

  render() {
    const { children, step, totalPrice } = this.props;
    const startIndex = 0;
    if (typeof children !== 'function') {
      return (
        <span>Error!</span>
      );
    }
    const arrowPosition = true;
    const message = this.renderMessage();
    const hasMessage = message.props.stringKey !== '';
    return (
      <React.Fragment>
        {children().slice(startIndex, step)}
        <Footer
          arrowUp={arrowPosition}
          price={totalPrice}
          message={message}
          hasMessage={hasMessage}
        />
      </React.Fragment>
    );
  }

  goingToStepByStepNymber = (stepNumber) => {
    this.props.stepActions.setStepsCounter(stepNumber);
  };

  renderMessage = () => {
    const { step } = this.props;
    let stringKey;

    switch(step) {
      case stepsEnum.one: {
        stringKey = this.stepOneValidation();
        break;
      }
      case stepsEnum.two: {
        stringKey = this.stepTwoValidation();
        break;
      }
      case stepsEnum.three: {
        stringKey = this.stepThreeValidation();
        break;
      }
      case stepsEnum.four: {
        stringKey = this.stepFourValidation();
        break;
      }
      case stepsEnum.five: {
        stringKey = this.stepFiveValidation();
        break;
      }
      case stepsEnum.six: {
        stringKey = this.stepSixValidation();
        break;
      }
      case stepsEnum.seven: {
        stringKey = this.stepFinalValidation();
        break;
      }
      default:
        break;
    }

    return <LocaleString stringKey={stringKey} />;
  };

  goingToStepTwo = (prevProps = {}) => {
    const { group, sleepaway, gender, age, weeksCounter, cartId, participantId, secondaryGroup, isWeeklyCamp } = this.props;
    if ((isString(sleepaway) && isString(gender) && isString(age))) {
      if (((isWeeklyCamp) && (weeksCounter > 0)) || (group && secondaryGroup)) {
        if (!isEqual({ gender, age }, { gender: prevProps.gender, age: prevProps.age })) {
          this.props.stepOneActions.stepOnePutCartCartIdParticipantParticipantIdRequest({
            age,
            cartId,
            participantId,
            gender: gender.toLowerCase(),
          });
        }
        if (!isEqual(
          {
            group,
            sleepaway,
            weeksCounter,
            secondaryGroup,
          },
          {
            group: prevProps.group,
            sleepaway: prevProps.sleepaway,
            weeksCounter: prevProps.weeksCounter,
            secondaryGroup: prevProps.secondaryGroup,
          },
        )) {
          this.goingToStepByStepNymber(stepsEnum.two);
        }
      }
    }
  };

  goingToStepThree = () => {
    const { startDate } = this.props;
    if (startDate) {
      this.goingToStepByStepNymber(stepsEnum.three);
    }
  };

  goingToStepFour = () => {
    const { stepTreeSelectedId } = this.props;
    if (stepTreeSelectedId) {
      this.props.trainingActions.getCatalogCampCampIdRequest(stepTreeSelectedId);
      this.goingToStepByStepNymber(stepsEnum.four);
    }
  };

  stepOneValidation = () => {
    const { age, gender, group, participantId, sleepaway, weeksCounter } = this.props;
    switch(true) {
      case (!isString(participantId) && !isNumber(participantId)): {
        return 'enter_email';
      }
      case (!isString(age) && !isString(gender) && !isString(sleepaway)): {
        return 'choose_sleepaway_age_and_gender';
      }
      case (isString(age) && !isString(gender) && !isString(sleepaway)): {
        return 'choose_sleepaway_and_gender';
      }
      case (isString(sleepaway) && !isString(gender) && !isString(age)): {
        return 'choose_age_and_gender';
      }
      case (isString(sleepaway) && isString(gender) && !isString(age)): {
        return 'choose_age';
      }
      case (!isString(sleepaway) && isString(gender) && isString(age)): {
        return 'choose_sleepaway';
      }
      case (isString(sleepaway) && !isString(gender) && isString(age)): {
        return 'choose_gender';
      }
      case (isString(sleepaway) && isString(gender) && isString(age)) && (weekly_camp === group) && (weeksCounter === 0): {
        return 'choose_weeks';
      }
      default:
        return '';
    }
  };

  stepTwoValidation = () => {
    const { startDate } = this.props;
    switch(true) {
      case !startDate: {
        return 'choose_date';
      }
      default:
        return '';
    }
  };

  stepThreeValidation = () => {
    // TODO: write validation
    switch(true) {
      default:
        return '';
    }
  };

  stepFourValidation = () => {
    // TODO: write validation
    switch(true) {
      default:
        return '';
    }
  };

  stepFiveValidation = () => {
    // TODO: write validation
    switch(true) {
      default:
        return '';
    }
  };

  stepSixValidation = () => {
    // TODO: write validation
    switch(true) {
      default:
        return '';
    }
  };

  stepFinalValidation = () => {
    const isAdult = this.props.ageNumber <= 18;

    switch(true) {
      case !this.props.firstName: {
        return 'step_final.no_first_name_message';
      }
      case !this.props.lastName: {
        return 'step_final.no_last_name_message';
      }
      case !this.props.position: {
        return 'step_final.no_position_message';
      }
      case !this.props.shirtSize: {
        return 'step_final.no_shirt_size_message';
      }
      case isAdult && !this.props.guardianFirstName: {
        return 'step_final.no_guardian_first_name_message';
      }
      case isAdult && !this.props.guardianLastName: {
        return 'step_final.no_guardian_last_name_message';
      }
      case isAdult && !isEmail(this.props.guardianEmail): {
        return 'step_final.no_guardian_email_message';
      }
      case isAdult && !isMobilePhone(this.props.guardianPhone): {
        return 'step_final.no_guardian_phone_message';
      }
      default:
        return '';
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    stepActions: bindActionCreators(stepActions, dispatch),
    stepOneActions: bindActionCreators(stepOneActions, dispatch),
    trainingActions: bindActionCreators(trainingActions, dispatch),
  };
};

function mapStateToProps(state) {
  return {
    step: currentStepSelector(state),
    participantId: state.participant.id,
    sleepaway: stepOneSleepawaySelector(state),
    age: stepOneAgeSelector(state),
    gender: stepOneGenderSelector(state),
    group: stepOneGroupSelector(state),
    weeksCounter: weeksCounterSelector(state),
    cartId: state.cart.id,
    secondaryGroup: stepOneSecondaryGroupSelector(state),
    startDate: stepTwoStartDateSelector(state),
    endDate: stepTwoEndDateSelector(state),
    stepTreeSelectedId: stepTreeSelectedIdSelector(state),
    totalPrice: totalPriceSelector(state),
    isWeeklyCamp: isWeeklyCampSelector(state),
    stepThreeSelectedCardWithSecondaryProgramsId: stepThreeSelectedCardWithSecondaryProgramsIdSelector(state),
    firstName: finalStepFirstNameSelector(state),
    lastName: finalStepLastNameSelector(state),
    position: finalStepPositionSelector(state),
    shirtSize: finalStepShirtSizeSelector(state),
    ageNumber: stepOneAgeNumberSelector(state),
    guardianFirstName: finalStepGuardianFirstNameSelector(state),
    guardianLastName: finalStepGuardianLastNameSelector(state),
    guardianEmail: finalStepGuardianEmailSelector(state),
    guardianPhone: finalStepGuardianPhoneSelector(state),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WizardForm);
