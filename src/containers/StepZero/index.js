// Modules
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Row, Col } from 'react-grid-system';
import { Field, Form, reduxForm, formValueSelector } from 'redux-form';
import PropTypes from 'prop-types';
import cx from 'classnames';
import include from 'lodash/includes';
import toLower from 'lodash/toLower';
import isEqual from 'lodash/isEqual';
import scrollToComponent from 'react-scroll-to-component';
// Components
import EmailModal from '../../components/EmailModal';
import LocaleString from '../../components/LocaleString';
import Radio from '../../components/Radio';
import Dropdown from '../../components/Dropdown';
import AOSFadeInContainer from '../../components/AOSFadeInContainer';
import { gtmStateChange, stateChangeTypes } from '../../helpers/GTMService';
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
import { stepOneFormFieldsName, stepOneSecondaryGroupSelector } from './selectors';
// Selectors
import {
  stepOneGroupSelector, stepOneDataSelector,
  stepOneAgeSelector, stepOneGenderSelector, stepOneSleepawaySelector,
} from './selectors';
import { sportSelector, businessTypeSelector, packageTypeSelector } from '../InitialComponent/selectors';
// Constants
import { stepsEnum } from '../../constants/steps';
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
    dataInitialEmail: PropTypes.string,
    dataGender: PropTypes.string,
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
    this.scrollToCurrentComponent();
  }
  
  scrollToCurrentComponent = () => {
    scrollToComponent(this.stepOne.current, { offset: -200, align: 'middle', duration: 1000 });
  };

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
      
      this.props.gtmStateChange(stateChangeTypes.OR_CAMPER_EMAIL);
    }
  };
  render() {
    const { sleepaway, age, gender, dataGender, participantId, dataInitialEmail, genderOptions } = this.props;
  
    const boardingOptions = ['Boarding', 'Non-Boarding'];
    const range = createNumbersArray({ from: 0, to: 10 });
    const genderCollapsed = !!dataGender || (genderOptions && genderOptions.length < 2);
    
    return (
      <AOSFadeInContainer className="step-one" ref={this.stepOne}>
        {!dataInitialEmail && (
          <EmailModal
            onSubmit={this.closeEmailModal}
            shouldShowEmailModal={!participantId}
          />
        )}
        <Container>
          <Row>
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
                <div className="content__form-control" style={{
                  visibility: genderCollapsed ? 'collapse': '',
                  display: genderCollapsed ? 'none': ''
                }}
                >
                  <H3>
                    <LocaleString stringKey="step_one.gender" />
                  </H3>
                  <GenderRadioBtnContainer
                    options={['Male', 'Female']}
                    value={gender}
                    possibleValues={genderOptions}
                    hasPredefinedValue={!!dataGender}
                  />
                </div>
              </Form>
            </div>
            
          </Row>
        </Container>
      </AOSFadeInContainer>
    );
  }
}

function H3({ children }) {
  return (
    <h3 className="content__header content__header--h3">
      {children}
    </h3>
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
        component={({ input, options }) => {
          return (
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
          );
        }}
      />
    </div>
  );
}

function GenderRadioBtnContainer ({ options, value, possibleValues }) {
  const defaultPossibleValues = ['Male', 'Female'];
  const computedPossibleValues = !possibleValues || include(possibleValues, 'All') ? defaultPossibleValues : possibleValues;
  
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
                  <LocaleString stringKey={lowerCaseOptionValue}/>
                  {isDisabled && (
                    <span className="content__radio-btn--sold-out">
                      <LocaleString stringKey="sold-out"/>
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
    participantId: state.participant.id,
    email: selector(state, 'email'),
    sleepaway: stepOneSleepawaySelector(state),
    age: stepOneAgeSelector(state),
    gender: stepOneGenderSelector(state),
    cartId: state.cart.id,
    data: stepOneDataSelector(state),
    group: stepOneGroupSelector(state),
    secondaryGroup: stepOneSecondaryGroupSelector(state),
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
