// Modules
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
// Reducers
import steps from './steps';
import weeks from './weeks';
import training from './training';
import cart from './cart';
import stepOne from './step.one';
import participant from './participant';
import stepFive from './step.five';

export default combineReducers({
  cart,
  steps,
  weeks,
  training,
  stepOne,
  stepFive,
  participant,
  form: formReducer,
});
