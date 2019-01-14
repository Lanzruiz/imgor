// Modules
import React from 'react';
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';

// Components
import { ReactLocalizationConsumer } from '../../providers/ReactLocalization';

class InputBirthDayMask extends React.PureComponent {
  static displayName = 'InputBirthDayMask';

  render() {
    const { name, type, label } = this.props;
    return (
      <Field
        name={name}
        type={type}
        component={this.renderField}
        label={label}
      />
    );
  }

  renderField = ({ input }) => {
    const { label, inputClassName } = this.props;
    return (
      <ReactLocalizationConsumer>
        {({ strings }) => (
          <NumberFormat
            autoComplete="off"
            className={inputClassName}
            format="##/##/####"
            placeholder={(strings && strings[label]) ? strings[label] : label}
            mask={['M', 'M', 'D', 'D', 'Y', 'Y', 'Y', 'Y']}
            defaultValue={input.value}
            onValueChange={({ formattedValue }) => {
              input.onChange(formattedValue);
            }}
          />
        )}
      </ReactLocalizationConsumer>
    );
  };
}

export default connect()(InputBirthDayMask);
