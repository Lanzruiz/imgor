// Modules
import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-grid-system';
import Img from 'react-image';
// Components
import LocaleString from '../LocaleString';
// Images
import shopImg from '../../assets/img/shop-img-logo.png';
import arrowUpSmall from '../../assets/img/arrow-up-small.png';
import arrowDownSmall from '../../assets/img/arrow-down-small.png';
// Styles
import './styles.scss';

const Footer = (props) => {
  const { price, message, arrowUp } = props;
  const arrowPositinon = arrowUp ? arrowUpSmall : arrowDownSmall;
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
              <div className="footer__text">
                <span>{message}</span>{' '}
                <span>
                  <Img src={arrowPositinon} />
                </span>
              </div>
            </footer>
          </Col>
        </Row>
      </Container>
    </div>
  );
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

Footer.propTypes = {
  price: PropTypes.number,
  arrowUp: PropTypes.bool,
};

Footer.defaultProps = {
  price: 0,
  arrowUp: false,
};

export default Footer;