// Modules
import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { Field } from 'redux-form';
import moment from 'moment';
import cx from 'classnames';
import { ScreenClassRender } from 'react-grid-system';
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
    showYearDropdown: PropTypes.bool,
    maxDate: PropTypes.instanceOf(Date),
    minDate: PropTypes.instanceOf(Date),
  };

  static defaultProps = {
    showTimeSelect: true,
    dateFormat: 'YYYY-MM-DD HH:mm',
    isClearable: true,
    showYearDropdown: false,
    maxDate: null,
    minDate: null
  };

  render() {
    const { className, name, dateFormat, isClearable, placeholder, portal, showTimeSelect, showYearDropdown } = this.props;
    return (
      <Field
        {...this.props}
        className={className}
        dateFormat={dateFormat}
        name={name}
        component={renderDatePicker}
        isClearable={isClearable}
        placeholder={placeholder}
        withPortal={portal}
        normalize={this.normalizeDate}
        showTimeSelect={showTimeSelect}
        showYearDropdown={showYearDropdown}
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
      className, dateFormat, input, placeholder, showTimeSelect, meta, isClearable, withPortal, showYearDropdown,
    } = this.props;
    const { touched, error } = meta;
    const datePickerContainerClassName = cx({ [className]: className });
    const { selectedDate } = this.state;
    const selected = (selectedDate && selectedDate._d) ? selectedDate._d : selectedDate;
    return (
      <div className="datetime-picker-container">
        <ScreenClassRender render={(screenClass) => {
          const config = {
            xl: { offset: '-40px, 10px', popperPlacement: 'left' },
            lg: { offset: '-80px, -160px', popperPlacement: 'top' },
            md: { offset: '10px, -30px', popperPlacement: 'top' },
            sm: { offset: '10px, -30px', popperPlacement: 'top' },
            xs: { offset: '0, 0', popperPlacement: 'top' },
          };
          return (
            <div className={`${datePickerContainerClassName} ${showTimeSelect ? 'with-time-select' : ''}`}>
              <DatePicker
                {...input}
                fixedHeight
                withPortal={withPortal}
                isClearable={isClearable}
                showTimeSelect={showTimeSelect}
                dateFormat={dateFormat || 'MM/DD/YYYY'}
                selected={selected}
                placeholderText={placeholder}
                popperPlacement={config[screenClass] ? config[screenClass].popperPlacement : 'top'}
                onChange={this.handleChange}
                onBlur={() => { input.onBlur(); }}
                timeFormat="HH:mm"
                timeIntervals={5}
                timeCaption="Time"
                maxDate={this.props.maxDate}
                minDate={this.props.minDate}
                popperModifiers={{
                  offset: {
                    enabled: true,
                    offset: config[screenClass] ? config[screenClass].offset : '',
                  },
                  preventOverflow: {
                    enabled: true,
                    escapeWithReference: false,
                    boundariesElement: 'viewport'
                  }
                }}
                showYearDropdown={showYearDropdown}
                scrollableYearDropdown={true}
                yearDropdownItemNumber={50}
              />
              {touched && error && <span>{error}</span>}
            </div>
          );
        }} />
      </div>
    );
  }

  handleChange = (date) => {
    this.setState({ selectedDate: date });
    this.props.input.onChange(date);
  }
};

export default DatePickerReduxForm;
