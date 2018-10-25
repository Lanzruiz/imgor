// Constants
import * as trainingTypes from '../constants/training';

export const saveTrainingId = (id) => ({
  type: trainingTypes.SAVE_TRAINING_ID,
  payload: id,
});
