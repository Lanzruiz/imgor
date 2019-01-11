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
// Selectors
import {
  stepFiveShouldRenderLoadMoreButtonSelector, stepFiveShouldRenderUpsellLoadMoreButtonSelector, stepFiveShouldRenderExcursionsLoadMoreButtonSelector,
} from './selectors';
import { sportSelector, businessTypeSelector, packageTypeSelector } from '../InitialComponent/selectors';
// Actions
import * as stepFiveActions from '../../actions/step.five';
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
    scrollToComponent(this.stepFour.current, { align: 'top' });
  }

  componentWillUnmount() {
    this.setDefaultState();
  }

  render() {
    const { sport, shouldRenderGearLoadMoreButton, shouldRenderUpsellLoadMoreButton, shouldRenderExcursionsLoadMoreButton } = this.props;
    const shouldRenderLoadMoreButton = (
      shouldRenderGearLoadMoreButton
      || shouldRenderUpsellLoadMoreButton
      || shouldRenderExcursionsLoadMoreButton
    );
    return (
      <div className="step-five" ref={this.stepFive}>
        <Container style={{ marginBottom: '65px' }}>
          <Row>
            <Col>
              <Header
                header="step_five.header"
                subHeader="step_five.sub_header"
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
      </div>
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    stepFiveActions: bindActionCreators(stepFiveActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StepFive);
