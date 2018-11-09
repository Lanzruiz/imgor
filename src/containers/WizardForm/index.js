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

class WizardForm extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    step: PropTypes.number,
    stepActions: PropTypes.shape({
      incrementStepsCounter: PropTypes.func,
    }),
    stepOneActions: PropTypes.shape({
      stepOnePutCartCartIdParticipantParticipantIdRequest: PropTypes.func.isRequired,
    }),
    stepTwoStartingPrice: PropTypes.number.isRequired,
    stepOnePrice: PropTypes.number.isRequired,
    stepOneWeeks: PropTypes.number.isRequired,
    participantId: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    sleepaway: PropTypes.string,
    gender: PropTypes.string,
    age: PropTypes.string,
    group: PropTypes.string,
    weeks: PropTypes.number,
    cartId: PropTypes.number,
  };

  static defaultProps = {
    step: 0,
    stepTwoStartingPrice: 0,
    stepOnePrice: 0,
    stepOneWeeks: 0,
    weeks: 0,
  };

  componentDidMount() {
    const { step } = this.props;
    if (step === 1) {
      this.goingToStepTwo();
    }
  }

  componentDidUpdate(prevProps) {
    const { step } = this.props;
    if (step === 1) {
      this.goingToStepTwo({
        group: prevProps.group,
        sleepaway: prevProps.sleepaway,
        gender: prevProps.gender,
        age: prevProps.age,
        weeks: prevProps.weeks,
      });
    }
  }

  render() {
    const { children, group, step, stepOnePrice, stepTwoStartingPrice, stepOneWeeks } = this.props;
    const startIndex = 0;
    if (typeof children !== 'function') {
      return (
        <span>Error!</span>
      );
    }
    const stepOneComputedPrice = group === weekly_camp ? stepOnePrice * stepOneWeeks : stepOnePrice;
    const price = stepOneComputedPrice + stepTwoStartingPrice;
    const arrowPosition = true;
    return (
      <React.Fragment>
        {children().slice(startIndex, step)}
        <Footer
          arrowUp={arrowPosition}
          price={price}
          message={this.renderMessage()}
        />
      </React.Fragment>
    );
  }

  renderMessage = () => {
    const { age, gender, group, participantId, sleepaway, weeks } = this.props;
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
      case (isString(sleepaway) && isString(gender) && isString(age)) && (weekly_camp === group) && (weeks === 0): {
        stringKey = 'choose_weeks';
        break;
      }
      default:
        stringKey = '';
    }
    return <LocaleString stringKey={stringKey} />;
  };

  goingToStepTwo = (prevProps = {}) => {
    const { group, sleepaway, gender, age, weeks, cartId, participantId } = this.props;
    if ((isString(sleepaway) && isString(gender) && isString(age)) && (weekly_camp === group) && (weeks > 0)) {
      if (!isEqual({ group, sleepaway, gender, age, weeks }, prevProps)) {
        this.props.stepOneActions.stepOnePutCartCartIdParticipantParticipantIdRequest({ cartId, participantId, gender, age });
      }
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
    step: state.steps.currentStep,
    stepOnePrice: state.stepOne.stepOnePrice,
    stepTwoStartingPrice: state.stepTwo.stepTwoStartingPrice,
    stepOneWeeks: state.weeks.weeksCounter,
    participantId: state.participant.id,
    sleepaway: stepOneFormValueSelector(state, 'sleepaway'),
    age: stepOneFormValueSelector(state, 'age'),
    gender: stepOneFormValueSelector(state, 'gender'),
    group: state.stepOne.group,
    weeks: state.weeks.weeksCounter,
    cartId: state.cart.id,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WizardForm);
