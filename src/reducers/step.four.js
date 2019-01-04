// Modules
import isEqual from 'lodash/isEqual';
import assign from 'lodash/assign';
import concat from 'lodash/concat';
// Constants
import * as stepFourTypes from '../constants/step.four';

const initialState = {
  data: [],
  week_1_data: [],
  week_2_data: [],
  week_3_data: [],
  week_4_data: [],
  week_5_data: [],
  week_6_data: [],
  week_7_data: [],
  week_8_data: [],
  week_9_data: [],
  week_10_data: [],
  week_11_data: [],
  week_12_data: [],
  secondaryProgramId: null,
};

export const emptyConcentrationId = '1337lorem';

const emptyConcentration = {
  isDummy: true,
  id: emptyConcentrationId,
  display_description: '',
  display_gender: 'All',
  display_length: '1 Week',
  display_length_program: 'Skip this week',
  display_name: 'Skip this week',
  display_package_type: 'Sport',
  display_program_type: 'Concentration',
  length_program: 'Skip this week',
  name: 'Skip this week',
  program_type: 'Concentration',
  raw_name: 'Skip this week',
  secondary_program_type: 'Skip this week',
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case stepFourTypes.STEP_FOUR_SET_DEFAULT_STATE: {
      return assign({}, state, initialState);
    }

    case stepFourTypes.STEP_FOUR_GET_CATALOG_CAMPS: {
      const { results } = payload;
      if (isEqual(state.data, results)) {
        return state;
      }
      return assign({}, state, { data: results });
    }

    case stepFourTypes.STEP_FOUR_GET_CATALOG_CAMPS_WEEK_ONE: {
      const { results } = payload;
      if (isEqual(state.week_1_data, results)) {
        return state;
      }
      const week_1_data = concat(results, emptyConcentration);
      return assign({}, state, { week_1_data });
    }

    case stepFourTypes.STEP_FOUR_GET_CATALOG_CAMPS_WEEK_TWO: {
      const { results } = payload;
      if (isEqual(state.week_2_data, results)) {
        return state;
      }
      const week_2_data = concat(results, emptyConcentration);
      return assign({}, state, { week_2_data });
    }

    case stepFourTypes.STEP_FOUR_GET_CATALOG_CAMPS_WEEK_THREE: {
      const { results } = payload;
      if (isEqual(state.week_3_data, results)) {
        return state;
      }
      const week_3_data = concat(results, emptyConcentration);
      return assign({}, state, { week_3_data });
    }

    case stepFourTypes.STEP_FOUR_GET_CATALOG_CAMPS_WEEK_FOUR: {
      const { results } = payload;
      if (isEqual(state.week_4_data, results)) {
        return state;
      }
      const week_4_data = concat(results, emptyConcentration);
      return assign({}, state, { week_4_data });
    }

    case stepFourTypes.STEP_FOUR_GET_CATALOG_CAMPS_WEEK_FIVE: {
      const { results } = payload;
      if (isEqual(state.week_5_data, results)) {
        return state;
      }
      const week_5_data = concat(results, emptyConcentration);
      return assign({}, state, { week_5_data });
    }

    case stepFourTypes.STEP_FOUR_GET_CATALOG_CAMPS_WEEK_SIX: {
      const { results } = payload;
      if (isEqual(state.week_6_data, results)) {
        return state;
      }
      const week_6_data = concat(results, emptyConcentration);
      return assign({}, state, { week_6_data });
    }

    case stepFourTypes.STEP_FOUR_GET_CATALOG_CAMPS_WEEK_SEVEN: {
      const { results } = payload;
      if (isEqual(state.week_7_data, results)) {
        return state;
      }
      const week_7_data = concat(results, emptyConcentration);
      return assign({}, state, { week_7_data });
    }

    case stepFourTypes.STEP_FOUR_GET_CATALOG_CAMPS_WEEK_EIGHT: {
      const { results } = payload;
      if (isEqual(state.week_8_data, results)) {
        return state;
      }
      const week_8_data = concat(results, emptyConcentration);
      return assign({}, state, { week_8_data });
    }

    case stepFourTypes.STEP_FOUR_GET_CATALOG_CAMPS_WEEK_NINE: {
      const { results } = payload;
      if (isEqual(state.week_9_data, results)) {
        return state;
      }
      const week_9_data = concat(results, emptyConcentration);
      return assign({}, state, { week_9_data });
    }

    case stepFourTypes.STEP_FOUR_GET_CATALOG_CAMPS_WEEK_TEN: {
      const { results } = payload;
      if (isEqual(state.week_10_data, results)) {
        return state;
      }
      const week_10_data = concat(results, emptyConcentration);
      return assign({}, state, { week_10_data });
    }

    case stepFourTypes.STEP_FOUR_GET_CATALOG_CAMPS_WEEK_ELEVEN: {
      const { results } = payload;
      if (isEqual(state.week_11_data, results)) {
        return state;
      }
      const week_11_data = concat(results, emptyConcentration);
      return assign({}, state, { week_11_data });
    }

    case stepFourTypes.STEP_FOUR_GET_CATALOG_CAMPS_WEEK_TWELVE: {
      const { results } = payload;
      if (isEqual(state.week_12_data, results)) {
        return state;
      }
      const week_12_data = concat(results, emptyConcentration);
      return assign({}, state, { week_12_data });
    }

    default:
      return state;
  }
}
