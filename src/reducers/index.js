import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import steps from './steps';
import weeks from './weeks';
import training from './training';

export default combineReducers({
  steps,
  weeks,
  training,
  form: formReducer,
});
