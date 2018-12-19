// Constants
import * as stepFiveTypes from '../constants/step.five';
import { stepsEnum } from '../constants/steps';
// Actions
import { setStepsCounter } from './steps';
// Api
import Api from '../api';

export function getCatalogGearRequest() {
  return function(dispatch) {
    Api.req({
      apiCall: Api.getCatalogGear,
      res200: (data) => {
        dispatch(getCatalogGear(data));
        if (data.results && (data.results.length === 0)) {
          dispatch(
            setStepsCounter(stepsEnum.six),
          );
        }
      },
      res404: () => console.log('Api.getCatalogGear() => 404'), // TODO: Add error handler!
      reject: err => console.log(err), // TODO: Add error handler!
    });
  };
};

function getCatalogGear(catalogGear) {
  return {
    type: stepFiveTypes.GET_CATALOG_GEAR,
    payload: catalogGear,
  };
};

export function stepFiveSetGear(gearId) {
  return {
    type: stepFiveTypes.STEP_FIVE_SET_GEAR,
    payload: gearId,
  };
};

export function stepFiveIncrementSelectedGearQuantity(selectedGearId) {
  return {
    type: stepFiveTypes.STEP_FIVE_INCREMENT_SELECTED_GEAR_QUANTITY,
    payload: selectedGearId,
  };
};

export function stepFiveDecrementSelectedGearQuantity(selectedGearId) {
  return {
    type: stepFiveTypes.STEP_FIVE_DECREMENT_SELECTED_GEAR_QUANTITY,
    payload: selectedGearId,
  };
};

export function stepFiveSetDefaultState() {
  return {
    type: stepFiveTypes.STEP_FIVE_SET_DEFAULT_STATE,
  };
};

export function stepFiveSelectDropdownItem(selectedOptionIdSelectedGearId) {
  return {
    type: stepFiveTypes.STEP_FIVE_SELECT_DROPDOWN_OPTION,
    payload: selectedOptionIdSelectedGearId,
  };
};

function getCatalogGearUpsellNew(data) {
  return {
    type: stepFiveTypes.STEP_SIX_GET_CATALOG_GEAR_UPSELL_NEW,
    payload: data,
  };
};

export function getCatalogGearUpsellNewRequest({ business_type, package_type, sport, gender, boarding, age, start_date }) {
  return function(dispatch) {
    Api.req({
      apiCall: Api.getCatalogGearUpsellNew,
      res200: data => dispatch(getCatalogGearUpsellNew(data)),
      res404: () => console.log('Api.getCatalogGearUpsellNew() => 404'),
      reject: err => console.log(err),
      apiCallParams: {
        business_type,
        package_type,
        sport,
        gender,
        boarding,
        age,
        start_date,
      },
    });
  }
};

export function stepFiveIncreaseItemsPerPage() {
  return {
    type: stepFiveTypes.STEP_FIVE_INCREASE_ITEMS_PER_PAGE,
  };
};

export function stepFiveRemoveGearItem(id) {
  return {
    type: stepFiveTypes.STEP_FIVE_REMOVE_GEAR_ITEM,
    payload: id,
  };
};

export function stepFiveUpdateGearItem(id) {
  return {
    type: stepFiveTypes.STEP_FIVE_UPDATE_GEAR_ITEM,
    payload: id,
  };
};

export function stepFiveSetParticipantProductId({ participantProductId, productId }) {
  return {
    type: stepFiveTypes.STEP_FIVE_SET_PARTICIPANT_PRODUCT_ID,
    payload: { participantProductId, productId },
  };
};

export function postCartCartIdParticipantParticipantIdProductRequest({ attributes, quantity, cartId, participantId, productId, type, product }) {
  return function(dispatch) {
    Api.postCartCartIdParticipantIdProduct({ attributes, cartId, quantity, participantId, product, productId, type })
      .then((res) => {
        if (res.status === 200) {
          const { participant_product_id } = res.data;
          dispatch(stepFiveSetGear(productId));
          dispatch(stepFiveSetParticipantProductId({ participantProductId: participant_product_id, productId }));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

export function deleteCartCartIdParticipantParticipantIdProductIdRequest({ cartId, participantId, productId, participantProductId }) {
  return function(dispatch) {
    Api.req({
      apiCall: Api.deleteCartCartIdParticipantParticipantIdProductId,
      apiCallParams: { cartId, participantId, productId: participantProductId },
      res200: () => dispatch(stepFiveRemoveGearItem(productId)),
      res404: () => console.log('Api.deleteCartCartIdParticipantParticipantIdProductId() => 404'),
      reject: console.log,
    });
  }
};

export function putCartCartIdParticipantParticipantIdProductIdRequest({ cartId, participantId, productId, participantProductId }) {
  return function(dispatch) {
    Api.req({
      apiCall: Api.putCartCartIdParticipantParticipantIdProductId,
      apiCallParams: { cartId, participantId, productId: participantProductId },
      res200: () => dispatch(stepFiveUpdateGearItem(productId)),
      res404: () => console.log('Api.putCartCartIdParticipantParticipantIdProductId() => 404'),
      reject: console.log,
    });
  }
};
