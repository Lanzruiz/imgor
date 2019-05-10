import find from 'lodash/find';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import LocaleString from '../../../components/LocaleString';

const SummarySection = props => (
  <div className="section summary">
    <div className="content">
      <div className="title">
        <LocaleString stringKey="step_six.summary"/>
      </div>
      {props.shouldDisplayArrival && (
        <div className="summary__box">
          <div className="subtitle">
            <LocaleString stringKey="step_six.summary.arrival"/>
          </div>
          <div className="summary__item">
            <div className="label">
              <LocaleString stringKey="step_six.summary.arrival.airport"/>
            </div>
            {(find(props.parsedTransport, [ 'name', props.selectedTransportValue ]) || {}).display_name}
          </div>
          <div className="summary__item">
            <div className="label">
              <LocaleString stringKey="step_six.summary.arrival.location"/>
            </div>
            {props.locations[ props.dropoff ] ?
              <LocaleString stringKey={props.locations[ props.dropoff ]}/> : props.dropoff}
          </div>
          {props.hasArrivalBookedFlight && (
            <Fragment>
              <div className="summary__item">
                <div className="label">
                  <LocaleString stringKey="step_six.summary.arrival.airline"/>
                </div>
                {props.airportPickupAirline}
              </div>
              <div className="summary__item">
                <div className="label">
                  <LocaleString stringKey="step_six.summary.arrival.date"/>
                </div>
                {props.arrivalDateTime}
              </div>
              <div className="summary__item">
                <div className="label">
                  <LocaleString stringKey="step_six.summary.arrival.flight_number"/>
                </div>
                {props.arrivalFlightNumber}
              </div>
            </Fragment>
          )}
          <div className="summary__item">
            <div className="label">
              <LocaleString stringKey="step_six.summary.arrival.unaccompanied"/>
            </div>
            {props.arrivalUnaccompanied === 'true'
              ? `Yes +$${props.transportUnaccompanied && props.transportUnaccompanied.price}`
              : `No`
            }
          </div>
        </div>
      )}
      
      {props.shouldDisplayDeparture && (
        <div className="summary__box">
          <div className="subtitle">
            <LocaleString stringKey="step_six.summary.departure"/>
          </div>
          <div className="summary__item">
            <div className="label">
              <LocaleString stringKey="step_six.summary.departure.airport"/>
            </div>
            {(find(props.parsedTransport, [ 'name', props.departingTransport ]) || {}).display_name}
          </div>
          <div className="summary__item">
            <div className="label">
              <LocaleString stringKey="step_six.summary.departure.location"/>
            </div>
            {props.locations[ props.departing ] ?
              <LocaleString stringKey={props.locations[ props.departing ]}/> : props.departing}
          </div>
          {props.hasDepartingBookedFlight && (
            <Fragment>
              <div className="summary__item">
                <div className="label">
                  <LocaleString stringKey="step_six.summary.departure.airline"/>
                </div>
                {props.airportDepartingAirline}
              </div>
              <div className="summary__item">
                <div className="label">
                  <LocaleString stringKey="step_six.summary.departure.date"/>
                </div>
                {props.departingDateTime}
              </div>
              <div className="summary__item">
                <div className="label">
                  <LocaleString stringKey="step_six.summary.departure.flight_number"/>
                </div>
                {props.departingFlightNumber}
              </div>
            </Fragment>
          )}
          <div className="summary__item">
            <div className="label">
              <LocaleString stringKey="step_six.summary.departure.unaccompanied"/>
            </div>
            {props.departureUnaccompanied === 'true'
              ? `Yes +$${props.transportUnaccompanied && props.transportUnaccompanied.price}`
              : `No`
            }
          </div>
        </div>
      )}
    </div>
  </div>
);

SummarySection.propTypes = {
  shouldDisplayArrival: PropTypes.bool,
  parsedTransport: PropTypes.any,
  selectedTransportValue: PropTypes.any,
  locations: PropTypes.shape({}),
  dropoff: PropTypes.any,
  hasArrivalBookedFlight: PropTypes.any,
  airportPickupAirline: PropTypes.any,
  arrivalDateTime: PropTypes.any,
  arrivalFlightNumber: PropTypes.any,
  arrivalUnaccompanied: PropTypes.any,
  transportUnaccompanied: PropTypes.any,
  shouldDisplayDeparture: PropTypes.bool,
  departingTransport: PropTypes.any,
  departing: PropTypes.any,
  hasDepartingBookedFlight: PropTypes.any,
  airportDepartingAirline: PropTypes.any,
  departingDateTime: PropTypes.any,
  departingFlightNumber: PropTypes.any,
  departureUnaccompanied: PropTypes.any
};

export default SummarySection;
