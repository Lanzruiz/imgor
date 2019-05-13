// Modules
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { Row, Col, Container } from 'react-grid-system';
import { Col } from 'react-grid-system';
// import { CSSTransitionGroup } from 'react-transition-group';
import { bindActionCreators } from 'redux';
import toLower from 'lodash/toLower';
import find from 'lodash/find';
import scrollToComponent from 'react-scroll-to-component';
// import AOSFadeInContainer from '../../components/AOSFadeInContainer';
// Components
import Card, { CardContent, CardContentRow, CardContentCol, CardContentText } from '../../components/Card';
import LoadMoreButton from '../../components/LoadMoreButton';
import LocaleString from '../../components/LocaleString';
import Dropdown from '../../components/Dropdown';
import Image from '../../components/Image';
import { gtmAddCartProduct } from '../../helpers/GTMService';
import { sportSelector } from '../InitialComponent/selectors';
// Selectors
import {
  stepOneGenderSelector,
  cartIdSelector,
  participantIdSelector,
  weeksCounterSelector
} from '../StepOne/selectors';
import { stepTwoStartDateSelector, stepTwoEndDateSelector } from '../StepTwo/selectors';
import {
  stepFiveUpsellPerPageSelector,
  stepFiveUpsellNewSelectedProductsSelector,
  stepFiveShouldRenderUpsellLoadMoreButtonSelector
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
  };

  componentDidMount() {
    // const { weeksCounter } = this.props;
    this.getCatalogGearUpsellNew();
    //this.scrollToCurrentComponent();
  }

  scrollToCurrentComponent = () => {
    scrollToComponent(this, { align: 'top', duration: 500 });
  };

  componentWillUnmount() {
    const { upsellNewSelectedProducts, cartId, participantId, } = this.props;
    for (let key in upsellNewSelectedProducts) {
      const args = {
        cartId,
        participantId,
        productId: upsellNewSelectedProducts[key].productId,
        cardId: upsellNewSelectedProducts[key].dateId,
      };
      this.props.stepFiveActions.stepFiveDeleteUpsellGearItemRequest(args);
    }
  }
  
  loadMore = () => {
    this.props.stepFiveActions.stepFiveIncreaseUpsellItemsPerPage();
  };
  
  setUpsellGearItemDate = ({ cardId, dateId }) => {
    this.props.stepFiveActions.stepFiveSetUpsellGearItemDate({ cardId, dateId });
  };
  
  updateUpsellGearItem = async (cardId, dates, shouldSendRequest) => {
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
        await this.props.stepFiveActions.stepFiveUpdateUpsellGearItemRequest(args);
      } else {
        await this.props.stepFiveActions.stepFiveDeleteUpsellGearItemRequest(args);
      }
      
      this.props.gtmAddCartProduct({ id: product.id });
    }
  };
  
  getCatalogGearUpsellNew = () => {
    const { sport, startDate, endDate, gender } = this.props;
    const getCatalogGearUpsellNewArgs = {
      sport: sport,
      gender,
      start_date: startDate,
      end_date: endDate,
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
      <Col md={12} lg={6} key={id} className="card-column service-card">
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
                <Image className="card-content__img" defaultSrc={image_url} />
              </CardContentCol>
              <CardContentCol className="react-center-center react-flex-1">
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
  
  setUpsellGearItem = async (cardId, dates, shouldSendRequest) => {
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
      await this.props.stepFiveActions.stepFiveSetUpsellGearItemRequest(args);
      
      this.props.gtmAddCartProduct({ id: product.id });
    }
  };
  
  render() {
    const { stepFiveGearUpsellNew, shouldRenderLoadMoreButton } = this.props;
    const shouldRenderCatalogGearItem = stepFiveGearUpsellNew.length > 0;
    return shouldRenderCatalogGearItem && (
      <Fragment>
        {/*<AOSFadeInContainer className="step-five" id="step-5-1">*/}
        {/*  <Container style={{ marginBottom: '65px' }}>*/}
        {/*    <div className="upsell-new">*/}
        {/*      <CSSTransitionGroup*/}
        {/*        className="align-items-stretch"*/}
        {/*        component={Row}*/}
        {/*        transitionName="slide-top"*/}
        {/*        transitionEnterTimeout={500}*/}
        {/*        transitionLeaveTimeout={300}*/}
        {/*      >*/}
        {/*        {stepFiveGearUpsellNew.map(this.renderUpsellNew)}*/}
        {/*      </CSSTransitionGroup>*/}
        {/*    </div>*/}
        {/*    <LoadMoreButton*/}
        {/*      shouldRender={shouldRenderLoadMoreButton}*/}
        {/*      onClick={this.loadMore}*/}
        {/*    />*/}
        {/*  </Container>*/}
        {/*</AOSFadeInContainer>*/}
        {stepFiveGearUpsellNew.map(this.renderUpsellNew)}
        <Col xs={12} lg={12}>
          <LoadMoreButton
            shouldRender={shouldRenderLoadMoreButton}
            onClick={this.loadMore}
          />
        </Col>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    stepFiveGearUpsellNew: stepFiveUpsellPerPageSelector(state),
    gender: stepOneGenderSelector(state),
    startDate: stepTwoStartDateSelector(state),
    endDate: stepTwoEndDateSelector(state),
    cartId: cartIdSelector(state),
    participantId: participantIdSelector(state),
    sport: sportSelector(state),
    upsellNewSelectedProducts: stepFiveUpsellNewSelectedProductsSelector(state),
    shouldRenderLoadMoreButton: stepFiveShouldRenderUpsellLoadMoreButtonSelector(state),
    weeksCounter: weeksCounterSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    stepFiveActions: bindActionCreators(stepFiveActions, dispatch),
    gtmAddCartProduct: bindActionCreators(gtmAddCartProduct, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StepFiveCatalogGearUpsellNew);
