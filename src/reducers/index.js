import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import steps from './steps';
import weeks from './weeks';

export default combineReducers({
  steps,
  weeks,
  form: formReducer,
});
