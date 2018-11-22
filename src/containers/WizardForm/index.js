// Modules
import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';
import isEqual from 'lodash/isEqual';
// Components
import Footer from '../../components/Footer';
import LocaleString from '../../components/LocaleString';
// Actions
import * as stepActions from '../../actions/steps';
import * as stepOneActions from '../../actions/step.one';
// Helpers
import { stepOneFormValueSelector, weekly_camp } from '../StepOne';
// Selectors
import { stepTreeSelectedIdSelector } from '../StepThree/selector';
import { totalPriceSelector, currentStepSelector } from './selectors';
import { stepOneGroupSelector, stepOneSecondaryGroupSelector, weeksCounterSelector } from '../StepOne/selectors';
import { stepTwoStartDateSelector, stepTwoEndDateSelector } from '../StepTwo/selectors';

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
  };

  static defaultProps = {
    step: 0,
    stepTwoStartingPrice: 0,
    stepOnePrice: 0,
    weeksCounter: 0,
    stepThreePrice: 0,
  };

  componentDidMount() {
    const { step } = this.props;

    if (step === 1) {
      this.goingToStepTwo();
    }

    if (step === 2) {
      this.goingToStepThree();
    }
  }

  componentDidUpdate(prevProps) {
    const { age, gender, group, step, startDate, endDate, stepTreeSelectedId, secondaryGroup, weeksCounter } = this.props;
    const isStepOneGroupChanged = (group !== prevProps.group);
    const isStepOneSecondaryGroupChanged = (secondaryGroup !== prevProps.secondaryGroup);
    const isDateChanged = (prevProps.startDate !== startDate) || (prevProps.endDate !== endDate);
    const isStepTreeSelectedIdChanged = (prevProps.stepTreeSelectedId !== stepTreeSelectedId);
    const isWeeksCounterChanged = (weeksCounter !== prevProps.weeksCounter);
    const isAgeChanged = (age !== prevProps.age);
    const isGenderChanged = (gender !== prevProps.gender);
    const shouldGoingToStepTwo = (
      (step > 1) && (
        (isStepOneGroupChanged || isStepOneSecondaryGroupChanged) || isWeeksCounterChanged || isAgeChanged || isGenderChanged)
    );

    if (step === 1) {
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
      this.goingToStepByStepNymber(1);
      this.goingToStepTwo({
        group: prevProps.group,
        sleepaway: prevProps.sleepaway,
        gender: prevProps.gender,
        age: prevProps.age,
        weeks: prevProps.weeksCounter,
        secondaryGroup: prevProps.secondaryGroup,
      });
    }

    if ((step > 2) && isDateChanged) {
      this.goingToStepByStepNymber(2);
    }

    if ((step > 3) && (startDate && endDate) && isStepTreeSelectedIdChanged) {
      this.goingToStepByStepNymber(3);
    }

    if (step === 2) {
      this.goingToStepThree({ startDate: prevProps.startDate });
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
    return (
      <React.Fragment>
        {children().slice(startIndex, step)}
        <Footer
          arrowUp={arrowPosition}
          price={totalPrice}
          message={this.renderMessage()}
        />
      </React.Fragment>
    );
  }

  goingToStepByStepNymber = (stepNumber) => {
    this.props.stepActions.setStepsCounter(stepNumber);
  };

  renderMessage = () => {
    const { age, gender, group, participantId, sleepaway, startDate, weeksCounter } = this.props;
    let stringKey;
    switch(true) {
      case (!isString(participantId) && !isNumber(participantId)): {
        stringKey = 'enter_email';
        break;
      }
      case (!isString(age) && !isString(gender) && !isString(sleepaway)): {
        stringKey = 'choose_sleepaway_age_and_gender';
        break;
      }
      case (isString(age) && !isString(gender) && !isString(sleepaway)): {
        stringKey = 'choose_sleepaway_and_gender';
        break;
      }
      case (isString(sleepaway) && !isString(gender) && !isString(age)): {
        stringKey = 'choose_age_and_gender';
        break;
      }
      case (isString(sleepaway) && isString(gender) && !isString(age)): {
        stringKey = 'choose_age';
        break;
      }
      case (isString(sleepaway) && !isString(gender) && isString(age)): {
        stringKey = 'choose_gender';
        break;
      }
      case (isString(sleepaway) && isString(gender) && isString(age)) && (weekly_camp === group) && (weeksCounter === 0): {
        stringKey = 'choose_weeks';
        break;
      }
      case (isString(sleepaway) && isString(gender) && isString(age)) && !startDate: {
        stringKey = 'choose_date';
        break;
      }
      default:
        stringKey = '';
    }
    return <LocaleString stringKey={stringKey} />;
  };

  goingToStepTwo = (prevProps = {}) => {
    const { group, sleepaway, gender, age, weeksCounter, cartId, participantId, secondaryGroup } = this.props;
    if ((isString(sleepaway) && isString(gender) && isString(age))) {
      if (((weekly_camp === group) && (weeksCounter > 0)) || (group && secondaryGroup)) {
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
          this.goingToStepByStepNymber(2);
        }
      }
    }
  };

  goingToStepThree = (prevProps = {}) => {
    const { startDate } = this.props;
    if (startDate && !isEqual({ startDate }, prevProps)) {
      this.goingToStepByStepNymber(3);
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    stepActions: bindActionCreators(stepActions, dispatch),
    stepOneActions: bindActionCreators(stepOneActions, dispatch),
  };
};

function mapStateToProps(state) {
  return {
    step: currentStepSelector(state),
    participantId: state.participant.id,
    sleepaway: stepOneFormValueSelector(state, 'sleepaway'),
    age: stepOneFormValueSelector(state, 'age'),
    gender: stepOneFormValueSelector(state, 'gender'),
    group: stepOneGroupSelector(state),
    weeksCounter: weeksCounterSelector(state),
    cartId: state.cart.id,
    secondaryGroup: stepOneSecondaryGroupSelector(state),
    startDate: stepTwoStartDateSelector(state),
    endDate: stepTwoEndDateSelector(state),
    stepTreeSelectedId: stepTreeSelectedIdSelector(state),
    totalPrice: totalPriceSelector(state),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WizardForm);
