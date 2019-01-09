// Modules
import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-grid-system';
import Img from 'react-image';
import cx from 'classnames';
import isEqual from 'lodash/isEqual';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import assign from 'lodash/assign';
// Components
import LocaleString from '../LocaleString';
import Button from '../Button';
// Images
import shopImg from '../../assets/img/shop-img-logo.png';
// Actions
import * as stepSixActions from '../../actions/step.six';
import * as stepsActions from '../../actions/steps';
// Constants
import { stepsEnum } from '../../constants/steps';
import { airportPickupInformation } from '../../containers/StepSix/selectors';
// Selectors
import {
  participantIdSelector, cartIdSelector, cartStepSixUnnacompaniedProductIdSelector, cartStepSixDepartingProductIdSelector,
  cartStepSixArrivalProductIdSelector,
} from '../../containers/StepOne/selectors';
import {
  stepSixDepartingDataSelector, stepSixArrivalDataSelector, stepSixUnaccompaniedDataSelector,
  stepSixAirportPickupSelector,
} from '../../containers/StepSix/selectors';
// Styles
import './styles.scss';

class Footer extends React.Component {
  static propTypes = {
    price: PropTypes.number,
    arrowUp: PropTypes.bool,
    hasMessage: PropTypes.bool,
    purchaseOnClickHandler: PropTypes.func.isRequired,
    saveCampOnClickHandler: PropTypes.func.isRequired,
    shareOnClickHandler: PropTypes.func.isRequired,
    step: PropTypes.number.isRequired,
  };

  static defaultProps = {
    price: 0,
    arrowUp: false,
    hasMessage: true,
    purchaseOnClickHandler: () => { console.warn('Where is your purchaseOnClickHandler?'); },
    saveCampOnClickHandler: () => { console.log('Where is your saveCampOnClickHandler?'); },
    shareOnClickHandler: () => { console.log('Where is your shareOnClickHandler?'); }
  };

  componentDidUpdate(prevProps) {
    const {
      step, stepSixArrivalData, stepSixDepartingData, stepSixUnaccompaniedData, hasMessage,
      stepSixAirportPickup,
    } = this.props;
    if (isEqual(step, stepsEnum.six) && !hasMessage) {
      const airportPickupNoPickup = isEqual(stepSixAirportPickup, airportPickupInformation.noPickup);

      // If no pickup need to delete all products
      if (airportPickupNoPickup) {
        console.log('No pickup');
        return;
      };

      // Is data changed
      const isArrivalDataChanged = !isEqual(stepSixArrivalData, prevProps.stepSixArrivalData);
      const isDepartingDataChanged = !isEqual(stepSixDepartingData, prevProps.stepSixDepartingData);
      const isUnaccompaniedDataChanged = !isEqual(stepSixUnaccompaniedData, prevProps.stepSixUnaccompaniedData);

      const isDataChanged = isArrivalDataChanged || isDepartingDataChanged || isUnaccompaniedDataChanged;
       // If data is changed, then go to the next step
      if (isDataChanged && (!stepSixArrivalData && !stepSixDepartingData && !stepSixUnaccompaniedData)) {
        this.props.stepsActions.setStepsCounter(stepsEnum.seven);
      }
    }
  }

  render() {
    const { price, message, arrowUp, hasMessage, purchaseOnClickHandler, saveCampOnClickHandler, shareOnClickHandler, step } = this.props;
    const arrowPositinon = arrowUp ? <span className="icon-arrow-up2" /> : <span className="icon-arrow-down2" />;
    const isCurrentStepEqualToSix = isEqual(step, stepsEnum.six);

    return (
      <div className="footer__container footer__container--fixed">
        <Container style={{ height: '100%' }}>
          <Row style={{ height: '100%' }}>
            <Col>
              <footer className="footer">
                <div className="footer__image-container">
                  <Img className="footer__image" src={shopImg} alt="" />
                </div>
                <div className="footer__price-container">
                  <span className="footer__price">
                    &#36;{formatMoney(price, 0)}
                  </span>
                  <span className="footer__price-total">
                    <LocaleString stringKey="camp_subtotal" />
                  </span>
                </div>
                {hasMessage
                  ? (
                    <div className="footer__text">
                      <span>{message}</span>{' '}
                      <span>
                        {arrowPositinon}
                      </span>
                    </div>
                  ) : (
                    isCurrentStepEqualToSix
                      ? (
                        <div className="footer__btn-container">
                          <Button onClick={this.sendStepSixData}>
                            Continue
                          </Button>
                        </div>
                      ) : (
                        <div className="footer__btn-container">
                          <FooterButton
                            purchase
                            stringKey="purchase_on_shop_img"
                            onClick={purchaseOnClickHandler}
                          />
                          <FooterButton
                            save
                            stringKey="save_camp"
                            onClick={saveCampOnClickHandler}
                          />
                          <FooterButton
                            share
                            stringKey="share_camp"
                            onClick={shareOnClickHandler}
                          />
                        </div>
                      )
                  )
                }
              </footer>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  sendStepSixData = () => {
    const {
      stepSixDepartingData, participantId, cartId, stepSixArrivalData, stepSixUnaccompaniedData,
      cartStepSixUnnacompaniedProductId, cartStepSixDepartingProductId, cartStepSixArrivalProductId,
    } = this.props;

    // If arrival product id exist
    if (cartStepSixArrivalProductId) {
      // If arrival data exist update project else delete project
      if (stepSixArrivalData) {
        this.props.stepSixActions.stepSixUpdateProductInTheCart( assign({}, stepSixArrivalData, { cartId, participantId, productId: cartStepSixArrivalProductId }), );
      } else {
        this.props.stepSixActions.stepSixDeleteProductInTheCart({ cartId, participantId, productId: cartStepSixArrivalProductId, type: 'arrival_transport' });
      }
    } else {
      // If arrival data exist create project
      if (stepSixArrivalData) {
        this.props.stepSixActions.stepSixSendProductToTheCart( assign({}, stepSixArrivalData, { cartId, participantId }), );
      }
    }

    // If departing product id exist
    if (cartStepSixDepartingProductId) {
      // If departing data exist update project else delete project
      if (stepSixDepartingData) {
        this.props.stepSixActions.stepSixUpdateProductInTheCart( assign({}, stepSixDepartingData, { cartId, participantId, productId: cartStepSixDepartingProductId }), );
      } else {
        this.props.stepSixActions.stepSixDeleteProductInTheCart({ cartId, participantId, productId: cartStepSixDepartingProductId, type: 'departing_transport' });
      }
    } else {
      // If departing data exist create project
      if (stepSixDepartingData) {
        this.props.stepSixActions.stepSixSendProductToTheCart( assign({}, stepSixDepartingData, { cartId, participantId }), );
      }
    }

    // If unaccompanied product id exist
    if (cartStepSixUnnacompaniedProductId) {
      // If unaccompanied data exist update project else delete project
      if (stepSixUnaccompaniedData) {
        this.props.stepSixActions.stepSixUpdateProductInTheCart( assign({}, stepSixUnaccompaniedData, { cartId, participantId, productId: cartStepSixUnnacompaniedProductId }), );
      } else {
        this.props.stepSixActions.stepSixDeleteProductInTheCart({ cartId, participantId, productId: cartStepSixUnnacompaniedProductId, type: 'unacompannied' });
      }
    } else {
      // If unaccompanied data exist create project
      if (stepSixUnaccompaniedData) {
        this.props.stepSixActions.stepSixSendProductToTheCart( assign({}, stepSixUnaccompaniedData, { cartId, participantId }), );
      }
    }

    // Go to next step
    if (!stepSixArrivalData && !stepSixDepartingData && !stepSixUnaccompaniedData) {
      this.props.stepsActions.setStepsCounter(stepsEnum.seven);
    }
  }
};

function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? '-' : '';

    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    let j = (i.length > 3) ? i.length % 3 : 0;

    return (
      `${negativeSign}${(j ? i.substr(0, j) + thousands : '')}${i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands)}${(decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "")}`
    );
  } catch (e) {
    console.log(e);
  }
};

function FooterButton(args) {
  const { stringKey = '', onClick, share = false, save = false, purchase = false } = args;
  const computedClassNames = cx('footer__btn', {
    'footer__btn--share-camp': share,
    'footer__btn footer__btn--save-camp': save,
    'footer__btn footer__btn--purchase': purchase,
  });
  return (
    <div className={computedClassNames}>
      <Button onClick={onClick}>
        <LocaleString stringKey={stringKey} />
      </Button>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    cartId: cartIdSelector(state),
    stepSixDepartingData: stepSixDepartingDataSelector(state),
    stepSixArrivalData: stepSixArrivalDataSelector(state),
    stepSixUnaccompaniedData: stepSixUnaccompaniedDataSelector(state),
    participantId: participantIdSelector(state),
    cartStepSixUnnacompaniedProductId: cartStepSixUnnacompaniedProductIdSelector(state),
    cartStepSixDepartingProductId: cartStepSixDepartingProductIdSelector(state),
    cartStepSixArrivalProductId: cartStepSixArrivalProductIdSelector(state),
    stepSixAirportPickup: stepSixAirportPickupSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    stepSixActions: bindActionCreators(stepSixActions, dispatch),
    stepsActions: bindActionCreators(stepsActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
