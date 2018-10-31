// Modules
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
// Reducers
import steps from './steps';
import weeks from './weeks';
import training from './training';
import cart from './cart';

export default combineReducers({
  cart,
  steps,
  weeks,
  training,
  form: formReducer,
});
