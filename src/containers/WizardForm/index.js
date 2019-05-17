// Modules
import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';
import isEqual from 'lodash/isEqual';
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';
import find from 'lodash/find';
import moment from 'moment';
// Components
import Footer from '../../components/Footer';
import LocaleString from '../../components/LocaleString';
// Actions
import * as stepActions from '../../actions/steps';
import * as stepOneActions from '../../actions/step.one';
import * as stepThreeActions from '../../actions/step.three';
import * as stepSixActions from '../../actions/step.six';
import * as trainingActions from '../../actions/training';
import * as cartActions from '../../actions/cart';
import { validationWithBlacklist } from '../../helpers/blackListOfFields';
import { gtmStateChange, stateChangeTypes } from '../../helpers/GTMService';
// Selectors
import {
  stepTreeSelectedIdSelector, stepThreeSelectedCardWithSecondaryProgramsIdSelector, stepThreeHasSecondaryProgram,
  stepThreeSelectedProductSelector, stepThreeParticipantProductIdSelector, stepThreeSecondaryProgramIdSelector,
} from '../StepThree/selector';
import { totalPriceSelector, currentStepSelector } from './selectors';
import {
  stepOneAgeSelector, stepOneSleepawaySelector, stepOneGenderSelector, stepOneAgeNumberSelector, weeksItemsSelector,
  stepOneGroupSelector, stepOneSecondaryGroupSelector, weeksCounterSelector, isWeeklyCampSelector, stepOneEmailSelector,
} from '../StepOne/selectors';
import { stepTwoStartDateSelector, stepTwoEndDateSelector } from '../StepTwo/selectors';
import { stepFourSecondaryProgramIdSelector } from '../StepFour/selectors';
import {
  stepSixAirportPickupSelector, stepSixUnaccompaniedSelector, stepSixSelectedTransportSelector,
  stepSixArrivalFlightNumberSelector, stepSixArrivalDateTimeSelector, stepSixSelectedArrivalAirlineSelector,
  stepSixDropoffOtherLocationSelector, stepSixDepartingTransportSelector, stepSixPickUpOtherLocationSelector,
  stepSixSelectedDepartingAirlineSelector, stepSixDepartingFlightNumberSelector, stepSixDepartingDateTimeSelector,
  stepSixDepartingSelector, stepSixTransportUnaccompaniedSelector, stepSixDepartingTransportObjectSelector,
  stepSixArrivalTransportObjectSelector, stepSixTransportationIdSelector, stepSixAirportPickupAirlineSelector,
  stepSixDropoffSelector, stepSixDepartingAirlineSelector,
} from '../StepSix/selectors';
import {
  finalStepFirstNameSelector, finalStepLastNameSelector, finalStepPositionSelector, finalStepPhoneSelector,
  finalStepShirtSizeSelector, finalStepGuardianFirstNameSelector, finalStepGuardianLastNameSelector,
  finalStepGuardianEmailSelector, finalStepGuardianPhoneSelector, finalStepDateOfBirthSelector, finalStepPositionsSelector,
} from '../StepFinal/selectors';
// Helpers
import isStringsEqual from '../../helpers/isStringsEqual';
import stringToNumber from '../../helpers/stringToNumber';
// import calculateAge from '../../helpers/calculateAge';
// Constants
import { stepsEnum } from '../../constants/steps';
import { weekly_camp } from '../StepOne';
import { airportPickupInformation, departingFormFieldNames } from '../StepSix/selectors';
import { productTypesEnum } from '../../constants/cart';
import isEmpty from 'lodash/isEmpty';
// Styles
import './styles.scss';

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
    isBusinessTypeForAdult: PropTypes.bool,
    valid: PropTypes.bool,
    dataDisplayFooter: PropTypes.bool,
  };

  static defaultProps = {
    step: 0,
    stepTwoStartingPrice: 0,
    stepOnePrice: 0,
    weeksCounter: 0,
    stepThreePrice: 0,
    guardianEmail: '',
    guardianPhone: '',
    dataBusinessTypeForAdult: false
  };

  componentDidMount() {
    const { step } = this.props;
    switch(step) {
      case stepsEnum.zero: {
        this.goingToStepOne();
        break;
      }
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
        this.goingToStepFive();
        break;
      }
      case stepsEnum.five: {
        this.goingToStepSix();
        break;
      }
      case stepsEnum.six: {
        this.goingToFinalStep();
        break;
      }
      case stepsEnum.seven: {
        break;
      }
      default:
        return;
    }
    
    window.reactAppFinish = async (GAlinkerParam) => {
      await this.purchaseHandler(GAlinkerParam);
    };
  }

  componentDidUpdate(prevProps) {
    const {
      age, gender, group, step, startDate, endDate, stepTreeSelectedId, secondaryGroup, weeksCounter,
      stepThreeSelectedCardWithSecondaryProgramsId, stepFourSecondaryProgramId, participantId, cartId, product,
      sleepaway
    } = this.props;

    const isStepOneGroupChanged = (group !== prevProps.group);
    const isStepOneSecondaryGroupChanged = (secondaryGroup !== prevProps.secondaryGroup);
    const isDateChanged = (prevProps.startDate !== startDate) || (prevProps.endDate !== endDate);
    const isStepTreeSelectedIdChanged = (prevProps.stepTreeSelectedId !== stepTreeSelectedId);
    const isWeeksCounterChanged = (weeksCounter !== prevProps.weeksCounter);
    const isAgeChanged = (age !== prevProps.age);
    const isSleepawayChanged = (sleepaway !== prevProps.sleepaway);
    const isGenderChanged = (gender !== prevProps.gender);

    const shouldGoingToStepTwo = (
      (step > stepsEnum.one) && (
        (isStepOneGroupChanged || isStepOneSecondaryGroupChanged)
        || isWeeksCounterChanged
        || isAgeChanged
        || isGenderChanged
      )
    );

    switch(true) {
      case !!(isAgeChanged || isGenderChanged || isSleepawayChanged): {
        this.goingToStepOne({
          sleepaway: prevProps.sleepaway,
          gender: prevProps.gender,
          age: prevProps.age,
        });
        break;
      }
      
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

      case (isEqual(step, stepsEnum.six)): {
        this.goingToFinalStep(prevProps);
        break;
      }

      // case (isEqual(step, stepsEnum.seven)): {
      //   this.goingToStepSixFromFinalStep(prevProps);
      //   break;
      // }

      default:
        return;
    }
  }

  render() {
    const { children, step, valid, dataDisplayFooter } = this.props;
    
    const startIndex = 0;
    if (typeof children !== 'function') {
      return (
        <span>Error!</span>
      );
    }
    const arrowPosition = true;
    const message = this.renderMessage();
    const hasMessage = !isEqual(message.props.stringKey, '');
  
    //SendingData outside app
    this.props.cartActions.sendCartData(this.props);
    
    return (
      <React.Fragment>
        <CSSTransitionGroup
          component="div"
          className="wizard-form"
          transitionName="fade"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          {children().slice(startIndex, (step + 1))}
        </CSSTransitionGroup>
        <Footer
          arrowUp={arrowPosition}
          step={step}
          message={message}
          hasMessage={hasMessage}
          purchaseOnClickHandler={this.purchaseHandler}
          saveCampOnClickHandler={this.saveCampHandler}
          shareOnClickHandler={this.shareHandler}
          valid={valid}
          dataDisplayFooter={dataDisplayFooter}
        />
      </React.Fragment>
    );
  }

  purchaseHandler = async (GAlinkerParam) => {
    const {
      cartId, redirectUrlShopify, firstName, lastName, position, finalStepDateOfBirth, shirtSize, guardianFirstName,
      guardianLastName, finalStepPhone, participantId, gender, age, guardianEmail, guardianPhone, email, dataRepEmail
    } = this.props;

    const linkerParam = GAlinkerParam;
    const shopifyUrl = redirectUrlShopify || process.env.REACT_APP_REDIRECT_URL_SHOPIFY;
    const stubData = {
      address: {
        address1: 'fake address',
      },
      status: 1,
      push_status: 0,
    };
    const data = {
      cartId,
      shopifyUrl,
      linkerParam,
      participantId,
      position,
      age,
      gender,
      email,
      guardianFirstName,
      guardianLastName,
      guardianEmail,
      guardianPhone,
      phone: finalStepPhone,
      first_name: firstName,
      last_name: lastName,
      dob: new Date(finalStepDateOfBirth) / 1000,
      preferred_shirt_size: shirtSize,
    };
    
    if(dataRepEmail){
      data.representative_email = dataRepEmail
    }

    await this.props.cartActions.purchaseRequest(data, stubData);
    
    this.props.gtmStateChange(stateChangeTypes.OR_CART);
  };

  saveCampHandler = () => {
    console.warn('Need handler to save');
  };

  shareHandler = () => {
    console.warn('Need handler to share');
  };

  goingToStepByStepNymber = (stepNumber) => {
    this.props.stepActions.setStepsCounter(stepNumber);
  };

  renderMessage = () => {
    const { step } = this.props;
    let stringKey;
    
    switch(step) {
      case stepsEnum.zero: {
        stringKey = this.stepZeroValidation();
        break;
      }
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
  
  goingToStepOne = () => {
    const { sleepaway, gender, age } = this.props;
    
    if ((isString(sleepaway) && isString(gender) && isString(age))) {
      this.goingToStepByStepNymber(stepsEnum.one);
    }
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

  goingToStepThree = (prevProps = {}) => {
    const { startDate } = this.props;
    if (startDate) {
      this.goingToStepByStepNymber(stepsEnum.three);
    }
  };

  goingToStepFour = () => {
    const { stepTreeSelectedId, participantProductId } = this.props;
    // TODO: rewrite that!
    if (stepTreeSelectedId && !participantProductId) {
      // this.props.trainingActions.getCatalogCampCampIdRequest(stepTreeSelectedId);
    }
    if (participantProductId) {
      // this.goingToStepByStepNymber(stepsEnum.four);
    }
  };

  goingToStepFive = () => {
    const { stepTreeSelectedId, stepFourSecondaryProgramId, weeksItems, hasSecondaryProgram, stepThreeSecondaryProgramId } = this.props;
    if (hasSecondaryProgram && stepThreeSecondaryProgramId) {
      this.goingToStepByStepNymber(stepsEnum.five);
      return;
    }
    const unselectedWeek = find(weeksItems, ['customize_id', null]);
    if ((!stepTreeSelectedId && isNumber(stepFourSecondaryProgramId)) || !unselectedWeek || ((!hasSecondaryProgram && stepTreeSelectedId) && !unselectedWeek)) {
      this.goingToStepByStepNymber(stepsEnum.five);
    }
  };

  goingToStepSix = () => {
    this.goingToStepByStepNymber(stepsEnum.six);
  };

  goingToFinalStep = (prevProps = {}) => {
    const {
      stepSixAirportPickup, stepSixUnaccompanied, stepSixSelectedTransport, stepSixArrivalFlightNumber, stepSixTransportationId,
      stepSixArrivalDateTime, stepSixDropoff, stepSixDropoffOtherLocation, stepSixDepartingTransport,
      stepSixPickUpOtherLocation, stepSixDepartingFlightNumber, stepSixDepartingDateTime,
      stepSixDeparting, stepSixTransportUnaccompanied, stepSixDepartingTransportObject, stepSixArrivalTransportObject,
      stepSixDepartingAirline, stepSixAirportPickupAirline,
    } = this.props;

    const isStepSixTransportationIdSelected = isNumber(stepSixTransportationId);

    if (!isStepSixTransportationIdSelected) {
      this.props.stepSixActions.stepSixSetUnnacompaniedData(null); // Set unnacompanied data here
      this.props.stepSixActions.stepSixSetDepartingData(null); // Set departing data here
      this.props.stepSixActions.stepSixSetArrivalData(null); // Set arrival data here
      return;
    }

    const { other } = departingFormFieldNames;

    // Dropoff location for partThree
    const isDropoffLocationEqualToOther = isEqual(stepSixDropoff, other);
    // Pickup location for partFive
    const isPickupLocationEqualToOther = isEqual(stepSixDeparting, other);

    const { both, arrival, departing } = airportPickupInformation;

    // If step six data changed need send the request to the server
    const isStepSixDataChanged = this.isStepSixDataChanged(prevProps);

    const airportPickupArrivalAndDeparting = isEqual(stepSixAirportPickup, both);
    const airportPickupArrivalOnly = isEqual(stepSixAirportPickup, arrival);
    const airportPickupDepartingOnly = isEqual(stepSixAirportPickup, departing);

    const isUnacompanniedSelected = isEqual(stepSixUnaccompanied, 'true');

    // Arrival and departing data
    if (airportPickupArrivalAndDeparting) {
      const partOne = !!(stepSixUnaccompanied);
      const partTwo = !!(stepSixSelectedTransport);
      const partThree = !isEqual(stepSixDropoff, other) ? true : !!stepSixDropoffOtherLocation;
      const partFour = !!(stepSixDepartingTransport);
      const partFive = !isEqual(stepSixDeparting, other) ? true : !!stepSixPickUpOtherLocation;

      if (partOne && partTwo && partThree && partFour && partFive) {
        // Unaccompanied data
        const unaccompaniedData = {
          attributes: { type: 'unacompannied' },
          product: isUnacompanniedSelected ? stepSixTransportUnaccompanied : null,
          productId: isUnacompanniedSelected ? stepSixTransportUnaccompanied.id : null,
          quantity: 1,
          refundable: false,
          type: productTypesEnum.transport,
        };

        // Arrival data
        const arrivalData = {
          attributes: {
            flight: {
              airline: stepSixAirportPickupAirline,
              booked: false,
              date: stepSixArrivalDateTime ? moment(stepSixArrivalDateTime, 'YYYY-MM-DD HH:mm').format() : null,
              location: isDropoffLocationEqualToOther ? null : stepSixDropoff,
              location_other: isDropoffLocationEqualToOther ? stepSixDropoffOtherLocation : null,
              number: stepSixArrivalFlightNumber,
            },
            type: 'arrival_transport',
          },
          product: stepSixArrivalTransportObject,
          productId: stringToNumber(stepSixSelectedTransport),
          quantity: 1,
          refundable: false,
          type: productTypesEnum.transport,
        };

        // Departing data object
        const departingData = {
          attributes: {
            flight: {
              airline: stepSixDepartingAirline,
              booked: false,
              date: stepSixDepartingDateTime ? moment(stepSixDepartingDateTime, 'YYYY-MM-DD HH:mm').format() : null,
              location: isPickupLocationEqualToOther ? null : stepSixDeparting,
              location_other: isPickupLocationEqualToOther ? stepSixPickUpOtherLocation : null,
              number: stepSixDepartingFlightNumber,
            },
            type: 'departing_transport',
          },
          product: stepSixDepartingTransportObject,
          productId: stringToNumber(stepSixDepartingTransport),
          quantity: 1,
          refundable: false,
          type: productTypesEnum.transport,
        };

        if (isStepSixDataChanged) {
          this.props.stepSixActions.stepSixSetUnnacompaniedData(unaccompaniedData.productId ? unaccompaniedData : null); // Set unnacompanied data here
          this.props.stepSixActions.stepSixSetDepartingData(departingData); // Set departing data here
          this.props.stepSixActions.stepSixSetArrivalData(arrivalData); // Set arrival data here
        }
      }
      return;
    }

    if (airportPickupArrivalOnly) {
      const partOne = !!(stepSixUnaccompanied);
      const partTwo = !!(stepSixSelectedTransport);
      const partThree = !isEqual(stepSixDropoff, other) ? true : !!stepSixDropoffOtherLocation;

      if (partOne && partTwo && partThree) {
        // Unaccompanied data
        const unaccompaniedData = {
          attributes: { type: 'unacompannied' },
          product: isUnacompanniedSelected ? stepSixTransportUnaccompanied : null,
          productId: isUnacompanniedSelected ? stepSixTransportUnaccompanied.id : null,
          quantity: 1,
          refundable: false,
          type: productTypesEnum.transport,
        };

        // Arrival data
        const arrivalData = {
          attributes: {
            flight: {
              airline: stepSixAirportPickupAirline,
              booked: false,
              date: stepSixArrivalDateTime ? moment(stepSixArrivalDateTime, 'YYYY-MM-DD HH:mm').format() : null,
              location: isDropoffLocationEqualToOther ? null : stepSixDropoff,
              location_other: isDropoffLocationEqualToOther ? stepSixDropoffOtherLocation : null,
              number: stepSixArrivalFlightNumber,
            },
            type: 'arrival_transport',
          },
          product: stepSixArrivalTransportObject,
          productId: stringToNumber(stepSixSelectedTransport),
          quantity: 1,
          refundable: false,
          type: productTypesEnum.transport,
        };

        if (isStepSixDataChanged) {
          this.props.stepSixActions.stepSixSetUnnacompaniedData(unaccompaniedData.productId ? unaccompaniedData : null); // Set unnacompanied data here
          this.props.stepSixActions.stepSixSetDepartingData(null); // Set departing data here
          this.props.stepSixActions.stepSixSetArrivalData(arrivalData); // Set arrival data here
        }
      }
      return;
    }

    if (airportPickupDepartingOnly) {
      const partOne = !!(stepSixUnaccompanied);
      const partTwo = !!(stepSixDepartingTransport);
      const partThree = !isEqual(stepSixDeparting, other) ? true : !!stepSixDropoffOtherLocation;

      if (partOne && partTwo && partThree) {
        // Unaccompanied data
        const unaccompaniedData = {
          attributes: { type: 'unacompannied' },
          product: isUnacompanniedSelected ? stepSixTransportUnaccompanied : null,
          productId: isUnacompanniedSelected ? stepSixTransportUnaccompanied.id : null,
          quantity: 1,
          refundable: false,
          type: productTypesEnum.transport,
        };

        // Departing data object
        const departingData = {
          attributes: {
            flight: {
              airline: stepSixDepartingAirline,
              booked: false,
              date: stepSixDepartingDateTime ? moment(stepSixDepartingDateTime, 'YYYY-MM-DD HH:mm').format() : null,
              location: isPickupLocationEqualToOther ? null : stepSixDeparting,
              location_other: isPickupLocationEqualToOther ? stepSixPickUpOtherLocation : null,
              number: stepSixDepartingFlightNumber,
            },
            type: 'departing_transport',
          },
          product: stepSixDepartingTransportObject,
          productId: stringToNumber(stepSixDepartingTransport),
          quantity: 1,
          refundable: false,
          type: productTypesEnum.transport,
        };

        if (isStepSixDataChanged) {
          this.props.stepSixActions.stepSixSetUnnacompaniedData(unaccompaniedData.productId ? unaccompaniedData : null); // Set unnacompanied data here
          this.props.stepSixActions.stepSixSetDepartingData(departingData); // Set departing data here
          this.props.stepSixActions.stepSixSetArrivalData(null); // Set arrival data here
        }
      }
      return;
    }
  };

  // goingToStepSixFromFinalStep = (prevProps = {}) => {
    // const { stepSixTransportationId } = this.props;
    // const isStepSixDataChanged = this.isStepSixDataChanged(prevProps);
    
    // if (isStepSixDataChanged) {
    //   this.goingToFinalStep(prevProps);
    //   this.goingToStepByStepNymber(stepsEnum.six);
    //   return;
    // }
    //
    // const isStepSixTransportationIdSelected = isNumber(stepSixTransportationId);
    //
    // if (isStepSixTransportationIdSelected && !isEqual(stepSixTransportationId, prevProps.stepSixTransportationId)) {
    //   this.goingToStepByStepNymber(stepsEnum.six);
    // }
  // };
  
  stepZeroValidation = () => {
    const { age, gender, participantId, sleepaway } = this.props;
    switch(true) {
      case (!isString(participantId) && !isNumber(participantId)): {
        return 'enter_email';
      }
      case (!isString(age) && !isString(gender) && !isString(sleepaway)): {
        return 'choose_sleepaway_age_and_gender';
      }
      case (!isString(age) && !isString(sleepaway)): {
        return 'choose_age_sleepaway';
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
      default:
        return '';
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
      case (!isString(age) && !isString(sleepaway)): {
        return 'choose_age_sleepaway';
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
      case (isString(sleepaway) && isString(gender) && isString(age)) && isStringsEqual(weekly_camp, group) && isEqual(weeksCounter, 0): {
        return 'choose_weeks';
      }
      case !group: {
        return 'choose_group';
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
    const { participantProductId } = this.props;
    switch(true) {
      case !participantProductId: {
        return 'step_three_choose_training_message';
      }
      default:
        return '';
    }
  };

  stepFourValidation = () => {
    const { stepFourSecondaryProgramId, weeksItems, hasSecondaryProgram, stepThreeSecondaryProgramId } = this.props;
    switch(true) {
      case hasSecondaryProgram && !stepThreeSecondaryProgramId && !isNumber(stepFourSecondaryProgramId): {
        return 'step_four_make_selection_for_entire_camp_stay';
      }
      case !hasSecondaryProgram && weeksItems[0] && isEqual(weeksItems[0].customize_id, null): {
        return 'step_four_week_one_message';
      }
      case !hasSecondaryProgram && weeksItems[1] && isEqual(weeksItems[1].customize_id, null): {
        return 'step_four_week_two_message';
      }
      case !hasSecondaryProgram && weeksItems[2] && isEqual(weeksItems[2].customize_id, null): {
        return 'step_four_week_three_message';
      }
      case !hasSecondaryProgram && weeksItems[3] && isEqual(weeksItems[3].customize_id, null): {
        return 'step_four_week_four_message';
      }
      case !hasSecondaryProgram && weeksItems[4] && isEqual(weeksItems[4].customize_id, null): {
        return 'step_four_week_five_message';
      }
      case !hasSecondaryProgram && weeksItems[5] && isEqual(weeksItems[5].customize_id, null): {
        return 'step_four_week_six_message';
      }
      case !hasSecondaryProgram && weeksItems[6] && isEqual(weeksItems[6].customize_id, null): {
        return 'step_four_week_seven_message';
      }
      case !hasSecondaryProgram && weeksItems[7] && isEqual(weeksItems[7].customize_id, null): {
        return 'step_four_week_eight_message';
      }
      case !hasSecondaryProgram && weeksItems[8] && isEqual(weeksItems[8].customize_id, null): {
        return 'step_four_week_nine_message';
      }
      case !hasSecondaryProgram && weeksItems[9] && isEqual(weeksItems[9].customize_id, null): {
        return 'step_four_week_ten_message';
      }
      case !hasSecondaryProgram && weeksItems[10] && isEqual(weeksItems[10].customize_id, null): {
        return 'step_four_week_eleven_message';
      }
      case !hasSecondaryProgram && weeksItems[11] && isEqual(weeksItems[11].customize_id, null): {
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
      stepSixAirportPickup, stepSixUnaccompanied, stepSixSelectedTransport, stepSixDropoff,
      stepSixDropoffOtherLocation, stepSixDepartingTransport, stepSixPickUpOtherLocation,
      stepSixDeparting, stepSixTransportationId, stepSixAirportPickupAirline, stepSixDepartingAirline,
    } = this.props;

    const { both, arrival, departing } = airportPickupInformation;
    const { other } = departingFormFieldNames;

    const airportPickupArrivalAndDeparting = isEqual(stepSixAirportPickup, both);
    const airportPickupArrivalOnly = isEqual(stepSixAirportPickup, arrival);
    const airportPickupDepartingOnly = isEqual(stepSixAirportPickup, departing);

    const isStepSixTransportationSelected = isNumber(stepSixTransportationId);

    if (isStepSixTransportationSelected) {
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
        case (airportPickupArrivalAndDeparting || airportPickupArrivalOnly) && !stepSixAirportPickupAirline: {
          return 'step_six_airlines_message';
        }
        case (airportPickupArrivalAndDeparting || airportPickupArrivalOnly) && !stepSixDropoff:
        case (airportPickupArrivalAndDeparting || airportPickupArrivalOnly) && (stepSixDropoff === other) && !stepSixDropoffOtherLocation: {
          return 'step_six_dropoff_location_message';
        }
        case (airportPickupArrivalAndDeparting || airportPickupDepartingOnly) && !stepSixDepartingTransport: {
          return 'step_six_departing_location_message';
        }
        case (airportPickupArrivalAndDeparting || airportPickupDepartingOnly) && !stepSixDepartingAirline: {
          return 'step_six_departing_airline_message';
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
    const {
      ageNumber, finalStepDateOfBirth, firstName, lastName, position, positions, shirtSize, guardianFirstName,
      guardianLastName, guardianEmail, guardianPhone, isBusinessTypeForAdult, sport
    } = this.props;
    const adultAge = 18;
    const isAdult = ageNumber <= adultAge;

    switch(true) {
      case !firstName: {
        return 'step_final.no_first_name_message';
      }
      case !lastName: {
        return 'step_final.no_last_name_message';
      }
      case !finalStepDateOfBirth: {
        return 'enter_day_of_birth';
      }
      case finalStepDateOfBirth && !moment(finalStepDateOfBirth, 'MM/DD/YYYY').isValid(): {
        return 'date_is_not_valid';
      }
      // case finalStepDateOfBirth && !isEqual( calculateAge(finalStepDateOfBirth), ageNumber ): {
      //   return 'camper_age_is_not_equal';
      // }
      case validationWithBlacklist(!isEmpty(positions) && !position, sport, 'position') : {
        return 'step_final.no_position_message';
      }
      case !shirtSize: {
        return 'step_final.no_shirt_size_message';
      }
      case !isBusinessTypeForAdult && isAdult && !guardianFirstName: {
        return 'step_final.no_guardian_first_name_message';
      }
      case !isBusinessTypeForAdult && isAdult && !guardianLastName: {
        return 'step_final.no_guardian_last_name_message';
      }
      case !isBusinessTypeForAdult && isAdult && !isEmail(guardianEmail): {
        return 'step_final.no_guardian_email_message';
      }
      case !isBusinessTypeForAdult && isAdult && !isMobilePhone(guardianPhone): {
        return 'step_final.no_guardian_phone_message';
      }
      default:
        return '';
    }
  };

  isStepSixDataChanged = (prevProps) => {
    const {
      stepSixUnaccompanied, stepSixSelectedTransport, stepSixAirportPickupAirline,
      stepSixArrivalDateTime, stepSixDropoff, stepSixDeparting, stepSixDropoffOtherLocation,
      stepSixDepartingTransport, stepSixDepartingAirline, stepSixDepartingFlightNumber,
      stepSixDepartingDateTime, stepSixArrivalFlightNumber, stepSixAirportPickup, stepSixPickUpOtherLocation,
    } = this.props;

    const { other } = departingFormFieldNames;

    // Dropoff location for partThree
    const isDropoffLocationEqualToOther = isEqual(stepSixDropoff, other);
    // Pickup location for partFive
    const isPickupLocationEqualToOther = isEqual(stepSixDeparting, other);

    // Unaccompanied for partOne
    const isUnaccompaniedChanged = !isEqual(stepSixUnaccompanied, prevProps.stepSixUnaccompanied);

    // Arrival
    const isArrivalTransportChanged = !isEqual(stepSixSelectedTransport, prevProps.stepSixSelectedTransport);
    const isSelectedArrivalAirlineChanged = !isEqual(stepSixAirportPickupAirline, prevProps.stepSixAirportPickupAirline);
    const isArrivalFlightNumberChanged = !isEqual(stepSixArrivalFlightNumber, prevProps.stepSixArrivalFlightNumber);
    const isArrivalDateTimeChanged = !isEqual(stepSixArrivalDateTime, prevProps.stepSixArrivalDateTime);

    const isArrivalDropoffLocationChanged = (
      isDropoffLocationEqualToOther
        ? !isEqual(stepSixDropoffOtherLocation, prevProps.stepSixDropoffOtherLocation)
        : !isEqual(stepSixDropoff, prevProps.stepSixDropoff)
    );

    // Dropoff
    const isDepartingTransportChanged = !isEqual(stepSixDepartingTransport, prevProps.stepSixDepartingTransport);
    const isSelectedDepartingAirlineChanged = !isEqual(stepSixDepartingAirline, prevProps.stepSixDepartingAirline);
    const isDepartingFlightNumberChanged = !isEqual(stepSixDepartingFlightNumber, prevProps.stepSixDepartingFlightNumber);
    const isDepartingDateTimeChanged = !isEqual(stepSixDepartingDateTime, prevProps.stepSixDepartingDateTime);

    const isDepartingLocationChanged = (
      isPickupLocationEqualToOther
        ? !isEqual(stepSixPickUpOtherLocation, prevProps.stepSixPickUpOtherLocation)
        : !isEqual(stepSixDeparting, prevProps.stepSixDeparting)
    );
    // Airport pickup
    const isAirportPickupChanged = !isEqual(stepSixAirportPickup, prevProps.stepSixAirportPickup);

    const isStepSixDataChanged = (
         isAirportPickupChanged
      || isUnaccompaniedChanged
      || isArrivalTransportChanged
      || isSelectedArrivalAirlineChanged
      || isArrivalFlightNumberChanged
      || isArrivalDateTimeChanged
      || isArrivalDropoffLocationChanged
      || isDepartingTransportChanged
      || isSelectedDepartingAirlineChanged
      || isDepartingFlightNumberChanged
      || isDepartingDateTimeChanged
      || isDepartingLocationChanged
    );

    return isStepSixDataChanged;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    stepActions: bindActionCreators(stepActions, dispatch),
    stepOneActions: bindActionCreators(stepOneActions, dispatch),
    stepThreeActions: bindActionCreators(stepThreeActions, dispatch),
    stepSixActions: bindActionCreators(stepSixActions, dispatch),
    trainingActions: bindActionCreators(trainingActions, dispatch),
    cartActions: bindActionCreators(cartActions, dispatch),
    gtmStateChange: bindActionCreators(gtmStateChange, dispatch)
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
    stepThreeSecondaryProgramId: stepThreeSecondaryProgramIdSelector(state),
    totalPrice: totalPriceSelector(state),
    isWeeklyCamp: isWeeklyCampSelector(state),
    stepThreeSelectedCardWithSecondaryProgramsId: stepThreeSelectedCardWithSecondaryProgramsIdSelector(state),
    hasSecondaryProgram: stepThreeHasSecondaryProgram(state),
    stepFourSecondaryProgramId: stepFourSecondaryProgramIdSelector(state),
    weeksItems: weeksItemsSelector(state),
    firstName: finalStepFirstNameSelector(state),
    lastName: finalStepLastNameSelector(state),
    positions: finalStepPositionsSelector(state),
    position: finalStepPositionSelector(state),
    shirtSize: finalStepShirtSizeSelector(state),
    ageNumber: stepOneAgeNumberSelector(state),
    guardianFirstName: finalStepGuardianFirstNameSelector(state),
    guardianLastName: finalStepGuardianLastNameSelector(state),
    guardianEmail: finalStepGuardianEmailSelector(state),
    guardianPhone: finalStepGuardianPhoneSelector(state),
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
    participantProductId: stepThreeParticipantProductIdSelector(state),
    stepSixTransportUnaccompanied: stepSixTransportUnaccompaniedSelector(state),
    stepSixDepartingTransportObject: stepSixDepartingTransportObjectSelector(state),
    stepSixArrivalTransportObject: stepSixArrivalTransportObjectSelector(state),
    finalStepDateOfBirth: finalStepDateOfBirthSelector(state),
    stepSixTransportationId: stepSixTransportationIdSelector(state),
    stepSixAirportPickupAirline: stepSixAirportPickupAirlineSelector(state),
    stepSixDepartingAirline: stepSixDepartingAirlineSelector(state),
    finalStepPhone: finalStepPhoneSelector(state),
    email: stepOneEmailSelector(state),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WizardForm);
