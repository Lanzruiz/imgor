// Modules
import React from 'react';
import { Field } from 'redux-form';
import cx from 'classnames';
import PropTypes from 'prop-types';

export default class Input extends React.Component {
  static propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    inputClassName: PropTypes.string,
    errorBlockClassName: PropTypes.string,
  };

  static defaultProps = {
    type: 'text',
    label: '',
    inputClassName: '',
    errorBlockClassName: '',
  };

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

  renderField = ({ input, meta: { touched, error } }) => {
    const { label, inputClassName, errorBlockClassName } = this.props;
    const hasError = touched && error;
    const errorBlockHasErrorClassName = errorBlockClassName ? `${errorBlockClassName}--error` : 'error';
    const errorBlockClassNames = cx(errorBlockClassName, {
      [errorBlockHasErrorClassName]: hasError,
    });
    return (
      <React.Fragment>
        <input
          {...input}
          className={inputClassName}
          placeholder={label}
        />
        <p className={errorBlockClassNames}>
          {hasError && <span>{error}</span>}
        </p>
      </React.Fragment>
    );
  }
}
