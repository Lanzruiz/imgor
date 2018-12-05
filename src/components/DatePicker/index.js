// Modules
import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { Field } from 'redux-form';
import moment from 'moment';
import cx from 'classnames';
// Styles
import './styles.scss';

class DatePickerReduxForm extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    showTimeSelect: PropTypes.bool,
    dateFormat: PropTypes.string,
    isClearable: PropTypes.bool,
    placeholder: PropTypes.string,
    portal: PropTypes.bool,
  };

  static defaultProps = {
    showTimeSelect: true,
    dateFormat: 'YYYY-MM-DD HH:mm',
    isClearable: true,
  };

  render() {
    const { className, name, dateFormat, isClearable, placeholder, portal, showTimeSelect } = this.props;
    return (
      <Field
        className={className}
        dateFormat={dateFormat}
        name={name}
        component={renderDatePicker}
        isClearable={isClearable}
        placeholder={placeholder}
        withPortal={portal}
        normalize={this.normalizeDate}
        showTimeSelect={showTimeSelect}
      />
    );
  }

  normalizeDate = (value) => {
    if (value) {
      return moment(value).format(this.props.dateFormat);
    }
    return value;
  }
}

class renderDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: null,
    };
  }

  componentDidMount() {
    if (this.props.input.value) {
      this.setState({
        selectedDate: moment(this.props.input.value, this.props.dateFormat),
      });
    }
  }

  render() {
    const {
      className, dateFormat, input, placeholder, showTimeSelect, meta, isClearable, withPortal,
    } = this.props;
    const { touched, error } = meta;
    const datePickerContainerClassName = cx({ [className]: className });
    const { selectedDate } = this.state;
    const selected = (selectedDate && selectedDate._d) ? selectedDate._d : selectedDate;
    return (
      <div className={datePickerContainerClassName}>
        <DatePicker
          {...input}
          withPortal={withPortal}
          isClearable={isClearable}
          showTimeSelect={showTimeSelect}
          dateForm={dateFormat}
          selected={selected}
          placeholderText={placeholder}
          popperPlacement="left"
          onChange={this.handleChange}
          timeFormat="HH:mm"
          timeIntervals={5}
          timeCaption="time"
          popperModifiers={{
            offset: {
              enabled: true,
              offset: '-40px, 20px'
            },
            preventOverflow: {
              enabled: true,
              escapeWithReference: false,
              boundariesElement: 'viewport'
            }
          }}
        />
        {touched && error && <span>{error}</span>}
      </div>
    );
  }

  handleChange = (date) => {
    this.setState({ selectedDate: date });
    this.props.input.onChange(date);
  }
};

export default DatePickerReduxForm;
