// Modules
import React from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Components
import Card, { CardContent, CardContentRow, CardContentCol, ImagePlus } from '../../../components/Card';
import LocaleString from '../../../components/LocaleString';
import { OneHourSentence, PerWeekSentence, DailySessionsSentence, EducationSentence } from '../index';
// Actions
import * as stepFourActions from '../../../actions/step.four';
// Selectors
import { cartIdSelector, participantIdSelector, cartStepThreeProductIdSelector } from '../../StepOne/selectors';
import { stepThreeSecondaryProgramIdSelector } from '../../StepThree/selector';

class StepFourPerformanceSecondaryProgram extends React.Component {
  render() {
    const { id, sold_out, price, display_name, selectedId } = this.props;
    const contentClassNames = cx('step-four__performance-secondary-program', {
      'step-four__secondary-program--available': !sold_out,
      'step-four__secondary-program--sold-out': sold_out,
    });
    const secondColumnContentClassNames = cx('step-four__performance-secondary-program step-four__performance-secondary-program-secondary-column', {
      'step-four__secondary-program--available': !sold_out,
      'step-four__secondary-program--sold-out': sold_out,
    });
    return (
      <Card
        id={id}
        cardHeader={<LocaleString stringKey="class" />}
        color="dark"
        header={display_name}
        label="AGES 8-18"
        price={price}
        onClick={this.setSecondaryProgramId}
        onRemove={this.unsetSecondaryProgramId}
        selectedId={selectedId}
        soldOut={sold_out}
        via={true}
      >
        <CardContent>
        <CardContentRow>
          <CardContentCol>
            <div className={contentClassNames}>
              <div className="step-four__performance-image-container">
                <ImagePlus soldOut={sold_out} />
              </div>
              <div className="step-four__performance-content-container">
                <OneHourSentence />
                <EducationSentence />
                <PerWeekSentence />
              </div>
            </div>
          </CardContentCol>
          <CardContentCol>
            <div className={secondColumnContentClassNames}>
              <div className="step-four__performance-secondary-program-header">
                <DailySessionsSentence />
              </div>
              <div className="step-four__performance-list-container">
                <ul className="step-four__performance-list">
                  <li className="step-four__performance-list-item"><LocaleString stringKey="strength" /></li>
                  <li className="step-four__performance-list-item"><LocaleString stringKey="mental" /></li>
                  <li className="step-four__performance-list-item"><LocaleString stringKey="vision" /></li>
                </ul>
                <ul className="step-four__performance-list">
                  <li className="step-four__performance-list-item"><LocaleString stringKey="speed" /></li>
                  <li className="step-four__performance-list-item"><LocaleString stringKey="nutrition" /></li>
                </ul>
              </div>
            </div>
          </CardContentCol>
        </CardContentRow>
      </CardContent>
      </Card>
    );
  }

  setSecondaryProgramId = (id) => {
    const { cartId, participantId, participantProductId } = this.props;
    this.props.stepFourActions.stepFourSetSecondaryProgramIdRequest({ campId: id, cartId, participantId, productId: participantProductId });
  };
  
  unsetSecondaryProgramId = (id) => {
    const { cartId, participantId, participantProductId } = this.props;
    this.props.stepFourActions.stepFourUnsetSecondaryProgramIdRequest({ campId: id, cartId, participantId, productId: participantProductId });
  };
}

function mapStateToProps(state) {
  return {
    cartId: cartIdSelector(state),
    participantId: participantIdSelector(state),
    selectedId: stepThreeSecondaryProgramIdSelector(state),
    participantProductId: cartStepThreeProductIdSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    stepFourActions: bindActionCreators(stepFourActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StepFourPerformanceSecondaryProgram);
