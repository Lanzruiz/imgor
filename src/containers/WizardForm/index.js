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
  };

  static defaultProps = {
    step: 0,
  };

  render() {
    const { children, step } = this.props;
    const startIndex = 0;
    if (typeof children !== 'function') {
      return (
        <span>Error!</span>
      );
    }

    return (
      <React.Fragment>
        {children().slice(startIndex, step)}
        <Footer />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    stepActions: bindActionCreators(stepActions, dispatch),
  };
};

const mapStateToProps = (state) => {
  return {
    step: state.steps.currentStep,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WizardForm);
