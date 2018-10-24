// Modules
import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import Img from 'react-image'
// Components
import Header from '../../components/Header';
import LocaleString from '../../components/LocaleString';
// Images
import call from '../../assets/img/call-icon.png';
import email from '../../assets/img/email-icon.png';
import chat from '../../assets/img/chat-icon.png';
// Styles
import './styles.scss';

class StepTwo extends React.Component {
  render() {
    return (
      <Container style={{ marginBottom: '130px' }}>
        <Row>
          <Col>
            <Header
              header="step_two.header"
              subHeader="step_two.sub_header"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="step-two__container">
              <div className="step-two__questions questions">
                <span className="questions__questions">
                  <LocaleString stringKey="step_two.questions.questions" />
                </span>
                <h2 className="questions__header">
                  <LocaleString stringKey="step_two.questions.header" />
                </h2>
                <p className="questions__description">
                  <LocaleString stringKey="step_two.questions.description" />
                </p>
                <div className="questions__icons icons">
                  <span className="icons__container">
                    <Img src={call} alt="call" />
                    <span className="icons__text">call</span>
                  </span>
                  <span className="icons__container">
                    <Img src={email} alt="email" />
                    <span className="icons__text">email</span>
                  </span>
                  <span className="icons__container">
                    <Img src={chat} alt="chat" />
                    <span className="icons__text">chat</span>
                  </span>
                </div>
              </div>
              <div className="step-two__dates dates">
                <h2 className="dates__header">
                  <LocaleString stringKey="step_two.dates.header" />&#42;
                </h2>
                <ul className="dates__container">
                  <li className="dates__column">
                    <ul>
                      <li className="dates__item sold-out">Sep 16, 2018</li>
                      <li className="dates__item sold-out">Sep 16, 2018</li>
                      <li className="dates__item sold-out">Sep 16, 2018</li>
                      <li className="dates__item sold-out">Sep 16, 2018</li>
                      <li className="dates__item sold-out">Sep 16, 2018</li>
                      <li className="dates__item sold-out">Sep 16, 2018</li>
                    </ul>
                  </li>
                  <li className="dates__column">
                    <ul>
                      <li className="dates__item">Sep 16, 2018</li>
                      <li className="dates__item active">Sep 16, 2018</li>
                      <li className="dates__item">Sep 16, 2018</li>
                      <li className="dates__item">Sep 16, 2018</li>
                      <li className="dates__item sold-out">Sep 16, 2018</li>
                      <li className="dates__item sold-out">Sep 16, 2018</li>
                    </ul>
                  </li>
                  <li className="dates__column">
                    <ul>
                      <li className="dates__item">Sep 16, 2018</li>
                      <li className="dates__item sold-out">Sep 16, 2018</li>
                      <li className="dates__item">Sep 16, 2018</li>
                      <li className="dates__item">Sep 16, 2018</li>
                      <li className="dates__item sold-out">Sep 16, 2018</li>
                      <li className="dates__item">Sep 16, 2018</li>
                    </ul>
                  </li>
                  <li className="dates__column">
                    <ul>
                      <li className="dates__item">Sep 16, 2018</li>
                      <li className="dates__item sold-out">Sep 16, 2018</li>
                      <li className="dates__item">Sep 16, 2018</li>
                      <li className="dates__item">Sep 16, 2018</li>
                      <li className="dates__item sold-out">Sep 16, 2018</li>
                      <li className="dates__item">Sep 16, 2018</li>
                    </ul>
                  </li>
                  <li className="dates__column">
                    <ul>
                      <li className="dates__item">Sep 16, 2018</li>
                      <li className="dates__item sold-out">Sep 16, 2018</li>
                      <li className="dates__item sold-out">Sep 16, 2018</li>
                      <li className="dates__item">Sep 16, 2018</li>
                      <li className="dates__item">Sep 16, 2018</li>
                      <li className="dates__item">Sep 16, 2018</li>
                    </ul>
                  </li>
                  <li className="dates__column">
                    <ul>
                      <li className="dates__item sold-out">Sep 16, 2018</li>
                      <li className="dates__item">Sep 16, 2018</li>
                      <li className="dates__item">Sep 16, 2018</li>
                      <li className="dates__item sold-out">Sep 16, 2018</li>
                      <li className="dates__item">Sep 16, 2018</li>
                      <li className="dates__item sold-out">Sep 16, 2018</li>
                    </ul>
                  </li>
                </ul>
                <div className="step-two__description description">
                  <span className="description__info">
                    &#42;<LocaleString stringKey="step_two.dates.header_descripion" />
                  </span>
                  <span className="description__sold-out sold-out">
                    <LocaleString stringKey="step_two.dates.sold_out" />
                  </span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="step-two__selected-date selected-date">
              <div className="selected-date__container">
                <div className="selected-date__info">
                  <div className="selected-date__check-in check-in">
                    <span className="check-in__text">
                      <LocaleString stringKey="step_two.dates.check_in" />
                    </span>
                  </div>
                  <div className="selected-date__current-selected current-selected">
                    <h2 className="current-selected__header">
                      <LocaleString stringKey="step_two.dates.selected.header" />
                    </h2>
                    <div className="current-selected__days">
                      <span className="">satuday</span>
                      <span className="">satuday</span>
                    </div>
                    <div className="current-selected__dates">
                      <span>Nov 16, 2018</span>
                      <span className="">-</span>
                      <span className="">Nov 16, 2018</span>
                    </div>
                  </div>
                  <div className="selected-date__check-out check-out">
                    <span className="check-out__text">
                      <LocaleString stringKey="step_two.dates.check_out" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default StepTwo;