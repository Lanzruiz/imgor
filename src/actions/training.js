// Constants
import * as trainingTypes from '../constants/training';

export function saveTrainingId(id) {
  return {
    type: trainingTypes.SAVE_TRAINING_ID,
    payload: id,
  };
};
