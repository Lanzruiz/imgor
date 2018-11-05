// Modules
import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-grid-system';
import shopImg from '../../assets/img/shop-img.png';
// Styles
import './styles.scss';

const Footer = (props) => {
  const { price } = props;
  return (
    <div className="footer__container footer__container--fixed">
      <Container style={{ height: '100%' }}>
        <Row style={{ height: '100%' }}>
          <Col>
            <footer className="footer">
              <div className="footer__image-container">
                <img className="footer__image" src={shopImg} alt="" />
              </div>
              <div className="footer__price-container">
                <span className="footer__price">&#36;{price}</span>
                <span className="footer__price-total">camp subtotal</span>
              </div>
              <div className="footer__text">
                <span>footer text here</span>{' '}<span>&#8593;</span>
              </div>
            </footer>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

Footer.propTypes = {
  price: PropTypes.number,
};

Footer.defaultProps = {
  price: 0,
};

export default Footer;