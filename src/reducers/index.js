// Modules
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { connectRouter } from 'connected-react-router'
// Reducers
import steps from './steps';
import weeks from './weeks';
import training from './training';
import cart from './cart';
import stepOne from './step.one';
import participant from './participant';
import stepFive from './step.five';
import stepTwo from './step.two';
import stepThree from './step.three';
import stepFour from './step.four';
import initialSettings from './initialSettings';

export default (history) => combineReducers({
  router: connectRouter(history),
  cart,
  steps,
  weeks,
  training,
  stepOne,
  stepTwo,
  stepThree,
  stepFour,
  stepFive,
  participant,
  initialSettings,
  form: formReducer,
});
