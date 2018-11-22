// Constants
import * as stepTwoTypes from '../constants/step.two';
// Api
import Api from '../api';

export function getCatalogCampsCalendarRequest(args) {
  return function(dispatch) {
    Api.req({
      apiCall: Api.getCatalogCampsCalendar,
      res200: data => dispatch(getCatalogCampsCalendar(data)),
      res404: () => console.log('Api.getCatalogCampsCalendar() => 404'), // TODO: Add error handler!
      reject: err => console.log(err), // TODO: Add error handler!
      apiCallParams: {
        age: args.age,
        boarding: args.boarding,
        business_type: args.business_type,
        gender: args.gender,
        package_type: args.package_type,
        sport: args.sport,
        group: args.group,
        secondary_group: args.secondary_group,
        length: args.length,
      },
    });
  };
}

function getCatalogCampsCalendar(data) {
  return {
    type: stepTwoTypes.GET_CATALOG_CAMPS_CALENDAR,
    payload: data,
  };
}

export function selectDate(date) {
  return {
    type: stepTwoTypes.STEP_TWO_SELECT_DATE,
    payload: date,
  };
}

function getCatalogCampsHistogram(data) {
  return {
    type: stepTwoTypes.STEP_TWO_GET_CATALOG_CAMPS_HISTOGRAM,
    payload: data,
  };
}

export function getCatalogCampsHistogramRequest({ sport, gender, boarding, days, age }) {
  return function(dispatch) {
    Api.req({
      apiCall: Api.getCatalogCampsHistogram,
      res200: data => dispatch(getCatalogCampsHistogram(data)),
      res404: () => console.log('Api.getCatalogCampsHistogram() => 404'), // TODO: Add error handler!
      reject: err => console.log(err), // TODO: Add error handler!
      apiCallParams: {
        sport,
        gender,
        boarding,
        days,
        age,
      },
    });
  }
}

export function stepTwoSetDefaultState() {
  return {
    type: stepTwoTypes.STEP_TWO_SET_DEFAULT_STATE,
  };
}
