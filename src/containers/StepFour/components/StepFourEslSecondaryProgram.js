// Modules
import React from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Components
import Card, { CardContent, CardContentRow, CardContentCol, ImagePlus } from '../../../components/Card';
import LocaleString from '../../../components/LocaleString';
import { FifteenHoursSentence, EducationSentence, PerWeekSentence } from '../index';
// Actions
import * as stepFourActions from '../../../actions/step.four';
// Selectors
import { cartIdSelector, participantIdSelector, cartStepThreeProductIdSelector } from '../../StepOne/selectors';
import { stepThreeSecondaryProgramIdSelector } from '../../StepThree/selector';

class StepFourEslSecondaryProgram extends React.Component {
  render() {
    const { id, sold_out, price, display_name, selectedId, viaLogoPath } = this.props;

    const contentClassNames = cx('step-four__esl-secondary-program', {
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
        viaLogoPath={viaLogoPath}
      >
        <CardContent>
          <CardContentRow>
            <CardContentCol>
              <div className={contentClassNames}>
                <div className="step-four__esl-image-container">
                  <ImagePlus soldOut={sold_out} />
                </div>
                <div className="step-four__esl-content-container">
                  <FifteenHoursSentence />
                  <EducationSentence />
                  <PerWeekSentence />
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
    viaLogoPath: state.initialSettings.viaLogoPath,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    stepFourActions: bindActionCreators(stepFourActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StepFourEslSecondaryProgram);
