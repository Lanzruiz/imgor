// Constants
import * as stepOneTypes from '../constants/step.one';
// Api
import Api from '../api';
// Actions
import { addParticipant } from './participant';
import { incrementStepsCounter } from './steps';

export function getCatalogCampsGroup({ sport }) {
  return function(dispatch) {
    Api.req({
      apiCall: Api.getCatalogCampsGroup,
      res200: data => dispatch(stepOneGetCatalogGroup(data)),
      res404: () => console.log('Api.getCatalogCampsGroup() => Error 404'), // TODO: Add error handler
      reject: err => console.log(err), // TODO: Add error handler
      apiCallParams: {
        sport,
      },
    });
  };
};

export function stepOnePutCartCartIdParticipantParticipantIdRequest({ cartId, participantId, gender, age }) {
  return function(dispatch) {
    Api.req({
      apiCall: Api.putCartCartIdParticipantParticipantId,
      res200: (data) => {
        console.log(data);
        dispatch(addParticipant(data));
        dispatch(incrementStepsCounter());
      },
      res404: () => console.log('Api.putCartCartIdParticipantParticipantId() => Error 404'), // TODO: Add error handler
      reject: err => console.log(err), // TODO: Add error handler
      apiCallParams: {
        cartId,
        participantId,
        gender,
        age,
      },
    });
  }
}

function stepOneGetCatalogGroup(group) {
  return {
    type: stepOneTypes.STEP_ONE_GET_CATALOG_GROUP,
    payload: group,
  };
}

export function selectGroup(group) {
  return {
    type: stepOneTypes.STEP_ONE_SELECT_GROUP,
    payload: group,
  };
}

export function setTabIndex(tabIndex) {
  return {
    type: stepOneTypes.STEP_ONE_SET_TAB_INDEX,
    payload: tabIndex,
  };
}

export function stepOneSetPrice(price) {
  return {
    type: stepOneTypes.STEP_ONE_SET_PRICE,
    payload: price,
  }
}
