// Modules
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import isEqual from 'lodash/isEqual';
import { reduxForm, change } from 'redux-form';
import toNumber from 'lodash/toNumber';
import { PURGE } from 'redux-persist';
import { reset } from 'redux-form';
import AOS from 'aos';
// Providers
import ReactLocalization from '../../providers/ReactLocalization';
// Components
import WizardForm from '../WizardForm';
import StepOne from '../StepOne';
import StepTwo from '../StepTwo';
import StepThree from '../StepThree';
import StepFour from '../StepFour';
import StepFive from '../StepFive';
import StepSix from '../StepSix';
import StepFinal from '../StepFinal';
// Selectors
import { languageSelelector, lastChangedSelector } from '../InitialComponent/selectors';
// Actions
import { setMaxStepValue } from '../../actions/steps';
import { createCartRequest } from '../../actions/cart';
import { setInitialSettings } from '../../actions/initialSettings';
import { selectGroup } from '../../actions/step.one';
// Styles
import './styles.scss';

class App extends React.Component {
  static propTypes = {
    stepActions: PropTypes.shape({
      setMaxStepValue: PropTypes.func.isRequired,
    }),
    cartActions: PropTypes.shape({
      createCartRequest: PropTypes.func.isRequired,
    }),
    lang: PropTypes.string,
    cartId:  PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    maxStepValue: PropTypes.number,
    sport: PropTypes.string,
    packageType: PropTypes.string.isRequired,
    businessType: PropTypes.string.isRequired,
    redirectUrlShopify: PropTypes.string,
  };

  static defaultProps = {
    sport: '',
    packageType: '',
    businessType: '',
  };

  constructor(props) {
    super(props);
    // To add more steps just add component into this array
    this.wizardFormChildren = [
      <StepOne
        key="0"
        dataGroup={props.dataGroup}
        dataSecondaryGroup={props.dataSecondaryGroup}
        dataGender={props.dataGender}
        dataBusinessType={props.dataBusinessType}
      />,
      <StepTwo key="1" />,
      <StepThree key="2" />,
      <StepFour
        key="3"
        programType="Concentration"
      />,
      <StepFive key="4" />,
      <StepSix key="5" />,
      <StepFinal key="6" />,
    ];
  }

  componentDidMount() {
    const {
      maxStepValue, cartId, gender, group, secondaryGroup, dataLastChanged, dataAppKey,
      redirectUrlShopify, sport, businessType, urlToNoProps, lastChanged, dispatch,
    } = this.props;

    const currentMaxStepValue = this.wizardFormChildren.length;
    const dataLastChangedNumder = toNumber(dataLastChanged);
    const lastChangedNumber = toNumber(lastChanged);
    const shouldPurgeState = (dataLastChangedNumder - lastChangedNumber) > 0;

    if (shouldPurgeState) {
      dispatch({ type: PURGE, key: dataAppKey, result: () => null });
      dispatch( reset('wizard'), );
    }

    if (!isEqual(maxStepValue, currentMaxStepValue)) {
      this.props.stepActions.setMaxStepValue(currentMaxStepValue);
    }

    if (!cartId) {
      this.props.cartActions.createCartRequest();
    }

    const initialSettings = {
      gender,
      group,
      secondaryGroup,
      redirectUrlShopify,
      sport,
      businessType,
      urlToNoProps,
      lastChanged: dataLastChanged,
    };

    this.setInitialSettings(initialSettings);
    AOS.init();
  }

  componentDidUpdate(prevProps) {
    const { cartId } = this.props;
    if (cartId !== prevProps.cartId && !cartId) {
      this.props.cartActions.createCartRequest();
    }
  }

  render() {
    const { lang, redirectUrlShopify, contentPath } = this.props;
    return (
      <ReactLocalization lang={lang} contentPath={contentPath}>
        <WizardForm redirectUrlShopify={redirectUrlShopify}>
          {() => this.wizardFormChildren}
        </WizardForm>
      </ReactLocalization>
    );
  }

  setInitialSettings = (initialSettings) => {
    const { gender, group, secondaryGroup } = initialSettings;
    if (gender) {
      this.props.dispatch( change('wizard', 'gender', gender), );
    }
    if (group || secondaryGroup) {
      this.props.stepOneActions.selectGroup({ group, secondary_group: secondaryGroup });
    }
    this.props.initialSettingsActions.setInitialSettings(initialSettings);
  };
}

function mapStateToProps(state) {
  return {
    cartId: state.cart.id,
    maxStepValue: state.steps.maxStepValue,
    participantId: state.participant.id,
    lang: languageSelelector(state),
    initialValues: { gender: state.initialSettings.gender },
    lastChanged: lastChangedSelector(state),
  };
};

function mapDispatchToProps(dispatch) {
  return {
    stepActions: bindActionCreators({ setMaxStepValue }, dispatch),
    cartActions: bindActionCreators({ createCartRequest }, dispatch),
    initialSettingsActions: bindActionCreators({ setInitialSettings }, dispatch),
    stepOneActions: bindActionCreators({ selectGroup }, dispatch),
  };
};

export default reduxForm({ form: 'wizard', destroyOnUnmount: false })(
  connect(mapStateToProps, mapDispatchToProps)(App)
);
