// Modules
import { createSelector } from 'reselect';
import { formValueSelector } from 'redux-form';
// Helpers
import stringToNumber from '../../helpers/stringToNumber';
// Constants
export const stepSixFormFieldNames = {
  airportPickup: 'airport_pickup',
  transport: 'transport',
  transportation: 'transportation',
  unaccompanied: 'unaccompanied',
  dropoff: 'dropoff',
  dropoffOtherLocation: 'dropoff_other_location',
  pickUpOtherLocation: 'pick_up_other_location',
  departing: 'departing',
  departingTransport: 'departing_transport',
  departingFlightNumber: 'departing_flight_number',
  arrivalFlightNumber: 'arrival_flight_number',
  departingDateTime: 'departing_date_time',
  arrivalDateTime: 'arrival_date_time',
};

export const airportPickupInformation = {
  both: 'both',
  arrival: 'arrival',
  departing: 'departing',
};

export const departingFormFieldNames = {
  imgaCampusCenter: 'imga campus center',
  imgaClubPouse: 'imga сlub рouse',
  other: 'other',
};

const selector = formValueSelector('wizard');

export function stepSixDepartingDateTimeSelector(state) {
  return selector(state, stepSixFormFieldNames.departingDateTime);
};

export function stepSixArrivalDateTimeSelector(state) {
  return selector(state, stepSixFormFieldNames.arrivalDateTime);
};

export function stepSixArrivalFlightNumberSelector(state) {
  return selector(state, stepSixFormFieldNames.arrivalFlightNumber);
};

export function stepSixDepartingFlightNumberSelector(state) {
  return selector(state, stepSixFormFieldNames.departingFlightNumber);
};

export function stepSixDepartingTransportSelector(state) {
  return selector(state, stepSixFormFieldNames.departingTransport);
};

export function stepSixDepartingSelector(state) {
  return selector(state, stepSixFormFieldNames.departing);
};

export function stepSixDropoffSelector(state) {
  return selector(state, stepSixFormFieldNames.dropoff);
};

export function stepSixDropoffOtherLocationSelector(state) {
  return selector(state, stepSixFormFieldNames.dropoffOtherLocation);
};

export function stepSixPickUpOtherLocationSelector(state) {
  return selector(state, stepSixFormFieldNames.pickUpOtherLocation);
};

export function stepSixTransportationSelector(state) {
  return selector(state, stepSixFormFieldNames.transportation);
};

export function stepSixAirportPickupSelector(state) {
  return selector(state, stepSixFormFieldNames.airportPickup);
};

export function stepSixSelectedTransportSelector(state) {
  return selector(state, stepSixFormFieldNames.transport);
};

export function stepSixUnaccompaniedSelector(state) {
  return selector(state, stepSixFormFieldNames.unaccompanied);
};

function stepSixSelector(state) {
  return state.stepSix;
};

const stepSixSelectedArrivalAirlineId = createSelector(
  stepSixSelector,
  function(stepSix) {
    return stepSix.selectedArrivalAirline;
  }
);

const stepSixSelectedDepartingAirlineId = createSelector(
  stepSixSelector,
  function(stepSix) {
    return stepSix.selectedDepartingAirline;
  }
);

export const stepSixTransportSelector = createSelector(
  stepSixSelector,
  function(stepSix) {
    return stepSix.transport;
  }
);

export const stepSixAirlinesSelector = createSelector(
  stepSixSelector,
  function(stepSix) {
    return stepSix.airlines.map(function(item, idx) {
      return {
        id: '' + idx,
        display_name: item.name,
        name: item.name,
      };
    });
  }
);

export const stepSixSelectedArrivalAirlineSelector = createSelector(
  stepSixAirlinesSelector,
  stepSixSelectedArrivalAirlineId,
  function(airlines, id) {
    return airlines.find(function(airlineItem) {
      return airlineItem.id === id;
    });
  }
);

export const stepSixSelectedDepartingAirlineSelector = createSelector(
  stepSixAirlinesSelector,
  stepSixSelectedDepartingAirlineId,
  function(airlines, id) {
    return airlines.find(function(airlineItem) {
      return airlineItem.id === id;
    });
  }
);

export const stepSixTransportUnaccompaniedSelector = createSelector(
  stepSixSelector,
  function(stepSix) {
    return stepSix.unaccompanied;
  }
);

const stepSixArrivalPriceSelector = createSelector(
  stepSixTransportSelector,
  stepSixSelectedTransportSelector,
  function(transport, selectedTransport) {
    const transportObject = transport.find(({ id }) => stringToNumber(selectedTransport) === stringToNumber(id));
    if (transportObject) {
      return transportObject.price;
    }
    return 0;
  }
);

const stepSixDepartingPriceSelector = createSelector(
  stepSixTransportSelector,
  stepSixDepartingTransportSelector,
  function(transport, selectedTransport) {
    const transportObject = transport.find(({ id }) => stringToNumber(selectedTransport) === stringToNumber(id));
    if (transportObject) {
      return transportObject.price;
    }
    return 0;
  }
);

export const stepSixPriceSelector = createSelector(
  stepSixTransportUnaccompaniedSelector,
  stepSixUnaccompaniedSelector,
  stepSixArrivalPriceSelector,
  stepSixDepartingPriceSelector,
  function(transportUnaccompanied, unaccompanied, arrivalPrice, departingPrice) {
    const free = 0;
    const unaccompaniedPrice = (
      unaccompanied === 'true'
        ? transportUnaccompanied
          ? transportUnaccompanied.price
          : 0
        : free
    );
    return unaccompaniedPrice + arrivalPrice + departingPrice;
  }
);
