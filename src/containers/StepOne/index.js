// Modules
import React, { Fragment } from 'react';
import ReactDOMServer from 'react-dom/server';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Row, Col } from 'react-grid-system';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Field, Form, reduxForm, formValueSelector } from 'redux-form';
import PropTypes from 'prop-types';
import cx from 'classnames';
import include from 'lodash/includes';
import toLower from 'lodash/toLower';
import isEqual from 'lodash/isEqual';
// Components
import EmailModal from '../../components/EmailModal';
import Header from '../../components/Header';
import TabRow from '../../components/TabRow';
import GreenBlock from '../../components/GreenBlock';
import Button from '../../components/Button';
import LocaleString from '../../components/LocaleString';
import Radio from '../../components/Radio';
import Dropdown from '../../components/Dropdown';
import AOSFadeInContainer from '../../components/AOSFadeInContainer';
import { gtmStateChange, stateChangeTypes } from '../../helpers/GTMService';
import TabRowHeader from './components/TabRowHeader';
// Actions
import * as weeksActions from '../../actions/weeks';
import * as stepOneActions from '../../actions/step.one';
import { addParticipantByCardId } from '../../actions/participant';
import * as stepsActions from '../../actions/steps';
// Helpers
import validation from '../../helpers/validate';
import createNumbersArray from '../../helpers/createNumbersArray';
import isStringsEqual from '../../helpers/isStringsEqual';
// Constants
import { minWeekCount, maxWeekCount } from '../../constants/weeks';
import { stepOneFormFieldsName } from './selectors';
// Selectors
import {
  stepOneGroupSelector, stepOneDataSelector, stepOneTabIndexSelector, weeksCounterSelector,
  stepOneAgeSelector, stepOneGenderSelector, stepOneSleepawaySelector,
} from './selectors';
import { sportSelector, businessTypeSelector, packageTypeSelector } from '../InitialComponent/selectors';
// Constants
import { stepsEnum } from '../../constants/steps';
// Styles
import './styles.scss';

export const weekly_camp = 'Year-Round Weekly Camps';

class StepOne extends React.Component {
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
      setRefundablePropsForCart: PropTypes.func,
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
    const { sport, dataGender, dataGroup, dataBusinessType, dataSecondaryGroup } = this.props;
    const args = {
      sport,
      gender: dataGender,
      group: dataGroup,
      businessType: dataBusinessType,
      secondaryGroup: dataSecondaryGroup,
    };
    
    this.getCatalogCampsGroup(args);
  }

  componentDidUpdate(prevProps) {
    const { sport, dataGender, dataGroup, dataBusinessType, dataSecondaryGroup } = this.props;
    const isSportChanged = !isStringsEqual(sport, prevProps.sport);
    if (isSportChanged) {
      const args = {
        sport,
        gender: dataGender,
        group: dataGroup,
        businessType: dataBusinessType,
        secondaryGroup: dataSecondaryGroup,
      };
      this.getCatalogCampsGroup(args);
    }
  }
  
  getCatalogCampsGroup = (args) => {
    for (let key in args) {
      if (!args[key]) {
        delete args[key];
      }
    }
    if (args.sport) {
      this.props.stepOneActions.getCatalogCampsGroup(args);
    }
  };
  
  closeEmailModal = () => {
    const { cartId, email } = this.props;
    if (cartId && email) {
      this.props.participantActions.addParticipantByCardId({ cartId, email });
      
      if(window.reactAppStart && typeof window.reactAppStart === 'function'){
        window.reactAppStart({ cartId, email });
      }
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
  
  renderTabPanel = ({ range = [], boardingOptions = [], genderOptions = [], id = '' }) => {
    const { sleepaway, age, gender } = this.props;
    const html = ReactDOMServer.renderToString(<LocaleString stringKey={`step_one.${id}.paragraph_text`} />);
    const transformHtml = html.replace(/(&lt;)|(&quot;)|(&gt;)/ig, (intercept, fix1, fix2, fix3) => {
      if(intercept === fix1) {
        return '<';
      }
      if(intercept === fix2) {
        return '"';
      }
      if(intercept === fix3) {
        return '>';
      }
      return null;
    });

    return (
      <div className="tab-content__container tab-row__container content">
        <div className="content__first-col">
          <H2>
            <LocaleString stringKey={`step_one.${id}.paragraph_title`} />
          </H2>
          <div dangerouslySetInnerHTML={{__html: transformHtml}} ></div>
        </div>
        <div className="content__second-col">
          <Form onSubmit={this.props.handleSubmit(() => {})}>
            <div className="content__form-control">
              <H3>
                <LocaleString stringKey="step_one.choose_sleepaway" />
              </H3>
              <SleepawayRadioBtn
                options={[{ value: 'Boarding', stringKey: 'yes' },{ value: 'Non-Boarding', stringKey: 'no' }]}
                sleepaway={sleepaway}
                possibleValues={boardingOptions}
                handleChange={() => { this.props.gtmStateChange(stateChangeTypes.OR_CAMPER_BOARDING); }}
              />
            </div>
            <div className="content__form-control">
              <H3>
                <LocaleString stringKey="step_one.select_camper_age" />
              </H3>
              {(range.length <= 15)
                ? (
                  <AgeRadioBtnContainer
                    age={age}
                    range={range}
                  />
                )
                : (
                  <Field
                    name={stepOneFormFieldsName.age}
                    component={args => <StepOneAgeDropdown {...args} range={range} />}
                  />
                )
              }
            </div>
            <div className="content__form-control">
              <H3>
                <LocaleString stringKey="step_one.gender" />
              </H3>
              <GenderRadioBtnContainer
                options={['Male', 'Female']}
                value={gender}
                possibleValues={genderOptions}
              />
            </div>
          </Form>
        </div>
      </div>
    );
  };
  
  selectGroup = ({ group, secondary_group }) => {
    this.props.stepOneActions.selectGroup({ group, secondary_group });
  };
  
  setTabIndex = (tabIndex) => {
    this.props.stepOneActions.setTabIndex(tabIndex);
  };
  
  setPrice = (price) => {
    this.props.stepOneActions.stepOneSetPrice(price);
  };

  render() {
    const { weeksCounter, participantId, data, tabIndex, group } = this.props;
    
    const parsedData = data.map(v => ({...v, id: (v.name || '').toLowerCase().replace(/\s/g, '_')}));
    
    return (
      <AOSFadeInContainer className="step-one">
        <EmailModal
          onSubmit={this.closeEmailModal}
          shouldShowEmailModal={!participantId}
        />
        <Container>
          <Row>
            <Col>
              <Header
                header="step_one.header"
                subHeader="step_one.sub_header"
                formatString={{ stepNumber: stepsEnum.one }}
              />
            </Col>
          </Row>
          <TabRow transparent>
            <TabRowSection className="mb-hidden" />
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
          {parsedData.map((row, idx) => {
            const selectedIndex = (
              isStringsEqual(row.name, group)
                ? isStringsEqual(row.name, weekly_camp)
                  ? (weeksCounter > 0)
                    ? tabIndex
                    : 0
                  : tabIndex
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
                    'tab-row__container--disabled': (tabIndex > 0) && !isStringsEqual(group, row.name),
                  })}>
                    <TabList className="tab-row__tab-list">
                      <Tab
                        className="tab-row__section tab-row__section--bg-transparent react-center-left react-mb-w100"
                        onClick={() => {
                          this.selectGroup({ group: null, secondary_group: null });
                          this.setWeeksCounter(0);
                          this.setPrice(0);
                        }}
                      >
                        <TabRowHeader >
                          <Fragment>
                            <div>{row.name}</div>
                            <div className="tab-row__header--subtitle">
                              <LocaleString stringKey={`step_one.${row.id}.under_tab_title`}/>
                            </div>
                          </Fragment>
                        </TabRowHeader>
                      </Tab>
                      {
                        isStringsEqual(row.name, weekly_camp)
                          ? (
                            <Tab
                              onClick={() => this.selectGroup({ group: row.name, secondary_group: null })}
                              className={cx(`
                                tab-row__section
                                tab-row__section--bg-white
                                tab-row__section--center
                                react-w-75
                                react-d-flex
                                react-d-flex--mb-column
                                react-align-center
                                react-justify-evenly`
                              )}
                            >
                              <div className="react-d-flex react-align-center react-justify-end w-35 tab-row__header--font-18 tab-row__header--trade-gothic-bold">
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
                              <div className="react-d-flex react-align-center react-justify-center tab-row__header--trade-gothic-bold">
                                <Button
                                  className="tab-row__header tab-row__header--font-80 minus"
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
                                  className="tab-row__header tab-row__header--font-50 plus"
                                  onClick={() => {
                                    this.incrementWeeksCounter();
                                    this.setPrice(row.price);
                                  }}
                                  children="+"
                                />
                              </div>
                              <div className="react-d-flex react-align-center react-justify-start react-w-35 tab-row__header--font-18 tab-row__header--trade-gothic-bold">
                                <span className="tab-row__separator" style={{ marginRight: '20px' }} />
                                <Button
                                  buttonClassName="react-d-flex react-f-direction-column"
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
                                      onClick={option.sold_out
                                        ? null
                                        : () => {
                                          this.selectGroup({ group: row.name, secondary_group: option.name });
                                          this.setWeeksCounter(0);
                                          this.setPrice(option.price);
                                      }}
                                      className={cx(`
                                        tab-row__section
                                        tab-row__section--bg-white
                                        tab-row__section--center
                                        react-center-center
                                        tab-row__secondary-group-header
                                        tab-row__hover`
                                      )}
                                    >
                                      <div className={cx('tab-row__wrapper', {
                                        'tab-row__container--disabled': ((tabIndex > 0) && ((idx + 1 !== tabIndex) && !isStringsEqual(group, row.name))) || option.sold_out,
                                        'sold-out-block': option.sold_out,
                                      })}>
                                        <span className={cx('tab-row__header tab-row__header--medium', {
                                          'tab-row__header--sold': option.sold_out,
                                          'tab-row__header--through': option.sold_out,
                                        })}>
                                          {option.name}
                                        </span>
                                        <span className="sold-out-text">
                                          {option.sold_out && <LocaleString stringKey="sold_out" />}
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
                      isStringsEqual(row.name, weekly_camp)
                        ? (
                            <TabPanel>
                              {this.renderTabPanel({
                                range: createNumbersArray({ from: 8, to: 18 }),
                                boardingOptions: ['Boarding', 'Non-Boarding'],
                                genderOptions: ['male', 'female'],
                                id: row.id
                              })}
                            </TabPanel>
                        ) : (
                          row.options && (
                            row.options.map((option, idx) => {
                              const { age_from, age_to, boarding_options, gender_options } = option;
                              const range = createNumbersArray({ from: age_from, to: age_to });
                              return (
                                <TabPanel key={idx}>
                                  {this.renderTabPanel({ range, boardingOptions: boarding_options, genderOptions: gender_options, id: row.id })}
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
      </AOSFadeInContainer>
    );
  }
}

function TabRowSection({ index = 0, children, tabIndex = 0, className }) {
  return (
    <div children={children} className={cx('tab-row__section tab-row__section--center mb-0', {
      'tab-row__section--disabled': (tabIndex > 0) && (tabIndex !== index),
      [className]: className,
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

function SleepawayRadioBtn({ options, sleepaway, possibleValues, handleChange }) {
  return (
    <Field
      className="content__radio-btn"
      name={stepOneFormFieldsName.sleepaway}
      type="radio"
      options={options}
      component={({ input, options }) => (
        options.map(({ value, stringKey }) => {
          const isDisabled = !include(possibleValues, value);
          const radioBtnClassNames = cx('content__sleepaway-label react-mb-10', {
            'content__sleepaway-label--disabled': isDisabled,
          });
          return (
            <div key={value} className={radioBtnClassNames}>
              <Radio
                {...input}
                className="content__radio-btn--font-16"
                value={value}
                checked={isEqual(sleepaway, value)}
                disabled={isDisabled}
                handleChange={handleChange}
              >
                <LocaleString stringKey={`step_one.sleepaway_${stringKey}`} />{' '}
                {isDisabled && (
                  <span className="content__radio-btn--sold-out">
                    <LocaleString stringKey="sold-out" />
                  </span>
                )}
              </Radio>
            </div>
          );
      }))}
    />
  );
}

function AgeRadioBtnContainer ({ range, age }) {
  return (
    <div className="content__age--block">
      <Field
        name={stepOneFormFieldsName.age}
        type="radio"
        options={range}
        component={({ input, options }) => (
          options.map((value) => (
            <div key={value} className="content__age react-text-left react-mb-10">
              <Radio
                {...input}
                className="content__radio-btn--font-16"
                checked={`${age}` === `${value}`}
                children={value}
                value={value}
              />
            </div>
          ))
        )}
      />
    </div>
  );
}

function GenderRadioBtnContainer ({ options, value, possibleValues }) {
  const defaultPossibleValues = ['male', 'female'];
  const computedPossibleValues = include(possibleValues, 'All') ? defaultPossibleValues : possibleValues;
  return (
    <div className="content__radio-container">
      <Field
        className="content__radio-btn"
        name={stepOneFormFieldsName.gender}
        type="radio"
        options={options}
        component={({ input, options }) => (
          options.map((gender) => {
            const lowerCaseOptionValue = toLower(gender);
            const isDisabled = !include(computedPossibleValues.map(toLower), lowerCaseOptionValue);
            const radioBtnClassNames = cx('content__label', { 'content__label--disabled': isDisabled });
            return (
              <div key={lowerCaseOptionValue} className={radioBtnClassNames}>
                <Radio
                  {...input}
                  className="content__radio-btn--font-16"
                  value={lowerCaseOptionValue}
                  checked={isEqual(lowerCaseOptionValue, toLower(value))}
                  disabled={isDisabled}
                >
                  <LocaleString stringKey={lowerCaseOptionValue} />
                  {isDisabled && (
                    <span className="content__radio-btn--sold-out">
                      <LocaleString stringKey="sold-out" />
                    </span>
                  )}
                </Radio>
              </div>
            );
          })
        )}
      />
    </div>
  );
}

const selector = formValueSelector('wizard');

function StepOneAgeDropdown(args) {
  const { range, input } = args;
  const { value, onChange } = input;
  return (
    <div className="step-one__dropdown-age">
      <Dropdown
        options={range.map(number => ({ id: '' + number, display_name: '' + number, name: '' + number }))}
        handleChange={onChange}
        selectedOption={value || <LocaleString stringKey="select_camper_age" />}
      />
    </div>
  );
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
    sport: sportSelector(state),
    businessType: businessTypeSelector(state),
    packageType: packageTypeSelector(state),
  };
};

function mapDispatchToProps(dispatch) {
  return {
    weeksActions: bindActionCreators(weeksActions, dispatch),
    stepOneActions: bindActionCreators(stepOneActions, dispatch),
    participantActions: bindActionCreators({ addParticipantByCardId }, dispatch),
    stepsActions: bindActionCreators(stepsActions, dispatch),
    gtmStateChange: bindActionCreators(gtmStateChange, dispatch)
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
