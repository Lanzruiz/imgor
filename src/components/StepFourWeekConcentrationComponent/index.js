// Modules
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-grid-system';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cx from 'classnames';
import assign from 'lodash/assign';
import find from 'lodash/find';
import { ReactHeight } from 'react-height';
import isEqual from 'lodash/isEqual';
// Components
import Card, { CardContent, CardContentRow, CardContentCol, ImagePlus } from '../../components/Card';
import {
  EducationSentence,
  FifteenHoursSentence,
  OneHourSentence,
  PerWeekSentence,
  TrainingSentence
} from '../../containers/StepFour';
import LocaleString from '../LocaleString';
// Actions
import * as weeksActions from '../../actions/weeks';
import * as stepFourActions from '../../actions/step.four';
// Selectors
import { cartIdSelector, participantIdSelector } from '../../containers/StepOne/selectors';
import { stepThreeParticipantProductIdSelector } from '../../containers/StepThree/selector';
import {
  stepFourWeekOneDataSelector, stepFourWeekTwoDataSelector, stepFourWeekThreeDataSelector,
  stepFourWeekFourDataSelector, stepFourWeekFiveDataSelector, stepFourWeekSixDataSelector,
  stepFourWeekSevenDataSelector, stepFourWeekEightDataSelector, stepFourWeekNineDataSelector,
  stepFourWeekTenDataSelector, stepFourWeekElevenDataSelector, stepFourWeekTwelveDataSelector,
  stepFourConcentrationProductIdSelector,
} from '../../containers/StepFour/selectors';
// Constants
import { productTypesEnum } from '../../constants/cart';
import { emptyConcentrationId } from '../../reducers/step.four';
// Styles
import './styles.scss';

class StepFourWeekConcentrationComponent extends React.Component {
  constructor(props) {
    super(props);
    this.stepFour = React.createRef();
    this.state = {
      height: 100,
    };
  }

  static propTypes = {
    week_1_data: PropTypes.arrayOf(
      PropTypes.shape({}),
    ),
    week_2_data: PropTypes.arrayOf(
      PropTypes.shape({}),
    ),
    week_3_data: PropTypes.arrayOf(
      PropTypes.shape({}),
    ),
    week_4_data: PropTypes.arrayOf(
      PropTypes.shape({}),
    ),
    week_5_data: PropTypes.arrayOf(
      PropTypes.shape({}),
    ),
    week_6_data: PropTypes.arrayOf(
      PropTypes.shape({}),
    ),
    week_7_data: PropTypes.arrayOf(
      PropTypes.shape({}),
    ),
    week_8_data: PropTypes.arrayOf(
      PropTypes.shape({}),
    ),
    week_9_data: PropTypes.arrayOf(
      PropTypes.shape({}),
    ),
    week_10_data: PropTypes.arrayOf(
      PropTypes.shape({}),
    ),
    week_11_data: PropTypes.arrayOf(
      PropTypes.shape({}),
    ),
    week_12_data: PropTypes.arrayOf(
      PropTypes.shape({}),
    ),
    weeksActions: PropTypes.shape({
      customizeWeek: PropTypes.func.isRequired,
      setWeekPrice: PropTypes.func.isRequired,
      removeCustomizedWeek: PropTypes.func,
    }),
    stepFourActions: PropTypes.shape({
      getCatalogCampWeekOneRequest: PropTypes.func.isRequired,
      getCatalogCampWeekTwoRequest: PropTypes.func.isRequired,
      getCatalogCampWeekThreeRequest: PropTypes.func.isRequired,
      getCatalogCampWeekFourRequest: PropTypes.func.isRequired,
      getCatalogCampWeekFiveRequest: PropTypes.func.isRequired,
      getCatalogCampWeekSixRequest: PropTypes.func.isRequired,
      getCatalogCampWeekSevenRequest: PropTypes.func.isRequired,
      getCatalogCampWeekEightRequest: PropTypes.func.isRequired,
      getCatalogCampWeekNineRequest: PropTypes.func.isRequired,
      getCatalogCampWeekTenRequest: PropTypes.func.isRequired,
      getCatalogCampWeekElevenRequest: PropTypes.func.isRequired,
      getCatalogCampWeekTwelveRequest: PropTypes.func.isRequired,
      stepFourCustomizeWeekRequest: PropTypes.func.isRequired,
    }),
    maxWeekCounter: PropTypes.number.isRequired,
    concentrationOrdering: PropTypes.array,
    isFirstWeek: PropTypes.bool,
  };

  componentDidMount() {
    this.getWeekData();
  }
  
  
  reorderConcentrations = (items) => {
    const { concentrationOrdering } = this.props;

    if(!concentrationOrdering) return items;
    
    const parsedConcentrationOrdering = concentrationOrdering.map(v => v.toLowerCase());
    
    const parsedItems = [ ...items ].map(v => ({
      ...v,
      nameInLowerCase: v.secondary_program_type.toLowerCase(),
      displayNameInLowerCase: v.name.toLowerCase()
    }));
    
    const sortedGroups = parsedConcentrationOrdering.reduce((acc, conc) => {
      
      const s = acc.data.filter(v => v.nameInLowerCase === conc || v.displayNameInLowerCase === conc);
      const r = acc.data.filter(v => v.nameInLowerCase !== conc && v.displayNameInLowerCase !== conc);
      acc.sorted = [ ...acc.sorted, ...s ];
      acc.data = [ ...r ];
      
      return acc;
    }, {
      sorted: [],
      data: parsedItems
    });
    
    return [...sortedGroups.sorted, ...sortedGroups.data];
  };

  render() {
    const { weekId, customizeId, isFirstWeek, viaLogoPath } = this.props;
    const data = this.props[`week_${weekId}_data`];
    return (
      <Row>
        {this.reorderConcentrations(data).map(({ id, price, age_range, secondary_program_type, sold_out, via_label }) => {

          const secondaryProgram = (secondary_program_type || '').toLowerCase();
          const hasElsOrSat = secondaryProgram === 'esl' || secondaryProgram === 'sat';
          
          const isNotSkipWeek = secondary_program_type !== 'props week';
          
          const isSkipWeekAndFirst = secondary_program_type === 'props week' && isFirstWeek;
          
          const computedLabel = age_range ? `ages ${age_range}` : '';
          const cardContentProps = assign({}, { sold_out, secondary_program_type, hasElsOrSat });
          const customButtonTitle = (
            customizeId
              ? <LocaleString stringKey="remove" />
              : <LocaleString stringKey="select" />
          );
          
          return (isNotSkipWeek || isSkipWeekAndFirst) &&  (
            <Col md={6} lg={4} key={id} className="card-column">
              <Card
                id={id}
                cardHeader={isNotSkipWeek ? hasElsOrSat ? 'Education' : 'Training' : ''}
                color="dark"
                header={isSkipWeekAndFirst ? 'No Additional Training' : secondary_program_type}
                label={computedLabel}
                price={price}
                onClick={this.customizeWeek}
                onRemove={this.deleteSelectedConcentration}
                selectedId={customizeId}
                customButtonTitle={customButtonTitle}
                customNonSelectedButtonTitle={isNotSkipWeek ? null : <LocaleString stringKey="no-thanks" />}
                via={via_label}
                viaLogoPath={viaLogoPath}
              >
                {this.renderCardContent(cardContentProps)}
              </Card>
            </Col>
          );
        })}
      </Row>
    );
  }

  renderCardContent = (secondaryProgramType) => {
    const { secondary_program_type, sold_out, hasElsOrSat } = secondaryProgramType;
    const { height } = this.state;
    

    switch(secondary_program_type) {
      case 'Strength/Power':
      case 'Speed':
      case 'Nutrition':
      case 'Mental/Vision':
      case 'Leadership': {
        const contentClassNames = cx('step-four__esl-secondary-program', {
          'step-four__secondary-program--available': !sold_out,
          'step-four__secondary-program--sold-out': sold_out,
        });
        return (
          <CardContent>
            <CardContentRow>
              <CardContentCol>
                <ReactHeight onHeightReady={this.setMinHeight} style={{ height }}>
                  <div className={contentClassNames}>
                    <div className="step-four__esl-image-container">
                      <ImagePlus soldOut={sold_out} />
                    </div>
                    <div className="step-four__esl-content-container">
                      <OneHourSentence />
                      {hasElsOrSat ? <EducationSentence /> : <TrainingSentence />}
                      <PerWeekSentence />
                    </div>
                  </div>
                </ReactHeight>
              </CardContentCol>
            </CardContentRow>
          </CardContent>
        );
      }

      case 'SAT':
      case 'ESL': {
        const contentClassNames = cx('step-four__esl-secondary-program', {
          'step-four__secondary-program--available': !sold_out,
          'step-four__secondary-program--sold-out': sold_out,
        });
        return (
          <CardContent>
            <CardContentRow>
              <CardContentCol>
                <ReactHeight onHeightReady={this.setMinHeight} style={{ height }}>
                  <div className={contentClassNames}>
                    <div className="step-four__esl-image-container">
                      <ImagePlus soldOut={sold_out} />
                    </div>
                    <div className="step-four__esl-content-container">
                      <FifteenHoursSentence />
                      {hasElsOrSat ? <EducationSentence /> : <TrainingSentence />}
                      <PerWeekSentence />
                    </div>
                  </div>
                </ReactHeight>
              </CardContentCol>
            </CardContentRow>
          </CardContent>
        );
      }

      case 'props week': {
        return (
          <CardContent>
            <CardContentRow>
              <CardContentCol>
                
                <ReactHeight onHeightReady={this.setMinHeight} style={{ height }}>
                  <div className={'step-four__esl-secondary-program step-four__secondary-program--available'}>
                    <div className="step-four__esl-image-container">
                    </div>
                    <div className="step-four__esl-content-container">
                      <span className="step-four__education">
                        <LocaleString stringKey="step_four.skip_week_description"/>
                      </span>
                    </div>
                  </div>
                </ReactHeight>
                
              </CardContentCol>
            </CardContentRow>
          </CardContent>
        );
      }

      default:
        return false;
    }
  };

  getWeekData = () => {
    const { weekId, businessType, programType, sport, age, gender, startDate, endDate } = this.props;
    const getCatalogCampRequestArgs = {
      sport,
      age,
      gender,
      business_type: businessType,
      program_type: programType,
      start_date: startDate,
      end_date: endDate,
    };
    switch(weekId) {
      case 1:
        this.props.stepFourActions.getCatalogCampWeekOneRequest(getCatalogCampRequestArgs);
        break;

      case 2:
        this.props.stepFourActions.getCatalogCampWeekTwoRequest(getCatalogCampRequestArgs);
        break;

      case 3:
        this.props.stepFourActions.getCatalogCampWeekThreeRequest(getCatalogCampRequestArgs);
        break;

      case 4:
        this.props.stepFourActions.getCatalogCampWeekFourRequest(getCatalogCampRequestArgs);
        break;

      case 5:
        this.props.stepFourActions.getCatalogCampWeekFiveRequest(getCatalogCampRequestArgs);
        break;

      case 6:
        this.props.stepFourActions.getCatalogCampWeekSixRequest(getCatalogCampRequestArgs);
        break;

      case 7:
        this.props.stepFourActions.getCatalogCampWeekSevenRequest(getCatalogCampRequestArgs);
        break;

      case 8:
        this.props.stepFourActions.getCatalogCampWeekEightRequest(getCatalogCampRequestArgs);
        break;

      case 9:
        this.props.stepFourActions.getCatalogCampWeekNineRequest(getCatalogCampRequestArgs);
        break;

      case 10:
        this.props.stepFourActions.getCatalogCampWeekTenRequest(getCatalogCampRequestArgs);
        break;

      case 11:
        this.props.stepFourActions.getCatalogCampWeekElevenRequest(getCatalogCampRequestArgs);
        break;

      case 12:
        this.props.stepFourActions.getCatalogCampWeekTwelveRequest(getCatalogCampRequestArgs);
        break;

      default:
        return false;
    }
  };

  customizeWeek = async (id) => {
    const { weekId, cartId, participantId, maxWeekCounter, stepFourConcentrationProductId } = this.props;
    const data = this.props[`week_${weekId}_data`];
    const selectedItem = find(data, ['id', id]);
    const price = selectedItem && selectedItem.price;
    this.props.weeksActions.setWeekPrice(price);
    
    const args = {
      cartId,
      participantId,
      product: selectedItem,
      quantity: 1,
      productId: id,
      type: productTypesEnum.concentration,
      nextWeekId: weekId >= maxWeekCounter ? null : weekId,
      currentWeekId: weekId,
    };
  
    if (stepFourConcentrationProductId) {
      if (isEqual(emptyConcentrationId, id)) {
        await this.deleteSelectedConcentration(id);
        return;
      }
      args.productId = stepFourConcentrationProductId;

      this.props.weeksActions.updateSelectedConcentration(args);
      return;
    }

    this.props.stepFourActions.stepFourCustomizeWeekRequest(args);
  };

  setMinHeight = (height) => {
    if (this.state.height < height) {
      this.setState({ height });
    }
  };

  deleteSelectedConcentration = async (id) => {
    const { cartId, stepFourConcentrationProductId, participantId, weekId, maxWeekCounter } = this.props;
    
    if (stepFourConcentrationProductId) {
      const nextWeekId = weekId >= maxWeekCounter ? null : weekId;
      await this.props.weeksActions.deleteSelectedConcentration({
        id,
        nextWeekId,
        cartId,
        participantId,
        productId: stepFourConcentrationProductId,
        currentWeekId: weekId,
      });
      
      return;
    }
    if (isEqual(emptyConcentrationId, id)) {
      this.props.weeksActions.removeCustomizedWeek(id);
    }
  }
}

function mapStateToProps(state) {
  return {
    week_1_data: stepFourWeekOneDataSelector(state),
    week_2_data: stepFourWeekTwoDataSelector(state),
    week_3_data: stepFourWeekThreeDataSelector(state),
    week_4_data: stepFourWeekFourDataSelector(state),
    week_5_data: stepFourWeekFiveDataSelector(state),
    week_6_data: stepFourWeekSixDataSelector(state),
    week_7_data: stepFourWeekSevenDataSelector(state),
    week_8_data: stepFourWeekEightDataSelector(state),
    week_9_data: stepFourWeekNineDataSelector(state),
    week_10_data: stepFourWeekTenDataSelector(state),
    week_11_data: stepFourWeekElevenDataSelector(state),
    week_12_data: stepFourWeekTwelveDataSelector(state),
    cartId: cartIdSelector(state),
    participantId: participantIdSelector(state),
    stepThreeParticipantProductId: stepThreeParticipantProductIdSelector(state),
    stepFourConcentrationProductId: stepFourConcentrationProductIdSelector(state),
    concentrationOrdering: state.initialSettings.concentrationOrdering,
    viaLogoPath: state.initialSettings.viaLogoPath,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    weeksActions: bindActionCreators(weeksActions, dispatch),
    stepFourActions: bindActionCreators(stepFourActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StepFourWeekConcentrationComponent);
