// Modules
import PropTypes from 'prop-types';
import React from 'react';
import { Col, Container, Row } from 'react-grid-system';
import { connect } from 'react-redux';
//import scrollToComponent from 'react-scroll-to-component';
import { bindActionCreators } from 'redux';
import { formValueSelector, reduxForm } from 'redux-form';
import { addParticipantByCardId } from '../../actions/participant';
import * as stepOneActions from '../../actions/step.one';
import * as stepsActions from '../../actions/steps';
import * as stepZeroActions from '../../actions/step.zero';
// Actions
import * as weeksActions from '../../actions/weeks';
// Components
import AOSFadeInContainer from '../../components/AOSFadeInContainer';
import Card, { CardContent, CardContentCol, CardContentRow } from '../../components/Card';
import EmailModal from '../../components/EmailModal';
import Header from '../../components/Header';
import LocaleString from '../../components/LocaleString';
import { stepsEnum } from '../../constants/steps';
import AgeRadioBtnContainer from './components/AgeRadioBtnContainer';
import GenderRadioBtnContainer from './components/GenderRadioBtnContainer';
import SleepawayRadioBtn from './components/SleepawayRadioBtn';
// Constants
import createNumbersArray from '../../helpers/createNumbersArray';
import { gtmStateChange, stateChangeTypes } from '../../helpers/GTMService';
import isStringsEqual from '../../helpers/isStringsEqual';
// Helpers
import validation from '../../helpers/validate';
// Selectors
import { businessTypeSelector, sportSelector } from '../InitialComponent/selectors';
import { stepOneAgeSelector, stepOneGenderSelector, stepOneSleepawaySelector } from './selectors';
// Styles
import './styles.scss';

class StepOne extends React.Component {
  constructor(props) {
    super(props);
    this.stepZero = React.createRef();
  }

  componentDidMount() {
    //this.scrollToCurrentComponent();
    this.sendStepToDrupal();
  }

  sendStepToDrupal = () => {
    if(window.updateBookingSteps) {
      window.updateBookingSteps(0);
    }
  };
  
  scrollToCurrentComponent = () => {
    //scrollToComponent(this.stepZero.current, { offset: -200, align: 'middle', duration: 1000 });
  };

  componentDidUpdate(prevProps) {
    const { sport, dataGender, dataGroup, dataBusinessType } = this.props;
    const isSportChanged = !isStringsEqual(sport, prevProps.sport);
    if (isSportChanged) {
      const args = {
        sport,
        gender: dataGender,
        group: dataGroup,
        businessType: dataBusinessType,
      };
      this.props.stepZeroActions.getCatalogCampsHistogramRequestOnly(args);
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
      this.props.gtmStateChange(stateChangeTypes.OR_CAMPER_EMAIL);
    }
  };
  
  render() {
    const {
      sleepaway, age, gender, dataGender, participantId, dataInitialEmail,
      genderOptions, loading, minAge, maxAge, genders, hasData, dataBusinessType
    } = this.props;
  
    const boardingOptions = ['Boarding', 'Non-Boarding'];
    const range = createNumbersArray({ from: minAge, to: maxAge });
    const genderCollapsed = !!dataGender || (genderOptions && genderOptions.length < 2);
    const shouldRenderAgesAsDropdown = (dataBusinessType || '').toLowerCase().indexOf('adult') !== -1;
  
    return (
      <AOSFadeInContainer className="step-zero" id="step-0" ref={this.stepZero}>
        {!dataInitialEmail && (
          <EmailModal
            onSubmit={this.closeEmailModal}
            shouldShowEmailModal={!participantId}
          />
        )}
        {!loading && hasData && (
          <Container>
            <Row>
              <Col>
                <Header
                  header="step_zero.header"
                  subHeader="step_zero.sub_header"
                  formatString={{ stepNumber: stepsEnum.zero }}
                />
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={12} lg={genderCollapsed ? 6 : 4} style={{ padding: '15px' }}>
                <Card
                  buttonBlock={false}
                  cardHeader={<LocaleString stringKey="step_zero.choose_sleepaway"/>}
                  cardHeaderCapitalize={true}
                  id={0}
                  priceBlock={false}
                  style={{ marginBottom: 0 }}
                >
                  <CardContent>
                    <CardContentRow>
                      <CardContentCol>
                        <div className="content__form-control">
                          <SleepawayRadioBtn
                            options={[ { value: 'Boarding', stringKey: 'yes' }, {
                              value: 'Non-Boarding',
                              stringKey: 'no'
                            } ]}
                            sleepaway={sleepaway}
                            possibleValues={boardingOptions}
                            handleChange={() => {
                              this.props.gtmStateChange(stateChangeTypes.OR_CAMPER_BOARDING);
                            }}
                          />
                        </div>
                      </CardContentCol>
                    </CardContentRow>
                  </CardContent>
                </Card>
              </Col>
              <Col sm={12} md={12} lg={genderCollapsed ? 6 : 4} style={{ padding: '15px' }}>
                <Card
                  buttonBlock={false}
                  cardHeader={<LocaleString stringKey="step_zero.select_camper_age"/>}
                  cardHeaderCapitalize={true}
                  id={2}
                  priceBlock={false}
                  style={{ marginBottom: 0 }}
                >
                  <CardContent>
                    <CardContentRow>
                      <div className="content__form-control">
                        {!loading && (
                          <AgeRadioBtnContainer
                            age={age}
                            range={range}
                            isDropdown={shouldRenderAgesAsDropdown}
                          />
                        )}
                      </div>
                    </CardContentRow>
                  </CardContent>
                </Card>
              </Col>
              <Col sm={12} md={12} lg={genderCollapsed ? 0 : 4} style={{
                padding: '15px',
                visibility: genderCollapsed ? 'collapse' : '',
                display: genderCollapsed ? 'none' : ''
              }}>
                <Card
                  buttonBlock={false}
                  cardHeader={<LocaleString stringKey="step_zero.gender"/>}
                  cardHeaderCapitalize={true}
                  id={2}
                  priceBlock={false}
                  style={{ marginBottom: 0 }}
                >
                  <CardContent>
                    <CardContentRow>
                      <div className="content__form-control">
                        {!loading && (
                          <GenderRadioBtnContainer
                            options={genders}
                            value={gender}
                            possibleValues={genderOptions}
                            hasPredefinedValue={!!dataGender}
                          />
                        )}
                      </div>
                    </CardContentRow>
                  </CardContent>
                </Card>
              </Col>
            </Row>
          </Container>
        )}
        {loading || hasData || (
          <Container className="no-data">
            <Row>
              <Col sm={12} md={6} lg={4}>
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
                    <div className="icons__container advisor-cta-call">
                      <div className="icon-phone" />
                      <span className="icons__text">
                        <LocaleString stringKey="step_two.questions.call" />
                      </span>
                    </div>
                    <div className="icons__container advisor-cta-chat">
                      <div className="icon-message-bulb-square-o" />
                      <span className="icons__text">
                        <LocaleString stringKey="step_two.questions.chat" />
                      </span>
                    </div>
                    <div className="icons__container advisor-cta-email">
                      <div className="icon-file" />
                      <span className="icons__text">
                        <LocaleString stringKey="step_two.questions.email" />
                      </span>
                    </div>
                  </div>
                </div>
              </Col>
              <Col sm={12} md={6} lg={8} style={{padding: '15px', paddingTop: 0, paddingBottom: 0}}>
                <div className="empty_box">
                  <div className="text danger">
                    {loading ? 'Loading' : 'NO DATES AVAILABLE'}
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        )}
        {loading && (
          <Container className="no-data">
            <Row>
              <Col sm={12} md={6} lg={8}>
                <div className="empty_box">
                  <div className="text">
                    Loading
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        )}
        
      </AOSFadeInContainer>
    );
  }
}

StepOne.propTypes = {
  participantId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  stepsActions: PropTypes.shape({
    setStepsCounter: PropTypes.func.isRequired,
  }),
  stepZeroActions: PropTypes.shape({
    getCatalogCampsHistogramRequestOnly: PropTypes.func,
  }),
  group: PropTypes.string,
  sleepaway: PropTypes.string,
  age: PropTypes.string,
  gender: PropTypes.string,
  dataInitialEmail: PropTypes.string,
  dataGender: PropTypes.string,
  minAge: PropTypes.number,
  maxAge: PropTypes.number,
  loading: PropTypes.bool,
};

StepOne.defaultProps = {
  weeksCounter: 0,
  shouldShowEmailModal: true,
  weeksActions: {},
  stepActions: {},
  tabIndex: 0,
  weeksLengthNumber: 0,
};


const selector = formValueSelector('wizard');

function mapStateToProps(state) {
  return {
    minAge: state.stepZero.minAge,
    maxAge: state.stepZero.maxAge,
    loading: state.stepZero.loading,
    genders: state.stepZero.genders,
    hasData: state.stepZero.total > 0,
    participantId: state.participant.id,
    email: selector(state, 'email'),
    sleepaway: stepOneSleepawaySelector(state),
    age: stepOneAgeSelector(state),
    gender: stepOneGenderSelector(state),
    cartId: state.cart.id,
    sport: sportSelector(state),
    businessType: businessTypeSelector(state),
  };
};

function mapDispatchToProps(dispatch) {
  return {
    weeksActions: bindActionCreators(weeksActions, dispatch),
    stepOneActions: bindActionCreators(stepOneActions, dispatch),
    stepZeroActions: bindActionCreators(stepZeroActions, dispatch),
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
