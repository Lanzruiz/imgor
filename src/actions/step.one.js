// Constants
import * as stepOneTypes from '../constants/step.one';
import { stepsEnum } from '../constants/steps';
// Api
import Api from '../api';
// Actions
import { addParticipant } from './participant';
import { setStepsCounter } from './steps';

export function getCatalogCampsGroup({ sport, gender, group, businessType, secondaryGroup }) {
  return function(dispatch) {
    Api.req({
      apiCall: Api.getCatalogCampsGroup,
      res200: data => {
        const { results } = data;
        
        if(results.length === 1 && (results[0].options || []).length < 2) {
          dispatch(selectGroup({
            group: results[ 0 ].name,
            secondary_group: (results[ 0 ].options[ 0 ] || {}).name || null
          }));
          dispatch(stepOneSetPrice(results[ 0 ].price));
          dispatch(setTabIndex(1));
        }
        
        dispatch( stepOneGetCatalogGroup(data) )
      },
      res404: () => console.log('Api.getCatalogCampsGroup() => Error 404'), // TODO: Add error handler
      reject: err => console.error,
      apiCallParams: {
        sport,
        gender,
        group,
        businessType,
        secondaryGroup,
      },
    });
  };
};

export function stepOnePutCartCartIdParticipantParticipantIdRequest({ cartId, participantId, gender, age }) {
  return function(dispatch) {
    Api.req({
      apiCall: Api.putCartCartIdParticipantParticipantId,
      res200: (data) => {
        dispatch( addParticipant(data), );
        dispatch( setStepsCounter(stepsEnum.two), );
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

export function stepOneSetCampLength(length) {
  return {
    type: stepOneTypes.STEP_ONE_SET_CAMP_LENGTH,
    payload: length,
  };
}
