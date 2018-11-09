// Modules
import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { reduxForm, formValueSelector } from 'redux-form';
import isEqual from 'lodash/isEqual';
// Components
import Header from '../../components/Header';
import Card from '../../components/Card';
// TODO image stub! remove that in prodction!
import stubImg from '../../assets/img/football-core_copy_2.png';
// Helpers
import validation from '../../helpers/validate';
// Actions
import * as trainingActions from '../../actions/training';
import * as stepThreeActions from '../../actions/step.three';
// Styles
import './styles.scss';

class StepThree extends React.Component {
  static propTypes = {
    selectedId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    trainingActions: PropTypes.shape({
      saveTrainingId: PropTypes.func.isRequired,
    }),
    stepThreeActions: PropTypes.shape({
      getCatalogCampsLevelsRequest: PropTypes.func.isRequired,
    }),
    gender: PropTypes.string,
    boarding: PropTypes.string,
    lengthProgram: PropTypes.string,
    age: PropTypes.string,
    date: PropTypes.string,
  };

  componentDidMount() {
    const { sport, packageType, businessType, gender, boarding, lengthProgram, age, date } = this.props;
    const getCatalogCampsLevelsRequestArgs = {
      age,
      date,
      sport,
      gender,
      boarding,
      business_type: businessType,
      package_type: packageType,
      length_program: lengthProgram,
    };
    this.props.stepThreeActions.getCatalogCampsLevelsRequest(getCatalogCampsLevelsRequestArgs);
  }

  componentDidUpdate(prevProps) {
    const { sport, packageType, businessType, gender, boarding, lengthProgram, age, date } = this.props;
    const getCatalogCampsLevelsRequestArgs = {
      sport,
      packageType,
      businessType,
      gender,
      boarding,
      lengthProgram,
      age,
      date,
    };
    const shouldSendRequest = isEqual(getCatalogCampsLevelsRequestArgs, {
      sport: prevProps.sport,
      packageType: prevProps.packageType,
      businessType: prevProps.businessType,
      gender: prevProps.gender,
      boarding: prevProps.boarding,
      lengthProgram: prevProps.lengthProgram,
      age: prevProps.age,
      date: prevProps.date,
    });
    if (!shouldSendRequest) {
      this.props.stepThreeActions.getCatalogCampsLevelsRequest(getCatalogCampsLevelsRequestArgs);
    }
  }

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

const selector = formValueSelector('wizard');

const stepOneFormValueSelector = function(state, prefix) {
  const regExp = /\s/g;
  return selector(state, `${state.stepOne.secondary_group.toLowerCase().replace(regExp, '_')}${prefix}`)
}

function mapStateToProps(state) {
  return {
    selectedId: state.training.selectedId,
    lengthProgram: state.stepOne.lengthProgram,
    gender: stepOneFormValueSelector(state, '_gender'),
    boarding: stepOneFormValueSelector(state, '_sleepaway'),
    age: stepOneFormValueSelector(state, '_age'),
    date: state.stepTwo.selectedDate.capacity_start_date,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    trainingActions: bindActionCreators(trainingActions, dispatch),
    stepThreeActions: bindActionCreators(stepThreeActions, dispatch),
  };
};

export default reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate: validation, // <------ validation
})(
  connect(mapStateToProps, mapDispatchToProps)(StepThree)
);
