// Modules
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Row, Col } from 'react-grid-system';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Field, Form, reduxForm, formValueSelector } from 'redux-form';
import PropTypes from 'prop-types';
import cx from 'classnames';
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
// Helpers
import validation from '../../helpers/validate';
// Constants
import { minWeekCount, maxWeekCount } from '../../constants/weeks';
// Styles
import './styles.scss';
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
    }),
    participantActions: PropTypes.shape({
      addParticipantByCardId: PropTypes.func.isRequired,
    }),
    participantId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
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
  };

  static defaultProps = {
    weeksCounter: 0,
    shouldShowEmailModal: true,
    weeksActions: {},
    stepActions: {},
  };

  componentDidMount() {
    const { sport } = this.props;
    this.props.stepOneActions.getCatalogCampsGroup({ sport });
  }

  render() {
    const { weeksCounter, participantId, data } = this.props;
    return (
      <React.Fragment>
        <EmailModal
          onSubmit={this.closeEmailModal}
          shouldShowEmailModal={!participantId}
        />
        <Container style={{ marginBottom: '65px' }}>
          <Row>
            <Col>
              <Header
                header="step_one.header"
                subHeader="step_one.sub_header"
              />
            </Col>
          </Row>
          <TabRow transparent>
            <div className="tab-row__section mb-0" />
            <div className="tab-row__section tab-row__section--center mb-0">
              <GreenBlock className="tab-row__green-block">
                <span className="tab-row__header tab-row__header--green-block">
                  <LocaleString stringKey="step_one.tabs.our_most" />
                </span>
                <span className="tab-row__header tab-row__header--green-block">
                  <LocaleString stringKey="step_one.tabs.popular_camp" />
                </span>
              </GreenBlock>
            </div>
            <div className="tab-row__section tab-row__section--center mb-0">
              <GreenBlock className="tab-row__green-block">
                <span className="tab-row__header tab-row__header--green-block">
                  <LocaleString stringKey="step_one.tabs.the_ultimate" />
                </span>
                <span className="tab-row__header tab-row__header--green-block">
                  <LocaleString stringKey="step_one.tabs.training_experience" />
                </span>
              </GreenBlock>
            </div>
            <div className="tab-row__section tab-row__section--center  mb-0">
              <GreenBlock className="tab-row__green-block">
                <span className="tab-row__header tab-row__header--green-block">
                  <LocaleString stringKey="step_one.tabs.invite_only" />
                </span>
                <span className="tab-row__header tab-row__header--green-block">
                  <LocaleString stringKey="step_one.tabs.programm" />
                </span>
              </GreenBlock>
            </div>
          </TabRow>
          {data.map((row, idx) => {
            if ((row.options.length === 1) && (row.options[0].name === 'Other')) {
              return (
                <TabRow className="tab-row__container align-initial" key={idx}>
                  <div className="tab-row__section center-left">
                    <div style={{ marginBottom: '3px' }}>
                      <span className={cx(`
                        tab-row__header
                        tab-row__header--mw-initial
                        tab-row__header--regular
                        text-left
                        white`)}
                      >
                        {row.name}
                      </span>
                    </div>
                  </div>
                  <div className={cx(`
                    tab-row__section
                    tab-row__section--bg-white
                    tab-row__section--center
                    w-75
                    d-flex
                    align-center
                    justify-evenly`)}
                  >
                    <div className="d-flex align-center justify-end w-35">
                      <Button onClick={() => this.setWeeksCounter(minWeekCount)}>
                        <span className="tab-row__header">
                          {minWeekCount} <LocaleString stringKey="week" />
                        </span>
                      </Button>
                      <span className="tab-row__separator" style={{ marginLeft: '20px' }} />
                    </div>
                    <div className="d-flex align-center justify-center w-30">
                      <Button
                        style={{ marginRight: '20px', padding: '4px' }}
                        className="tab-row__header"
                        onClick={this.decrementWeeksCounter}
                        children="-"
                      />
                      <span className="tab-row__header" style={{ fontSize: '4em' }}>
                        {weeksCounter}
                      </span>
                      <Button
                        style={{ marginLeft: '20px', padding: '4px' }}
                        className="tab-row__header"
                        onClick={this.incrementWeeksCounter}
                        children="+"
                      />
                    </div>
                    <div className="d-flex align-center justify-start w-35">
                      <span className="tab-row__separator" style={{ marginRight: '20px' }} />
                      <Button
                        buttonClassName="d-flex f-direction-column"
                        onClick={() => this.setWeeksCounter(maxWeekCount)}
                      >
                        <span className="tab-row__header">
                          <LocaleString stringKey="up_to" />
                        </span>
                        <span className="tab-row__header">
                          {maxWeekCount} <LocaleString stringKey="week" />
                        </span>
                      </Button>
                    </div>
                  </div>
                </TabRow>
              );
            }
            return (
              <React.Fragment key={idx}>
                <Tabs
                  selectedTabClassName="tab-row__section--selected"
                  disabledTabClassName="tab-row__section--disabled"
                >
                  <TabRow className="tab-row__container align-initial">
                    <TabList className="tab-row__tab-list">
                      <Tab
                        className="tab-row__section tab-row__section--bg-transparent center-left"
                        onClick={() => this.selectGroup({ group: null, secondary_group: null })}
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
                      {row.options && (
                        row.options.map((option, idx) => {
                          return (
                            <Tab
                              key={idx}
                              onClick={() => this.selectGroup({ group: row.name, secondary_group: option.name })}
                              className={cx(`
                                tab-row__section
                                tab-row__section--bg-white
                                tab-row__section--center
                                center-center`)
                              }
                            >
                              <span className="tab-row__header tab-row__header--medium">
                                {option.name}
                              </span>
                            </Tab>
                          );
                        })
                      )}
                    </TabList>
                  </TabRow>
                  <TabPanel />
                  {row.options && (
                    row.options.map((item, idx) => {
                      return (
                        <TabPanel key={idx}>
                          {this.renderTabPanel(item.name)}
                        </TabPanel>
                      );
                    })
                  )}
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

  renderTabPanel = (name = '') => {
    const regExp = /\s/g;
    const prefix = name.toLowerCase().replace(regExp,'_');
    return (
      <div className="tab-content__container tab-row__container content">
        <div className="content__first-col">
          <h2 className="content__header content__header--h2">
            our most popular camp
          </h2>
          <p className="content__paragraph">
            Perfect for campers ages 10-18. Expand upon your current knowledge of the game while increasing
            your position-specific scills and profisiency through the best progressive youth football camp setting
            that also introduces 1-on-1 completion. Discover the ideal environment for growth and maturity both
            on the field and as an overall athlete.
          </p>
          <h4 className="content__header content__header--h4">week 1: technical skill development</h4>
          <p className="content__paragraph">
            QB: Throwing mechanics; 3- and 5- step drops. RB/WR: Footwork; agility; ball catching and route
            running. DB/LB: Alignment; coverage and taskling fundamentals. OL/DL: Stance/start; pass rush and
            pro technique; run blocking. K/P: Leg swing; ball striking; stride; short and long distance kicking.
          </p>
          <h4 className="content__header content__header--h4">week 2: pre-competition</h4>
          <p className="content__paragraph">
            Position specific refinement of mechanics and footwork, classroom instruction and understanding
            critical fundamental aspects.
          </p>
          <h4 className="content__header content__header--h4">week 3: competition</h4>
          <p className="content__paragraph">
            1-on-1 competitive drills and video analysis/classroom discussion of individual technique. QB: Half-
            field routes and reads; 1-on-1 drills RB/WB: Post-snap adjustments; 1-on-1s vs. DB/LB: pattern
            reads; 1-on-1s vs. RB/WR & OL/DL: Post snap reactions,; understanding stunts/blitzes; 1-on-1 pass
            pro and pass rush competition K/P: Situational kicking and punting; directional kicking; pooch punts;
            goal line punting; on-side kicks
          </p>
        </div>
        <div className="content__second-col">
          <Form onSubmit={this.props.handleSubmit(() => {})}>
            <div className="content__form-control">
              <h4 className="content__header content__header--h3">
                <LocaleString stringKey="step_one.choose_sleepaway" />
              </h4>
              <div className="content__sleepaway-label mb-10">
                <Field
                  className="content__radio-btn"
                  name={`${prefix}_sleepaway`}
                  type="radio"
                  value="yes"
                  component={({ input }) => (
                    <Radio {...input}>
                      <LocaleString stringKey="step_one.sleepaway_yes" />
                    </Radio>
                  )}
                />
              </div>
              <div className="content__sleepaway-label mb-10">
                <Field
                  className="content__radio-btn"
                  name={`${prefix}_sleepaway`}
                  type="radio"
                  value="no"
                  component={({ input }) => (
                    <Radio {...input}>
                      <LocaleString stringKey="step_one.sleepaway_no" />
                    </Radio>
                  )}
                />
              </div>
            </div>
            <div className="content__form-control">
              <h4 className="content__header content__header--h3">
                <LocaleString stringKey="step_one.select_camper_age" />
              </h4>
              <div className="content__radio-container">
                <div className="mb-10">
                  <Field
                    className="content__radio-btn"
                    name={`${prefix}_age`}
                    type="radio"
                    value="10"
                    component={({ input }) => (
                      <Radio {...input} children={10} />
                    )}
                  />
                </div>
                <div className="mb-10">
                  <Field
                    className="content__radio-btn"
                    name={`${prefix}_age`}
                    type="radio"
                    value="13"
                    component={({ input }) => (
                      <Radio {...input} children={13} />
                    )}
                  />
                </div>
                <div className="mb-10">
                  <Field
                    className="content__radio-btn"
                    name={`${prefix}_age`}
                    type="radio"
                    value="16"
                    component={({ input }) => (
                      <Radio {...input} children={16} />
                    )}
                  />
                </div>
              </div>
              <div className="content__radio-container">
                <div className="mb-10">
                  <Field
                    className="content__radio-btn"
                    name={`${prefix}_age`}
                    type="radio"
                    value="11"
                    component={({ input }) => (
                      <Radio {...input} children={11} />
                    )}
                  />
                </div>
                <div className="mb-10">
                  <Field
                    className="content__radio-btn"
                    name={`${prefix}_age`}
                    type="radio"
                    value="14"
                    component={({ input }) => (
                      <Radio {...input} children={14} />
                    )}
                  />
                </div>
                <div className="mb-10">
                  <Field
                    className="content__radio-btn"
                    name={`${prefix}_age`}
                    type="radio"
                    value="17"
                    component={({ input }) => (
                      <Radio {...input} children={17} />
                    )}
                  />
                </div>
              </div>
              <div className="content__radio-container">
                <div className="mb-10">
                  <Field
                    className="content__radio-btn"
                    name={`${prefix}_age`}
                    type="radio"
                    value="12"
                    component={({ input }) => (
                      <Radio {...input} children={12} />
                    )}
                  />
                </div>
                <div className="mb-10">
                  <Field
                    className="content__radio-btn"
                    name={`${prefix}_age`}
                    type="radio"
                    value="15"
                    component={({ input }) => (
                      <Radio {...input} children={15} />
                    )}
                  />
                </div>
                <div className="mb-10">
                  <Field
                    className="content__radio-btn"
                    name={`${prefix}_age`}
                    type="radio"
                    value="18"
                    component={({ input }) => (
                      <Radio {...input} children={18} />
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="content__form-control">
              <h4 className="content__header content__header--h3">
                <LocaleString stringKey="step_one.gender" />
              </h4>
              <div className="content__radio-container">
                <div className="content__label">
                  <Field
                    className="content__radio-btn"
                    name={`${prefix}_gender`}
                    type="radio"
                    value="male"
                    component={({ input }) => (
                      <Radio {...input}>
                        <LocaleString stringKey="male" />
                      </Radio>
                    )}
                  />
                </div>
                <div className="content__label">
                  <Field
                    className="content__radio-btn"
                    name={`${prefix}_gender`}
                    type="radio"
                    value="female"
                    component={({ input }) => (
                      <Radio {...input}>
                        <LocaleString stringKey="female" />
                      </Radio>
                    )}
                  />
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    );
  }

  selectGroup = ({ group, secondary_group }) => {
    this.props.stepOneActions.selectGroup({ group, secondary_group });
  }
}

const selector = formValueSelector('wizard');

function mapStateToProps(state) {
  return {
    weeksCounter: state.weeks.weeksCounter,
    participantId: state.participant.id,
    email: selector(state, 'email'),
    cartId: state.cart.id,
    data: state.stepOne.data,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    weeksActions: bindActionCreators(weeksActions, dispatch),
    stepOneActions: bindActionCreators(stepOneActions, dispatch),
    participantActions: bindActionCreators({ addParticipantByCardId }, dispatch),
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
