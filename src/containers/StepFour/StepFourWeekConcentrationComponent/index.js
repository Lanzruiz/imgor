// Modules
import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-grid-system';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cx from 'classnames';
import assign from 'lodash/assign';
import find from 'lodash/find';
import { ReactHeight } from 'react-height';
import isEqual from 'lodash/isEqual';
import flatten from 'lodash/flatten';
import Button from '../../../components/Button';
// Components
import Card, { CardContent, CardContentRow, CardContentCol, ImagePlus } from '../../../components/Card';
import {
  EducationSentence,
  FifteenHoursSentence,
  OneHourSentence,
  PerWeekSentence,
  TrainingSentence
} from '../index';
import { gtmAddCartProduct } from '../../../helpers/GTMService';
import LocaleString from '../../../components/LocaleString';
// Actions
import * as weeksActions from '../../../actions/weeks';
import * as stepFourActions from '../../../actions/step.four';
// Selectors
import { cartIdSelector, participantIdSelector } from '../../StepOne/selectors';
import { stepThreeParticipantProductIdSelector } from '../../StepThree/selector';
import { stepFourConcentrationProductIdSelector, stepFourWeeksDataSelector } from '../selectors';
// Constants
import { productTypesEnum } from '../../../constants/cart';
import { emptyConcentrationId, emptyConcentrationsSkipWeek } from '../../../reducers/step.four';
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
    weeksActions: PropTypes.shape({
      customizeWeek: PropTypes.func.isRequired,
      setWeekPrice: PropTypes.func.isRequired,
      removeCustomizedWeek: PropTypes.func,
      updateSelectedConcentration: PropTypes.func,
    }),
    maxWeekCounter: PropTypes.number.isRequired,
    concentrationOrdering: PropTypes.array,
    isFirstWeek: PropTypes.bool,
    isEmptyConcentrations: PropTypes.bool,
    isLastWeek: PropTypes.bool,
  };
  
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
    const { customizeId, isFirstWeek, viaLogoPath, product, isEmptyConcentrations, isLastWeek } = this.props;
    
    const { id, price, age_range, secondary_program_type, sold_out, via_label } = product || { id: emptyConcentrationsSkipWeek };
  
    if(isEmptyConcentrations){
      return (
        <div className="step-four-tabs__tab-panel__empty-week empty-week">
          <p>No available weekly training.</p>
          {!isLastWeek && (
            <Button className="empty-week__button" onClick={() => this.customizeWeek(id)}>
              Go to the next step
            </Button>
          )}
        </div>
      )
    }
    
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
  
  customizeWeek = async (id) => {
    
    const { weekId, cartId, participantId, maxWeekCounter, stepFourConcentrationProductId } = this.props;
    
    const data = flatten(this.props.weeksData.map(v => v.concentrations )).map(v => v.product);
    
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

      await this.props.weeksActions.updateSelectedConcentration(args);
      this.props.gtmAddCartProduct({ id });
      return;
    }

    await this.props.stepFourActions.stepFourCustomizeWeekRequest(args);

    setTimeout(() => { this.props.gtmAddCartProduct({ id }) }, 1000)
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
    weeksData: stepFourWeeksDataSelector(state),
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
    gtmAddCartProduct: bindActionCreators(gtmAddCartProduct, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StepFourWeekConcentrationComponent);
