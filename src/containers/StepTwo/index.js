// Modules
import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import Img from 'react-image';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cx from 'classnames';
// Components
import Header from '../../components/Header';
import LocaleString from '../../components/LocaleString';
// Actions
import * as stepOneActions from '../../actions/step.one';
import * as stepTwoActions from '../../actions/step.two';
// Images
import call from '../../assets/img/call-icon.png';
import email from '../../assets/img/email-icon.png';
import chat from '../../assets/img/chat-icon.png';
// Helpers
import splitArray from '../../helpers/splitArray';
import dateFormat from '../../helpers/dateFormat';
import isBeforeDate from '../../helpers/isBeforeDate';
// Selectors
import { stepTwoDataSelector, stepTwoSelectedDateSelector } from './selectors';
import { stepOneFormValueSelector } from '../StepOne';
import {
  stepOneGroupSelector, weeksCounterSelector,
  stepOneSecondaryGroupSelector, isWeeklyCampSelector,
} from '../StepOne/selectors';
// Styles
import './styles.scss';

class StepTwo extends React.Component {
  static propTypes = {
    stepOneActions: PropTypes.shape({
      stepOneSetCampLength: PropTypes.func.isRequired,
    }),
    stepTwoActions: PropTypes.shape({
      getCatalogCampsCalendarRequest: PropTypes.func.isRequired,
      selectDate: PropTypes.func.isRequired,
      stepTwoSetDefaultState: PropTypes.func.isRequired,
    }),
    data: PropTypes.arrayOf(
      PropTypes.shape({
        capacity: PropTypes.arrayOf(
          PropTypes.shape({
            available: PropTypes.number,
            boarding: PropTypes.bool,
          }),
        ),
        capacity_end_date: PropTypes.date,
        capacity_start_date: PropTypes.date,
        display_length: PropTypes.string,
        display_sport: PropTypes.string,
        length: PropTypes.string,
        length_days: PropTypes.number,
        program_types: PropTypes.arrayOf(
          PropTypes.shape({
            capacity: PropTypes.number,
            display_name: PropTypes.string,
            name: PropTypes.string,
            sold_out: PropTypes.bool,
          }),
        ),
        sport: PropTypes.string,
        selectedDate: PropTypes.shape({
          capacity_start_date: PropTypes.date,
          capacity_end_date: PropTypes.date,
        }),
      }),
    ),
    sleepaway: PropTypes.string,
    age: PropTypes.string,
    gender: PropTypes.string,
    group: PropTypes.string,
    secondary_group: PropTypes.string,
    weeksCounter: PropTypes.number,
    isWeeklyCamp: PropTypes.bool,
  };

  static defaultProps = {
    data: [],
    weeksCounter: 0,
  };

  componentDidMount() {
    const {
      age, businessType, sleepaway, packageType, sport,
      group, secondary_group, gender, weeksCounter, isWeeklyCamp,
    } = this.props;

    const getCatalogCampsCalendarArgs = {
      age,
      sport,
      gender,
      group,
      secondary_group,
      boarding: sleepaway,
      business_type: businessType,
      package_type: packageType,
    };

    if (isWeeklyCamp && weeksCounter) {
      delete getCatalogCampsCalendarArgs.group;
      delete getCatalogCampsCalendarArgs.secondary_group;
    }

    this.getCatalogCampsCalendar(getCatalogCampsCalendarArgs);
  }

  componentWillUnmount() {
    this.setDefaultState();
  }

  render() {
    const { data, weeksCounter, sport, selectedDate } = this.props;
    const dataObject = splitArray({ arrayCount: 6, array: data });
    console.log(data);
    return (
      <Container style={{ marginBottom: '130px' }}>
        <Row>
          <Col>
            <Header
              header="step_two.header"
              subHeader="step_two.sub_header"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="step-two__container">
              <div className="step-two__questions questions">
                <span className="questions__questions">
                  <LocaleString stringKey="step_two.questions.questions" />
                </span>
                <h2 className="questions__header">
                  <LocaleString stringKey="step_two.questions.header" />
                </h2>
                <p className="questions__description">
                  <LocaleString stringKey="step_two.questions.description" />
                </p>
                <div className="questions__icons icons">
                  <span className="icons__container">
                    <Img src={call} alt="call" />
                    <span className="icons__text">
                      <LocaleString stringKey="step_two.questions.call" />
                    </span>
                  </span>
                  <span className="icons__container">
                    <Img src={email} alt="email" />
                    <span className="icons__text">
                      <LocaleString stringKey="step_two.questions.email" />
                    </span>
                  </span>
                  <span className="icons__container">
                    <Img src={chat} alt="chat" />
                    <span className="icons__text">
                      <LocaleString stringKey="step_two.questions.chat" />
                    </span>
                  </span>
                </div>
              </div>
              <div className="step-two__dates dates">
                <h2 className="dates__header">
                  <LocaleString
                    stringKey="step_two.dates.header"
                    formatString={{ sport, length_program: weeksCounter ? `${weeksCounter} week` : '' }}
                  />&#42;
                </h2>
                {data.length
                  ? (
                    <ul className="dates__container">
                      {this.renderDates(dataObject)}
                    </ul>
                  ) : (
                    <div className="dates__no-data">
                      <LocaleString stringKey="step_two.dates.no-data" />
                    </div>
                  )
                }
                <div className="step-two__description description">
                  <span className="description__info">
                    &#42;<LocaleString stringKey="step_two.dates.header_descripion" />
                  </span>
                  <span className="description__sold-out sold-out">
                    <LocaleString stringKey="step_two.dates.sold_out" />
                  </span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        {this.renderSelectedDate(selectedDate)}
      </Container>
    );
  }

  renderDates = (dataObject) => {
    const result = [];
    const { selectedDate } = this.props;
    const now = Date.now();
    for (let key in dataObject) {
      result.push(
        <li key={key} className="dates__column">
          <ul>
            {dataObject[key].map((item, idx) => {
              const { capacity_start_date, capacity_end_date, length } = item;
              const itemKey = `${key}_${idx}`;
              const isBefore = isBeforeDate({ startDate: now, endDate: capacity_end_date });
              const onClickHandler = (
                isBefore
                  ?
                    () => {
                      this.selectDate({ capacity_start_date, capacity_end_date });
                      this.selectCampLength(`${length} Camps`);
                    }
                  : null
              );
              const dateString = dateFormat({ date: capacity_start_date, dateFormat: 'YYYY-MM-DD', resultFormat: 'MMM, DD YYYY' });
              const listItemClassNames = cx('dates__item', {
                'sold-out': !isBefore,
                'active': (selectedDate.capacity_start_date === capacity_start_date),
              });
              return (
                <li
                  key={itemKey}
                  className={listItemClassNames}
                  onClick={onClickHandler}
                  children={dateString}
                />
              );
            })}
          </ul>
      </li>
      );
    }
    return result;
  };

  selectDate = (date) => {
    this.props.stepTwoActions.selectDate(date);
  };

  selectCampLength = (length) => {
    this.props.stepOneActions.stepOneSetCampLength(length);
  };

  renderSelectedDate = ({ capacity_start_date, capacity_end_date }) => {
    if (!capacity_start_date || !capacity_end_date) return false;
    const startDateDay = dateFormat({ date: capacity_start_date, dateFormat: 'YYYY-MM-DD', resultFormat: 'dddd' });
    const endDateDay = dateFormat({ date: capacity_end_date, dateFormat: 'YYYY-MM-DD', resultFormat: 'dddd' });
    const startDate = dateFormat({ date: capacity_start_date, dateFormat: 'YYYY-MM-DD', resultFormat: 'MMM, DD YYYY' });
    const endDate = dateFormat({ date: capacity_end_date, dateFormat: 'YYYY-MM-DD', resultFormat: 'MMM, DD YYYY' });
    return (
      <Row>
        <Col>
          <div className="step-two__selected-date selected-date">
            <div className="selected-date__container">
              <div className="selected-date__info">
                <div className="selected-date__check-in check-in">
                  <span className="check-in__text">
                    <LocaleString stringKey="step_two.dates.check_in" />
                  </span>
                </div>
                <div className="selected-date__current-selected current-selected">
                  <h2 className="current-selected__header">
                    <LocaleString stringKey="step_two.dates.selected.header" />
                  </h2>
                  <div className="current-selected__days">
                    <span>{startDateDay}</span>
                    <span>{endDateDay}</span>
                  </div>
                  <div className="current-selected__dates">
                    <span>{startDate}</span>
                    <span>-</span>
                    <span>{endDate}</span>
                  </div>
                </div>
                <div className="selected-date__check-out check-out">
                  <span className="check-out__text">
                    <LocaleString stringKey="step_two.dates.check_out" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    );
  };

  getCatalogCampsCalendar = (args) => {
    this.props.stepTwoActions.getCatalogCampsCalendarRequest(args);
  };

  getCatalogCampsHistogram = (args) => {
    this.props.stepTwoActions.getCatalogCampsHistogramRequest(args);
  };

  setDefaultState = () => {
    this.props.stepTwoActions.stepTwoSetDefaultState();
  }
}

function mapStateToProps(state) {
  return {
    data: stepTwoDataSelector(state),
    selectedDate: stepTwoSelectedDateSelector(state),
    sleepaway: stepOneFormValueSelector(state, 'sleepaway'),
    age: stepOneFormValueSelector(state, 'age'),
    gender: stepOneFormValueSelector(state, 'gender'),
    group: stepOneGroupSelector(state),
    secondary_group: stepOneSecondaryGroupSelector(state),
    weeksCounter: weeksCounterSelector(state),
    isWeeklyCamp: isWeeklyCampSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    stepOneActions: bindActionCreators(stepOneActions, dispatch),
    stepTwoActions: bindActionCreators(stepTwoActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StepTwo);
