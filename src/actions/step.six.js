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
