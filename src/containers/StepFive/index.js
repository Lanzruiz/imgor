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
    }),
  };

  static defaultProps = {};

  componentDidMount() {
    scrollToComponent(this.stepFour.current, { align: 'top' });
  }

  componentWillUnmount() {
    this.setDefaultState();
  }

  render() {
    const { sport } = this.props;
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
        </Container>
      </div>
    );
  }

  setDefaultState = () => {
    this.props.stepFiveActions.stepFiveSetDefaultState();
  };
}

function mapDispatchToProps(dispatch) {
  return {
    stepFiveActions: bindActionCreators(stepFiveActions, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(StepFive);
