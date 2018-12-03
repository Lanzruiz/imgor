// Constants
import * as stepFourTypes from '../constants/step.four';
// Api
import Api from '../api';

function getCatalogCamps(data) {
  return {
    type: stepFourTypes.STEP_FOUR_GET_CATALOG_CAMPS,
    payload: data,
  };
}

function getCatalogCampsWeekOne(data) {
  return {
    type: stepFourTypes.STEP_FOUR_GET_CATALOG_CAMPS_WEEK_ONE,
    payload: data,
  };
}

function getCatalogCampsWeekTwo(data) {
  return {
    type: stepFourTypes.STEP_FOUR_GET_CATALOG_CAMPS_WEEK_TWO,
    payload: data,
  };
}

function getCatalogCampsWeekThree(data) {
  return {
    type: stepFourTypes.STEP_FOUR_GET_CATALOG_CAMPS_WEEK_THREE,
    payload: data,
  };
}

function getCatalogCampsWeekFour(data) {
  return {
    type: stepFourTypes.STEP_FOUR_GET_CATALOG_CAMPS_WEEK_FOUR,
    payload: data,
  };
}

function getCatalogCampsWeekFive(data) {
  return {
    type: stepFourTypes.STEP_FOUR_GET_CATALOG_CAMPS_WEEK_FIVE,
    payload: data,
  };
}

function getCatalogCampsWeekSix(data) {
  return {
    type: stepFourTypes.STEP_FOUR_GET_CATALOG_CAMPS_WEEK_SIX,
    payload: data,
  };
}

function getCatalogCampsWeekSeven(data) {
  return {
    type: stepFourTypes.STEP_FOUR_GET_CATALOG_CAMPS_WEEK_SEVEN,
    payload: data,
  };
}

function getCatalogCampsWeekEight(data) {
  return {
    type: stepFourTypes.STEP_FOUR_GET_CATALOG_CAMPS_WEEK_EIGHT,
    payload: data,
  };
}

function getCatalogCampsWeekNine(data) {
  return {
    type: stepFourTypes.STEP_FOUR_GET_CATALOG_CAMPS_WEEK_NINE,
    payload: data,
  };
}

function getCatalogCampsWeekTen(data) {
  return {
    type: stepFourTypes.STEP_FOUR_GET_CATALOG_CAMPS_WEEK_TEN,
    payload: data,
  };
}

function getCatalogCampsWeekEleven(data) {
  return {
    type: stepFourTypes.STEP_FOUR_GET_CATALOG_CAMPS_WEEK_ELEVEN,
    payload: data,
  };
}

function getCatalogCampsWeekTwelve(data) {
  return {
    type: stepFourTypes.STEP_FOUR_GET_CATALOG_CAMPS_WEEK_TWELVE,
    payload: data,
  };
}

export function getCatalogCampRequest({ business_type, program_type, sport, age, gender, start_date, end_date }) {
  return function (dispatch) {
    Api.req({
      apiCall: Api.getCatalogCamps,
      res200: (data) => dispatch(getCatalogCamps(data)),
      res404: () => console.log('Api.getCatalogCamps() => 404'),
      reject: err => console.log(err),
      apiCallParams: {
        business_type,
        program_type,
        sport,
        age,
        gender,
        start_date,
        end_date,
      },
    });
  }
}

export function getCatalogCampWeekOneRequest({ business_type, program_type, sport, age, gender, start_date, end_date }) {
  return function (dispatch) {
    Api.req({
      apiCall: Api.getCatalogCamps,
      res200: (data) => dispatch(getCatalogCampsWeekOne(data)),
      res404: () => console.log('Api.getCatalogCamps() => 404'),
      reject: err => console.log(err),
      apiCallParams: {
        business_type,
        program_type,
        sport,
        age,
        gender,
        start_date,
        end_date,
      },
    });
  }
}

export function getCatalogCampWeekTwoRequest({ business_type, program_type, sport, age, gender, start_date, end_date }) {
  return function (dispatch) {
    Api.req({
      apiCall: Api.getCatalogCamps,
      res200: (data) => dispatch(getCatalogCampsWeekTwo(data)),
      res404: () => console.log('Api.getCatalogCamps() => 404'),
      reject: err => console.log(err),
      apiCallParams: {
        business_type,
        program_type,
        sport,
        age,
        gender,
        start_date,
        end_date,
      },
    });
  }
}

export function getCatalogCampWeekThreeRequest({ business_type, program_type, sport, age, gender, start_date, end_date }) {
  return function (dispatch) {
    Api.req({
      apiCall: Api.getCatalogCamps,
      res200: (data) => dispatch(getCatalogCampsWeekThree(data)),
      res404: () => console.log('Api.getCatalogCamps() => 404'),
      reject: err => console.log(err),
      apiCallParams: {
        business_type,
        program_type,
        sport,
        age,
        gender,
        start_date,
        end_date,
      },
    });
  }
}

export function getCatalogCampWeekFourRequest({ business_type, program_type, sport, age, gender, start_date, end_date }) {
  return function (dispatch) {
    Api.req({
      apiCall: Api.getCatalogCamps,
      res200: (data) => dispatch(getCatalogCampsWeekFour(data)),
      res404: () => console.log('Api.getCatalogCamps() => 404'),
      reject: err => console.log(err),
      apiCallParams: {
        business_type,
        program_type,
        sport,
        age,
        gender,
        start_date,
        end_date,
      },
    });
  }
}

export function getCatalogCampWeekFiveRequest({ business_type, program_type, sport, age, gender, start_date, end_date }) {
  return function (dispatch) {
    Api.req({
      apiCall: Api.getCatalogCamps,
      res200: (data) => dispatch(getCatalogCampsWeekFive(data)),
      res404: () => console.log('Api.getCatalogCamps() => 404'),
      reject: err => console.log(err),
      apiCallParams: {
        business_type,
        program_type,
        sport,
        age,
        gender,
        start_date,
        end_date,
      },
    });
  }
}

export function getCatalogCampWeekSixRequest({ business_type, program_type, sport, age, gender, start_date, end_date }) {
  return function (dispatch) {
    Api.req({
      apiCall: Api.getCatalogCamps,
      res200: (data) => dispatch(getCatalogCampsWeekSix(data)),
      res404: () => console.log('Api.getCatalogCamps() => 404'),
      reject: err => console.log(err),
      apiCallParams: {
        business_type,
        program_type,
        sport,
        age,
        gender,
        start_date,
        end_date,
      },
    });
  }
}

export function getCatalogCampWeekSevenRequest({ business_type, program_type, sport, age, gender, start_date, end_date }) {
  return function (dispatch) {
    Api.req({
      apiCall: Api.getCatalogCamps,
      res200: (data) => dispatch(getCatalogCampsWeekSeven(data)),
      res404: () => console.log('Api.getCatalogCamps() => 404'),
      reject: err => console.log(err),
      apiCallParams: {
        business_type,
        program_type,
        sport,
        age,
        gender,
        start_date,
        end_date,
      },
    });
  }
}

export function getCatalogCampWeekEightRequest({ business_type, program_type, sport, age, gender, start_date, end_date }) {
  return function (dispatch) {
    Api.req({
      apiCall: Api.getCatalogCamps,
      res200: (data) => dispatch(getCatalogCampsWeekEight(data)),
      res404: () => console.log('Api.getCatalogCamps() => 404'),
      reject: err => console.log(err),
      apiCallParams: {
        business_type,
        program_type,
        sport,
        age,
        gender,
        start_date,
        end_date,
      },
    });
  }
}

export function getCatalogCampWeekNineRequest({ business_type, program_type, sport, age, gender, start_date, end_date }) {
  return function (dispatch) {
    Api.req({
      apiCall: Api.getCatalogCamps,
      res200: (data) => dispatch(getCatalogCampsWeekNine(data)),
      res404: () => console.log('Api.getCatalogCamps() => 404'),
      reject: err => console.log(err),
      apiCallParams: {
        business_type,
        program_type,
        sport,
        age,
        gender,
        start_date,
        end_date,
      },
    });
  }
}

export function getCatalogCampWeekTenRequest({ business_type, program_type, sport, age, gender, start_date, end_date }) {
  return function (dispatch) {
    Api.req({
      apiCall: Api.getCatalogCamps,
      res200: (data) => dispatch(getCatalogCampsWeekTen(data)),
      res404: () => console.log('Api.getCatalogCamps() => 404'),
      reject: err => console.log(err),
      apiCallParams: {
        business_type,
        program_type,
        sport,
        age,
        gender,
        start_date,
        end_date,
      },
    });
  }
}

export function getCatalogCampWeekElevenRequest({ business_type, program_type, sport, age, gender, start_date, end_date }) {
  return function (dispatch) {
    Api.req({
      apiCall: Api.getCatalogCamps,
      res200: (data) => dispatch(getCatalogCampsWeekEleven(data)),
      res404: () => console.log('Api.getCatalogCamps() => 404'),
      reject: err => console.log(err),
      apiCallParams: {
        business_type,
        program_type,
        sport,
        age,
        gender,
        start_date,
        end_date,
      },
    });
  }
}

export function getCatalogCampWeekTwelveRequest({ business_type, program_type, sport, age, gender, start_date, end_date }) {
  return function (dispatch) {
    Api.req({
      apiCall: Api.getCatalogCamps,
      res200: (data) => dispatch(getCatalogCampsWeekTwelve(data)),
      res404: () => console.log('Api.getCatalogCamps() => 404'),
      reject: err => console.log(err),
      apiCallParams: {
        business_type,
        program_type,
        sport,
        age,
        gender,
        start_date,
        end_date,
      },
    });
  }
}

export function stepFourSetDefaultState() {
  return {
    type: stepFourTypes.STEP_FOUR_SET_DEFAULT_STATE,
  };
}
