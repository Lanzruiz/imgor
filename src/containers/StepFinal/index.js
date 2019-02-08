// Modules
import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { Form, Field, reduxForm } from 'redux-form';
import scrollToComponent from 'react-scroll-to-component';
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
  };

  static defaultProps = {
    positions: [],
  };

  componentDidMount() {
    const { sport, participant } = this.props;
    this.finalStepGetCatalogPositions({ sport, participant });
  }

  componentWillMount() {
    this.setDefaultState();
  }

  render() {
    const { positions, selectedPosition, shirtSize } = this.props;
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
          <AOSFadeInContainer className="step-final">
            <Container>
              <Row>
                <Col>
                  <Header
                    header="step_final.header"
                    subHeader="step_final.subHeader"
                  />
                </Col>
              </Row>
              <Col>
                <Row>
                  <Col
                    sm={12}
                    md={12}
                    lg={4}
                    style={{ padding: isMobile ? '0 15px' : 0, borderRight: '1px solid #fff' }}
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
                            <Form className="step-final__form" onSubmit={() => {}}>
                              <label className="step-final__form-control">
                                <Input
                                  inputClassName="step-final__input"
                                  name={stepFinalFormFieldNames.firstName}
                                  label="first name"
                                />
                              </label>
                              <label className="step-final__form-control">
                                <Input
                                  inputClassName="step-final__input"
                                  name={stepFinalFormFieldNames.lastName}
                                  label="last name"
                                />
                              </label>
                              <label className="step-final__form-control">
                                <DatePickerReduxForm
                                  placeholder="Date Of Birth"
                                  name={stepFinalFormFieldNames.dateOfBirth}
                                  inputClassName="step-final__input cursor-pointer"
                                  className="step-final__input"
                                  showTimeSelect={false}
                                  isClearable={false}
                                  dateFormat="MM/DD/YYYY"
                                  maxDate={new Date()}
                                  withPopperPlacement={false}
                                  showYearDropdown
                                  yearDropdownItemNumber={90}
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
                                />
                              </label>
                              <label className="step-final__form-control">
                                <Input
                                  inputClassName="step-final__input"
                                  name={stepFinalFormFieldNames.phone}
                                  label="phone number (optional)"
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
                    style={{ padding: isMobile ? '0 15px' : 0, borderRight: '1px solid #fff' }}
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
                    style={{ padding: isMobile ? '0 15px' : 0, borderRight: '1px solid #fff' }}
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
                <Row>
                  <Col sm={12} style={{ padding: isMobile ? '0 15px' : 0, borderRight: '1px solid #fff' }}>
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
                            <Form className="step-final__form" style={{ maxWidth: (!isMobile && isTablet) ? '100%' : 'calc(100%/3)', marginRight: 'auto' }} onSubmit={() => {}}>
                              <label className="step-final__form-control">
                                <Input
                                  inputClassName="step-final__input"
                                  name={stepFinalFormFieldNames.guardianInformationFirstName}
                                  label="first name"
                                />
                              </label>
                              <label className="step-final__form-control">
                                <Input
                                  inputClassName="step-final__input"
                                  name={stepFinalFormFieldNames.guardianInformationLastName}
                                  label="last name"
                                />
                              </label>
                              <label className="step-final__form-control">
                                <Input
                                  inputClassName="step-final__input"
                                  name={stepFinalFormFieldNames.guardianInformationEmail}
                                  label="email"
                                />
                              </label>
                              <label className="step-final__form-control">
                                <Input
                                  inputClassName="step-final__input"
                                  name={stepFinalFormFieldNames.guardianInformationPhone}
                                  label="phone number"
                                />
                              </label>
                            </Form>
                          </CardContentCol>
                        </CardContentRow>
                      </CardContent>
                    </Card>
                  </Col>
                </Row>
              </Col>
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
    scrollToComponent(this.stepFinal.current, { align: 'top', duration: 500 });
  }
}

function PositionRadioBtn({ options, prefix, position }) {
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
                <Radio
                  {...input}
                  value={position_id}
                  checked={isEqual(position, position_id)}
                  children={name}
                />
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
                      <Radio
                        {...input}
                        value={value}
                        checked={isEqual(shirtSize, value)}
                        children={<LocaleString stringKey={stringKey} />}
                      />
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
                      <Radio
                        {...input}
                        value={value}
                        checked={isEqual(shirtSize, value)}
                        children={<LocaleString stringKey={stringKey} />}
                      />
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
  return {
    positions: finalStepPositionsSelector(state),
    selectedPosition: finalStepSelectedPositionSelector(state),
    shirtSize: finalStepShirtSizeSelector(state),
    sport: sportSelector(state),
    businessType: businessTypeSelector(state),
    packageType: packageTypeSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    finalStepActions: bindActionCreators(finalStepActions, dispatch),
  };
}

export default reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(
  connect(mapStateToProps, mapDispatchToProps)(StepFinal)
);
