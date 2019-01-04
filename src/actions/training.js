// Constants
import * as trainingTypes from '../constants/training';
// Api
import Api from '../api';

export function saveTrainingId(id) {
  return {
    type: trainingTypes.SAVE_TRAINING_ID,
    payload: id,
  };
};

function getCatalogCampCampId(data) {
  return {
    type: trainingTypes.GET_CATALOG_CAMP_CAMP_ID,
    payload: data,
  };
};

export function getCatalogCampCampIdRequest(selectedCampId) {
  return function(dispatch) {
    Api.req({
      apiCall: Api.getCatalogCampCampId,
      res200: data => dispatch(getCatalogCampCampId(data)),
      res404: console.log,
      reject: console.log,
      apiCallParams: selectedCampId,
    });
  }
};

export function setDefaultState() {
  return {
    type: trainingTypes.TRAINING_SET_DEFAULT_STATE,
  };
}

export function setSecondaryProgramId(secondaryProgramId) {
  return {
    type: trainingTypes.SET_SECONDARY_PROGRAM_ID,
    payload: secondaryProgramId,
  };
}
