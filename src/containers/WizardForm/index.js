import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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
        <div>
          Email modal must be here <br />
          <button style={{background:'#aaa',border: '1px solid'}} onClick={() => {this.props.stepActions.incrementStepsCounter()}}>next step</button>
          {' '}
          That button need to show how forks form with steps...
        </div>
        <br />
        {children().slice(startIndex, step)}
        <br />
        <div>Footer with prise must be here...</div>
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
