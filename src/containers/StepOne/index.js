// Modules
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Row, Col } from 'react-grid-system';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Field, Form, reduxForm, formValueSelector } from 'redux-form';
import PropTypes from 'prop-types';
import cx from 'classnames';
import include from 'lodash/includes';
import scrollToComponent from 'react-scroll-to-component';
// Components
import EmailModal from '../../components/EmailModal';
import Header from '../../components/Header';
import TabRow from '../../components/TabRow';
import GreenBlock from '../../components/GreenBlock';
import Button from '../../components/Button';
import LocaleString from '../../components/LocaleString';
import Radio from '../../components/Radio';
// Actions
import * as weeksActions from '../../actions/weeks';
import * as stepOneActions from '../../actions/step.one';
import { addParticipantByCardId } from '../../actions/participant';
import * as stepsActions from '../../actions/steps';
// Helpers
import validation from '../../helpers/validate';
import createNumbersArray from '../../helpers/createNumbersArray';
// Constants
import { minWeekCount, maxWeekCount } from '../../constants/weeks';
// Selectors
import {
  stepOneGroupSelector, stepOneDataSelector, stepOneTabIndexSelector, weeksCounterSelector,
  stepOneAgeSelector, stepOneGenderSelector, stepOneSleepawaySelector,
} from './selectors';
// Styles
import './styles.scss';

export const weekly_camp = 'Year-Round Weekly Camps';

class StepOne extends React.Component {
  constructor(props) {
    super(props);
    this.stepOne = React.createRef();
  }

  static propTypes = {
    weeksCounter: PropTypes.number,
    weeksActions: PropTypes.shape({
      incrementWeeksCounter: PropTypes.func.isRequired,
      decrementWeeksCounter: PropTypes.func.isRequired,
      setWeeksCounter: PropTypes.func.isRequired,
    }),
    stepOneActions: PropTypes.shape({
      getCatalogCampsGroup: PropTypes.func.isRequired,
      selectGroup: PropTypes.func.isRequired,
      setTabIndex: PropTypes.func.isRequired,
      stepOneSetPrice: PropTypes.func.isRequired,
    }),
    participantActions: PropTypes.shape({
      addParticipantByCardId: PropTypes.func.isRequired,
    }),
    participantId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    stepsActions: PropTypes.shape({
      setStepsCounter: PropTypes.func.isRequired,
    }),
    data: PropTypes.arrayOf(
      PropTypes.shape({
        age_range: PropTypes.string,
        business_type: PropTypes.string,
        capacity_available: PropTypes.number,
        name: PropTypes.string,
        options: PropTypes.oneOfType([
          PropTypes.bool,
          PropTypes.arrayOf(
            PropTypes.shape({
              capacity_available: PropTypes.number,
              name: PropTypes.string,
              sold_out: PropTypes.bool,
            }),
          ),
        ]),
        sold_out: PropTypes.bool,
        start_price: PropTypes.number,
      }),
    ),
    tabIndex: PropTypes.number,
    group: PropTypes.string,
    sleepaway: PropTypes.string,
    age: PropTypes.string,
    gender: PropTypes.string,
    weeksLengthNumber: PropTypes.number,
  };

  static defaultProps = {
    weeksCounter: 0,
    shouldShowEmailModal: true,
    weeksActions: {},
    stepActions: {},
    tabIndex: 0,
    weeksLengthNumber: 0,
  };

  componentDidMount() {
    const { sport, weeksLengthNumber } = this.props;
    this.props.stepOneActions.getCatalogCampsGroup({ sport });
    if (typeof weeksLengthNumber === 'number') {
      this.props.weeksActions.setOnlyWeeks(weeksLengthNumber);
    }
    scrollToComponent(this.stepOne.current);
  }

  componentDidUpdate(prevProps) {
    const { sport, weeksLengthNumber } = this.props;
    if (prevProps.sport !== sport) {
      this.props.stepOneActions.getCatalogCampsGroup({ sport });
    }
    if (typeof weeksLengthNumber === 'number' && (weeksLengthNumber !== prevProps.weeksLengthNumber)) {
      this.props.weeksActions.setOnlyWeeks(weeksLengthNumber);
    }
  }

  render() {
    const { weeksCounter, participantId, data, tabIndex, group } = this.props;
    return (
      <React.Fragment>
        <EmailModal
          onSubmit={this.closeEmailModal}
          shouldShowEmailModal={!participantId}
        />
        <Container style={{ marginBottom: '65px' }} ref={this.stepOne}>
          <Row>
            <Col>
              <Header
                header="step_one.header"
                subHeader="step_one.sub_header"
              />
            </Col>
          </Row>
          <TabRow transparent>
            <TabRowSection />
            <TabRowSection tabIndex={tabIndex} index={1}>
              <GreenBlock className="tab-row__green-block">
                <TabRowHeaderGreenBlock localeKey="step_one.tabs.our_most" />
                <TabRowHeaderGreenBlock localeKey="step_one.tabs.popular_camp" />
              </GreenBlock>
            </TabRowSection>
            <TabRowSection tabIndex={tabIndex} index={2}>
              <GreenBlock className="tab-row__green-block">
                <TabRowHeaderGreenBlock localeKey="step_one.tabs.the_ultimate" />
                <TabRowHeaderGreenBlock localeKey="step_one.tabs.training_experience" />
              </GreenBlock>
            </TabRowSection>
            <TabRowSection tabIndex={tabIndex} index={3}>
              <GreenBlock className="tab-row__green-block">
                <TabRowHeaderGreenBlock localeKey="step_one.tabs.invite_only" />
                <TabRowHeaderGreenBlock localeKey="step_one.tabs.programm" />
              </GreenBlock>
            </TabRowSection>
          </TabRow>
          {data.map((row, idx) => {
            const selectedIndex = (
              (row.name === group)
                ? (
                    (row.name === weekly_camp)
                      ? (
                          (weeksCounter > 0)
                            ? tabIndex
                            : 0
                        )
                      : tabIndex
                    )
                : 0
            );
            return (
              <React.Fragment key={idx}>
                <Tabs
                  selectedTabClassName="tab-row__section--selected"
                  disabledTabClassName="tab-row__section--disabled"
                  selectedIndex={selectedIndex}
                  onSelect={this.setTabIndex}
                >
                  <TabRow className={cx('tab-row__container align-initial', {
                    'tab-row__container--disabled': (tabIndex > 0) && (group !== row.name),
                  })}>
                    <TabList className="tab-row__tab-list">
                      <Tab
                        className="tab-row__section tab-row__section--bg-transparent center-left"
                        onClick={() => {
                          this.selectGroup({ group: null, secondary_group: null });
                          this.setWeeksCounter(0);
                          this.setPrice(0);
                        }}
                      >
                        <div style={{ marginBottom: '3px' }}>
                          <span children={row.name} className={cx(`
                            tab-row__header
                            tab-row__header--regular
                            tab-row__header--mw-initial
                            text-left
                            white`)}
                          />
                        </div>
                      </Tab>
                      {
                        (row.name === weekly_camp)
                          ? (
                            <Tab
                              onClick={() => this.selectGroup({ group: row.name, secondary_group: null })}
                              className={cx(`
                                tab-row__section
                                tab-row__section--bg-white
                                tab-row__section--center
                                w-75
                                d-flex
                                align-center
                                justify-evenly`
                              )}
                            >
                              <div className="d-flex align-center justify-end w-35  tab-row__header--font-18 tab-row__header--trade-gothic-bold">
                                <Button
                                  onClick={() => {
                                    this.setWeeksCounter(minWeekCount);
                                    this.setPrice(row.price);
                                  }}
                                >
                                  <span className="tab-row__header">
                                    {minWeekCount} <LocaleString stringKey="week" />
                                  </span>
                                </Button>
                                <span className="tab-row__separator" style={{ marginLeft: '20px' }} />
                              </div>
                              <div className="d-flex align-center justify-center w-30 tab-row__header--trade-gothic-bold">
                                <Button
                                  style={{ marginRight: '20px', padding: '4px' }}
                                  className="tab-row__header tab-row__header--font-80"
                                  onClick={() => {
                                    this.decrementWeeksCounter();
                                    this.setPrice(row.price);
                                  }}
                                  children="-"
                                />
                                <span className="tab-row__header tab-row__header--font-100">
                                  {weeksCounter}
                                </span>
                                <Button
                                  style={{ marginLeft: '20px', padding: '4px' }}
                                  className="tab-row__header tab-row__header--font-50"
                                  onClick={() => {
                                    this.incrementWeeksCounter();
                                    this.setPrice(row.price);
                                  }}
                                  children="+"
                                />
                              </div>
                              <div className="d-flex align-center justify-start w-35 tab-row__header--font-18 tab-row__header--trade-gothic-bold">
                                <span className="tab-row__separator" style={{ marginRight: '20px' }} />
                                <Button
                                  buttonClassName="d-flex f-direction-column"
                                  onClick={() => {
                                    this.setWeeksCounter(maxWeekCount);
                                    this.setPrice(row.price);
                                  }}
                                >
                                  <span className="tab-row__header">
                                    <LocaleString stringKey="up_to" />
                                  </span>
                                  <span className="tab-row__header">
                                    {maxWeekCount} <LocaleString stringKey="week" />
                                  </span>
                                </Button>
                              </div>
                            </Tab>
                          ) : (
                            <React.Fragment>
                              {row.options && (
                                row.options.map((option, idx) => {
                                  return (
                                    <Tab
                                      key={idx}
                                      onClick={() => {
                                        this.selectGroup({ group: row.name, secondary_group: option.name });
                                        this.setWeeksCounter(0);
                                        this.setPrice(option.price);
                                      }}
                                      className={cx(`
                                        tab-row__section
                                        tab-row__section--bg-white
                                        tab-row__section--center
                                        center-center`
                                      )}
                                    >
                                      <div className={cx('tab-row__wrapper', {
                                        'tab-row__container--disabled': (tabIndex > 0) && ((idx + 1 !== tabIndex) && (group !== row.group)),
                                      })}>
                                        <span className="tab-row__header tab-row__header--medium">
                                          {option.name}
                                        </span>
                                      </div>
                                    </Tab>
                                  );
                                })
                              )}
                            </React.Fragment>
                          )
                      }
                    </TabList>
                  </TabRow>
                  <React.Fragment>
                    <TabPanel />
                    {
                      (row.name === weekly_camp)
                        ? (
                            <TabPanel>
                              {this.renderTabPanel({
                                name: row.name,
                                range: createNumbersArray({ from: 8, to: 18 }),
                                boardingOptions: ['Boarding', 'Non-Boarding'],
                                genderOptions: ['Male', 'Female'],
                              })}
                            </TabPanel>
                        ) : (
                          row.options && (
                            row.options.map((option, idx) => {
                              const { age_from, age_to, name, boarding_options, gender_options } = option;
                              const range = createNumbersArray({ from: age_from, to: age_to });
                              return (
                                <TabPanel key={idx}>
                                  {this.renderTabPanel({ name, range, boardingOptions: boarding_options, genderOptions: gender_options })}
                                </TabPanel>
                              );
                            })
                          )
                        )
                    }
                  </React.Fragment>
                </Tabs>
              </React.Fragment>
            );
          })}
        </Container>
      </React.Fragment>
    );
  }

  closeEmailModal = () => {
    const { cartId, email } = this.props;
    if (cartId && email) {
      this.props.participantActions.addParticipantByCardId({ cartId, email });
    }
  };

  incrementWeeksCounter = () => {
    this.props.weeksActions.incrementWeeksCounter();
  };

  decrementWeeksCounter = () => {
    this.props.weeksActions.decrementWeeksCounter();
  };

  setWeeksCounter = (count) => {
    this.props.weeksActions.setWeeksCounter(count);
  };

  renderTabPanel = ({ name = '', range = [], boardingOptions = [], genderOptions = [] }) => {
    const regExp = /\s/g;
    const prefix = name.toLowerCase().replace(regExp, '_');
    const { sleepaway, age, gender } = this.props;
    return (
      <div className="tab-content__container tab-row__container content">
        <div className="content__first-col">
          <H2>our most popular camp</H2>
          <Paragraph>
            Perfect for campers ages 10-18. Expand upon your current knowledge of the game while increasing
            your position-specific scills and profisiency through the best progressive youth football camp setting
            that also introduces 1-on-1 completion. Discover the ideal environment for growth and maturity both
            on the field and as an overall athlete.
          </Paragraph>
          <H4>week 1: technical skill development</H4>
          <Paragraph>
            QB: Throwing mechanics; 3- and 5- step drops. RB/WR: Footwork; agility; ball catching and route
            running. DB/LB: Alignment; coverage and taskling fundamentals. OL/DL: Stance/start; pass rush and
            pro technique; run blocking. K/P: Leg swing; ball striking; stride; short and long distance kicking.
          </Paragraph>
          <H4>week 2: pre-competition</H4>
          <Paragraph>
            Position specific refinement of mechanics and footwork, classroom instruction and understanding
            critical fundamental aspects.
          </Paragraph>
          <H4>week 3: competition</H4>
          <Paragraph>
            1-on-1 competitive drills and video analysis/classroom discussion of individual technique. QB: Half-
            field routes and reads; 1-on-1 drills RB/WB: Post-snap adjustments; 1-on-1s vs. DB/LB: pattern
            reads; 1-on-1s vs. RB/WR & OL/DL: Post snap reactions,; understanding stunts/blitzes; 1-on-1 pass
            pro and pass rush competition K/P: Situational kicking and punting; directional kicking; pooch punts;
            goal line punting; on-side kicks
          </Paragraph>
        </div>
        <div className="content__second-col">
          <Form onSubmit={this.props.handleSubmit(() => {})}>
            <div className="content__form-control">
              <H3>
                <LocaleString stringKey="step_one.choose_sleepaway" />
              </H3>
              <SleepawayRadioBtn
                prefix={prefix}
                options={[{ value: 'Boarding', stringKey: 'yes' },{ value: 'Non-Boarding', stringKey: 'no' }]}
                sleepaway={sleepaway}
                possibleValues={boardingOptions}
              />
            </div>
            <div className="content__form-control">
              <H3>
                <LocaleString stringKey="step_one.select_camper_age" />
              </H3>
              <AgeRadioBtnContainer
                age={age}
                prefix={prefix}
                range={range}
              />
            </div>
            <div className="content__form-control">
              <H3>
                <LocaleString stringKey="step_one.gender" />
              </H3>
              <GenderRadioBtnContainer
                prefix={prefix}
                options={['Male', 'Female']}
                value={gender}
                possibleValues={genderOptions}
              />
            </div>
          </Form>
        </div>
      </div>
    );
  }

  selectGroup = ({ group, secondary_group }) => {
    this.props.stepOneActions.selectGroup({ group, secondary_group });
  };

  setTabIndex = (tabIndex) => {
    this.props.stepOneActions.setTabIndex(tabIndex);
  };

  setPrice = (price) => {
    this.props.stepOneActions.stepOneSetPrice(price);
  }
}

function TabRowSection({ index = 0, children, tabIndex = 0 }) {
  return (
    <div children={children} className={cx('tab-row__section tab-row__section--center mb-0', {
      'tab-row__section--disabled': (tabIndex > 0) && (tabIndex !== index),
    })} />
  );
}

function TabRowHeaderGreenBlock ({ localeKey }) {
  return (
    <span className="tab-row__header tab-row__header--green-block">
      <LocaleString stringKey={localeKey} />
    </span>
  );
}

function H2({ children }) {
  return (
    <h2 className="content__header content__header--h2">
      {children}
    </h2>
  );
}

function H3({ children }) {
  return (
    <h3 className="content__header content__header--h3">
      {children}
    </h3>
  );
}

function H4({ children }) {
  return (
    <h4 className="content__header content__header--h4">
      {children}
    </h4>
  );
}

function Paragraph({ children }) {
  return (
    <p className="content__paragraph">
      {children}
    </p>
  );
}

function SleepawayRadioBtn({ options, prefix, sleepaway, possibleValues }) {
  return (
    <Field
      className="content__radio-btn"
      name={`${prefix}_sleepaway`}
      type="radio"
      options={options}
      component={({ input, options }) => (
        options.map(({ value, stringKey }) => {
          const isDisabled = !include(possibleValues, value);
          const radioBtnClassNames = cx('content__sleepaway-label mb-10', {
            'content__sleepaway-label--disabled': isDisabled,
          });
          return (
            <div key={value} className={radioBtnClassNames}>
              <Radio
                {...input}
                className="content__radio-btn--font-16"
                value={value}
                checked={sleepaway === value}
                disabled={isDisabled}
                children={<LocaleString stringKey={`step_one.sleepaway_${stringKey}`} />}
              />
            </div>
          );
      }))}
    />
  );
}

function AgeRadioBtnContainer ({ prefix, range, age }) {
  return (
    <div className="content__age--block">
      <Field
        name={`${prefix}_age`}
        type="radio"
        options={range}
        component={({ input, options }) => (
          options.map((value) => (
            <div key={value} className="content__age text-left mb-10">
              <Radio
                {...input}
                className="content__radio-btn--font-16"
                checked={`${age}` === `${value}`}
                children={`${value}`.length < 2 ? `0${value}` : value}
                value={value}
              />
            </div>
          ))
        )}
      />
    </div>
  );
}

function GenderRadioBtnContainer ({ prefix, options, value, possibleValues }) {
  return (
    <div className="content__radio-container">
      <Field
        className="content__radio-btn"
        name={`${prefix}_gender`}
        type="radio"
        options={options}
        component={({ input, options }) => (
          options.map((gender) => {
            const isDisabled = !include(possibleValues, gender);
            const radioBtnClassNames = cx('content__label', {
              'content__label--disabled': isDisabled,
            });
            return (
              <div key={gender} className={radioBtnClassNames}>
                <Radio
                  {...input}
                  className="content__radio-btn--font-16"
                  value={gender}
                  checked={gender === value}
                  disabled={isDisabled}
                  children={<LocaleString stringKey={gender.toLowerCase()} />}
                />
              </div>
            );
          })
        )}
      />
    </div>
  );
}

const selector = formValueSelector('wizard');

export function stepOneFormValueSelector(state, prefix) {
  const regExp = /\s/g;
  let name = (
    (state.stepOne.group === weekly_camp)
      ? state.stepOne.group
      : state.stepOne.secondary_group
  );
  if (name) {
    name = name.toLowerCase().replace(regExp, '_');
  }
  return selector(state, `${name}_${prefix}`);
}

function mapStateToProps(state) {
  return {
    weeksCounter: weeksCounterSelector(state),
    participantId: state.participant.id,
    email: selector(state, 'email'),
    sleepaway: stepOneSleepawaySelector(state),
    age: stepOneAgeSelector(state),
    gender: stepOneGenderSelector(state),
    cartId: state.cart.id,
    data: stepOneDataSelector(state),
    tabIndex: stepOneTabIndexSelector(state),
    group: stepOneGroupSelector(state),
    weeksLengthNumber: state.stepOne.weeksLengthNumber,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    weeksActions: bindActionCreators(weeksActions, dispatch),
    stepOneActions: bindActionCreators(stepOneActions, dispatch),
    participantActions: bindActionCreators({ addParticipantByCardId }, dispatch),
    stepsActions: bindActionCreators(stepsActions, dispatch),
  };
};

export default reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate: validation, // <------ validation
})(
  connect(mapStateToProps, mapDispatchToProps)(StepOne)
);
