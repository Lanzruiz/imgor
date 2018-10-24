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
// Actions
import { setMaxStepValue } from '../../actions/steps';

class App extends React.Component {
  static propTypes = {
    stepActions: PropTypes.shape({
      setMaxStepValue: PropTypes.func.isRequired,
    }),
  };

  wizardFormChildren = [
    <StepOne key="0" />,
    <StepTwo key="1" />,
    <div key="2">step three block</div>,
    <div key="3">step four block</div>,
    <div key="4">step five block</div>,
    <div key="5">final step block</div>,
  ];

  componentDidMount() {
    const maxStepValue = this.wizardFormChildren.length;
    this.props.stepActions.setMaxStepValue(maxStepValue);
  }

  render() {
    return (
      <ReactLocalization>
        <WizardForm>
          {() => this.wizardFormChildren}
        </WizardForm>
      </ReactLocalization>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  stepActions: bindActionCreators({ setMaxStepValue }, dispatch),
});

export default connect(null, mapDispatchToProps)(App);
