// Modules
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
  };

  // To add more steps just add component into this array
  wizardFormChildren = [
    <StepOne key="0" />,
    <StepTwo key="1" />,
    <StepThree key="2" />,
    <StepFour key="3" />,
    <StepFive key="4" />,
    <StepSix key="5" />,
    <StepFinal key="6" />,
  ];

  componentDidMount() {
    const { maxStepValue, cartId } = this.props;
    const currentMaxStepValue = this.wizardFormChildren.length;
    if (maxStepValue !== currentMaxStepValue) {
      this.props.stepActions.setMaxStepValue(currentMaxStepValue);
    }
    if (!cartId) {
      this.props.cartActions.createCartRequest();
    }
  }

  render() {
    const { lang } = this.props;
    return (
      <ReactLocalization lang={lang}>
        <WizardForm>
          {() => this.wizardFormChildren}
        </WizardForm>
      </ReactLocalization>
    );
  }
}

const mapStateToProps = (state) => ({
  cartId: state.cart.id,
  maxStepValue: state.steps.maxStepValue,
});

const mapDispatchToProps = (dispatch) => ({
  stepActions: bindActionCreators({ setMaxStepValue }, dispatch),
  cartActions: bindActionCreators({ createCartRequest }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
