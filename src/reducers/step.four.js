// Modules
import isEqual from 'lodash/isEqual';
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

const emptyConcentration = {
  isDummy: true,
  id: '1337lorem',
  display_description: '',
  display_gender: 'All',
  display_length: '1 Week',
  display_length_program: 'No Daily Sesssion',
  display_name: 'No Daily Sesssion',
  display_package_type: 'Sport',
  display_program_type: 'Concentration',
  length_program: 'No Daily Sesssion',
  name: 'No Daily Sesssion',
  program_type: 'Concentration',
  raw_name: 'No Daily Sesssion',
  secondary_program_type: 'No Daily Sesssion',
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case stepFourTypes.STEP_FOUR_SET_DEFAULT_STATE: {
      return {
        ...state,
        ...initialState,
      };
    }
    case stepFourTypes.STEP_FOUR_GET_CATALOG_CAMPS: {
      const { results } = payload;
      if (isEqual({ data: state.data }, { data: results })) {
        return state;
      }
      return {
        ...state,
        data: results,
      };
    }

    case stepFourTypes.STEP_FOUR_GET_CATALOG_CAMPS_WEEK_ONE: {
      const { results } = payload;
      if (isEqual({ data: state.week_1_data }, { data: results })) {
        return state;
      }
      return {
        ...state,
        week_1_data: [...results, emptyConcentration],
      };
    }

    case stepFourTypes.STEP_FOUR_GET_CATALOG_CAMPS_WEEK_TWO: {
      const { results } = payload;
      if (isEqual({ data: state.week_2_data }, { data: results })) {
        return state;
      }
      return {
        ...state,
        week_2_data: [...results, emptyConcentration],
      };
    }

    case stepFourTypes.STEP_FOUR_GET_CATALOG_CAMPS_WEEK_THREE: {
      const { results } = payload;
      if (isEqual({ data: state.week_3_data }, { data: results })) {
        return state;
      }
      return {
        ...state,
        week_3_data: [...results, emptyConcentration],
      };
    }

    case stepFourTypes.STEP_FOUR_GET_CATALOG_CAMPS_WEEK_FOUR: {
      const { results } = payload;
      if (isEqual({ data: state.week_4_data }, { data: results })) {
        return state;
      }
      return {
        ...state,
        week_4_data: [...results, emptyConcentration],
      };
    }

    case stepFourTypes.STEP_FOUR_GET_CATALOG_CAMPS_WEEK_FIVE: {
      const { results } = payload;
      if (isEqual({ data: state.week_5_data }, { data: results })) {
        return state;
      }
      return {
        ...state,
        week_5_data: [...results, emptyConcentration],
      };
    }

    case stepFourTypes.STEP_FOUR_GET_CATALOG_CAMPS_WEEK_SIX: {
      const { results } = payload;
      if (isEqual({ data: state.week_6_data }, { data: results })) {
        return state;
      }
      return {
        ...state,
        week_6_data: [...results, emptyConcentration],
      };
    }

    case stepFourTypes.STEP_FOUR_GET_CATALOG_CAMPS_WEEK_SEVEN: {
      const { results } = payload;
      if (isEqual({ data: state.week_7_data }, { data: results })) {
        return state;
      }
      return {
        ...state,
        week_7_data: [...results, emptyConcentration],
      };
    }

    case stepFourTypes.STEP_FOUR_GET_CATALOG_CAMPS_WEEK_EIGHT: {
      const { results } = payload;
      if (isEqual({ data: state.week_8_data }, { data: results })) {
        return state;
      }
      return {
        ...state,
        week_8_data: [...results, emptyConcentration],
      };
    }

    case stepFourTypes.STEP_FOUR_GET_CATALOG_CAMPS_WEEK_NINE: {
      const { results } = payload;
      if (isEqual({ data: state.week_9_data }, { data: results })) {
        return state;
      }
      return {
        ...state,
        week_9_data: [...results, emptyConcentration],
      };
    }

    case stepFourTypes.STEP_FOUR_GET_CATALOG_CAMPS_WEEK_TEN: {
      const { results } = payload;
      if (isEqual({ data: state.week_10_data }, { data: results })) {
        return state;
      }
      return {
        ...state,
        week_10_data: [...results, emptyConcentration],
      };
    }

    case stepFourTypes.STEP_FOUR_GET_CATALOG_CAMPS_WEEK_ELEVEN: {
      const { results } = payload;
      if (isEqual({ data: state.week_11_data }, { data: results })) {
        return state;
      }
      return {
        ...state,
        week_11_data: [...results, emptyConcentration],
      };
    }

    case stepFourTypes.STEP_FOUR_GET_CATALOG_CAMPS_WEEK_TWELVE: {
      const { results } = payload;
      if (isEqual({ data: state.week_12_data }, { data: results })) {
        return state;
      }
      return {
        ...state,
        week_12_data: [...results, emptyConcentration],
      };
    }

    case stepFourTypes.STEP_FOUR_SET_SECONDARY_PROGRAM_ID: {
      if (state.secondaryProgramId === payload) {
        return state;
      }
      return {
        ...state,
        secondaryProgramId: payload,
      };
    }

    default:
      return state;
  }
}
