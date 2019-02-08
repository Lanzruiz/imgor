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
import find from 'lodash/find';
// Components
import Header from '../../components/Header';
import BreakthroughCard from '../../components/BreakthroughCard';
import CoreCard from '../../components/CoreCard';
import TotalAthleteCard from '../../components/TotalAthleteCard';
import GameChangerCard from '../../components/GameChangerCard';
import AOSFadeInContainer from '../../components/AOSFadeInContainer';
// Actions
import * as trainingActions from '../../actions/training';
import * as stepThreeActions from '../../actions/step.three';
import * as stepsActions from '../../actions/steps';
// Selectors
import {
  stepThreeDataSelector, stepTreeSelectedIdSelector, stepThreeSelectedProductSelector, stepThreeSelector,
  stepThreeSelectedCardWithSecondaryProgramsIdSelector, stepThreeParticipantProductIdSelector,
} from './selector';
import { sportSelector, businessTypeSelector, packageTypeSelector } from '../InitialComponent/selectors';
import {
  isWeeklyCampSelector, stepOneAgeSelector, stepOneGenderSelector, cartIdSelector, participantIdSelector,
  stepOneBoardingBooleanSelector, stepOneGroupSelector, stepOneSecondaryGroupSelector, weeksItemsSelector,
  cartStepThreeProductIdSelector, cartSelector,
} from '../StepOne/selectors';
import { stepTwoStartDateSelector, stepTwoSelectedDateSelector } from '../StepTwo/selectors';
// Constants
import { stepsEnum } from '../../constants/steps';
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
      stepThreeDeleteProductFromCartAndDiscardCard: PropTypes.func.isRequired,
      stepThreeDiscardCardWithSecondProgram: PropTypes.func.isRequired,
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

  static defaultProps = {
    data: [],
  };

  componentDidMount() {
    this.getCatalogCampsLevels();
    this.scrollToCurrentComponent();
  }

  componentDidUpdate(prevProps) {
    const { selectedId, stepTwoSelectedDate, cartStepThreeProductId } = this.props;
    // TODO: rewrite that!
    if (selectedId && !isEqual(selectedId, prevProps.selectedId)) {
      this.getCatalogCampsLevels();
    }
    if (!isEqual(stepTwoSelectedDate, prevProps.stepTwoSelectedDate)) {
      if (stepTwoSelectedDate.capacity_start_date && stepTwoSelectedDate.capacity_end_date) {
        if (cartStepThreeProductId) {
          this.setDefaultState();
        }
        this.getCatalogCampsLevels();
      }
    }
  }

  componentWillUnmount() {
    this.setDefaultState();
  }

  render() {
    const { selectedId, data, selectedCardWithSecondaryProgramsId } = this.props;
    
    return (
      <AOSFadeInContainer className="step-three" ref={this.stepThree}>
        <Container>
          <Row>
            <Col>
              <Header
                header="step_three.header"
                subHeader="step_three.sub_header"
                formatString={{ stepNumber: stepsEnum.three }}
              />
            </Col>
          </Row>
          <Row className="align-items-stretch">
            {data.map(({ age_range, display_name, price, id, name, sold_out, has_secondary_program, secondary_programs, starting_price, display_via_label, via_label }, idx) => {
              return (
                <Col lg={6} key={idx} className="card-column">
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
                    displayViaLabel: display_via_label || via_label,
                  })}
                </Col>
              );
            })}
          </Row>
        </Container>
      </AOSFadeInContainer>
    );
  }

  renderCurrentCard = (args) => {
    const {
      age_range, display_name, name = '', price, id, selectedId, soldOut, has_secondary_program,
      secondaryPrograms, displayViaLabel,
    } = args;
    const computedLabel = age_range ? `ages ${age_range}` : '';
    const nameLowerCase = toLower(name);

    const onCardClick = has_secondary_program
        ? cardId => this.goToNextStep({ id: cardId, secondaryPrograms })
        : this.selectCard;

    const cardProps = {
      id,
      selectedId,
      price,
      displayViaLabel,
      header: display_name,
      key: id,
      onClick: onCardClick,
      onRemove: has_secondary_program ? this.discardCardWithSecondProgram : this.discardCard,
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
    const { cartId, participantId, cartStepThreeProductId, isWeeklyCamp, weeks, stepThree } = this.props;

    if (cartStepThreeProductId) {
      this.props.stepThreeActions.stepThreeDeleteProductFromCartAndSetNew({ campId: id, cartId, participantId, productId: cartStepThreeProductId });
    }
    if (cartId && participantId && !cartStepThreeProductId) {
      if (isWeeklyCamp) {
        const firstWeekData = stepThree['stepThreeWeek_1_data'];
        const selectedItem = find(firstWeekData, ['id', id]);
        if (selectedItem) {
          const data = [];
          weeks.forEach((weekItem) => {
            const currentWeekData = stepThree[`stepThreeWeek_${weekItem.id}_data`];
            const currentWeekId = find(currentWeekData, ['name', selectedItem.name]);
            data.push({ cartId, participantId, campId: currentWeekId.id, weekId: weekItem.id });
          });
          this.props.stepThreeActions.stepThreeAddWeeklyCampToTheCart(data);
        }
      } else {
        this.props.stepThreeActions.stepThreeSetProductToTheCart({ cartId, participantId, campId: id });
      }
    }
  };

  discardCardWithSecondProgram = () => {
    this.props.stepThreeActions.stepThreeDiscardCardWithSecondProgram();
  };

  discardCard = (id) => {
    const { cartId, participantId, cart, isWeeklyCamp, cartStepThreeProductId } = this.props;

    if (isWeeklyCamp) {
      const data = [
        cart['stepOneSelectedProductWeek_1'],
        cart['stepOneSelectedProductWeek_2'],
        cart['stepOneSelectedProductWeek_3'],
        cart['stepOneSelectedProductWeek_4'],
        cart['stepOneSelectedProductWeek_5'],
        cart['stepOneSelectedProductWeek_6'],
        cart['stepOneSelectedProductWeek_7'],
        cart['stepOneSelectedProductWeek_8'],
        cart['stepOneSelectedProductWeek_9'],
        cart['stepOneSelectedProductWeek_10'],
        cart['stepOneSelectedProductWeek_11'],
        cart['stepOneSelectedProductWeek_12'],
      ];

      this.props.stepThreeActions.stepThreeDeleteWeeklyCampProductsFromCartAndDiscardCard({ cartId, participantId, productIds: data });
    } else {
      this.props.stepThreeActions.stepThreeDeleteProductFromCartAndDiscardCard({ cartId, participantId, productId: cartStepThreeProductId });
    }
  };

  saveTrainingId = (id) => {
    this.props.trainingActions.saveTrainingId(id);
  };

  setSecondaryPrograms = ({ id, secondaryPrograms }) => {
    const { cartId, participantId, cartStepThreeProductId } = this.props;
    if (isNumber(id)) {
      this.saveTrainingId(null);
      if (cartStepThreeProductId) {
        this.props.stepThreeActions.stepThreeDeleteProduct({ cartId, participantId, productId: cartStepThreeProductId });
      }
    }
    this.props.stepThreeActions.stepThreeSetSecondaryPrograms({ id, secondary_programs: secondaryPrograms });
  };

  getCatalogCampsLevels = () => {
    const {
      sport, packageType, businessType, gender, boarding, weeks,
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
      weeks.forEach((weekItem) => {
        this.props.stepThreeActions.stepThreeGetWeeklyCatalogCamps({
          age,
          sport,
          gender,
          boarding,
          group,
          businessType,
          packageType,
          secondaryGroup,
          weekId: weekItem.id,
          startDate: weekItem.start_date,
        });
      });
    }

    this.props.stepThreeActions.getCatalogCampsLevelsRequest(getCatalogCampsLevelsRequestArgs);
  };

  setDefaultState = () => {
    const { cartId, participantId, cartStepThreeProductId } = this.props;
    if (cartStepThreeProductId) {
      this.props.stepThreeActions.stepThreeDeleteProduct({ cartId, participantId, productId: cartStepThreeProductId });
    }
    this.props.stepThreeActions.stepThreeSetDefaultState();
    this.props.trainingActions.setDefaultState();
  };

  goToNextStep = ({ id: cardId, secondaryPrograms }) => {
    this.setSecondaryPrograms({ id: cardId, secondaryPrograms });
  };

  scrollToCurrentComponent = () => {
    scrollToComponent(this.stepThree.current, { align: 'top' });
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
    stepTwoSelectedDate: stepTwoSelectedDateSelector(state),
    cartStepThreeProductId: cartStepThreeProductIdSelector(state),
    sport: sportSelector(state),
    businessType: businessTypeSelector(state),
    packageType: packageTypeSelector(state),
    weeks: weeksItemsSelector(state),
    stepThree: stepThreeSelector(state),
    cart: cartSelector(state),
    campersAge: Number(((state.form.wizard || {}).values || {}).age)
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
})(
  connect(mapStateToProps, mapDispatchToProps)(StepThree)
);
