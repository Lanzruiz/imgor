// Constants
import * as participantTypes from '../constants/participant';
// Api
import Api from '../api';

export const addParticipantByCardId = ({ cartId, email }) => (dispatch) => {
  Api.req({
    apiCall: () => Api.postCartCartIdParticipant({ cartId, email }),
    res200: data => dispatch(addParticipant(data)),
    res404: () => dispatch(),
    reject: err => dispatch(err),
  });
};

function addParticipant(participant) {
  return {
    type: participantTypes.ADD_PARTICIPANT,
    payload: participant,
  };
}
