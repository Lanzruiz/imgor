// Modules
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-grid-system';
import { CSSTransitionGroup } from 'react-transition-group';
import { bindActionCreators } from 'redux';
import toLower from 'lodash/toLower';
import find from 'lodash/find';
// Components
import Card, { CardContent, CardContentRow, CardContentCol, CardContentText } from '../../components/Card';
import LocaleString from '../../components/LocaleString';
import Dropdown from '../../components/Dropdown';
import Image from '../../components/Image';
import LoadMoreButton from '../../components/LoadMoreButton';
// Selectors
import { stepOneGenderSelector, cartIdSelector, participantIdSelector } from '../StepOne/selectors';
import { stepTwoStartDateSelector, stepTwoEndDateSelector } from '../StepTwo/selectors';
import {
  stepFiveUpsellPerPageSelector, stepFiveUpsellNewSelectedProductsSelector, stepFiveShouldRenderUpsellLoadMoreButtonSelector,
} from '../StepFive/selectors';
// Actions
import * as stepFiveActions from '../../actions/step.five';
// Constants
import { productTypesEnum } from '../../constants/cart';
// Helpers
import dateFormat from '../../helpers/dateFormat';

class StepFiveCatalogGearUpsellNew extends React.Component {
  static propTypes = {
    shouldRenderLoadMoreButton: PropTypes.bool,
    stepFiveGearUpsellNew: PropTypes.arrayOf(
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
    ),
    stepFiveActions: PropTypes.shape({
      stepFiveSetUpsellGearItemRequest: PropTypes.func.isRequired,
      stepFiveUpdateUpsellGearItemRequest: PropTypes.func.isRequired,
      stepFiveDeleteUpsellGearItemRequest: PropTypes.func.isRequired,
    }),
    upsellNewSelectedProducts: PropTypes.objectOf(
      PropTypes.shape({
        dateId: PropTypes.number,
        productId: PropTypes.number,
        selected: PropTypes.bool,
        needUpdate: PropTypes.bool,
      }),
    ),
  };

  static defaultProps = {
    stepFiveGearUpsellNew: [],
    upsellNewSelectedProducts: {},
    shouldRenderLoadMoreButton: false,
  };

  componentDidMount() {
    this.getCatalogGearUpsellNew();
  }

  render() {
    const { stepFiveGearUpsellNew, shouldRenderLoadMoreButton } = this.props;
    const shouldRenderCatalogGearItem = stepFiveGearUpsellNew.length > 0;
    return shouldRenderCatalogGearItem && (
      <div className="upsell-new">
        <CSSTransitionGroup
          className="align-items-stretch"
          component={Row}
          transitionName="slide"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          {stepFiveGearUpsellNew.map(this.renderUpsellNew)}
        </CSSTransitionGroup>
        <LoadMoreButton
          shouldRender={shouldRenderLoadMoreButton}
          onClick={this.increaseItemsPerPage}
        />
      </div>
    );
  }

  increaseItemsPerPage = () => {
    this.props.stepFiveActions.stepFiveIncreaseUpsellItemsPerPage();
  };

  getCatalogGearUpsellNew = () => {
    const { sport, startDate, endDate, gender } = this.props;
    const getCatalogGearUpsellNewArgs = {
      sport: 'golf' || sport, // TODO: remove that
      gender,
      start_date: '2017-10-10' || startDate, // TODO: remove that
      end_date: '2019-10-10' || endDate, // TODO: remove that
    };
    this.props.stepFiveActions.getCatalogGearUpsellNewRequest(getCatalogGearUpsellNewArgs);
  };

  renderUpsellNew = (upsellNewItem) => {
    const { upsellNewSelectedProducts } = this.props;
    const { categories, description, name, image_url, dates = [] } = upsellNewItem;
    const [ header ] = categories;
    const price = dates.length && dates[0].capacity_price;
    const id = toLower(name);
    const isCurrentItemSelected = upsellNewSelectedProducts[id] && upsellNewSelectedProducts[id].selected;

    const tooltipMessage = upsellNewSelectedProducts[id] ? '' : <LocaleString stringKey="please_choose_date" />;

    const customButtonTitle = (
      isCurrentItemSelected
        ? upsellNewSelectedProducts[id].needUpdate
          ? <LocaleString stringKey="update" />
          : <LocaleString stringKey="remove" />
        : <LocaleString stringKey="selected" />
    );

    return (
      <Col md={6} lg={4} key={id} className="card-column">
        <Card
          id={id}
          cardHeader={name}
          color="dark"
          header={header.display_name}
          price={price}
          selectedId={isCurrentItemSelected ? id : null}
          headerSize="extra-small"
          onClick={id => this.setUpsellGearItem(id, dates, !tooltipMessage)}
          customButtonTitle={customButtonTitle}
          onRemove={id => this.updateUpsellGearItem(id, dates, !tooltipMessage)}
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
  };

  renderDates = (dates, cardId) => {
    const { upsellNewSelectedProducts } = this.props;
    const options = dates.map(({ id, capacity_start_date }) => {
      return {
        id,
        name: capacity_start_date,
        display_name: dateFormat({ date: capacity_start_date, dateFormat: 'YYYY-MM-DD', resultFormat: 'MMM, DD YYYY' })
      };
    });
    const upsellNewSelectedProductsItem = upsellNewSelectedProducts[cardId];
    const selectedOptionItem = upsellNewSelectedProductsItem ? find(options, ['id', upsellNewSelectedProductsItem.dateId]) : '';
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
          handleChange={id => this.setUpsellGearItemDate({ dateId: id, cardId })}
        />
      </div>
    );
  };

  setUpsellGearItem = (cardId, dates, shouldSendRequest) => {
    if (shouldSendRequest) {
      const { cartId, participantId, upsellNewSelectedProducts } = this.props;
      const upsellNewSelectedProductsItem = upsellNewSelectedProducts[cardId];
      const product = upsellNewSelectedProductsItem ? find(dates, ['id', upsellNewSelectedProductsItem.dateId]) : '';
      const args = {
        cartId,
        participantId,
        product,
        cardId,
        quantity: 1,
        productId: product.id,
        type: productTypesEnum.gearUpsell,
      };
      this.props.stepFiveActions.stepFiveSetUpsellGearItemRequest(args);
    }
  };

  setUpsellGearItemDate = ({ cardId, dateId }) => {
    this.props.stepFiveActions.stepFiveSetUpsellGearItemDate({ cardId, dateId });
  };

  updateUpsellGearItem = (cardId, dates, shouldSendRequest) => {
    if (shouldSendRequest) {
      const { cartId, participantId, upsellNewSelectedProducts } = this.props;
      const upsellNewSelectedProductsItem = upsellNewSelectedProducts[cardId];
      const product = upsellNewSelectedProductsItem ? find(dates, ['id', upsellNewSelectedProductsItem.dateId]) : '';
      const args = {
        cartId,
        participantId,
        product,
        cardId,
        quantity: 1,
        productId: upsellNewSelectedProductsItem.productId,
        type: productTypesEnum.gearUpsell,
      };
      if (upsellNewSelectedProductsItem.needUpdate) {
        this.props.stepFiveActions.stepFiveUpdateUpsellGearItemRequest(args);
      } else {
        this.props.stepFiveActions.stepFiveDeleteUpsellGearItemRequest(args);
      }
    }
  };
}

function mapStateToProps(state) {
  return {
    stepFiveGearUpsellNew: stepFiveUpsellPerPageSelector(state),
    gender: stepOneGenderSelector(state),
    startDate: stepTwoStartDateSelector(state),
    endDate: stepTwoEndDateSelector(state),
    cartId: cartIdSelector(state),
    participantId: participantIdSelector(state),
    upsellNewSelectedProducts: stepFiveUpsellNewSelectedProductsSelector(state),
    shouldRenderLoadMoreButton: stepFiveShouldRenderUpsellLoadMoreButtonSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    stepFiveActions: bindActionCreators(stepFiveActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StepFiveCatalogGearUpsellNew);
