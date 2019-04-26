// Modules
import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import scrollToComponent from 'react-scroll-to-component';
// Containers
import StepFiveCatalogGear from '../StepFiveCatalogGear';
import StepFiveCatalogGearUpsellNew from '../StepFiveCatalogGearUpsellNew';
import StepFiveCatalogExcursionsNew from '../StepFiveCatalogExcursionsNew';
// Components
import Header from '../../components/Header';
import LoadMoreButton from '../../components/LoadMoreButton';
import AOSFadeInContainer from '../../components/AOSFadeInContainer';
// Selectors
import { stepFourDataSelector } from '../StepFour/selectors';
import {
  stepFiveShouldRenderLoadMoreButtonSelector, stepFiveShouldRenderUpsellLoadMoreButtonSelector, stepFiveShouldRenderExcursionsLoadMoreButtonSelector,
} from './selectors';
import { sportSelector, businessTypeSelector, packageTypeSelector } from '../InitialComponent/selectors';
// Actions
import * as stepFiveActions from '../../actions/step.five';
import { gtmStateChange, stateChangeTypes } from '../../helpers/GTMService';
// Constants
import { stepsEnum } from '../../constants/steps';
// Styles
import './styles.scss';

class StepFive extends React.Component {
  constructor(props) {
    super(props);
    this.stepFour = React.createRef();
  }

  static propTypes = {
    stepFiveActions: PropTypes.shape({
      stepFiveSetDefaultState: PropTypes.func.isRequired,
      stepFiveIncreaseItemsPerPage: PropTypes.isRequired,
      stepFiveIncreaseUpsellItemsPerPage: PropTypes.func.isRequired,
      stepFiveIncreaseExcursionsItemsPerPage: PropTypes.func.isRequired,
    }),
    shouldRenderGearLoadMoreButton: PropTypes.bool,
    shouldRenderUpsellLoadMoreButton: PropTypes.bool,
    shouldRenderExcursionsLoadMoreButton: PropTypes.bool,
  };

  static defaultProps = {};

  componentDidMount() {
    scrollToComponent(this.stepFour.current, { align: 'top', duration: 500 });
    this.props.gtmStateChange(stateChangeTypes.OR_CAMPER_GEAR);
    //this.scrollToCurrentComponent();
    this.sendStepToDrupal();
  }

  sendStepToDrupal = () => {
    //console.log(1);
    if(window.reactAppStart && typeof window.reactAppStart === 'function') {
      window.updateBookingSteps(5);
    }
  };

  scrollToCurrentComponent = () => {
    scrollToComponent(this, { align: 'top', duration: 500 });
  }

  componentWillUnmount() {
    this.setDefaultState();
  }

  render() {
    const { sport, shouldRenderGearLoadMoreButton, shouldRenderUpsellLoadMoreButton, shouldRenderExcursionsLoadMoreButton, stepFourData } = this.props;

    const shouldRenderLoadMoreButton = (
         shouldRenderGearLoadMoreButton
      || shouldRenderUpsellLoadMoreButton
      || shouldRenderExcursionsLoadMoreButton
    );

    const currentStepNumber = (stepFourData.length > 0) ? stepsEnum.five : stepsEnum.four;

    return (
      <AOSFadeInContainer className="step-five" ref={this.stepFive}>
        <Container style={{ marginBottom: '65px' }}>
          <Row>
            <Col>
              <Header
                header="step_five.header"
                subHeader="step_five.sub_header"
                formatString={{ stepNumber: currentStepNumber }}
              />
            </Col>
          </Row>
          <StepFiveCatalogGear />
          <StepFiveCatalogGearUpsellNew sport={sport} />
          <StepFiveCatalogExcursionsNew />
          <LoadMoreButton
            shouldRender={shouldRenderLoadMoreButton}
            onClick={this.increaseItemsPerPage}
          />
        </Container>
      </AOSFadeInContainer>
    );
  }

  setDefaultState = () => {
    this.props.stepFiveActions.stepFiveSetDefaultState();
  };

  increaseItemsPerPage = () => {
    const { shouldRenderGearLoadMoreButton, shouldRenderUpsellLoadMoreButton, shouldRenderExcursionsLoadMoreButton } = this.props;
    if (shouldRenderGearLoadMoreButton) {
      this.increaseGearItemsPerPage();
    } else if (shouldRenderUpsellLoadMoreButton) {
      this.increaseUpsellItemsPerPage();
    } else if (shouldRenderExcursionsLoadMoreButton) {
      this.increaseExcursionsItemsPerPage();
    }
  };

  increaseGearItemsPerPage = () => {
    this.props.stepFiveActions.stepFiveIncreaseItemsPerPage();
  };

  increaseUpsellItemsPerPage = () => {
    this.props.stepFiveActions.stepFiveIncreaseUpsellItemsPerPage();
  };

  increaseExcursionsItemsPerPage = () => {
    this.props.stepFiveActions.stepFiveIncreaseExcursionsItemsPerPage();
  };
}

function mapStateToProps(state) {
  return {
    shouldRenderGearLoadMoreButton: stepFiveShouldRenderLoadMoreButtonSelector(state),
    shouldRenderUpsellLoadMoreButton: stepFiveShouldRenderUpsellLoadMoreButtonSelector(state),
    shouldRenderExcursionsLoadMoreButton: stepFiveShouldRenderExcursionsLoadMoreButtonSelector(state),
    sport: sportSelector(state),
    businessType: businessTypeSelector(state),
    packageType: packageTypeSelector(state),
    stepFourData: stepFourDataSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    stepFiveActions: bindActionCreators(stepFiveActions, dispatch),
    gtmStateChange: bindActionCreators(gtmStateChange, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StepFive);
