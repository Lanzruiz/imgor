// Modules
import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Col, Row } from 'react-grid-system';
import isEqual from 'lodash/isEqual';
import toLower from 'lodash/toLower';
import find from 'lodash/find';
import { CSSTransitionGroup } from 'react-transition-group';
// Components
import Card, { CardContent, CardContentCol, CardContentRow, CardContentText } from '../../components/Card';
import Image from '../../components/Image';
import LocaleString from '../../components/LocaleString';
import Dropdown from '../../components/Dropdown';
// Actions
import * as stepFiveActions from '../../actions/step.five';
// Selectors
import { cartIdSelector, participantIdSelector } from '../StepOne/selectors';
import { stepTwoStartDateSelector, stepTwoEndDateSelector } from '../StepTwo/selectors';
import { stepFiveExcurcionsPerPageSelector, stepFiveSelectedExcurcionGearSelector } from '../StepFive/selectors';
// Constants
import { productTypesEnum } from '../../constants/cart';
// Helpers
import dateFormat from '../../helpers/dateFormat';
// Styles
import './styles.scss';

class StepFiveCatalogExcursionsNew extends React.Component {
  state = {
    cardHeadHeight: 44,
  };

  static propTypes = {
    excursions: PropTypes.arrayOf(
      PropTypes.shape({
        categories: PropTypes.arrayOf(
          PropTypes.shape({
            display_name: PropTypes.string,
          }),
        ),
        name: PropTypes.string,
        description: PropTypes.string,
        image_url: PropTypes.string,
        dates: PropTypes.arrayOf(
          PropTypes.shape({
            capacity_price: PropTypes.number,
          }),
        ),
      }),
    ).isRequired,
  };

  static defaultProps = {
    excursions: [],
    shouldRenderExcursionsLoadMoreButton: false,
  };

  componentDidMount() {
    const { startDate, endDate } = this.props;
    this.getCatalogExcursionsNew({ startDate, endDate });
  }

  render() {
    const { excursions } = this.props;
    if (isEqual(excursions.length, 0)) return null;
    return (
      <div className="excursions">
        <CSSTransitionGroup
          component={Row}
          transitionName="slide"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          {excursions.map(this.renderExcursionItem)}
        </CSSTransitionGroup>
      </div>
    );
  }

  getCatalogExcursionsNew = ({ startDate, endDate }) => {
    this.props.stepFiveActions.stepFiveGetCatalogExcursionsNewRequest({ startDate, endDate });
  };

  renderExcursionItem = (item) => {
    const { selectedExcurcionGear } = this.props;
    const { cardHeadHeight } = this.state;
    const { categories, description, name, image_url, dates } = item;
    const [ header ] = categories;
    const price = dates.length && dates[0].capacity_price;
    const cardBobyHeadStyles = { minHeight: cardHeadHeight };
    const id = toLower(name);
    const isCurrentItemSelected = selectedExcurcionGear[id] && selectedExcurcionGear[id].selected;
    const tooltipMessage = selectedExcurcionGear[id] ? '' : <LocaleString stringKey="please_choose_date" />;
    const customButtonTitle = (
      isCurrentItemSelected
        ? selectedExcurcionGear[id].needUpdate
          ? <LocaleString stringKey="update" />
          : <LocaleString stringKey="remove" />
        : <LocaleString stringKey="selected" />
    );
    return (
      <Col key={id} md={6} lg={4} className="excursion__item">
        <Card
          id={id}
          cardHeader={name}
          color="dark"
          header={header.display_name}
          price={price}
          selectedId={isCurrentItemSelected ? id : null}
          headerSize="extra-small"
          onClick={id => this.setExcursionGearItemRequest(id, dates, !tooltipMessage)}
          customButtonTitle={customButtonTitle}
          onRemove={id => this.updateExcursionGearItemRequest(id, dates, !tooltipMessage)}
          onCardBodyHeadHeightReady={this.setCatdHeadHeight}
          cardBobyHeadStyles={cardBobyHeadStyles}
          tooltipMessage={tooltipMessage}
        >
          <CardContent>
            <CardContentRow>
              <CardContentCol className="card-content__img-container">
                <Image className="card-content__img" src={image_url} />
              </CardContentCol>
              <CardContentCol className="center-center flex-1">
                {this.renderDates(dates, id)}
              </CardContentCol>
            </CardContentRow>
            <CardContentText>
              {description}
            </CardContentText>
          </CardContent>
        </Card>
      </Col>
    );
  }

  renderDates = (dates, cardId) => {
    const { selectedExcurcionGear } = this.props;
    const options = dates.map(({ id, capacity_start_date }) => {
      return {
        id,
        name: capacity_start_date,
        display_name: dateFormat({ date: capacity_start_date, dateFormat: 'YYYY-MM-DD', resultFormat: 'MMM, DD YYYY' })
      };
    });
    const selectedExcurcionGearItem = selectedExcurcionGear[cardId];
    const selectedOptionItem = selectedExcurcionGearItem ? find(options, ['id', selectedExcurcionGearItem.dateId]) : '';
    const selectedOption = (
      selectedOptionItem
        ? dateFormat({ date: selectedOptionItem.display_name, dateFormat: 'MMM, DD YYYY', resultFormat: 'MMM, DD' })
        : <LocaleString stringKey="select" />
    );
    return (
      <div className="step-five__card-attributes">
        <Dropdown
          selectedOption={selectedOption}
          options={options}
          label={<LocaleString stringKey="date" />}
          handleChange={id => this.setExcursionGearItemDate(id, cardId)}
        />
      </div>
    );
  };

  setExcursionGearItemDate = (dateId, cardId) => {
    this.props.stepFiveActions.setExcursionGearItemDate({ dateId, cardId });
  }

  setCatdHeadHeight = (height) => {
    if (this.state.cardHeadHeight < height) {
      this.setState(() => ({ cardHeadHeight: height }));
    }
  };

  setExcursionGearItemRequest = (cardId, dates, shouldSendRequest) => {
    if (shouldSendRequest) {
      const { cartId, participantId, selectedExcurcionGear } = this.props;
      const selectedExcurcionGearItem = selectedExcurcionGear[cardId];
      const product = selectedExcurcionGearItem ? find(dates, ['id', selectedExcurcionGearItem.dateId]) : '';
      const args = {
        cartId,
        participantId,
        product,
        cardId,
        quantity: 1,
        productId: product.id,
        type: productTypesEnum.excursion,
      };
      this.props.stepFiveActions.stepFiveSetExcursionGearItemRequest(args);
    }
  };

  updateExcursionGearItemRequest = (cardId, dates, shouldSendRequest) => {
    if (shouldSendRequest) {
      const { cartId, participantId, selectedExcurcionGear } = this.props;
      const selectedExcurcionGearItem = selectedExcurcionGear[cardId];
      const product = selectedExcurcionGearItem ? find(dates, ['id', selectedExcurcionGearItem.dateId]) : '';
      const args = {
        cartId,
        participantId,
        product,
        cardId,
        quantity: 1,
        productId: selectedExcurcionGearItem.productId,
        type: productTypesEnum.excursion,
      };
      if (selectedExcurcionGearItem.needUpdate) {
        this.props.stepFiveActions.stepFiveUpdateExcursionGearItemRequest(args);
      } else {
        this.props.stepFiveActions.stepFiveDeleteExcursionGearItemRequest(args);
      }
    }
  }
}

function mapStateToProps(state) {
  return {
    excursions: stepFiveExcurcionsPerPageSelector(state),
    selectedExcurcionGear: stepFiveSelectedExcurcionGearSelector(state),
    cartId: cartIdSelector(state),
    participantId: participantIdSelector(state),
    startDate: stepTwoStartDateSelector(state),
    endDate: stepTwoEndDateSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    stepFiveActions: bindActionCreators(stepFiveActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StepFiveCatalogExcursionsNew);
