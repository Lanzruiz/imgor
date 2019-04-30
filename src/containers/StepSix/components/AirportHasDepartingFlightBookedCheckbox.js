import isNumber from 'lodash/isNumber';

// Modules
import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { connect } from 'react-redux';
// Components
import LocaleString from '../../../components/LocaleString';
// Constants
import { stepSixFormFieldNames } from '../selectors';
// Selectors
import { stepSixTransportationIdSelector } from '../selectors';

class AirportHasArrivalFlightBookedCheckbox extends React.Component {
  static propTypes = {
    airportPickup: PropTypes.string,
  };

  static defaultProps = {};

  render() {
    const { transportationId } = this.props;
    
    return (
      <Field
        name={stepSixFormFieldNames.hasDepartingBookedFlight}
        type="checkbox"
        component={({ input }) => {
          return (
            <div className="unaccompanied__radio-buttons">
              <label className={'step-six__initial-label radio-btn__container radio-btn__container--checkbox'}>
                <input
                  {...input}
                  className="radio-btn__btn"
                  type="checkbox"
                  checked={input.checked}
                  value={input.value}
                  onChange={() => {input.onChange(true); input.onBlur()}}
                  onBlur={() => {}}
                  onFocus={() => {}}
                  disabled={!isNumber(transportationId)}
                />
                <LocaleString stringKey={'step_six.enter_flight_info'} />
              </label>
              <label className={'step-six__initial-label radio-btn__container radio-btn__container--checkbox'}>
                <input
                  {...input}
                  className="radio-btn__btn"
                  type="checkbox"
                  checked={!input.checked}
                  value={!input.value}
                  onChange={() => {input.onChange(false); input.onBlur()}}
                  onFocus={() => {}}
                  onBlur={() => {}}
                  disabled={!isNumber(transportationId)}
                />
                <LocaleString stringKey={'step_six.provide_later'} />
              </label>
            </div>
          );
        }}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    transportationId: stepSixTransportationIdSelector(state),
  };
}

export default connect(mapStateToProps)(AirportHasArrivalFlightBookedCheckbox);
