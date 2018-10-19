import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import WizardForm from '../WizardForm';
import { setMaxStepValue } from '../../actions/steps';

class App extends React.Component {
  static propTypes = {
    stepActions: PropTypes.shape({
      setMaxStepValue: PropTypes.func.isRequired,
    }),
  };

  wizardFormChildren = [
    <div key="0">step one block</div>,
    <div key="1">step two block</div>,
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
      <WizardForm>
        {() => this.wizardFormChildren}
      </WizardForm>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  stepActions: bindActionCreators({ setMaxStepValue }, dispatch),
});

export default connect(null, mapDispatchToProps)(App);
