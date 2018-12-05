// Constants
import * as participantTypes from '../constants/participant';

const initialState = {
  id: null,
  created: null,
  updated: null,
  first_name: null,
  last_name: null,
  email: null,
  phone: null,
  medical_waiver: null,
  preferred_shirt_size: null,
  preferred_short_size: null,
  dob: null,
  gender: null,
  position: null,
  price_total: null,
  age: null,
  products: [],
  quantity: 0
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case participantTypes.ADD_PARTICIPANT: {
      const { participant_id, cart: { participants = [] } } = payload;
      const participant = participants.find(({ id }) => id === participant_id);
      return {
        ...state,
        ...participant,
      };
    }
    default:
      return state;
  }
}