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
  static defaultProps = {
    showTimeSelect: true,
    readOnly: false,
    dateFormat: 'Y-MM-DD hh:mm a',
    isClearable: true,
    showYearDropdown: false,
    maxDate: null,
    minDate: null,
    withPopperPlacement: true
  };
  
  normalizeDate = (value) => {
    if (value) {
      return moment(value).format(this.props.dateFormat);
    }
    return value;
  };
  
  render() {
    const { className, name, dateFormat, isClearable, placeholder, portal, showTimeSelect, readOnly, showYearDropdown, openToDate } = this.props;
    
    return (
      <Field
        {...this.props}
        className={className}
        dateFormat={dateFormat}
        name={name}
        component={RenderDatePicker}
        isClearable={isClearable}
        placeholder={placeholder}
        withPortal={portal}
        normalize={this.normalizeDate}
        showTimeSelect={showTimeSelect}
        readOnly={readOnly}
        showYearDropdown={showYearDropdown}
        openToDate={openToDate}
      />
    );
  }
}

class RenderDatePicker extends React.Component {
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
  
  
  handleChange = (date) => {
    const d = moment(date);
    this.setState({ selectedDate: date });
    this.props.input.onChange(d);
  };
  
  static onDatepickerRef(el) {

  }
  
  render() {
    const {
      className, dateFormat, input, placeholder, showTimeSelect, readOnly, meta, isClearable, withPortal, showYearDropdown,
      openToDate
    } = this.props;
    const { touched, error } = meta;
    const datePickerContainerClassName = cx({ [className]: className });
    const { selectedDate } = this.state;
    const selected = (selectedDate && selectedDate._d) ? selectedDate._d : selectedDate;
    return (
      <div className="input-container">
        <div className="datetime-picker-container">
          <ScreenClassRender render={(screenClass) => {
            const config = {
              xl: { offset: '-40px, 10px', popperPlacement: 'top' },
              lg: { offset: '-80px, -160px', popperPlacement: 'top' },
              md: { offset: '10px, -30px', popperPlacement: 'top' },
              sm: { offset: '10px, -30px', popperPlacement: 'top' },
              xs: { offset: '0, 0', popperPlacement: 'top' },
            };
            
            const popperModifiers = {
              offset: {
                enabled: false,
                offset: config[screenClass] ? config[screenClass].offset : '',
              },
              preventOverflow: {
                enabled: !this.props.withPopperPlacement,
                escapeWithReference: false,
                boundariesElement: 'viewport'
              }
            };
            
            const popperPlacement = this.props.withPopperPlacement
              ? config[screenClass] ? config[screenClass].popperPlacement : 'top'
              : 'bottom';
            
            return (
              <div className={`${datePickerContainerClassName} ${showTimeSelect ? 'with-time-select' : ''}`}>
                <DatePicker
                  fixedHeight
                  value={input.value}
                  withPortal={withPortal}
                  isClearable={isClearable}
                  showTimeSelect={showTimeSelect}
                  readOnly={readOnly}
                  dateFormat={dateFormat || 'MM/DD/YYYY'}
                  selected={selected}
                  placeholderText={placeholder}
                  popperPlacement={popperPlacement}
                  // popperPlacement={'bottom'}
                  onChange={this.handleChange}
                  onBlur={() => { input.onBlur(); }}
                  timeFormat="hh:mm a"
                  timeIntervals={5}
                  timeCaption="Time"
                  maxDate={this.props.maxDate || moment().add(1, "years").toDate()}
                  minDate={this.props.minDate || null}
                  popperModifiers={popperModifiers}
                  showYearDropdown={showYearDropdown}
                  scrollableYearDropdown={true}
                  yearDropdownItemNumber={50}
                  openToDate={openToDate}
                  ref={el => RenderDatePicker.onDatepickerRef(el)}
                />
              </div>
            );
          }} />
          {touched && error && <span className="error">{error}</span>}
        </div>
      </div>
    );
  }

};


DatePickerReduxForm.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  showTimeSelect: PropTypes.bool,
  readOnly: PropTypes.bool,
  dateFormat: PropTypes.string,
  isClearable: PropTypes.bool,
  placeholder: PropTypes.string,
  portal: PropTypes.bool,
  showYearDropdown: PropTypes.bool,
  maxDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  withPopperPlacement: PropTypes.bool,
  openToDate: PropTypes.instanceOf(Date),
};

export default DatePickerReduxForm;
