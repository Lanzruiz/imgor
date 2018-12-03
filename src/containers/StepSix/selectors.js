// Modules
import { createSelector } from 'reselect';
import { formValueSelector } from 'redux-form';

const selector = formValueSelector('wizard');

export function transportationSelector(state) {
  return selector(state, 'transportation');
}

export function airportPickupSelector(state) {
  return selector(state, 'airport_pickup');
}
