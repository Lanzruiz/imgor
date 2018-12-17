// Constants
import * as stepFiveTypes from '../constants/step.five';

const initialState = {
  data: [],
  selectedGear: {},
  itemsPerPage: 6,
  itemsStepCounter: 6,
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case stepFiveTypes.GET_CATALOG_GEAR: {
      const { results } = payload;
      return {
        ...state,
        data: results,
      };
    }

    case stepFiveTypes.STEP_FIVE_SET_GEAR: {
      const isGearItemSelected = state.selectedGear[payload];
      if (isGearItemSelected) {
        return state;
      }
      const gearItem = state.data.find(({ id }) => (id === payload));
      const selectedGear = {
        ...state.selectedGear,
        [payload]: {
          ...gearItem,
          quantity: 1,
          selected_option_id: null,
        },
      };
      return {
        ...state,
        selectedGear,
      };
    }

    case stepFiveTypes.STEP_FIVE_INCREMENT_SELECTED_GEAR_QUANTITY: {
      const selectedGear = state.selectedGear[payload];
      if (selectedGear) {
        const counter = selectedGear.quantity + 1;
        return {
          ...state,
          selectedGear: {
            ...state.selectedGear,
            [payload]: {
              ...selectedGear,
              quantity: counter,
            },
          },
        };
      }
      return state;
    }

    case stepFiveTypes.STEP_FIVE_DECREMENT_SELECTED_GEAR_QUANTITY: {
      const selectedGear = state.selectedGear[payload];
      if (selectedGear) {
        const counter = selectedGear.quantity - 1;
        if (counter <= 0) {
          const { selectedGear } = state;
          delete selectedGear[payload];
          return {
            ...state,
            selectedGear: {
              ...selectedGear,
            },
          };
        }
        return {
          ...state,
          selectedGear: {
            ...state.selectedGear,
            [payload]: {
              ...selectedGear,
              quantity: counter,
            },
          },
        };
      }
      return state;
    }

    case stepFiveTypes.STEP_FIVE_SET_DEFAULT_STATE: {
      return {
        ...state,
        ...initialState,
      };
    }

    case stepFiveTypes.STEP_FIVE_SELECT_DROPDOWN_OPTION: {
      const { selectedOptionId, selectedGearId } = payload;
      const selectedGear = state.selectedGear[selectedGearId];
      if (selectedGear) {
        if (selectedGear.selected_option_id === selectedOptionId) {
          return state;
        }
        selectedGear.selected_option_id = selectedOptionId;
        return {
          ...state,
          selectedGear: {
            ...state.selectedGear,
            [selectedGearId]: {
              ...selectedGear,
            },
          },
        };
      }
      const gearItem = state.data.find(({ id }) => (id === selectedGearId));
      if (gearItem) {
        const selectedGear = {
          ...state.selectedGear,
          [selectedGearId]: {
            ...gearItem,
            quantity: 1,
            selected_option_id: selectedOptionId,
          },
        };
        return {
          ...state,
          selectedGear,
        };
      }
      return state;
    }

    case stepFiveTypes.STEP_SIX_GET_CATALOG_GEAR_UPSELL_NEW: {
      return state;
    }

    case stepFiveTypes.STEP_FIVE_INCREASE_ITEMS_PER_PAGE: {
      const itemsPerPage = state.itemsStepCounter + state.itemsPerPage;
      const maxItemsCount = state.data.length;
      return {
        ...state,
        itemsPerPage: itemsPerPage <= maxItemsCount ? itemsPerPage : maxItemsCount,
      };
    }

    default:
      return state;
  }
}