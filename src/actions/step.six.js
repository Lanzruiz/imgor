// Modules
import isEqual from 'lodash/isEqual';
import assign from 'lodash/assign';
import { change, untouch } from 'redux-form';
// Actions
import { updateCart } from './cart';
// Constants
import * as stepSixTypes from '../constants/step.six';
import { departingFormFieldNames, stepSixFormFieldNames } from '../containers/StepSix/selectors';
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
  return async function(dispatch) {
    await Api.req({
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
  return async function(dispatch) {
    await Api.req({
      apiCall: Api.putCartCartIdParticipantParticipantIdProductId,
      apiCallParams: args,
      res200: (data) => {
        dispatch( updateCart(data.cart), );
      },
      res404: () => console.log('Api.() => 404'),
      reject: console.error,
    });
  }
};

export function stepSixDeleteProductInTheCart(args) {
  return async function(dispatch) {
    await Api.req({
      apiCall: Api.deleteCartCartIdParticipantParticipantIdProductId,
      apiCallParams: args,
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
    });
  }
}


const sendArrivalRequest = ({productId, body, cartId, participantId}, dispatch) => {
  if (productId) {
    if (body) {
      return dispatch(stepSixUpdateProductInTheCart( assign({}, body, { cartId, participantId, productId })));
    } else {
      return dispatch(stepSixDeleteProductInTheCart({ cartId, participantId, productId: productId, type: 'arrival_transport' }));
    }
  } else {
    if (body) {
      return dispatch(stepSixSendProductToTheCart( assign({}, body, { cartId, participantId })));
    }
  }
};

const sendDepartingRequest = ({productId, body, cartId, participantId}, dispatch) => {
  if (productId) {
    if (body) {
      return dispatch(stepSixUpdateProductInTheCart( assign({}, body, { cartId, participantId, productId: productId })));
    } else {
      return dispatch(stepSixDeleteProductInTheCart({ cartId, participantId, productId: productId, type: 'departing_transport' }));
    }
  } else {
    if (body) {
      return dispatch(stepSixSendProductToTheCart( {...body, cartId, participantId }));
    }
  }
};

const sendUnaccompaniedRequest = ({productId, body, cartId, participantId}, dispatch) => {
  if (productId) {
    if (body) {
      return dispatch(stepSixUpdateProductInTheCart({
        ...body,
        cartId,
        participantId,
        productId: productId
      }));
    } else {
      return dispatch(stepSixDeleteProductInTheCart({
        cartId,
        participantId,
        productId: productId,
        type: 'unacompannied'
      }));
    }
  } else {
    if (body) {
      return dispatch(stepSixSendProductToTheCart( { ...body, cartId, participantId } ));
    }
  }
};

const stepSixDeleteArrivalProductInTheCart = ({cartId, participantId, productId}, dispatch) => {
  if (productId) {
    return dispatch(stepSixDeleteProductInTheCart({ cartId, participantId, productId, type: 'arrival_transport' }));
  }
};

const stepSixDeleteUnaccompaniedProductInTheCart = ({cartId, participantId, productId}, dispatch) => {
  if (productId) {
    return dispatch(stepSixDeleteProductInTheCart({ cartId, participantId, productId, type: 'unacompannied' }));
  }
};

const stepSixDeleteDepartingProductInTheCart = ({cartId, participantId, productId}, dispatch) => {
  if (productId) {
    return dispatch(stepSixDeleteProductInTheCart({ cartId, participantId, productId, type: 'departing_transport' }));
  }
};


export function stepSixAddTransportToCart({ cartId, participantId }){
  return async (dispatch, getState) => {
    
    const {
      form: { wizard: { values } },
      stepSix: { unaccompanied, transport },
      cart: { stepSixUnnacompaniedProductId, stepSixDepartingProductId, stepSixArrivalProductId }
    } = getState();
    
    const cartPayload = {
      airportPickupType: values[stepSixFormFieldNames.airportPickup],  //both, arrival, departing
      unaccompanied: Boolean(values[stepSixFormFieldNames.unaccompanied] || false),
      arrivalUnaccompanied: Boolean(values[stepSixFormFieldNames.arrivalUnaccompanied] === 'true'),
      departureUnaccompanied: Boolean(values[stepSixFormFieldNames.departureUnaccompanied] === 'true'),
      arrival: {
        transport: values[stepSixFormFieldNames.transport],
        flight: {
          booked: values[stepSixFormFieldNames.hasArrivalBookedFlight],
          airline: values[stepSixFormFieldNames.airportPickupAirline] || null,
          number: values[stepSixFormFieldNames.arrivalFlightNumber] || null,
          date: values[stepSixFormFieldNames.arrivalDateTime] || null,
          location: departingFormFieldNames.imgaCampusCenter,
          location_other: values[stepSixFormFieldNames.pickUpOtherLocation] || null,
        }
      },
      departing:{
        transport: values[stepSixFormFieldNames.departingTransport],
        flight: {
          booked: values[stepSixFormFieldNames.hasDepartingBookedFlight],
          airline: values[stepSixFormFieldNames.departingAirline] || null,
          number: values[stepSixFormFieldNames.departingFlightNumber] || null,
          date: values[stepSixFormFieldNames.departingDateTime] || null,
          location: departingFormFieldNames.imgaCampusCenter,
          location_other: values[stepSixFormFieldNames.dropoffOtherLocation] || null,
        }
      },
    };
    
  
    const unacommpaniedProductBody = {
      attributes: { type: 'unacompannied' },
      product: unaccompanied,
      productId: unaccompanied.id,
      quantity: [cartPayload.arrivalUnaccompanied, cartPayload.departureUnaccompanied].filter(v => !!v).length,
      type: 'transport',
      refundable: false,
    };
  
    const arrivalProduct = transport.find(v => v.package_product_id === cartPayload.arrival.transport);
    const departingProduct = transport.find(v => v.package_product_id === cartPayload.departing.transport);
    
    const arrivalProductBody = {
      attributes: {
        flight: cartPayload.arrival.flight,
        type: 'arrival_transport'
      },
      product: arrivalProduct,
      productId: (arrivalProduct || {}).id,
      quantity: 1,
      type: 'transport',
      refundable: false,
    };
  
    const departingProductBody = {
      attributes: {
        flight: cartPayload.departing.flight,
        type: 'departing_transport'
      },
      product: departingProduct,
      productId: (departingProduct || {}).id,
      quantity: 1,
      type: 'transport',
      refundable: false,
    };
    
    // let jobs = [];
    
    const params = { participantId, cartId };
    
    if(Boolean(cartPayload.arrivalUnaccompanied) || Boolean(cartPayload.departureUnaccompanied)){
      await sendUnaccompaniedRequest({ ...params, productId: stepSixUnnacompaniedProductId, body: unacommpaniedProductBody }, dispatch);
    }
    
    if(cartPayload.airportPickupType === 'both') {
      await sendArrivalRequest({ ...params, productId: stepSixArrivalProductId, body: arrivalProductBody}, dispatch);
      await sendDepartingRequest({ ...params, productId: stepSixDepartingProductId, body: departingProductBody}, dispatch);
    }
    
    if(cartPayload.airportPickupType === 'arrival') {
      await sendArrivalRequest({ ...params, productId: stepSixArrivalProductId, body: arrivalProductBody}, dispatch);
    }
    
    if(cartPayload.airportPickupType === 'departing') {
      await sendDepartingRequest({ ...params, productId: stepSixDepartingProductId, body: departingProductBody}, dispatch);
    }

    // await Promise.all(jobs);

    dispatch({
      type: stepSixTypes.STEP_SIX_ADD_TRANSPORTATION_TO_CART,
      payload: cartPayload
    })
  }
}

export function stepSixClearTransportCart(){
  return {
    type: stepSixTypes.STEP_SIX_CLEAR_TRANSPORTATION_CART
  }
}


export function stepSixSelectTransportationOption(id) {
  return {
    type: stepSixTypes.STEP_SIX_SELECT_TRANSPORTATION_CARD,
    payload: id,
  };
}

export function stepSixUnselectTransportationOption({ cartId, participantId }) {
  return async function(dispatch, getState) {
    const {
      cart: { stepSixUnnacompaniedProductId, stepSixDepartingProductId, stepSixArrivalProductId }
    } = getState();
  
    let jobs = [];
    const params = { participantId, cartId };
  
    jobs.push(stepSixDeleteUnaccompaniedProductInTheCart({ ...params, productId: stepSixUnnacompaniedProductId }, dispatch));
    jobs.push(stepSixDeleteArrivalProductInTheCart({ ...params, productId: stepSixArrivalProductId }, dispatch));
    jobs.push(stepSixDeleteDepartingProductInTheCart({ ...params, productId: stepSixDepartingProductId }, dispatch));
    
    await Promise.all(jobs);
    
    const fields = [
      stepSixFormFieldNames.airportPickup,
      stepSixFormFieldNames.unaccompanied,
      stepSixFormFieldNames.arrivalUnaccompanied,
      stepSixFormFieldNames.departureUnaccompanied,
      stepSixFormFieldNames.transport,
      stepSixFormFieldNames.arrivalFlightNumber,
      stepSixFormFieldNames.arrivalDateTime,
      // stepSixFormFieldNames.dropoff,
      stepSixFormFieldNames.dropoffOtherLocation,
      stepSixFormFieldNames.departingTransport,
      stepSixFormFieldNames.departingFlightNumber,
      stepSixFormFieldNames.departingDateTime,
      // stepSixFormFieldNames.departing,
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
