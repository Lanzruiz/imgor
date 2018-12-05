// Constants
import * as participantTypes from '../constants/participant';
// Api
import Api from '../api';

export function addParticipantByCardId({ cartId, email }) {
  return function(dispatch) {
    Api.req({
      apiCall: Api.postCartCartIdParticipant,
      res200: data => dispatch(addParticipant(data)),
      res404: () => console.log('Api.postCartCartIdParticipant({ cartId, email }) => 404'), // TODO: Add error handler!
      reject: err => console.log(err), // TODO: Add error handler!
      apiCallParams: {
        cartId,
        email,
      },
    });
  };
};

export function addParticipant(participant) {
  return {
    type: participantTypes.ADD_PARTICIPANT,
    payload: participant,
  };
}
