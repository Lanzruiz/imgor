// Modules
import isEqual from 'lodash/isEqual';
import assign from 'lodash/assign';
// Actions
import { updateCart } from './cart';
// Constants
import * as stepSixTypes from '../constants/step.six';
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
      res200: data => dispatch(stepSixGetCatalogTransportUnaccompanied(data)),
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
          dispatch( stepSixSetArrivalData(null), );
        }
        if (isEqual(args.attributes.type, 'departing_transport')) {
          cartObject = assign({}, data.cart, { stepSixDepartingProductId: data.participant_product_id });
          dispatch( stepSixSetDepartingData(null), );
        }
        if (isEqual(args.attributes.type, 'unacompannied')) {
          cartObject = assign({}, data.cart, { stepSixUnnacompaniedProductId: data.participant_product_id });
          dispatch( stepSixSetUnnacompaniedData(null), );
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
        if (isEqual(args.attributes.type, 'arrival_transport')) {
          dispatch( stepSixSetArrivalData(null), );
        }
        if (isEqual(args.attributes.type, 'departing_transport')) {
          dispatch( stepSixSetDepartingData(null), );
        }
        if (isEqual(args.attributes.type, 'unacompannied')) {
          dispatch( stepSixSetUnnacompaniedData(null), );
        }
        dispatch( updateCart(data.cart), );
      },
      res404: () => console.log('Api.() => 404'),
      reject: console.error,
      apiCallParams: args,
    });
  }
}

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
