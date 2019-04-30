// Modules
import assign from 'lodash/assign';
import isNumber from 'lodash/isNumber';
import isEqual from 'lodash/isEqual';
import { stepsEnum } from '../constants/steps';
// Constants
import * as weeksTypes from '../constants/weeks';
import { emptyConcentrationId } from '../reducers/step.four';
// Api
import Api from '../api';
// Actions
import { updateCart } from './cart';
import { setStepsCounter } from './steps';

export function incrementWeeksCounter() {
  return {
    type: weeksTypes.INCREMENT_WEEKS_COUNTER,
  };
};

export function decrementWeeksCounter() {
  return {
    type: weeksTypes.DECREMENT_WEEKS_COUNTER,
  };
};

export function customizeWeek(id, weekId) {
  return {
    type: weeksTypes.CUSTOMIZE_WEEK,
    payload: { id: id, weekId: weekId },
  };
};

export function selectWeek(id) {
  return {
    type: weeksTypes.SELECT_WEEK,
    payload: id,
  };
};

export function setWeeksCounter(count) {
  return {
    type: weeksTypes.SET_WEEKS_COUNTER,
    payload: count,
  };
}

export function setOnlyWeeks(count) {
  return {
    type: weeksTypes.SET_ONLY_WEEKS,
    payload: count,
  };
}

export function setWeekPrice(price) {
  return {
    type: weeksTypes.SET_WEEK_PRICE,
    payload: price,
  };
}

export function removeCustomizedWeek(id) {
  return function (dispatch){
    dispatch({
      type: weeksTypes.REMOVE_CUSTOMIZED_WEEK,
      payload: id,
    });
    
    if(isEqual(id, emptyConcentrationId)){
      dispatch(setStepsCounter(stepsEnum.four));
    }
  }
}

export function deleteSelectedConcentration({ cartId, participantId, productId, id, currentWeekId, nextWeekId }) {
  return function(dispatch) {
    Api.req({
      apiCall: Api.deleteCartCartIdParticipantParticipantIdProductId,
      res200: (data) => {
        dispatch( updateCart(assign({}, data.cart, { [`stepFourConcentrationProduct_${currentWeekId}`]: null })) );
        if (isEqual(emptyConcentrationId, id)) {
          dispatch( customizeWeek(id) );
          
          if (isNumber(nextWeekId) && (nextWeekId > (currentWeekId - 1))) {
            // dispatch( selectWeek(nextWeekId), );
          }
          
          dispatch(setStepsCounter(stepsEnum.seven));
          return;
        }
        if (isNumber(id)) {
          dispatch( removeCustomizedWeek(id), );
        }
  
      },
      res404: () => console.log('Api.deleteCartCartIdParticipantParticipantIdProductId => 404'),
      reject: console.error,
      apiCallParams: { cartId, participantId, productId },
    });
  }
}

export function updateSelectedConcentration({ cartId, participantId, productId, product, type, nextWeekId, currentWeekId }) {
  return function(dispatch) {
    Api.req({
      apiCall: Api.putCartCartIdParticipantParticipantIdProductId,
      res200: (data) => {
        dispatch( updateCart(assign({}, data.cart)), );
        dispatch( customizeWeek(product.id), );
        if (isNumber(nextWeekId) && (nextWeekId > (currentWeekId - 1))) {
          dispatch( selectWeek(nextWeekId), );
        }
      },
      res404: () => console.log('Api.putCartCartIdParticipantParticipantIdProductId => 404'),
      reject: console.error,
      apiCallParams: { cartId, participantId, productId, product, type },
    });
  }
}
