/* eslint-disable no-undef */
// Constants
import isEqual from 'lodash/isEqual';
import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';
import isEmpty from 'lodash/isEmpty';
import ReactDOMServer from 'react-dom/server';
import React from 'react';
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';
import moment from 'moment';
// Api
import Api from '../api';
import LocaleString from '../components/LocaleString';
import { stepsEnum } from '../constants/steps';
import isStringsEqual from '../helpers/isStringsEqual';
import * as cartTypes from '../constants/cart';
import { weekly_camp } from '../containers/StepOne';
import { airportPickupInformation, departingFormFieldNames } from '../containers/StepSix/selectors';
import { recalculateInsurancePrice } from './final.step';
import { setStepsCounter } from './steps';
import { saveTrainingId } from './training';
import { addParticipantByCardId } from './participant';

export function updateCart(cart) {
  return (dispatch) => {
    dispatch(recalculateInsurancePrice());
    dispatch({
      type: cartTypes.UPDATE_CART,
      payload: cart,
    });
  }
};

export function deleteCart() {
  return {
    type: cartTypes.DELETE_CART,
  };
};

export function createCartRequest(dataInitial, repEmail) {
  return function(dispatch) {
    return Api.req({
      apiCall: Api.createCart,
      res200: (data) => {
        if(dataInitial.email){
          dispatch(addParticipantByCardId({
            cartId: data.cart.id,
            email: dataInitial.email || null,
          }));
        }
        
        dispatch(createCart(data.cart));
        
        if(repEmail){
          dispatch(updateCartData({ id: data.cart.id, ...data.cart, representative_email: repEmail }))
        }
      },
      res404: () => console.log('Api.createCart() => 404'), // TODO: Add error handler!
      reject: (err) => console.log(err), // TODO: Add error handler!,
    });
  };
};

export function updateCartData({ id, ...rest }){
  return function(dispatch) {
    return Api.req({
      apiCall: Api.putCartCartId,
      res200: (data) => {
        dispatch(updateCart(data.cart))
      },
      res404: () => console.log('Api.createCart() => 404'), // TODO: Add error handler!
      reject: (err) => console.log(err), // TODO: Add error handler!,
      apiCallParams: {
        cartId: id,
        ...rest
      }
    });
  };
}

function createCart(cart) {
  return {
    type: cartTypes.CREATE_CART,
    payload: cart,
  };
}

export function deleteAllProductsFromCart(){
  return async function (dispatch, getState){
    const { cart } = getState();
    const { participants } = cart;
    
    const cartId = cart.id;
    const participantId = (participants[0] || {}).id || null;
    const products = (participants[0] || {}).products || [];
    
    if(!isEmpty(products)){
      for(let index in products){
        await Api.req({
          apiCall: Api.deleteCartCartIdParticipantParticipantIdProductId,
          res200: async (data) => await dispatch(updateCart(data.cart)),
          res404: () => console.log('Api.createCart() => 404'), // TODO: Add error handler!
          reject: (err) => console.log(err), // TODO: Add error handler!
          apiCallParams: {
            cartId,
            participantId,
            productId: products[index].id
          },
        });
      }
  
      // dispatch( updateCart(assign({}, getState(), { stepThreeProductId: null })), );
      dispatch( saveTrainingId(null), );
      dispatch(setStepsCounter(stepsEnum.two))
    }
  }
}

export function purchaseRequest(args, stubData) {
  return function(dispatch) {
    Api.req({
      res200: (data) => {
        dispatch( updateCart(data.cart), );
        
        const body = {
          ...stubData,
          cartId: args.cartId,
          first_name: args.guardianFirstName,
          last_name: args.guardianLastName,
          email: args.guardianEmail,
          contact_number: args.guardianPhone,
        };
        
        if(args.representative_email){
          body.representative_email = args.representative_email
        }
        
        Api.req({
          res200: (data) => {
            if (window && args.cartId) {
              window.location = `${args.shopifyUrl}?order=${args.cartId}&${linkerParam}`;
            }
          },
          res404: () => { console.log('Api.putCartCartId => 404'); },
          reject: console.error,
          apiCall: Api.putCartCartId,
          apiCallParams: body,
        });

      },
      res404: () => console.log('purchaseRequest => 404'),
      reject: () => {},
      apiCall: Api.putCartCartIdParticipantParticipantId,
      apiCallParams: args,
    });
  }
}

export function sendCartData(props){
  return (dispatch, getState) => {
    if(window.reactAppUpdate && typeof window.reactAppUpdate === 'function' ){
      const { form, cart } = getState();
      const email = ((form.wizard || {}).values || {}).email || '';
      
      const sleepaway =  ((form.wizard || {}).values || {}).sleepaway || '';
      const age = ((form.wizard || {}).values || {}).age || '';
      const gender = ((form.wizard || {}).values || {}).gender || '';
    
      const message = getValidationMessage(props);
  
      window.reactAppUpdate({
        email: email,
        cart: cart,
        price: cart.price_total || 0,
        checkout_ready: (!message && gender && age && sleepaway),
        message: ReactDOMServer.renderToString(message ? <LocaleString stringKey={message}/> : '')
      });
    }
  }
}

function getValidationMessage(props) {
  const { step } = props;
  let stringKey;
  
  switch(step || 0) {
    case stepsEnum.zero: {
      stringKey = stepOneValidation(props);
      break;
    }
    case stepsEnum.one: {
      stringKey = stepOneValidation(props);
      break;
    }
    case stepsEnum.two: {
      stringKey = stepTwoValidation(props);
      break;
    }
    case stepsEnum.three: {
      stringKey = stepThreeValidation(props);
      break;
    }
    case stepsEnum.four: {
      stringKey = stepFourValidation(props);
      break;
    }
    case stepsEnum.five: {
      stringKey = stepFiveValidation(props);
      break;
    }
    case stepsEnum.six: {
      stringKey = stepSixValidation(props);
      break;
    }
    case stepsEnum.seven: {
      stringKey = stepFinalValidation(props);
      break;
    }
    default:
      break;
  }
  
  return stringKey;
}

export function stepOneValidation (props) {
  const { age, gender, group, participantId, sleepaway, weeksCounter } = props;
  
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
}

export function stepTwoValidation (props) {
  const { startDate } = props;
  switch(true) {
    case !startDate: {
      return 'choose_date';
    }
    default:
      return '';
  }
}

export function stepThreeValidation (props) {
  const { participantProductId } = props;
  switch(true) {
    case !participantProductId: {
      return 'step_three_choose_training_message';
    }
    default:
      return '';
  }
}

export function stepFourValidation (props) {
  const { stepFourSecondaryProgramId, weeksItems, hasSecondaryProgram, stepThreeSecondaryProgramId } = props;
  
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
}

export function stepFiveValidation () {
  switch(true) {
    default:
      return '';
  }
}

export function stepSixValidation (props) {
  const {
    stepSixAirportPickup, stepSixUnaccompanied, stepSixSelectedTransport, stepSixDropoff,
    stepSixDropoffOtherLocation, stepSixDepartingTransport, stepSixPickUpOtherLocation,
    stepSixDeparting, stepSixTransportationId, stepSixAirportPickupAirline, stepSixDepartingAirline,
  } = props;
  
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
}

export function stepFinalValidation (props) {
  const {
    ageNumber, finalStepDateOfBirth, firstName, lastName, position, shirtSize, guardianFirstName, positions,
    guardianLastName, guardianEmail, guardianPhone, isBusinessTypeForAdult
  } = props;
  
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
    case !isEmpty(positions) && !position: {
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
}
