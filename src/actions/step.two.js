// Constants
import * as stepTwoTypes from '../constants/step.two';
// Api
import Api from '../api';

export function getCatalogCampsCalendarRequest({ package_type, sport, length_program }) {
  return function(dispatch) {
    Api.req({
      apiCall: () => Api.getCatalogCampsCalendar({ package_type, sport, length_program }),
      res200: data => dispatch(getCatalogCampsCalendar(data)),
      res404: () => console.log('Api.getCatalogCampsCalendar() => 404'), // TODO: Add error handler!
      reject: err => console.log(err), // TODO: Add error handler!
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
