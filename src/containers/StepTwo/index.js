// Modules
import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cx from 'classnames';
import moment from 'moment';
import isEqual from 'lodash/isEqual';
// Components
import Header from '../../components/Header';
import LocaleString from '../../components/LocaleString';
import Carousel, { CarouselItem } from '../../components/Carousel';
import { Default, Mobile } from '../../components/Responsive';
// Actions
import * as stepOneActions from '../../actions/step.one';
import * as stepTwoActions from '../../actions/step.two';
import * as weeksActions from '../../actions/weeks';
import * as stepsActions from '../../actions/steps';
// Helpers
import dateFormat from '../../helpers/dateFormat';
// Selectors
import { stepTwoDataSelector, stepTwoSelectedDateSelector } from './selectors';
import {
  stepOneGroupSelector, weeksCounterSelector, stepOneAgeSelector, stepOneGenderSelector,
  stepOneSecondaryGroupSelector, isWeeklyCampSelector, stepOneSleepawaySelector, stepOneBoardingBooleanSelector,
} from '../StepOne/selectors';
import { currentStepSelector } from '../WizardForm/selectors';
// Constants
import { monthEnum } from '../../constants/step.two';
import { daysInWeek } from '../../constants/weeks';
import { stepsEnum } from '../../constants/steps';
// Styles
import './styles.scss';

class StepTwo extends React.Component {
  static propTypes = {
    boarding: PropTypes.bool,
    stepOneActions: PropTypes.shape({
      stepOneSetCampLength: PropTypes.func.isRequired,
    }),
    stepTwoActions: PropTypes.shape({
      getCatalogCampsCalendarRequest: PropTypes.func.isRequired,
      selectDate: PropTypes.func.isRequired,
      stepTwoSetDefaultState: PropTypes.func.isRequired,
      stepTwoSetCampDaysLength: PropTypes.func.isRequired,
    }),
    weeksActions: PropTypes.shape({
      setOnlyWeeks: PropTypes.func.isRequired,
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
      age, businessType, boarding, packageType, sport, selectedDate, step,
      group, secondary_group, gender, weeksCounter, isWeeklyCamp,
    } = this.props;

    const noDateAvailable = !selectedDate.capacity_start_date && !selectedDate.capacity_end_date;

    if (step > stepsEnum.two && noDateAvailable) {
      this.props.stepsActions.setStepsCounter(stepsEnum.one);
      this.setDefaultState();
      return;
    }

    const getCatalogCampsCalendarArgs = {
      age,
      sport,
      gender,
      group,
      secondary_group,
      boarding,
      business_type: businessType,
      package_type: packageType,
    };

    if (isWeeklyCamp && weeksCounter) {
      delete getCatalogCampsCalendarArgs.secondary_group;
    }

    this.getCatalogCampsCalendar(getCatalogCampsCalendarArgs);
  }

  componentDidUpdate(prevProps) {
    const {
      age, businessType, boarding, packageType, sport, step,
      group, secondary_group, gender, weeksCounter, isWeeklyCamp,
    } = this.props;

    const isStepChanged = !isEqual(step, prevProps.step);

    if (isStepChanged && step < stepsEnum.two) {
      this.setDefaultState();
      return;
    }

    const isAgeChanged = !isEqual(age, prevProps.age);
    const isBusinessTypeChanged = !isEqual(businessType, prevProps.businessType);
    const isBoardingChanged = !isEqual(boarding, prevProps.boarding);
    const isPackageTypeChanged = !isEqual(packageType, prevProps.packageType);
    const isSportChanged = !isEqual(sport, prevProps.sport);
    const isGroupChanged = !isEqual(group, prevProps.group);
    const isSecondaryGroupChanged = !isEqual(secondary_group, prevProps.secondary_group);
    const isGenderChanged = !isEqual(gender, prevProps.gender);
    const isWeeksCounterChanged = !isEqual(weeksCounter, prevProps.weeksCounter);
    const isWeeklyCampChanged = !isEqual(isWeeklyCamp, prevProps.isWeeklyCamp);

    const isDataChanged = (
         isAgeChanged
      || isBusinessTypeChanged
      || isBoardingChanged
      || isPackageTypeChanged
      || isSportChanged
      || isGroupChanged
      || isSecondaryGroupChanged
      || isGenderChanged
      || isWeeksCounterChanged
      || isWeeklyCampChanged
    );

    if (isDataChanged) {
      const getCatalogCampsCalendarArgs = {
        age,
        sport,
        gender,
        group,
        secondary_group,
        boarding,
        business_type: businessType,
        package_type: packageType,
      };

      if (isWeeklyCamp && weeksCounter) {
        delete getCatalogCampsCalendarArgs.secondary_group;
      }

      this.getCatalogCampsCalendar(getCatalogCampsCalendarArgs);
    }
  }

  componentWillUnmount() {
    this.setDefaultState();
  }

  render() {
    const { data, weeksCounter, sport, selectedDate } = this.props;
    const dates = {
      [monthEnum[0]]: data.filter(({ capacity_start_date }) => this.filterDatesByMonth({ capacity_start_date }, monthEnum['jan'])),
      [monthEnum[1]]: data.filter(({ capacity_start_date }) => this.filterDatesByMonth({ capacity_start_date }, monthEnum['feb'])),
      [monthEnum[2]]: data.filter(({ capacity_start_date }) => this.filterDatesByMonth({ capacity_start_date }, monthEnum['mar'])),
      [monthEnum[3]]: data.filter(({ capacity_start_date }) => this.filterDatesByMonth({ capacity_start_date }, monthEnum['apr'])),
      [monthEnum[4]]: data.filter(({ capacity_start_date }) => this.filterDatesByMonth({ capacity_start_date }, monthEnum['may'])),
      [monthEnum[5]]: data.filter(({ capacity_start_date }) => this.filterDatesByMonth({ capacity_start_date }, monthEnum['june'])),
      [monthEnum[6]]: data.filter(({ capacity_start_date }) => this.filterDatesByMonth({ capacity_start_date }, monthEnum['july'])),
      [monthEnum[7]]: data.filter(({ capacity_start_date }) => this.filterDatesByMonth({ capacity_start_date }, monthEnum['aug'])),
      [monthEnum[8]]: data.filter(({ capacity_start_date }) => this.filterDatesByMonth({ capacity_start_date }, monthEnum['sept'])),
      [monthEnum[9]]: data.filter(({ capacity_start_date }) => this.filterDatesByMonth({ capacity_start_date }, monthEnum['oct'])),
      [monthEnum[10]]: data.filter(({ capacity_start_date }) => this.filterDatesByMonth({ capacity_start_date }, monthEnum['nov'])),
      [monthEnum[11]]: data.filter(({ capacity_start_date }) => this.filterDatesByMonth({ capacity_start_date }, monthEnum['dec'])),
    };

    const carouselDates = Object.keys(dates).reduce((acc, key) => {
      if (dates[key] && dates[key].length) {
        acc = {
          ...acc,
          [key]: dates[key]
        }
      }
      return acc;
    }, {});

    const total = Object.keys(carouselDates).length;
    const perPage = 4;
    const totalPages = Math.ceil(total/perPage);

    const pagedDates = Object.keys(carouselDates).reduce((acc, key) => {
    const index = Math.floor(acc.counter/perPage);
      acc.data[index] = {
        ...acc.data[index],
        [key]: dates[key]
      };
      acc.counter++;
      return acc;
    }, {
      data: [],
      counter: 0
    });

    return (
      <div className="step-two">
        <Container style={{ marginBottom: `${(!selectedDate.capacity_start_date && !selectedDate.capacity_end_date) ? 130 : 30}px` }}>
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
                    <div className="icons__container">
                      <div className="icon-phone" />
                      <span className="icons__text">
                        <LocaleString stringKey="step_two.questions.call" />
                      </span>
                    </div>
                    <div className="icons__container">
                      <div className="icon-message-bulb-square-o" />
                      <span className="icons__text">
                        <LocaleString stringKey="step_two.questions.chat" />
                      </span>
                    </div>
                    <div className="icons__container">
                      <div className="icon-file" />
                      <span className="icons__text">
                        <LocaleString stringKey="step_two.questions.email" />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="step-two__dates dates">
                  <h2 className="dates__header">
                    <LocaleString
                      stringKey="step_two.dates.header"
                      formatString={{ sport, length_program: weeksCounter ? `${weeksCounter} week` : '' }}
                    />&#42;
                  </h2>
                  <Mobile>
                    {(pagedDates.data.length > 0)
                      ? (
                        (totalPages > 1)
                          ? (
                            <Carousel render={true} className="test">
                              {pagedDates.data.map((value, index) => (
                                <CarouselItem key={index}>
                                  <h2 className="header__h6">
                                    <LocaleString stringKey="step_two.page_of" formatString={{ current: ++index, max: totalPages }} />
                                  </h2>
                                  <ul className="dates__page">
                                    {this.renderDates(value)}
                                  </ul>
                                </CarouselItem>
                              ))}
                            </Carousel>
                          ) : (
                            <ul className="dates__container">
                              {this.renderDates(dates)}
                            </ul>
                          )
                      ) : (
                        <div className="dates__no-data">
                          <LocaleString stringKey="step_two.dates.no-data" />
                        </div>
                      )
                    }
                  </Mobile>
                  <Default>
                    {data.length
                      ? (
                        <ul className="dates__container">
                          {this.renderDates(dates)}
                        </ul>
                      ) : (
                        <div className="dates__no-data">
                          <LocaleString stringKey="step_two.dates.no-data" />
                        </div>
                      )
                    }
                  </Default>
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
      </div>
    );
  }

  renderDates = (dataObject) => {
    const result = [];
    const { boarding, selectedDate, isWeeklyCamp } = this.props;
    for (let key in dataObject) {
      if (dataObject[key].length) {
        result.push(
          <li key={key} className="dates__column">
            <ul className="mb-10 d-block">
              {dataObject[key].map((item, idx) => {
                const { capacity, capacity_start_date, capacity_end_date, length, length_days } = item;
                const itemKey = `${key}_${idx}`;
                const capacityItemByBoardingValue = capacity.find((capacityItem) => capacityItem.boarding === boarding);
                const isAvailable = capacityItemByBoardingValue.available > 0;
                const onClickHandler = (
                  isAvailable
                    ?
                      () => {
                        if (!isWeeklyCamp) {
                          const weeksCounter = length_days / daysInWeek;
                          const weeksLength = (weeksCounter > 1) ? weeksCounter : 1;
                          this.selectCampLength(length);
                          this.setCampDaysLength(length_days);
                          this.setOnlyWeeks(weeksLength);
                        }
                        this.selectDate({ capacity_start_date, capacity_end_date });
                      }
                    : null
                );
                const dateString = dateFormat({ date: capacity_start_date, dateFormat: 'YYYY-MM-DD', resultFormat: 'MMM, DD YYYY' });
                const listItemClassNames = cx('dates__item', {
                  'sold-out': !isAvailable,
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
    }
    return result;
  };

  filterDatesByMonth({ capacity_start_date }, monthNumberJS, stringFormat = 'YYYY-MM-DD') {
    return moment(capacity_start_date, stringFormat).month() === monthNumberJS;
  };

  selectDate = (date) => {
    this.props.stepTwoActions.selectDate(date);
  };

  selectCampLength = (length) => {
    this.props.stepOneActions.stepOneSetCampLength(length);
  };

  setOnlyWeeks = (counter) => {
    this.props.weeksActions.setOnlyWeeks(counter);
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

  setCampDaysLength = (length) => {
    this.props.stepTwoActions.stepTwoSetCampDaysLength(length);
  };

  setDefaultState = () => {
    this.props.stepTwoActions.stepTwoSetDefaultState();
  }
}

function mapStateToProps(state) {
  return {
    boarding: stepOneBoardingBooleanSelector(state),
    data: stepTwoDataSelector(state),
    selectedDate: stepTwoSelectedDateSelector(state),
    sleepaway: stepOneSleepawaySelector(state),
    age: stepOneAgeSelector(state),
    gender: stepOneGenderSelector(state),
    group: stepOneGroupSelector(state),
    secondary_group: stepOneSecondaryGroupSelector(state),
    weeksCounter: weeksCounterSelector(state),
    isWeeklyCamp: isWeeklyCampSelector(state),
    step: currentStepSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    stepOneActions: bindActionCreators(stepOneActions, dispatch),
    stepTwoActions: bindActionCreators(stepTwoActions, dispatch),
    weeksActions: bindActionCreators(weeksActions, dispatch),
    stepsActions: bindActionCreators(stepsActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StepTwo);
