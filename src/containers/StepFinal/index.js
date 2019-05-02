// Modules
import React, { Fragment } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { Form, Field } from 'redux-form';
//import scrollToComponent from 'react-scroll-to-component';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { ScreenClassRender } from 'react-grid-system';
// Components
import Header from '../../components/Header';
import Card, { CardContent, CardContentRow, CardContentCol } from '../../components/Card';
import LocaleString from '../../components/LocaleString';
import Input from '../../components/Input';
import Radio from '../../components/Radio';
// import InputBirthDayMask from '../../components/InputBirthDayMask';
import DatePickerReduxForm from '../../components/DatePicker';
import AOSFadeInContainer from '../../components/AOSFadeInContainer';
// Actions
import * as finalStepActions from '../../actions/final.step';
import { gtmStateChange, stateChangeTypes } from '../../helpers/GTMService';
import { cartIdSelector, participantIdSelector, stepOneAgeSelector } from '../StepOne/selectors';
// Selectors
import { finalStepPositionsSelector, finalStepSelectedPositionSelector, finalStepShirtSizeSelector } from './selectors';
import { sportSelector, businessTypeSelector, packageTypeSelector } from '../InitialComponent/selectors';
// Constants
import { stepFinalFormFieldNames } from './selectors';
// Styles
import './styles.scss';

class StepFinal extends React.Component {
  static propTypes = {
    finalStepActions: PropTypes.shape({
      finalStepGetCatalogPositionsRequest: PropTypes.func.isRequired,
      finalStepSetDefaultState: PropTypes.func.isRequired,
      updateAllProductsForRefundableInfo: PropTypes.func,
      finalStepRefundableUpdate: PropTypes.func,
      recalculateInsurancePrice: PropTypes.func,
    }),
    sport: PropTypes.string.isRequired,
    positions: PropTypes.arrayOf(
      PropTypes.shape({
        position_id: PropTypes.string,
        name: PropTypes.string,
      }),
    ).isRequired,
    selectedPosition: PropTypes.string,
    shirtSize: PropTypes.string,
    isBusinessTypeForAdult: PropTypes.bool,
  };

  static defaultProps = {
    positions: [],
    dataBusinessTypeForAdult: false,
  };

  componentDidMount() {
    const { sport, participant, initRefundable } = this.props;
    this.props.finalStepActions.finalStepRefundableUpdate(initRefundable);
    this.props.finalStepActions.recalculateInsurancePrice();
    
    this.finalStepGetCatalogPositions({ sport, participant });
    //this.scrollToCurrentComponent();
    this.sendStepToDrupal();
  }

  sendStepToDrupal = () => {
    if(window.updateBookingSteps) {
      window.updateBookingSteps(7);
    }
  };

  scrollToCurrentComponent = () => {
    //scrollToComponent(this, { align: 'top', duration: 500 });
  }

  componentWillMount() {
    this.setDefaultState();
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { email, last_name, phone, first_name } = nextProps.guradianInfo;
    const { selectedPosition, shirtSize } = nextProps;
    
    const differentData =
      JSON.stringify({...nextProps.guradianInfo, selectedPosition, shirtSize})
      !== JSON.stringify({...this.props.guradianInfo, selectedPosition, shirtSize});
    
    if( email && last_name && phone && first_name && differentData && selectedPosition && shirtSize ){
      this.props.gtmStateChange(stateChangeTypes.OR_CAMPER_INFORMATION);
    }
  }
  
  handleConfirmRefundable = (refundableIncoming) => {
    this.props.finalStepActions.finalStepRefundableUpdate(refundableIncoming);
    
    const { cartId, participantId } = this.props;
    
    const data = {
      cartId,
      participantId,
      refundable: refundableIncoming
    };
    
    this.props.finalStepActions.updateAllProductsForRefundableInfo(data);
  };

  render() {
    const { positions, selectedPosition, shirtSize, age, isBusinessTypeForAdult, refundable, refundableLoading, insurancePrice } = this.props;
    const options = [
      {
        stringKey: 'step_final.required_insurance_yes_title',
        stringKeyDesc: 'step_final.required_insurance_yes_description',
        formatString: { price: insurancePrice },
        value: true
      },
      {
        stringKey: 'step_final.required_insurance_no_title',
        stringKeyDesc: 'step_final.required_insurance_no_description',
        value: false
      }
    ];
    
    return (
      <ScreenClassRender render={(screenClass) => {
        let isMobile = false;
        let isTablet = false;
        if (isEqual(screenClass, 'sm') || isEqual(screenClass, 'xs')) {
          isMobile = true;
        } else if (isEqual(screenClass, 'md')) {
          isTablet = true;
        }
        return (
          <AOSFadeInContainer className="step-final" id="step-7">
            <Container>
              <Row>
                <Col>
                  <Header
                    header="step_final.header"
                    subHeader="step_final.subHeader"
                  />
                </Col>
              </Row>
              <Row>
                <Col style={{ padding: '15px' }}>
                  <Card
                    buttonBlock={false}
                    cardHeader={<LocaleString stringKey="step_final.required_insurance" />}
                    cardHeaderCapitalize={true}
                    priceBlock={false}
                    id={223232323}
                  >
                    <CardContent>
                      <CardContentRow>
                        <CardContentCol>
                          <div className="step-final__form-insurance">
                            <div className={`step-final__form-insurance__container ${refundableLoading ? 'loading' : ''}`}>
                              <Radio
                                name="refundable"
                                className="step-final__form-insurance__radio-button"
                                onChange={() => {this.handleConfirmRefundable(true)}}
                                checked={refundable}
                                children={(
                                  <Fragment>
                                    <div className="header">
                                      <LocaleString stringKey={options[0].stringKey} formatString={options[0].formatString} />
                                    </div>
                                    <div className="description">
                                      <LocaleString stringKey={options[0].stringKeyDesc} />
                                    </div>
                                  </Fragment>
                                )}
                              />
      
                              <Radio
                                name="refundable"
                                className="step-final__form-insurance__radio-button"
                                onChange={() => {this.handleConfirmRefundable(false)}}
                                checked={!refundable}
                                children={(
                                  <Fragment>
                                    <div className="header">
                                      <LocaleString stringKey={options[1].stringKey} />
                                    </div>
                                    <div className="description">
                                      <LocaleString stringKey={options[1].stringKeyDesc} />
                                    </div>
                                  </Fragment>
                                )}
                              />
                            </div>
                          </div>
                        </CardContentCol>
                      </CardContentRow>
                    </CardContent>
                  </Card>
                </Col>
              </Row>
              
              <Row>
                <Col
                  sm={12}
                  md={12}
                  lg={4}
                  style={{ padding: '15px' }}
                >
                  <Card
                    buttonBlock={false}
                    cardHeader={<LocaleString stringKey="step_final.camper_information" />}
                    cardHeaderCapitalize={true}
                    id={0}
                    priceBlock={false}
                    style={{ marginBottom: 0 }}
                  >
                    <CardContent>
                      <CardContentRow>
                        <CardContentCol>
                          <Form autoComplete="off" className="step-final__form" onSubmit={() => {}}>
                            <label className="step-final__form-control">
                              <Input
                                inputClassName="step-final__input"
                                name={stepFinalFormFieldNames.firstName}
                                label="first name"
                                autoComplete={false}
                              />
                            </label>
                            <label className="step-final__form-control">
                              <Input
                                inputClassName="step-final__input"
                                name={stepFinalFormFieldNames.lastName}
                                label="last name"
                                autoComplete={false}
                              />
                            </label>
                            <label className="step-final__form-control">
                              <DatePickerReduxForm
                                placeholder="Date Of Birth"
                                name={stepFinalFormFieldNames.dateOfBirth}
                                inputClassName="step-final__input cursor-pointer"
                                className="step-final__input"
                                showTimeSelect={false}
                                readOnly={false}
                                isClearable={false}
                                dateFormat="MM/DD/YYYY"
                                maxDate={new Date()}
                                withPopperPlacement={false}
                                showYearDropdown
                                yearDropdownItemNumber={90}
                                openToDate={new Date((new Date().getFullYear() - age), 0)}
                              />
                              {/*<InputBirthDayMask*/}
                                {/*inputClassName="step-final__input"*/}
                                {/*name={stepFinalFormFieldNames.dateOfBirth}*/}
                                {/*label="date of birth"*/}
                              {/*/>*/}
                            </label>
                            <label className="step-final__form-control">
                              <Input
                                inputClassName="step-final__input"
                                name={stepFinalFormFieldNames.email}
                                label="email (optional)"
                                autoComplete={false}
                              />
                            </label>
                            <label className="step-final__form-control">
                              <Input
                                inputClassName="step-final__input"
                                name={stepFinalFormFieldNames.phone}
                                label="phone number (optional)"
                                autoComplete={false}
                              />
                            </label>
                          </Form>
                        </CardContentCol>
                      </CardContentRow>
                    </CardContent>
                  </Card>
                </Col>
                
                <Col
                  sm={12}
                  md={6}
                  lg={4}
                  style={{ padding: '15px' }}
                >
                  <Card
                    buttonBlock={false}
                    cardHeader={<LocaleString stringKey="step_final.position" />}
                    cardHeaderCapitalize={true}
                    id={1}
                    priceBlock={false}
                    style={{ marginBottom: 0 }}
                  >
                    <CardContent>
                      <CardContentRow>
                        <CardContentCol className="step-final__position">
                          <PositionRadioBtn
                            options={positions}
                            position={selectedPosition}
                          />
                        </CardContentCol>
                      </CardContentRow>
                    </CardContent>
                  </Card>
                </Col>
                
                <Col
                  sm={12}
                  md={6}
                  lg={4}
                  style={{ padding: '15px' }}
                >
                  <Card
                    buttonBlock={false}
                    cardHeader={<LocaleString stringKey="step_final.shirt_size" />}
                    cardHeaderCapitalize={true}
                    id={2}
                    priceBlock={false}
                    style={{ marginBottom: 0 }}
                  >
                    <CardContent>
                      <CardContentRow>
                        <ShirtSizeRadioBtn shirtSize={shirtSize} />
                      </CardContentRow>
                    </CardContent>
                  </Card>
                </Col>
              </Row>

              {!isBusinessTypeForAdult && (
              <Row>
                <Col sm={12} style={{ padding: '15px' }}>
                  <Card
                    buttonBlock={false}
                    cardHeader={<LocaleString stringKey="step_final.guardian_information" />}
                    cardHeaderCapitalize={true}
                    id={3}
                    priceBlock={false}
                  >
                    <CardContent>
                      <CardContentRow>
                        <CardContentCol>
                          <Form autoComplete="off" className="step-final__form" style={{ maxWidth: (!isMobile && isTablet) ? '100%' : 'calc(100%/3)', marginRight: 'auto' }} onSubmit={() => {}}>
                            <label className="step-final__form-control">
                              <Input
                                inputClassName="step-final__input"
                                name={stepFinalFormFieldNames.guardianInformationFirstName}
                                label="first name"
                                autoComplete={false}
                              />
                            </label>
                            <label className="step-final__form-control">
                              <Input
                                inputClassName="step-final__input"
                                name={stepFinalFormFieldNames.guardianInformationLastName}
                                label="last name"
                                autoComplete={false}
                              />
                            </label>
                            <label className="step-final__form-control">
                              <Input
                                inputClassName="step-final__input"
                                name={stepFinalFormFieldNames.guardianInformationEmail}
                                label="email"
                                autoComplete={false}
                              />
                            </label>
                            <label className="step-final__form-control">
                              <Input
                                inputClassName="step-final__input"
                                name={stepFinalFormFieldNames.guardianInformationPhone}
                                label="phone number"
                                autoComplete={false}
                              />
                            </label>
                          </Form>
                        </CardContentCol>
                      </CardContentRow>
                    </CardContent>
                  </Card>
                </Col>
              </Row>
              )}
              <Row><div className="end-of-configurator"><p>end of camp builder</p></div></Row>
            </Container>
          </AOSFadeInContainer>
        );
      }} />
    );
  }

  finalStepGetCatalogPositions = ({ sport, participant }) => {
    this.props.finalStepActions.finalStepGetCatalogPositionsRequest({ sport, participant });
  };

  setDefaultState = () => {
    this.props.finalStepActions.finalStepSetDefaultState();
  };

  scrollToComponent = () => {
    //scrollToComponent(this.stepFinal.current, { align: 'top', duration: 500 });
  }
}

function PositionRadioBtn({ options, prefix, position }) {
  const handleSelect = (input, position_id) => {
    if(position_id !== position || !position){
      input.onChange(position_id);
      input.onBlur();
    }
  };
  
  return (
    <ul className="step-final__form">
      <Field
        name={stepFinalFormFieldNames.position}
        type="radio"
        options={options}
        component={({ input, options }) => (
          options.map(({ position_id, name }) => {
            return (
              <li className="step-final__radio" key={position_id}>
                <label
                  className="radio-btn__container radio-btn__container--regular radio-btn__container--pointer"
                  onClick={() => { handleSelect(input, position_id) }}
                >
                  <input
                    className="radio-btn__btn"
                    type="radio"
                    name={input.name}
                    checked={position === position_id}
                    onChange={() => null}
                  />
                  {name}
                </label>
              </li>
            );
          })
        )}
      />
    </ul>
  );
};

function ShirtSizeRadioBtn({ shirtSize }) {
  const options = [
    { id: 1, value: 'xs', stringKey: 'step_final.shirt_size.x-small' },
    { id: 2, value: 's', stringKey: 'step_final.shirt_size.small' },
    { id: 3, value: 'm', stringKey: 'step_final.shirt_size.medium' },
    { id: 4, value: 'l', stringKey: 'step_final.shirt_size.large' },
    { id: 5, value: 'xl', stringKey: 'step_final.shirt_size.x-large' },
    { id: 6, value: 'xxl', stringKey: 'step_final.shirt_size.xx-large' },
  ];
  
  const handleSelect = (input, value) => {
    if(value !== shirtSize || !shirtSize){
      input.onChange(value);
      input.onBlur();
    }
  };
  
  return (
    <Field
      name={stepFinalFormFieldNames.shirtSize}
      type="radio"
      options={options}
      component={({ input, options }) => (
        <React.Fragment>
          <CardContentCol>
            <ul className="step-final__form">
              {
                options.map(({ id, value, stringKey }) => {
                  return isEqual(id % 2, 0) && (
                    <li key={id} className="step-final__radio">
  
                      <label
                        className="radio-btn__container radio-btn__container--regular radio-btn__container--pointer"
                        onClick={() => { handleSelect(input, value) }}
                      >
                        <input
                          className="radio-btn__btn"
                          type="radio"
                          name={input.name}
                          checked={shirtSize === value}
                          onChange={() => null}
                        />
                        <LocaleString stringKey={stringKey} />
                      </label>
                    </li>
                  );
                })
              }
            </ul>
          </CardContentCol>
          <CardContentCol>
            <ul className="step-final__form">
              {
                options.map(({ id, value, stringKey }) => {
                  return !isEqual(id % 2, 0) && (
                    <li key={id} className="step-final__radio">
                      <label
                        className="radio-btn__container radio-btn__container--regular radio-btn__container--pointer"
                        onClick={() => { handleSelect(input, value) }}
                      >
                        <input
                          className="radio-btn__btn"
                          type="radio"
                          name={input.name}
                          checked={shirtSize === value}
                          onChange={() => null}
                        />
                        <LocaleString stringKey={stringKey} />
                      </label>
                    </li>
                  );
                })
              }
            </ul>
          </CardContentCol>
        </React.Fragment>
      )}
    />
  );
}

function mapStateToProps(state) {
  const { cart: { participants }, form: { wizard } } = state;
  
  const products = (participants || []).reduce((acc, v) => {
    acc = [...acc, ...v.products];
    return acc;
  }, []);
  
  const initRefundable = products.reduce((acc, v) => {
    if(v.refundable){
      acc = true;
    }
    return acc;
  }, false);
  
  return {
    positions: finalStepPositionsSelector(state),
    selectedPosition: finalStepSelectedPositionSelector(state),
    shirtSize: finalStepShirtSizeSelector(state),
    sport: sportSelector(state),
    businessType: businessTypeSelector(state),
    packageType: packageTypeSelector(state),
    age: stepOneAgeSelector(state),
    cartId: cartIdSelector(state),
    participantId: participantIdSelector(state),
    initRefundable: initRefundable,
    refundable: state.finalStep.refundable,
    refundableLoading: state.finalStep.refundableLoading,
    insurancePrice: state.finalStep.insurancePrice,
    guradianInfo: ((wizard || {}).values || {}).guardian_information || {}
  };
}

function mapDispatchToProps(dispatch) {
  return {
    finalStepActions: bindActionCreators(finalStepActions, dispatch),
    gtmStateChange: bindActionCreators(gtmStateChange, dispatch)
  };
}

// export default reduxForm({
//   form: 'wizard', // <------ same form name
//   destroyOnUnmount: false, // <------ preserve form data
//   forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
// })(
//   connect(mapStateToProps, mapDispatchToProps)(StepFinal)
// );


export default  connect(mapStateToProps, mapDispatchToProps)(StepFinal)
