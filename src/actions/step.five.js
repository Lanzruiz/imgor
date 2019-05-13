// Constants
import * as stepFiveTypes from '../constants/step.five';
import { stepsEnum } from '../constants/steps';
// Actions
import { setStepsCounter } from './steps';
import { updateCart } from './cart';
// Api
import Api from '../api';

export function getCatalogGearRequest({ gender, age }) {
  return function(dispatch) {
    Api.req({
      apiCall: Api.getCatalogGear,
      apiCallParams: { gender, age },
      res200: (data) => {
        dispatch( getCatalogGear(data), );
        if (data.results && (data.results.length === 0)) {
          dispatch( setStepsCounter(stepsEnum.six), );
        }
      },
      res404: () => console.log('Api.getCatalogGear() => 404'), // TODO: Add error handler!
      reject: console.error,
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

export function getCatalogGearUpsellNewRequest({ business_type, package_type, sport, gender, boarding, age, start_date, end_date }) {
  return function(dispatch) {
    Api.req({
      apiCall: Api.getCatalogGearUpsellNew,
      res200: data => {
        return dispatch(getCatalogGearUpsellNew(data),);
      },
      res404: () => console.log('Api.getCatalogGearUpsellNew() => 404'),
      reject: console.error,
      apiCallParams: {
        business_type,
        package_type,
        sport,
        gender,
        boarding,
        age,
        start_date,
        end_date,
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
  return async function(dispatch) {
    Api.req({
      apiCall: Api.postCartCartIdParticipantIdProduct,
      apiCallParams: { attributes, cartId, quantity, participantId, product, productId, type },
      res200: (data) => {
        const { participant_product_id, cart } = data;
        dispatch( updateCart(cart), );
        dispatch( stepFiveSetGear(productId), );
        dispatch( stepFiveSetParticipantProductId({ participantProductId: participant_product_id, productId }), );
        return Promise.resolve();
      },
      res404: () => console.log('Api.postCartCartIdParticipantIdProduct() => 404'),
      reject: console.error,
    });
  }
};

export function deleteCartCartIdParticipantParticipantIdProductIdRequest({ cartId, participantId, productId, participantProductId }) {
  return function(dispatch) {
    Api.req({
      apiCall: Api.deleteCartCartIdParticipantParticipantIdProductId,
      apiCallParams: { cartId, participantId, productId: participantProductId },
      res200: (data) => {
        dispatch( updateCart(data.cart), );
        dispatch( stepFiveRemoveGearItem(productId), );
      },
      res404: () => console.log('Api.deleteCartCartIdParticipantParticipantIdProductId() => 404'),
      reject: console.error,
    });
  }
};

export function putCartCartIdParticipantParticipantIdProductIdRequest({ cartId, participantId, productId, participantProductId }) {
  return async function(dispatch) {
    Api.req({
      apiCall: Api.putCartCartIdParticipantParticipantIdProductId,
      apiCallParams: { cartId, participantId, productId: participantProductId },
      res200: (data) => {
        dispatch( updateCart(data.cart), );
        dispatch( stepFiveUpdateGearItem(productId), );
        
        return Promise.resolve();
      },
      res404: () => console.log('Api.putCartCartIdParticipantParticipantIdProductId() => 404'),
      reject: console.error,
    });
  }
};

export function stepFiveSetUpsellGearItemDate({ cardId, dateId }) {
  return {
    type: stepFiveTypes.STEP_FIVE_SET_UPSELL_GEAR_ITEM_DATE,
    payload: { cardId, dateId },
  };
};

export function stepFiveSetUpsellGearItem(id) {
  return {
    type: stepFiveTypes.STEP_FIVE_SET_UPSELL_GEAR_ITEM,
    payload: id,
  };
};

export function stepFiveUpdateUpsellGearItem({ cardId }) {
  return {
    type: stepFiveTypes.STEP_FIVE_UPDATE_UPSELL_GEAR_ITEM,
    payload: { cardId },
  };
}

export function stepFiveIncreaseUpsellItemsPerPage() {
  return {
    type: stepFiveTypes.STEP_FIVE_INCREASE_UPSELL_ITEMS_PER_PAGE,
  };
}

export function stepFiveSetUpsellGearItemRequest({ cartId, participantId, product, quantity, productId, type, cardId }) {
  return async function(dispatch) {
    Api.req({
      apiCall: Api.postCartCartIdParticipantIdProduct,
      apiCallParams: { cartId, participantId, product, quantity, productId, type },
      res200: (data) => {
        dispatch( updateCart(data.cart), );
        dispatch( stepFiveSetUpsellGearItem({ cardId, productId: data.participant_product_id }) );
        return Promise.resolve();
      },
      res404: console.log,
      reject: console.error,
    });
  }
};

export function stepFiveUpdateUpsellGearItemRequest({ cartId, participantId, productId, product, type, cardId }) {
  return async function(dispatch) {
    Api.req({
      apiCall: Api.putCartCartIdParticipantParticipantIdProductId,
      apiCallParams: { cartId, participantId, productId, product, type },
      res200: (data) => {
        dispatch( updateCart(data.cart), );
        dispatch( stepFiveUpdateUpsellGearItem({ cardId }) );
        return Promise.resolve();
      },
      res404: console.log,
      reject: console.error,
    });
  }
};

export function deleteUpsellGearItem({ cardId }) {
  return {
    type: stepFiveTypes.STEP_FIVE_DELETE_UPSELL_GEAR_ITEM,
    payload: { cardId },
  };
}

export function stepFiveDeleteUpsellGearItemRequest({ cartId, participantId, productId, cardId }) {
  return function(dispatch) {
    Api.req({
      apiCall: Api.deleteCartCartIdParticipantParticipantIdProductId,
      apiCallParams: { cartId, participantId, productId },
      res200: (data) => {
        dispatch( updateCart(data.cart), );
        dispatch( deleteUpsellGearItem({ cardId }), );
      },
      res404: console.log,
      reject: console.error,
    });
  }
};

function stepFiveGetCatalogExcursionsNew(data) {
  return {
    type: stepFiveTypes.STEP_FIVE_GET_CATALOG_EXCURSIONS_NEW,
    payload: data,
  };
};

export function stepFiveGetCatalogExcursionsNewRequest({ startDate, endDate }) {
  return function(dispatch) {
    Api.req({
      apiCall: Api.getCatalogExcursionsNew,
      apiCallParams: { startDate, endDate },
      res200: data => {
        return dispatch(stepFiveGetCatalogExcursionsNew(data),);
      },
      res404: console.log,
      reject: console.error,
    });
  }
};

export function setExcursionGearItemDate({ dateId, cardId }) {
  return {
    type: stepFiveTypes.STEP_FIVE_SET_EXCURSION_GEAR_ITEM_DATE,
    payload: { dateId, cardId },
  };
};

export function selectExcursionGearItem({ productId, cardId }) {
  return {
    type: stepFiveTypes.STEP_FIVE_SELECT_EXCURSION_GEAR_ITEM,
    payload: { productId, cardId },
  };
};

export function updateExcursionGearItem({ cardId }) {
  return {
    type: stepFiveTypes.STEP_FIVE_UPDATE_EXCURSION_GEAR_ITEM,
    payload: { cardId },
  };
};

export function deleteExcursionGearItem({ cardId }) {
  return {
    type: stepFiveTypes.STEP_FIVE_DELETE_EXCURSION_GEAR_ITEM,
    payload: { cardId },
  };
};

export function stepFiveSetExcursionGearItemRequest({ cartId, participantId, product, quantity, productId, type, cardId }) {
  return async function(dispatch) {
    Api.req({
      apiCall: Api.postCartCartIdParticipantIdProduct,
      apiCallParams: { cartId, participantId, product, quantity, productId, type },
      res200: (data) => {
        dispatch( updateCart(data.cart), );
        dispatch( selectExcursionGearItem({ cardId, productId: data.participant_product_id }) );
        return Promise.resolve();
      },
      res404: console.log,
      reject: console.error,
    });
  }
};

export function stepFiveUpdateExcursionGearItemRequest({ cartId, participantId, productId, product, type, cardId }) {
  return async function(dispatch) {
    Api.req({
      apiCall: Api.putCartCartIdParticipantParticipantIdProductId,
      apiCallParams: { cartId, participantId, productId, product, type },
      res200: (data) => {
        dispatch( updateCart(data.cart), );
        dispatch( updateExcursionGearItem({ cardId }) );
        return Promise.resolve();
      },
      res404: console.log,
      reject: console.error,
    });
  }
};

export function stepFiveDeleteExcursionGearItemRequest({ cartId, participantId, productId, cardId }) {
  return async function(dispatch) {
    Api.req({
      apiCall: Api.deleteCartCartIdParticipantParticipantIdProductId,
      apiCallParams: { cartId, participantId, productId },
      res200: (data) => {
        dispatch( updateCart(data.cart), );
        dispatch( deleteExcursionGearItem({ cardId }), );
        return Promise.resolve();
      },
      res404: console.log,
      reject: console.error,
    });
  }
};

export function stepFiveIncreaseExcursionsItemsPerPage() {
  return {
    type: stepFiveTypes.STEP_FIVE_INCREASE_EXCURSION_ITEMS_PER_PAGE,
  };
};
