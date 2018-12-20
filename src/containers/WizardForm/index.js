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
import find from 'lodash/find';
// Components
import Footer from '../../components/Footer';
import LocaleString from '../../components/LocaleString';
// Actions
import * as stepActions from '../../actions/steps';
import * as stepOneActions from '../../actions/step.one';
import * as stepThreeActions from '../../actions/step.three';
import * as trainingActions from '../../actions/training';
// Selectors
import {
  stepTreeSelectedIdSelector, stepThreeSelectedCardWithSecondaryProgramsIdSelector, stepThreeHasSecondaryProgram,
  stepThreeSelectedProductSelector,
} from '../StepThree/selector';
import { totalPriceSelector, currentStepSelector } from './selectors';
import {
  stepOneAgeSelector, stepOneSleepawaySelector, stepOneGenderSelector, stepOneAgeNumberSelector, weeksItemsSelector,
  stepOneGroupSelector, stepOneSecondaryGroupSelector, weeksCounterSelector, isWeeklyCampSelector,
} from '../StepOne/selectors';
import { stepTwoStartDateSelector, stepTwoEndDateSelector } from '../StepTwo/selectors';
import { stepFourSecondaryProgramIdSelector } from '../StepFour/selectors';
import {
  stepSixTransportationSelector, stepSixAirportPickupSelector, stepSixUnaccompaniedSelector, stepSixSelectedTransportSelector,
  stepSixArrivalFlightNumberSelector, stepSixArrivalDateTimeSelector, stepSixSelectedArrivalAirlineSelector, stepSixDropoffSelector,
  stepSixDropoffOtherLocationSelector, stepSixDepartingTransportSelector, stepSixPickUpOtherLocationSelector,
  stepSixSelectedDepartingAirlineSelector, stepSixDepartingFlightNumberSelector, stepSixDepartingDateTimeSelector,
  stepSixDepartingSelector,
} from '../StepSix/selectors';
import {
  finalStepFirstNameSelector, finalStepLastNameSelector, finalStepPositionSelector,
  finalStepShirtSizeSelector, finalStepGuardianFirstNameSelector, finalStepGuardianLastNameSelector,
  finalStepGuardianEmailSelector, finalStepGuardianPhoneSelector,
} from '../StepFinal/selectors';
// Constants
import { stepsEnum } from '../../constants/steps';
import { weekly_camp } from '../StepOne';
import { airportPickupInformation, departingFormFieldNames } from '../StepSix/selectors';
import { productTypesEnum } from '../../constants/cart';

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
    switch(step) {
      case stepsEnum.one: {
        this.goingToStepTwo();
        break;
      }
      case stepsEnum.two: {
        this.goingToStepThree();
        break;
      }
      case stepsEnum.three: {
        this.goingToStepFour();
        break;
      }
      case stepsEnum.four: {
        break;
      }
      case stepsEnum.five: {
        break;
      }
      case stepsEnum.six: {
        break;
      }
      case stepsEnum.seven: {
        break;
      }
      default:
        return;
    }
  }

  componentDidUpdate(prevProps) {
    const {
      age, gender, group, step, startDate, endDate, stepTreeSelectedId, secondaryGroup, weeksCounter,
      stepThreeSelectedCardWithSecondaryProgramsId, stepFourSecondaryProgramId, participantId, cartId, product,
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

    switch(true) {
      case isEqual(step, stepsEnum.one): {
        this.goingToStepTwo({
          group: prevProps.group,
          sleepaway: prevProps.sleepaway,
          gender: prevProps.gender,
          age: prevProps.age,
          weeks: prevProps.weeksCounter,
          secondaryGroup: prevProps.secondaryGroup,
        });
        break;
      }

      case !!(shouldGoingToStepTwo): {
        this.goingToStepByStepNymber(stepsEnum.one);
        this.goingToStepTwo({
          group: prevProps.group,
          sleepaway: prevProps.sleepaway,
          gender: prevProps.gender,
          age: prevProps.age,
          weeks: prevProps.weeksCounter,
          secondaryGroup: prevProps.secondaryGroup,
        });
        break;
      }

      case !!((step > stepsEnum.two) && isDateChanged): {
        this.goingToStepByStepNymber(stepsEnum.two);
        break;
      }

      case !!(isEqual(step, stepsEnum.two) && startDate): {
        this.goingToStepThree();
        break;
      }

      case !!(isEqual(step, stepsEnum.three) && stepTreeSelectedId): {
        this.goingToStepFour();
        this.postCartCartIdParticipantIdProduct();
        break;
      }

      case !!(isEqual(step, stepsEnum.three) && !stepTreeSelectedId && isNumber(stepThreeSelectedCardWithSecondaryProgramsId)): {
        this.goingToStepByStepNymber(stepsEnum.four);
        break;
      }

      case !!((step > stepsEnum.three) && !isEqual(stepThreeSelectedCardWithSecondaryProgramsId, prevProps.stepThreeSelectedCardWithSecondaryProgramsId)): {
        this.goingToStepByStepNymber(stepsEnum.three);
        break;
      }

      case !!((step > stepsEnum.three) && (startDate && endDate) && isStepTreeSelectedIdChanged): {
        this.goingToStepByStepNymber(stepsEnum.three);
        break;
      }

      case isEqual(step, stepsEnum.four): {
        this.goingToStepFive();
        break;
      }

      case !!(isEqual(step, stepsEnum.five) && stepFourSecondaryProgramId): {
        this.props.trainingActions.getCatalogCampCampIdRequest(stepFourSecondaryProgramId);
        const args = {
          participantId,
          cartId,
          product,
          productId: stepTreeSelectedId,
          type: productTypesEnum.camp,
          quantity: 1,
        };
        this.props.stepThreeActions.postCartCartIdParticipantIdProductRequest(args);
        break;
      }

      case isEqual(step, stepsEnum.five): {
        this.goingToStepSix();
        break;
      }

      case (isEqual(step, stepsEnum.six) || isEqual(step, stepsEnum.seven)): {
        this.goingToFinalStep();
        break;
      }

      default:
        return;
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
    const hasMessage = !isEqual(message.props.stringKey, '');
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

  goingToStepFive = () => {
    const { stepTreeSelectedId, stepFourSecondaryProgramId, weeksItems, hasSecondaryProgram } = this.props;
    const unselectedWeek = find(weeksItems, ['customize_id', null]);
    if ((!stepTreeSelectedId && isNumber(stepFourSecondaryProgramId)) || !unselectedWeek || (!hasSecondaryProgram && stepTreeSelectedId)) {
      this.goingToStepByStepNymber(stepsEnum.five);
    }
  };

  goingToStepSix = () => {
    this.goingToStepByStepNymber(stepsEnum.six);
  };

  goingToFinalStep = () => {
    const {
      stepSixTransportation, stepSixAirportPickup, stepSixUnaccompanied, stepSixSelectedTransport, stepSixArrivalFlightNumber,
      stepSixArrivalDateTime, stepSixSelectedArrivalAirline, stepSixDropoff, stepSixDropoffOtherLocation, stepSixDepartingTransport,
      stepSixPickUpOtherLocation, stepSixSelectedDepartingAirline, stepSixDepartingFlightNumber, stepSixDepartingDateTime,
      stepSixDeparting, step,
    } = this.props;

    if (!stepSixTransportation) {
      this.goingToStepByStepNymber(stepsEnum.six);
      return;
    }

    const isCurrentStepFinal = step === stepsEnum.seven;

    if (!stepSixAirportPickup && isCurrentStepFinal) {
      this.goingToStepByStepNymber(stepsEnum.six);
    }

    const { other } = departingFormFieldNames;
    const { both, arrival, departing } = airportPickupInformation;

    const airportPickupArrivalAndDeparting = stepSixAirportPickup === both;
    const airportPickupArrivalOnly = stepSixAirportPickup === arrival;
    const airportPickupDepartingOnly = stepSixAirportPickup === departing;

    if (airportPickupArrivalAndDeparting) {
      const partOne = !!stepSixUnaccompanied;
      const partTwo = stepSixSelectedTransport && stepSixSelectedArrivalAirline && stepSixArrivalFlightNumber && stepSixArrivalDateTime;
      const partThree = stepSixDropoff !== other ? true : !!stepSixPickUpOtherLocation;
      const stepFour = stepSixDepartingTransport && stepSixSelectedDepartingAirline && stepSixDepartingFlightNumber && stepSixDepartingDateTime;
      const stepFive = stepSixDeparting !== other ? true : !!stepSixDropoffOtherLocation;
      if (partOne && partTwo && partThree && stepFour && stepFive) {
        this.goingToStepByStepNymber(stepsEnum.seven);
        return;
      }
      if (isCurrentStepFinal) {
        this.goingToStepByStepNymber(stepsEnum.six);
      }
      return;
    }

    if (airportPickupArrivalOnly) {
      const partOne = !!stepSixUnaccompanied;
      const partTwo = stepSixSelectedTransport && stepSixSelectedArrivalAirline && stepSixArrivalFlightNumber && stepSixArrivalDateTime;
      const partThree = stepSixDropoff !== other ? true : !!stepSixDropoffOtherLocation;
      if (partOne && partTwo && partThree) {
        this.goingToStepByStepNymber(stepsEnum.seven);
        return;
      }
      if (isCurrentStepFinal) {
        this.goingToStepByStepNymber(stepsEnum.six);
      }
      return;
    }

    if (airportPickupDepartingOnly) {
      const partOne = !!stepSixUnaccompanied;
      const partTwo = stepSixDepartingTransport && stepSixSelectedDepartingAirline && stepSixDepartingFlightNumber && stepSixDepartingDateTime;
      const partThree = stepSixDeparting !== other ? true : !!stepSixDropoffOtherLocation;
      if (partOne && partTwo && partThree) {
        this.goingToStepByStepNymber(stepsEnum.seven);
        return;
      }
      if (isCurrentStepFinal) {
        this.goingToStepByStepNymber(stepsEnum.six);
      }
      return;
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
    const { stepTreeSelectedId } = this.props;
    switch(true) {
      case !stepTreeSelectedId: {
        return 'step_three_choose_training_message';
      }
      default:
        return '';
    }
  };

  stepFourValidation = () => {
    const { stepTreeSelectedId, stepFourSecondaryProgramId, weeksItems, hasSecondaryProgram } = this.props;
    switch(true) {
      case hasSecondaryProgram && !stepTreeSelectedId && (typeof stepFourSecondaryProgramId !== 'number'): {
        return 'step_four_make_selection_for_entire_camp_stay';
      }
      case !hasSecondaryProgram && weeksItems[0] && weeksItems[0].customize_id === null: {
        return 'step_four_week_one_message';
      }
      case !hasSecondaryProgram && weeksItems[1] && weeksItems[1].customize_id === null: {
        return 'step_four_week_two_message';
      }
      case !hasSecondaryProgram && weeksItems[2] && weeksItems[2].customize_id === null: {
        return 'step_four_week_three_message';
      }
      case !hasSecondaryProgram && weeksItems[3] && weeksItems[3].customize_id === null: {
        return 'step_four_week_four_message';
      }
      case !hasSecondaryProgram && weeksItems[4] && weeksItems[4].customize_id === null: {
        return 'step_four_week_five_message';
      }
      case !hasSecondaryProgram && weeksItems[5] && weeksItems[5].customize_id === null: {
        return 'step_four_week_six_message';
      }
      case !hasSecondaryProgram && weeksItems[6] && weeksItems[6].customize_id === null: {
        return 'step_four_week_seven_message';
      }
      case !hasSecondaryProgram && weeksItems[7] && weeksItems[7].customize_id === null: {
        return 'step_four_week_eight_message';
      }
      case !hasSecondaryProgram && weeksItems[8] && weeksItems[8].customize_id === null: {
        return 'step_four_week_nine_message';
      }
      case !hasSecondaryProgram && weeksItems[9] && weeksItems[9].customize_id === null: {
        return 'step_four_week_ten_message';
      }
      case !hasSecondaryProgram && weeksItems[10] && weeksItems[10].customize_id === null: {
        return 'step_four_week_eleven_message';
      }
      case !hasSecondaryProgram && weeksItems[11] && weeksItems[11].customize_id === null: {
        return 'step_four_week_twelve_message';
      }
      default:
        return '';
    }
  };

  stepFiveValidation = () => {
    switch(true) {
      default:
        return '';
    }
  };

  stepSixValidation = () => {
    const {
      stepSixTransportation, stepSixAirportPickup, stepSixUnaccompanied, stepSixSelectedTransport, stepSixArrivalFlightNumber,
      stepSixArrivalDateTime, stepSixSelectedArrivalAirline, stepSixDropoff, stepSixDropoffOtherLocation, stepSixDepartingTransport,
      stepSixPickUpOtherLocation, stepSixSelectedDepartingAirline, stepSixDepartingFlightNumber, stepSixDepartingDateTime,
      stepSixDeparting,
    } = this.props;

    const { both, arrival, departing } = airportPickupInformation;
    const { other } = departingFormFieldNames;

    const airportPickupArrivalAndDeparting = stepSixAirportPickup === both;
    const airportPickupArrivalOnly = stepSixAirportPickup === arrival;
    const airportPickupDepartingOnly = stepSixAirportPickup === departing;

    if (stepSixTransportation) {
      switch(true) {
        case !stepSixAirportPickup: {
          return 'step_six_airport_transportation_message';
        }
        case !stepSixUnaccompanied: {
          return 'step_six_unaccompanied_message';
        }
        case (airportPickupArrivalAndDeparting || airportPickupArrivalOnly) && !stepSixSelectedTransport: {
          return 'step_six_arrival_flight_information_message';
        }
        case (airportPickupArrivalAndDeparting || airportPickupArrivalOnly) && !stepSixSelectedArrivalAirline: {
          return 'step_six_airlines_message';
        }
        case (airportPickupArrivalAndDeparting || airportPickupArrivalOnly) && !stepSixArrivalFlightNumber: {
          return 'step_six_arrival_flight_number_message';
        }
        case (airportPickupArrivalAndDeparting || airportPickupArrivalOnly) && !stepSixArrivalDateTime: {
          return 'step_six_arrival_flight_date_and_time_message';
        }
        case (airportPickupArrivalAndDeparting || airportPickupArrivalOnly) && !stepSixDropoff:
        case (airportPickupArrivalAndDeparting || airportPickupArrivalOnly) && (stepSixDropoff === other) && !stepSixDropoffOtherLocation: {
          return 'step_six_dropoff_location_message';
        }
        case (airportPickupArrivalAndDeparting || airportPickupDepartingOnly) && !stepSixDepartingTransport: {
          return 'step_six_departing_location_message';
        }
        case (airportPickupArrivalAndDeparting || airportPickupDepartingOnly) && !stepSixSelectedDepartingAirline: {
          return 'step_six_departing_airline_message';
        }
        case (airportPickupArrivalAndDeparting || airportPickupDepartingOnly) && !stepSixDepartingFlightNumber: {
          return 'step_six_departing_flight_number_message';
        }
        case (airportPickupArrivalAndDeparting || airportPickupDepartingOnly) && !stepSixDepartingDateTime: {
          return 'step_six_departing_date_time_message';
        }
        case (airportPickupArrivalAndDeparting || airportPickupDepartingOnly) && !stepSixDeparting:
        case (airportPickupArrivalAndDeparting || airportPickupDepartingOnly) && (stepSixDeparting === other) && !stepSixPickUpOtherLocation: {
          return 'step_six_departing_pick_up_location_message';
        }
        default:
          return '';
      }
    }
    return '';
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
  };

  postCartCartIdParticipantIdProduct = () => {
    //TODO: rewrite that
    const { product, selectedId, cartId, participantId } = this.props;
    if (product && selectedId && cartId && participantId) {
      const args = {
        cartId,
        participantId,
        product,
        quantity: 1,
        type: productTypesEnum,
      };
      this.props.stepThreeActions.postCartCartIdParticipantIdProductRequest(args);
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    stepActions: bindActionCreators(stepActions, dispatch),
    stepOneActions: bindActionCreators(stepOneActions, dispatch),
    stepThreeActions: bindActionCreators(stepThreeActions, dispatch),
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
    hasSecondaryProgram: stepThreeHasSecondaryProgram(state),
    stepFourSecondaryProgramId: stepFourSecondaryProgramIdSelector(state),
    weeksItems: weeksItemsSelector(state),
    firstName: finalStepFirstNameSelector(state),
    lastName: finalStepLastNameSelector(state),
    position: finalStepPositionSelector(state),
    shirtSize: finalStepShirtSizeSelector(state),
    ageNumber: stepOneAgeNumberSelector(state),
    guardianFirstName: finalStepGuardianFirstNameSelector(state),
    guardianLastName: finalStepGuardianLastNameSelector(state),
    guardianEmail: finalStepGuardianEmailSelector(state),
    guardianPhone: finalStepGuardianPhoneSelector(state),
    stepSixTransportation: stepSixTransportationSelector(state),
    stepSixAirportPickup: stepSixAirportPickupSelector(state),
    stepSixUnaccompanied: stepSixUnaccompaniedSelector(state),
    stepSixSelectedTransport: stepSixSelectedTransportSelector(state),
    stepSixArrivalFlightNumber: stepSixArrivalFlightNumberSelector(state),
    stepSixArrivalDateTime: stepSixArrivalDateTimeSelector(state),
    stepSixSelectedArrivalAirline: stepSixSelectedArrivalAirlineSelector(state),
    stepSixDropoff: stepSixDropoffSelector(state),
    stepSixDropoffOtherLocation: stepSixDropoffOtherLocationSelector(state),
    stepSixDepartingTransport: stepSixDepartingTransportSelector(state),
    stepSixPickUpOtherLocation: stepSixPickUpOtherLocationSelector(state),
    stepSixSelectedDepartingAirline: stepSixSelectedDepartingAirlineSelector(state),
    stepSixDepartingFlightNumber: stepSixDepartingFlightNumberSelector(state),
    stepSixDepartingDateTime: stepSixDepartingDateTimeSelector(state),
    stepSixDeparting: stepSixDepartingSelector(state),
    product: stepThreeSelectedProductSelector(state),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WizardForm);
