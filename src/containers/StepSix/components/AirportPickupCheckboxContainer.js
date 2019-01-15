// Modules
import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import isNumber from 'lodash/isNumber';
// Components
import LocaleString from '../../../components/LocaleString';
import Radio from '../../../components/Radio';
// Constants
import { stepSixFormFieldNames, airportPickupInformation } from '../selectors';
// Selectors
import { stepSixTransportationIdSelector } from '../selectors';

class AirportPickupCheckboxContainer extends React.Component {
  static propTypes = {
    airportPickup: PropTypes.string,
  };

  static defaultProps = {};

  render() {
    const { airportPickup, transportationId } = this.props;
    const { both, arrival, departing } = airportPickupInformation;
    const options = [
      { value: both, stringKey: 'step_six.roundtrip' },
      { value: arrival, stringKey: 'step_six.pickup' },
      { value: departing, stringKey: 'step_six.dropoff' },
    ];
    return (
      <div className="step-six__card-content">
        <Field
          name={stepSixFormFieldNames.airportPickup}
          type="radio"
          options={options}
          component={({ input, options }) => (
            options.map(({ value, stringKey }, idx) => {
              return (
                <Radio
                  {...input}
                  key={idx}
                  className="step-six__initial-label"
                  value={value}
                  checked={isEqual(airportPickup, value)}
                  children={<LocaleString stringKey={stringKey} />}
                  disabled={!isNumber(transportationId)}
                />
              );
            })
          )}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    transportationId: stepSixTransportationIdSelector(state),
  };
}

export default connect(mapStateToProps)(AirportPickupCheckboxContainer);
