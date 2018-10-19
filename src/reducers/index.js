import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import steps from './steps';

export default combineReducers({
  steps,
  form: formReducer,
});
