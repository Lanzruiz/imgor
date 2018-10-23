// Modules
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Row, Col } from 'react-grid-system';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Field, Form, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
// Components
import EmailModal from '../../components/EmailModal';
import Header from '../../components/Header';
import TabRow from '../../components/TabRow';
import GreenBlock from '../../components/GreenBlock';
import Button from '../../components/Button';
// Actions
import { closeEmailModal } from '../../actions/steps';
import * as weeksActions from '../../actions/weeks';
// Helpers
import validation from '../../helpers/validate';
// Styles
import './styles.scss';

class StepOne extends React.Component {
  static propTypes = {
    weeksCounter: PropTypes.number,
    shouldShowEmailModal: PropTypes.bool,
    weeksActions: PropTypes.objectOf(PropTypes.func),
    stepActions: PropTypes.objectOf(PropTypes.func),
  };

  static defaultProps = {
    weeksCounter: 0,
    shouldShowEmailModal: true,
    weeksActions: {},
    stepActions: {},
  };

  render() {
    const { shouldShowEmailModal, weeksCounter } = this.props;
    return (
      <React.Fragment>
        <EmailModal
          onSubmit={this.closeEmailModal}
          shouldShowEmailModal={shouldShowEmailModal}
        />
        <Container>
          <Row>
            <Col>
              <Header
                header="Step 1 - start by choosing a camp"
                subHeader="Make sure to coose camper sleepaway option, age and gender"
              />
            </Col>
          </Row>
          <TabRow transparent>
            <div className="tab-row__section mb-0" />
            <div className="tab-row__section tab-row__section--center mb-0">
              <GreenBlock className="tab-row__green-block">
                <span className="tab-row__header tab-row__header--green-block">our most</span>
                <span className="tab-row__header tab-row__header--green-block">popular camp</span>
              </GreenBlock>
            </div>
            <div className="tab-row__section tab-row__section--center  mb-0">
              <GreenBlock className="tab-row__green-block">
                <span className="tab-row__header tab-row__header--green-block">the ultimate</span>
                <span className="tab-row__header tab-row__header--green-block">training experience</span>
              </GreenBlock>
            </div>
            <div className="tab-row__section tab-row__section--center  mb-0">
              <GreenBlock className="tab-row__green-block">
                <span className="tab-row__header tab-row__header--green-block">invite only</span>
                <span className="tab-row__header tab-row__header--green-block">programm</span>
              </GreenBlock>
            </div>
          </TabRow>
          <Tabs selectedTabClassName="tab-row__section--selected">
            <TabRow className="tab-row__container align-initial" style={{ minHeight: '90px' }}>
              <TabList className="tab-row__tab-list">
                <Tab className="tab-row__section tab-row__section--bg-transparent center-left">
                  <div>
                    <div style={{ marginBottom: '3px' }}>
                      <span className="tab-row__header white">summer training</span>{' '}
                      <span className="tab-row__header white">programms</span>
                    </div>
                    <div style={{ lineHeight: '8px', fontSize: '8px' }}>
                      <span className="tab-row__header white" style={{ fontSize: '8px' }}>
                        progressive training modeled after
                      </span>{' '}
                      <span className="tab-row__header white" style={{ fontSize: '8px' }}>
                        our boarding athletics
                      </span>
                    </div>
                  </div>
                </Tab>
                <Tab className="tab-row__section tab-row__section--bg-white tab-row__section--center center-center">
                  <span className="tab-row__header">3 week</span>
                  <span className="tab-row__header">training</span>
                  <span className="tab-row__header">programm</span>
                </Tab>
                <Tab className="tab-row__section tab-row__section--bg-white tab-row__section--center center-center">
                  <span className="tab-row__header">5 week</span>
                  <span className="tab-row__header">training</span>
                  <span className="tab-row__header">programm</span>
                </Tab>
                <Tab className="tab-row__section tab-row__section--bg-white tab-row__section--center center-center">
                  <span className="tab-row__header">2 week</span>
                  <span className="tab-row__header">invitation</span>
                  <span className="tab-row__header">programm</span>
                </Tab>
              </TabList>
            </TabRow>
            <TabPanel />
            <TabPanel>
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
                      <h4 className="content__header content__header--h3">choose sleepaway</h4>
                      <label className="content__label">
                        <Field
                          className="content__radio-btn"
                          name="sleepaway"
                          component="input"
                          type="radio"
                          value="yes"
                        />{' '}
                        Yes, sleepaway camp with room in an IMG Academy residence hall
                      </label>
                      <label className="content__label">
                        <Field
                          className="content__radio-btn"
                          name="sleepaway"
                          component="input"
                          type="radio"
                          value="no"
                        />{' '}
                        No, I'll arrange housing myself
                      </label>
                    </div>
                    <div className="content__form-control">
                      <h4 className="content__header content__header--h3">select camper age</h4>
                      <div className="content__radio-container">
                        <label className="content__label">
                          <Field
                            className="content__radio-btn"
                            name="age"
                            component="input"
                            type="radio"
                            value="10"
                          />{' '}10
                        </label>
                        <label className="content__label">
                          <Field
                            className="content__radio-btn"
                            name="age"
                            component="input"
                            type="radio"
                            value="13"
                          />{' '}13
                        </label>
                        <label className="content__label">
                          <Field
                            className="content__radio-btn"
                            name="age"
                            component="input"
                            type="radio"
                            value="16"
                          />{' '}16
                        </label>
                      </div>
                      <div className="content__radio-container">
                        <label className="content__label">
                          <Field
                            className="content__radio-btn"
                            name="age"
                            component="input"
                            type="radio"
                            value="11"
                          />{' '}11
                        </label>
                        <label className="content__label">
                          <Field
                            className="content__radio-btn"
                            name="age"
                            component="input"
                            type="radio"
                            value="14"
                          />{' '}14
                        </label>
                        <label className="content__label">
                          <Field
                            className="content__radio-btn"
                            name="age"
                            component="input"
                            type="radio"
                            value="17"
                          />{' '}17
                        </label>
                      </div>
                      <div className="content__radio-container">
                        <label className="content__label">
                          <Field
                            className="content__radio-btn"
                            name="age"
                            component="input"
                            type="radio"
                            value="12"
                          />{' '}12
                        </label>
                        <label className="content__label">
                          <Field
                            className="content__radio-btn"
                            name="age"
                            component="input"
                            type="radio"
                            value="15"
                          />{' '}15
                        </label>
                        <label className="content__label">
                          <Field
                            className="content__radio-btn"
                            name="age"
                            component="input"
                            type="radio"
                            value="18"
                          />{' '}18
                        </label>
                      </div>
                    </div>
                    <div className="content__form-control">
                      <h4 className="content__header content__header--h3">select camper gender</h4>
                      <div className="content__radio-container">
                        <label className="content__label">
                          <Field
                            className="content__radio-btn"
                            name="gender"
                            component="input"
                            type="radio"
                            value="male"
                          />{' '}
                          Male
                        </label>
                        <label className="content__label">
                          <Field
                            className="content__radio-btn"
                            name="gender"
                            component="input"
                            type="radio"
                            value="female"
                          />{' '}
                          Female
                        </label>
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="tab-content__container tab-row__container">2</div>
            </TabPanel>
            <TabPanel>
              <div className="tab-content__container tab-row__container">3</div>
            </TabPanel>
          </Tabs>
          <TabRow className="tab-row__container align-initial" style={{ minHeight: '90px' }}>
            <div className="tab-row__section center-left">
              <div style={{ marginBottom: '3px' }}>
                <span className="tab-row__header white">year-round</span>{' '}
                <span className="tab-row__header white">weekly camps</span>
              </div>
              <span className="tab-row__header tab-row__header--small white">
                build your own camp experience
              </span>
            </div>
            <div className="tab-row__section tab-row__section--bg-white tab-row__section--center w-75 d-flex align-center justify-evenly">
              <div className="d-flex align-center justify-end w-35">
                <span className="tab-row__header">1 week</span>
                <span className="tab-row__separator" style={{ marginLeft: '20px' }} />
              </div>
              <div className="d-flex align-center justify-center w-30">
                <Button
                  style={{ marginRight: '20px', padding: '4px' }}
                  className="tab-row__header"
                  onClick={this.decrementWeeksCounter}
                  children="-"
                />
                <span className="tab-row__header" style={{ fontSize: '4em' }}>{weeksCounter}</span>
                <Button
                  style={{ marginLeft: '20px', padding: '4px' }}
                  className="tab-row__header"
                  onClick={this.incrementWeeksCounter}
                  children="+"
                />
              </div>
              <div className="d-flex align-center justify-start w-35">
                <span className="tab-row__separator" style={{ marginRight: '20px' }} />
                <span className="d-flex f-direction-column">
                  <span className="tab-row__header">up to</span>
                  <span className="tab-row__header">12 week</span>
                </span>
              </div>
            </div>
          </TabRow>
          <TabRow className="tab-row__container align-initial" style={{ minHeight: '90px' }}>
            <div className="tab-row__section center-left">
              <div style={{ marginBottom: '3px' }}>
                <span className="tab-row__header white">specialty camp</span>
              </div>
              <span className="tab-row__header tab-row__header--small white">
                camps with a specific goal in mind
              </span>
            </div>
            <div className="center-center tab-row__section tab-row__section--bg-white w-25">
              <span className="tab-row__header">spring break</span>
            </div>
            <div className="center-center tab-row__section tab-row__section--bg-white w-25">
              <span className="d-flex align-center justify-center f-direction-column tab-row__header tab-row__header--sold">
                <span className="tab-row__header--through">holiday</span>
                <span className="tab-row__header--small">sold out</span>
              </span>
            </div>
            <div className="center-center tab-row__section tab-row__section--bg-white w-25">
              <span className="tab-row__header">kick & punt</span>
            </div>
          </TabRow>
          <TabRow className="tab-row__container align-initial" style={{ minHeight: '90px' }}>
            <div className="tab-row__section center-left">
              <div style={{ marginBottom: '3px' }}>
                <span className="tab-row__header white">adult camps</span>
              </div>
              <span className="tab-row__header tab-row__header--small white">
                options available for every skill level
              </span>
            </div>
            <div className="center-center tab-row__section tab-row__section--bg-white w-25">
              <span className="tab-row__header">1/2 day</span>
              <span className="tab-row__header">training</span>
            </div>
            <div className="center-center tab-row__section tab-row__section--bg-white w-25">
              <span className="tab-row__header">full day</span>
              <span className="tab-row__header">training</span>
            </div>
            <div className="center-center tab-row__section tab-row__section--bg-white w-25">
              <span className="tab-row__header">3 day</span>
              <span className="tab-row__header">training</span>
            </div>
          </TabRow>
        </Container>
      </React.Fragment>
    );
  }

  closeEmailModal = () => {
    this.props.stepActions.closeEmailModal();
  };

  incrementWeeksCounter = () => {
    this.props.weeksActions.incrementWeeksCounter();
  };

  decrementWeeksCounter = () => {
    this.props.weeksActions.decrementWeeksCounter();
  };
}

const mapStateToProps = (state) => ({
  shouldShowEmailModal: state.steps.shouldShowEmailModal,
  weeksCounter: state.weeks.weeksCounter,
});

const mapDispatchToProps = (dispatch) => ({
  stepActions: bindActionCreators({ closeEmailModal }, dispatch),
  weeksActions: bindActionCreators(weeksActions, dispatch),
});

export default reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate: validation, // <------ validation
})(
  connect(mapStateToProps, mapDispatchToProps)(StepOne)
);
