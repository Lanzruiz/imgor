// Modules
import isEqual from 'lodash/isEqual';
import assign from 'lodash/assign';
import { change, untouch } from 'redux-form';
// Actions
import { updateCart } from './cart';
// Constants
import * as stepSixTypes from '../constants/step.six';
import { stepSixFormFieldNames } from '../containers/StepSix/selectors';
// Api
import Api from '../api';

function stepSixGetCatalogTransport(data) {
  return {
    type: stepSixTypes.STEP_SIX_GET_CATALOG_TRANSPORT,
    payload: data,
  };
};

function stepSixGetCatalogAirlines(data) {
  return {
    type: stepSixTypes.STEP_SIX_GET_CATALOG_AIRLINES,
    payload: data,
  };
};

export function stepSixSetDefaultState() {
  return {
    type: stepSixTypes.STEP_SIX_SET_DEFAULT_STATE,
  };
};

export function stepSixGetCatalogTransportRequest() {
  return function(dispatch) {
    Api.req({
      apiCall: Api.getCatalogTransport,
      res200: data => dispatch(stepSixGetCatalogTransport(data)),
      res404: () => console.log('Api.getCatalogTransport() => Error 404'), // TODO: Add error handler
      reject: err => console.log(err), // TODO: Add error handler
    });
  }
};

export function stepSixGetCatalogAirlinesRequest() {
  return function(dispatch) {
    Api.req({
      apiCall: Api.getCatalogAirlines,
      res200: data => dispatch(stepSixGetCatalogAirlines(data)),
      res404: () => console.log('Api.getCatalogAirlines => Error 404'), // TODO: Add error handler
      reject: err => console.log(err), // TODO: Add error handler
    });
  }
};

export function stepSixSetArrivalAirlines(id) {
  return {
    type: stepSixTypes.STEP_SIX_SET_ARRIVAL_AIRLINES,
    payload: id,
  };
};

export function stepSixSetDepartingAirlines(id) {
  return {
    type: stepSixTypes.STEP_SIX_SET_DEPARTING_AIRLINES,
    payload: id,
  };
};

function stepSixGetCatalogTransportUnaccompanied(data) {
  return {
    type: stepSixTypes.STEP_SIX_GET_CATALOG_TRANSPORT_UNACCOMPANIED,
    payload: data,
  };
};

export function stepSixGetCatalogTransportUnaccompaniedRequest() {
  return function(dispatch) {
    Api.req({
      apiCall: Api.getCatalogTransportUnaccompanied,
      res200: data => dispatch( stepSixGetCatalogTransportUnaccompanied(data), ),
      res404: () => console.log('Api.getCatalogTransportUnaccompanied => 404'), // TODO: Add error handler
      reject: err => console.log(err), // TODO: Add error handler
    });
  }
};

export function stepSixSendProductToTheCart(args) {
  return function(dispatch) {
    Api.req({
      apiCall: Api.postCartCartIdParticipantIdProduct,
      res200: (data) => {
        let cartObject;
        if (isEqual(args.attributes.type, 'arrival_transport')) {
          cartObject = assign({}, data.cart, { stepSixArrivalProductId: data.participant_product_id });
        }
        if (isEqual(args.attributes.type, 'departing_transport')) {
          cartObject = assign({}, data.cart, { stepSixDepartingProductId: data.participant_product_id });
        }
        if (isEqual(args.attributes.type, 'unacompannied')) {
          cartObject = assign({}, data.cart, { stepSixUnnacompaniedProductId: data.participant_product_id });
        }
        dispatch( updateCart(cartObject), );
      },
      res404: () => console.log('Api.postCartCartIdParticipantIdProduct() => 404'),
      reject: console.error, // TODO: Add error handler
      apiCallParams: args,
    });
  }
};

export function stepSixSetUnnacompaniedData(data) {
  return {
    type: stepSixTypes.STEP_SIX_SET_UNNACOMPANIED_DATA,
    payload: data,
  };
};

export function stepSixSetArrivalData(data) {
  return {
    type: stepSixTypes.STEP_SIX_SET_ARRIVAL_DATA,
    payload: data,
  };
};

export function stepSixSetDepartingData(data) {
  return {
    type: stepSixTypes.STEP_SIX_SET_DEPARTING_DATA,
    payload: data,
  };
};

export function stepSixUpdateProductInTheCart(args) {
  return function(dispatch) {
    Api.req({
      apiCall: Api.putCartCartIdParticipantParticipantIdProductId,
      res200: (data) => {
        dispatch( updateCart(data.cart), );
      },
      res404: () => console.log('Api.() => 404'),
      reject: console.error,
      apiCallParams: args,
    });
  }
};

export function stepSixDeleteProductInTheCart(args) {
  return function(dispatch) {
    Api.req({
      apiCall: Api.deleteCartCartIdParticipantParticipantIdProductId,
      res200: (data) => {
        let cartObject;
        if (isEqual(args.type, 'arrival_transport')) {
          cartObject = assign({}, data.cart, { stepSixArrivalProductId: null });
        }
        if (isEqual(args.type, 'departing_transport')) {
          cartObject = assign({}, data.cart, { stepSixDepartingProductId: null });
        }
        if (isEqual(args.type, 'unacompannied')) {
          cartObject = assign({}, data.cart, { stepSixUnnacompaniedProductId: null });
        }
        dispatch( updateCart(cartObject), );
      },
      res404: () => console.log('Api.() => 404'),
      reject: console.error,
      apiCallParams: args,
    });
  }
}


export function stepSixAddTransportToCart(){
  return(dispatch, getState) => {
    
    const { form: { wizard: { values } } } = getState();
    
    const cartPayload = {
      [stepSixFormFieldNames.airportPickup]: values[stepSixFormFieldNames.airportPickup],
      [stepSixFormFieldNames.unaccompanied]: values[stepSixFormFieldNames.unaccompanied],
      [stepSixFormFieldNames.transport]: values[stepSixFormFieldNames.transport],
      [stepSixFormFieldNames.arrivalFlightNumber]: values[stepSixFormFieldNames.arrivalFlightNumber],
      [stepSixFormFieldNames.arrivalDateTime]: values[stepSixFormFieldNames.arrivalDateTime],
      [stepSixFormFieldNames.dropoff]: values[stepSixFormFieldNames.dropoff],
      [stepSixFormFieldNames.dropoffOtherLocation]: values[stepSixFormFieldNames.dropoffOtherLocation],
      [stepSixFormFieldNames.departingTransport]: values[stepSixFormFieldNames.departingTransport],
      [stepSixFormFieldNames.departingFlightNumber]: values[stepSixFormFieldNames.departingFlightNumber],
      [stepSixFormFieldNames.departingDateTime]: values[stepSixFormFieldNames.departingDateTime],
      [stepSixFormFieldNames.departing]: values[stepSixFormFieldNames.departing],
      [stepSixFormFieldNames.pickUpOtherLocation]: values[stepSixFormFieldNames.pickUpOtherLocation],
      [stepSixFormFieldNames.airportPickupAirline]: values[stepSixFormFieldNames.airportPickupAirline],
      [stepSixFormFieldNames.departingAirline]: values[stepSixFormFieldNames.departingAirline],
      [stepSixFormFieldNames.hasBookedFlight]: values[stepSixFormFieldNames.hasBookedFlight],
    };
    
    dispatch({
      type: stepSixTypes.STEP_SIX_ADD_TRANSPORTATION_TO_CART,
      payload: cartPayload
    })
  }
}

export function stepSixSelectTransportationOption(id) {
  return {
    type: stepSixTypes.STEP_SIX_SELECT_TRANSPORTATION_CARD,
    payload: id,
  };
}

export function stepSixUnselectTransportationOption() {
  return function(dispatch) {
    const fields = [
      stepSixFormFieldNames.airportPickup,
      stepSixFormFieldNames.unaccompanied,
      stepSixFormFieldNames.transport,
      stepSixFormFieldNames.arrivalFlightNumber,
      stepSixFormFieldNames.arrivalDateTime,
      stepSixFormFieldNames.dropoff,
      stepSixFormFieldNames.dropoffOtherLocation,
      stepSixFormFieldNames.departingTransport,
      stepSixFormFieldNames.departingFlightNumber,
      stepSixFormFieldNames.departingDateTime,
      stepSixFormFieldNames.departing,
      stepSixFormFieldNames.pickUpOtherLocation,
      stepSixFormFieldNames.airportPickupAirline,
      stepSixFormFieldNames.departingAirline,
      stepSixFormFieldNames.hasBookedFlight,
    ];
    fields.forEach((fieldName) => {
      dispatch( change('wizard', fieldName, null), );
      dispatch( untouch('wizard', null), );
    });
    dispatch({ type: stepSixTypes.STEP_SIX_UNSELECT_TRANSPORTATION_CARD });
  };
}
