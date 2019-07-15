import PropTypes from 'prop-types';
import React from 'react';
import planeImg from '../../../assets/img/plane.svg';
import DatePickerReduxForm from '../../../components/DatePicker';
import Image from '../../../components/Image';
import LocaleString from '../../../components/LocaleString';
import AirlinesDepartingDropdownContainer from '../components/AirlinesDepartingDropdownContainer';
import AirportHasDepartingFlightBookedCheckbox from '../components/AirportHasDepartingFlightBookedCheckbox';
import FlightNumberDepartingTextInput from '../components/FlightNumberDepartingTextInput';
import Paragraph from '../components/Paragraph';
import TransportRadioContainer from '../components/TransportRadioContainer';
import UnaccompaniedCheckboxContainer from '../components/UnaccompaniedCheckboxContainer';
import { stepSixFormFieldNames } from '../selectors';

const DropOffSection = props => (
  <div className="section drop-off">
    <div className="content">
      <div className="title">
        <Image
          defaultSrc={planeImg}
          src="step_six.plane"
        />
        <LocaleString stringKey="step_six.departure.title"/>
      </div>
      <div className="airport">
        <div className="airport__title">
          <LocaleString stringKey="step_six.departure.airport"/>
        </div>
        <TransportRadioContainer
          name={stepSixFormFieldNames.departingTransport}
          options={props.options}
          value={props.value}
        />
      </div>
      {/*<div className="location">*/}
      {/*  <div className="location__title">*/}
      {/*    <LocaleString stringKey="step_six.departure.location"/>*/}
      {/*  </div>*/}
      {/*  <DepartingCheckboxContainer departing={props.departing}/>*/}
      {/*  <PickUpLocationTextField departing={props.departing}/>*/}
      {/*</div>*/}
      <div className="unaccompanied">
        <div className="unaccompanied__title">
          <LocaleString stringKey="step_six.unaccompanied"/>
        </div>
        <Paragraph>
          <LocaleString stringKey="step_six.airlines_service"/>
        </Paragraph>
        <div className="unaccompanied__has-unaccompanied">
          <UnaccompaniedCheckboxContainer
            name={stepSixFormFieldNames.departureUnaccompanied}
            unaccompanied={props.unaccompanied}
            transportUnaccompanied={props.transportUnaccompanied}
          />
        </div>
        <div className="unaccompanied__booked-flight">
          <AirportHasDepartingFlightBookedCheckbox/>
        </div>
        {props.hasDepartingBookedFlight && (
          <div className="unaccompanied__flight-details">
            <div className="flight-details__box">
              <div className="unaccompanied__subtitle">
                <LocaleString stringKey="step_six.departure.flight_number"/>
              </div>
              <FlightNumberDepartingTextInput/>
            </div>
            
            <div className="flight-details">
              <div className="flight-details__box">
                <div className="unaccompanied__subtitle">
                  <LocaleString stringKey="step_six.departure.airline"/>
                </div>
                <AirlinesDepartingDropdownContainer airlines={props.airlines}/>
              </div>
              <div className="flight-details__box">
                <div className="unaccompanied__subtitle">
                  <LocaleString stringKey="step_six.departure.date"/>
                </div>
                <DatePickerReduxForm
                  isClearable
                  name={stepSixFormFieldNames.departingDateTime}
                  className="step-six__text-input step-six__form-field"
                  placeholder="Departing Date & Time"
                  minDate={new Date()}
                />
              </div>
            </div>
            <p className="description step-six__paragraph step-six__paragraph--small">
              <LocaleString stringKey={'step_six.provide_later_description'}/>
            </p>
          </div>
        )}
      </div>
    </div>
  </div>
);

DropOffSection.propTypes = {
  options: PropTypes.any,
  value: PropTypes.any,
  departing: PropTypes.any,
  unaccompanied: PropTypes.any,
  transportUnaccompanied: PropTypes.any,
  hasDepartingBookedFlight: PropTypes.any,
  airlines: PropTypes.any
};

export default DropOffSection;
