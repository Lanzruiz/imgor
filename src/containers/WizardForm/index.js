// Modules
import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// Components
import Footer from '../../components/Footer';
// Actions
import * as stepActions from '../../actions/steps';

class WizardForm extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    step: PropTypes.number,
    stepActions: PropTypes.shape({
      incrementStepsCounter: PropTypes.func,
    }),
    stepTwoStartingPrice: PropTypes.number.isRequired,
  };

  static defaultProps = {
    step: 0,
    stepTwoStartingPrice: 0,
  };

  render() {
    const { children, step, stepTwoStartingPrice } = this.props;
    const startIndex = 0;
    if (typeof children !== 'function') {
      return (
        <span>Error!</span>
      );
    }
    const price = stepTwoStartingPrice;
    return (
      <React.Fragment>
        {children().slice(startIndex, step)}
        <Footer price={price} />
      </React.Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    stepActions: bindActionCreators(stepActions, dispatch),
  };
};

function mapStateToProps(state) {
  return {
    step: state.steps.currentStep,
    stepTwoStartingPrice: state.stepTwo.stepTwoStartingPrice,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WizardForm);
