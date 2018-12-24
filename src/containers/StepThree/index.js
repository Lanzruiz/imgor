// Modules
import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import scrollToComponent from 'react-scroll-to-component';
import isNumber from 'lodash/isNumber';
import isEqual from 'lodash/isEqual';
import toLower from 'lodash/toLower';
// Components
import Header from '../../components/Header';
import BreakthroughCard from '../../components/BreakthroughCard';
import CoreCard from '../../components/CoreCard';
import TotalAthleteCard from '../../components/TotalAthleteCard';
import GameChangerCard from '../../components/GameChangerCard';
// Helpers
import validation from '../../helpers/validate';
// Actions
import * as trainingActions from '../../actions/training';
import * as stepThreeActions from '../../actions/step.three';
import * as stepsActions from '../../actions/steps';
// Selectors
import {
  stepThreeDataSelector, stepTreeSelectedIdSelector, stepThreeSelectedProductSelector,
  stepThreeSelectedCardWithSecondaryProgramsIdSelector, stepThreeParticipantProductIdSelector,
} from './selector';
import {
  isWeeklyCampSelector, stepOneAgeSelector, stepOneGenderSelector, cartIdSelector, participantIdSelector,
  stepOneBoardingBooleanSelector, stepOneGroupSelector, stepOneSecondaryGroupSelector,
} from '../StepOne/selectors';
import { stepTwoStartDateSelector } from '../StepTwo/selectors';
// Styles
import './styles.scss';

class StepThree extends React.Component {
  constructor(props) {
    super(props);
    this.stepThree = React.createRef();
  }

  static propTypes = {
    selectedId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    trainingActions: PropTypes.shape({
      saveTrainingId: PropTypes.func.isRequired,
      setDefaultState: PropTypes.func.isRequired,
    }),
    stepThreeActions: PropTypes.shape({
      getCatalogCampsLevelsRequest: PropTypes.func.isRequired,
      stepThreeSetDefaultState: PropTypes.func.isRequired,
      stepThreeSetSecondaryPrograms: PropTypes.func.isRequired,
    }),
    stepsActions: PropTypes.shape({
      incrementStepsCounter: PropTypes.func.isRequired,
    }),
    gender: PropTypes.string,
    boarding: PropTypes.bool,
    lengthProgram: PropTypes.string,
    age: PropTypes.string,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        age_range: PropTypes.string,
        business_type: PropTypes.string,
        capacity_available: PropTypes.number,
        capacity_id: PropTypes.string,
        display_business_type: PropTypes.string,
        display_length_program: PropTypes.string,
        display_name: PropTypes.string,
        display_package_type: PropTypes.string,
        display_sport: PropTypes.string,
        has_secondary_program: PropTypes.bool,
        id: PropTypes.number,
        length_program: PropTypes.string,
        name: PropTypes.string,
        package_type: PropTypes.string,
        price: PropTypes.number,
        price_refundable: PropTypes.number,
        sold_out: PropTypes.bool,
        sport: PropTypes.string,
      }),
    ),
    group: PropTypes.string,
    secondaryGroup: PropTypes.string,
    isWeeklyCamp: PropTypes.bool,
    selectedCardWithSecondaryProgramsId: PropTypes.number,
  };

  componentDidMount() {
    this.getCatalogCampsLevels();
    this.scrollToCurrentComponent();
  }

  componentDidUpdate(prevProps) {
    const { selectedId, startDate } = this.props;
    if (selectedId && !isEqual(selectedId, prevProps.selectedId)) {
      this.getCatalogCampsLevels();
    }
    if (!isEqual(startDate, prevProps.startDate)) {
      this.scrollToCurrentComponent();
    }
  }

  componentWillUnmount() {
    this.setDefaultState();
  }

  render() {
    const { selectedId, data, selectedCardWithSecondaryProgramsId } = this.props;
    return (
      <div ref={this.stepThree} className="step-three">
        <Container style={{ marginBottom: '100px' }}>
          <Row>
            <Col>
              <Header
                header="step_three.header"
                subHeader="step_three.sub_header"
              />
            </Col>
          </Row>
          <Row>
            {data.map(({ age_range, display_name, price, id, name, sold_out, has_secondary_program, secondary_programs, starting_price, display_via_label }, idx) => {
              return (
                <Col xl={6} key={idx}>
                  {this.renderCurrentCard({
                    age_range,
                    display_name,
                    name,
                    has_secondary_program,
                    price: price || starting_price,
                    selectedId: selectedId || selectedCardWithSecondaryProgramsId,
                    id: has_secondary_program ? idx : id,
                    secondaryPrograms: secondary_programs,
                    soldOut: sold_out,
                    displayViaLabel: display_via_label,
                  })}
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    );
  }

  renderCurrentCard = (args) => {
    const { age_range, display_name, name = '', price, id, selectedId, soldOut, has_secondary_program, secondaryPrograms, displayViaLabel } = args;
    const computedLabel = age_range ? `ages ${age_range}` : '';
    const nameLowerCase = toLower(name);

    const cardProps = {
      id,
      selectedId,
      price,
      displayViaLabel,
      header: display_name,
      key: id,
      onClick: has_secondary_program ? cardId => this.goToNextStep({ id: cardId, secondaryPrograms }) : this.selectCard,
      label: computedLabel,
      soldOut: soldOut,
    };

    switch(nameLowerCase) {
      case 'breakthrough': {
        return (
          <BreakthroughCard {...cardProps} />
        );
      }

      case 'core': {
        return (
          <CoreCard {...cardProps} />
        );
      }

      case 'total athlete': {
        return (
          <TotalAthleteCard {...cardProps} />
        );
      }

      case 'game changer': {
        return (
          <GameChangerCard {...cardProps} />
        );
      }

      default:
        return false;
    }
  };

  selectCard = (id) => {
    const { participantProductId } = this.props;
    if (!participantProductId) {
      this.saveTrainingId(id);
      this.setSecondaryPrograms({ id: null, secondary_programs: [] });
    } else {
      console.log('remove item?');
      this.props.stepThreeActions.stepThreeDeleteProductAndSetProduct({ campId: id })
    }
  };

  saveTrainingId = (id) => {
    this.props.trainingActions.saveTrainingId(id);
  };

  setSecondaryPrograms = ({ id, secondaryPrograms }) => {
    if (isNumber(id)) {
      this.saveTrainingId(null);
    }
    this.props.stepThreeActions.stepThreeSetSecondaryPrograms({ id, secondary_programs: secondaryPrograms });
  };

  getCatalogCampsLevels = () => {
    const {
      sport, packageType, businessType, gender, boarding,
      age, group, secondaryGroup, isWeeklyCamp, startDate,
    } = this.props;

    const getCatalogCampsLevelsRequestArgs = {
      age,
      sport,
      gender,
      boarding,
      group,
      business_type: businessType,
      package_type: packageType,
      secondary_group: secondaryGroup,
      date: startDate,
    };

    if (isWeeklyCamp) {
      delete getCatalogCampsLevelsRequestArgs.secondary_group;
    }

    this.props.stepThreeActions.getCatalogCampsLevelsRequest(getCatalogCampsLevelsRequestArgs);
  };

  setDefaultState = () => {
    this.props.stepThreeActions.stepThreeSetDefaultState();
    this.props.trainingActions.setDefaultState();
  };

  goToNextStep = ({ id: cardId, secondaryPrograms }) => {
    this.setSecondaryPrograms({ id: cardId, secondaryPrograms });
  };

  scrollToCurrentComponent = () => {
    scrollToComponent(this.stepThree.current);
  }
}

function mapStateToProps(state) {
  return {
    selectedId: stepTreeSelectedIdSelector(state),
    gender: stepOneGenderSelector(state),
    boarding: stepOneBoardingBooleanSelector(state),
    age: stepOneAgeSelector(state),
    data: stepThreeDataSelector(state),
    group: stepOneGroupSelector(state),
    secondaryGroup: stepOneSecondaryGroupSelector(state),
    isWeeklyCamp: isWeeklyCampSelector(state),
    startDate: stepTwoStartDateSelector(state),
    product: stepThreeSelectedProductSelector(state),
    cartId: cartIdSelector(state),
    participantId: participantIdSelector(state),
    selectedCardWithSecondaryProgramsId: stepThreeSelectedCardWithSecondaryProgramsIdSelector(state),
    participantProductId: stepThreeParticipantProductIdSelector(state),
  };
};

function mapDispatchToProps(dispatch) {
  return {
    trainingActions: bindActionCreators(trainingActions, dispatch),
    stepThreeActions: bindActionCreators(stepThreeActions, dispatch),
    stepsActions: bindActionCreators(stepsActions, dispatch),
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
