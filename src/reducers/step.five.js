// Modules
import assign from 'lodash/assign';
import map from 'lodash/map';
import isEqual from 'lodash/isEqual';
import find from 'lodash/find';
// Constants
import * as stepFiveTypes from '../constants/step.five';

const initialState = {
  data: [],
  selectedGear: {},
  products: {},
  itemsPerPage: 6,
  itemsStepCounter: 6,
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case stepFiveTypes.STEP_FIVE_SET_PARTICIPANT_PRODUCT_ID: {
      const { participantProductId, productId } = payload;
      const selectedGear = assign({}, state.selectedGear);
      selectedGear[productId].participantProductId = participantProductId;
      return assign({}, state, { selectedGear });
    }

    case stepFiveTypes.GET_CATALOG_GEAR: {
      const { results } = payload;
      const products = {};
      const data = map(results, (item) => {
        const isCurrentItemSelected = state.selectedGear[item.id];
        products[item.id] = assign({}, item);
        item.selected_option_id = isCurrentItemSelected ? isCurrentItemSelected.selected_option_id : null;
        item.quantity = isCurrentItemSelected ? isCurrentItemSelected.quantity : 0;
        item.need_to_update = false;
        if (isEqual(item.attributes.length, 0)) {
          item.could_be_selected = true;
          item.selected_option_id = null;
          return item;
        }
        item.could_be_selected = false;
        return item;
      });
      return assign({}, state, { data }, { products });
    }

    case stepFiveTypes.STEP_FIVE_SET_GEAR: {
      const isGearItemSelected = state.selectedGear[payload];
      if (isGearItemSelected) {
        return state;
      }
      const gearItem = find(state.data, ['id', payload]);
      const selectedGear = assign({}, state.selectedGear);
      selectedGear[payload] = assign({}, gearItem);
      return assign({}, state, { selectedGear });
    }

    case stepFiveTypes.STEP_FIVE_INCREMENT_SELECTED_GEAR_QUANTITY: {
      const isCurrentItemSelected = state.selectedGear[payload];
      const data = map(state.data, (item) => {
        if (isEqual(item.id, payload)) {
          const quantity = item.quantity + 1
          item.quantity = quantity;
          item.need_to_update = isCurrentItemSelected ? true : false;
          if (isCurrentItemSelected) {
            isCurrentItemSelected.quantity = quantity;
          }
        }
        return item;
      });
      return assign({}, state, { data });
    }

    case stepFiveTypes.STEP_FIVE_DECREMENT_SELECTED_GEAR_QUANTITY: {
      const data = map(state.data, (item) => {
        if (isEqual(item.id, payload)) {
          const isCurrentItemSelected = state.selectedGear[payload];
          const counter = item.quantity - 1
          item.quantity = counter >= 0 ? counter : 0;
          item.need_to_update = (
            (counter >= 0) && isCurrentItemSelected
              ? true
              : false
          );
          if (isCurrentItemSelected) {
            isCurrentItemSelected.quantity = counter;
          }
        }
        return item;
      });
      return assign({}, state, { data });
    }

    case stepFiveTypes.STEP_FIVE_SET_DEFAULT_STATE: {
      return assign({}, state, initialState);
    }

    case stepFiveTypes.STEP_FIVE_SELECT_DROPDOWN_OPTION: {
      const { selectedOptionId, selectedGearId } = payload;
      const data = map(state.data, item => {
        if (isEqual(item.id, selectedGearId)) {
          const isCurrentItemSelected = state.selectedGear[selectedGearId];
          item.could_be_selected = true;
          item.need_to_update = true;
          item.selected_option_id = selectedOptionId;
          if (isCurrentItemSelected) {
            isCurrentItemSelected.selected_option_id = selectedOptionId;
          }
        }
        return item;
      });
      return assign({}, state, { data });
    }

    case stepFiveTypes.STEP_SIX_GET_CATALOG_GEAR_UPSELL_NEW: {
      return state;
    }

    case stepFiveTypes.STEP_FIVE_INCREASE_ITEMS_PER_PAGE: {
      const itemsPerPage = state.itemsStepCounter + state.itemsPerPage;
      const maxItemsCount = state.data.length;
      return assign({}, state, { itemsPerPage: (itemsPerPage <= maxItemsCount) ? itemsPerPage : maxItemsCount });
    }

    case stepFiveTypes.STEP_FIVE_REMOVE_GEAR_ITEM: {
      const selectedGear = assign({}, state.selectedGear);
      delete selectedGear[payload];
      return assign({}, state, { selectedGear });
    }

    case stepFiveTypes.STEP_FIVE_UPDATE_GEAR_ITEM: {
      const selectedGear = assign({}, state.selectedGear);
      const data = map(state.data, (item) => {
        if (isEqual(item.id, payload)) {
          item.need_to_update = false;
          selectedGear[payload] = assign(selectedGear[payload], item);
        }
        return item;
      });
      return assign({}, state, { data }, { selectedGear });
    }

    default:
      return state;
  }
}