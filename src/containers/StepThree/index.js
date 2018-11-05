// Modules
import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
// Components
import Header from '../../components/Header';
import Card from '../../components/Card';
// TODO image stub! remove that in prodction!
import stubImg from '../../assets/img/football-core_copy_2.png';
// Actions
import * as trainingActions from '../../actions/training';
// Styles
import './styles.scss';

class StepThree extends React.Component {
  static propTypes = {
    selectedId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    trainingActions: PropTypes.shape({
      saveTrainingId: PropTypes.func,
    }),
  };

  render() {
    const { selectedId } = this.props;
    return (
      <Container style={{ marginBottom: '65px' }}>
        <Row>
          <Col>
            <Header
              header="step_three.header"
              subHeader="step_three.sub_header"
            />
          </Col>
        </Row>
        <Row>
          <Col xl={6}>
            <Card
              cardHeader="group sport training"
              color="light-blue"
              header="core"
              headerSize="large"
              id={0}
              imgSrc={stubImg}
              label="ages 11-18"
              onClick={this.selectCard}
              price="1,289"
              selectedId={selectedId}
              size="large"
              via={true}
            >
              <div>content here</div>
            </Card>
            <Card
              cardHeader="group sport training"
              color="blue"
              header="total athlete"
              headerSize="large"
              id={1}
              imgSrc={stubImg}
              label="ages 11-18"
              onClick={this.selectCard}
              price="1,789"
              selectedId={selectedId}
              size="large"
              via={true}
            >
              <div>content here</div>
            </Card>
          </Col>
          <Col xl={6}>
            <Card
              cardHeader="individualized sport training"
              color="dark-blue"
              header="breakthrough"
              headerSize="large"
              id={2}
              imgSrc={stubImg}
              label="ages 11-18"
              onClick={this.selectCard}
              price="2,059"
              selectedId={selectedId}
              size="large"
              via={true}
            >
              <div>content here</div>
            </Card>
            <Card
              cardHeader="individualized sport training"
              color="red"
              header="game changer"
              headerSize="large"
              id={3}
              imgSrc={stubImg}
              label="ages 11-18"
              onClick={this.selectCard}
              price="2,459"
              selectedId={selectedId}
              size="large"
              via={true}
            >
              <div>content here</div>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  selectCard = (id) => {
    this.props.trainingActions.saveTrainingId(id);
  }
}

function mapStateToProps(state) {
  return {
    selectedId: state.training.selectedId,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    trainingActions: bindActionCreators(trainingActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StepThree);
