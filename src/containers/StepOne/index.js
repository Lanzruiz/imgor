// Modules
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Components
import EmailModal from '../../components/EmailModal';
// Actions
import { closeEmailModal } from '../../actions/steps';

class StepOne extends React.Component {
  render() {
    const { shouldShowEmailModal } = this.props;
    return (
      <div>
        <EmailModal
          onSubmit={this.closeEmailModal}
          shouldShowEmailModal={shouldShowEmailModal}
        />
        <div>step one</div>
      </div>
    );
  }

  closeEmailModal = () => {
    this.props.stepActions.closeEmailModal();
  }
}

const mapStateToProps = (state) => ({
  shouldShowEmailModal: state.steps.shouldShowEmailModal,
});

const mapDispatchToProps = (dispatch) => ({
  stepActions: bindActionCreators({ closeEmailModal }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(StepOne);
