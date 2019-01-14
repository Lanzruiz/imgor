// Modules
import React from 'react';
import { Field } from 'redux-form';
import cx from 'classnames';
import PropTypes from 'prop-types';
// Components
import { ReactLocalizationConsumer } from '../../providers/ReactLocalization';

export default class Input extends React.Component {
  static displayName = 'Input';

  static propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    inputClassName: PropTypes.string,
    errorBlockClassName: PropTypes.string,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    type: 'text',
    label: '',
    inputClassName: '',
    errorBlockClassName: '',
  };

  render() {
    const { name, type, label, disabled } = this.props;
    return (
      <Field
        name={name}
        type={type}
        component={this.renderField}
        label={label}
        disabled={disabled}
      />
    );
  }

  renderField = ({ input, meta: { touched, error }, disabled }) => {
    const { label, inputClassName, errorBlockClassName } = this.props;
    const hasError = touched && error;
    const errorBlockHasErrorClassName = errorBlockClassName ? `${errorBlockClassName}--error` : 'error';
    const errorBlockClassNames = cx(errorBlockClassName, {
      [errorBlockHasErrorClassName]: hasError,
    });
    input.disabled = disabled;
    return (
      <ReactLocalizationConsumer>
        {({ strings }) => (
          <React.Fragment>
            <input
              {...input}
              className={inputClassName}
              placeholder={(strings && strings[label]) ? strings[label] : label}
            />
            <p className={errorBlockClassNames}>
              {hasError && <span>{error}</span>}
            </p>
          </React.Fragment>
        )}
      </ReactLocalizationConsumer>
    );
  }
}
