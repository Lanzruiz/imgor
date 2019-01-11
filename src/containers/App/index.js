// Modules
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import isEqual from 'lodash/isEqual';
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
import {
  languageSelelector, businessTypeSelector, packageTypeSelector, sportSelector,
} from '../InitialComponent/selectors';
// Actions
import { setMaxStepValue } from '../../actions/steps';
import { createCartRequest } from '../../actions/cart';

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
  };

  constructor(props) {
    super(props);
    // To add more steps just add component into this array
    this.wizardFormChildren = [
      <StepOne
        key="0"
        sport={props.sport}
      />,
      <StepTwo
        key="1"
        sport={props.sport}
        packageType={props.packageType}
        businessType={props.businessType}
      />,
      <StepThree
        key="2"
        sport={props.sport}
        packageType={props.packageType}
        businessType={props.businessType}
      />,
      <StepFour
        key="3"
        sport={props.sport}
        programType="concentration"
        businessType={props.businessType}
      />,
      <StepFive
        key="4"
        sport={props.sport}
        packageType={props.packageType}
        businessType={props.businessType}
      />,
      <StepSix key="5" />,
      <StepFinal
        sport={props.sport}
        key="6"
      />,
    ];
  }

  componentDidMount() {
    const { maxStepValue, cartId } = this.props;
    const currentMaxStepValue = this.wizardFormChildren.length;
    if (!isEqual(maxStepValue, currentMaxStepValue)) {
      this.props.stepActions.setMaxStepValue(currentMaxStepValue);
    }
    if (!cartId) {
      this.props.cartActions.createCartRequest();
    }
    // TODO: add handler
    // console.log('href', window.top.location.href);
  }

  render() {
    const { lang, redirectUrlShopify } = this.props;
    return (
      <ReactLocalization lang={lang}>
        <WizardForm redirectUrlShopify={redirectUrlShopify}>
          {() => this.wizardFormChildren}
        </WizardForm>
      </ReactLocalization>
    );
  }
}

function mapStateToProps(state) {
  return {
    cartId: state.cart.id,
    maxStepValue: state.steps.maxStepValue,
    participantId: state.participant.id,
    lang: languageSelelector(state),
    businessType: businessTypeSelector(state),
    packageType: packageTypeSelector(state),
    sport: sportSelector(state),
  };
};

function mapDispatchToProps(dispatch) {
  return {
    stepActions: bindActionCreators({ setMaxStepValue }, dispatch),
    cartActions: bindActionCreators({ createCartRequest }, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
