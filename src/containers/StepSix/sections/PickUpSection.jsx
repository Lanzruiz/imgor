import PropTypes from 'prop-types';
import React from 'react';
import planeImg from '../../../assets/img/plane.svg';
import DatePickerReduxForm from '../../../components/DatePicker';
import Image from '../../../components/Image';
import LocaleString from '../../../components/LocaleString';
import AirlinesDropdownContainer from '../components/AirlinesDropdownContainer';
import AirportHasArrivalFlightBookedCheckbox from '../components/AirportHasArrivalFlightBookedCheckbox';
import ArrivalFlightNumberTextInput from '../components/ArrivalFlightNumberTextInput';
import DropoffCheckboxContainer from '../components/DropoffCheckboxContainer';
import DropoffLocationTextField from '../components/DropoffLocationTextField';
import Paragraph from '../components/Paragraph';
import TransportRadioContainer from '../components/TransportRadioContainer';
import UnaccompaniedCheckboxContainer from '../components/UnaccompaniedCheckboxContainer';
import { stepSixFormFieldNames } from '../selectors';

const PickUpSection = props => (
  <div className="section pick-up">
    <div className="content">
      <div className="title">
        <Image
          defaultSrc={planeImg}
          src="step_six.plane"
        />
        <LocaleString stringKey="step_six.arrival.title"/>
      </div>
      <div className="airport">
        <div className="airport__title">
          <LocaleString stringKey="step_six.arrival.airport"/>
        </div>
        <div className="dropdown">
          <TransportRadioContainer
            name={stepSixFormFieldNames.transport}
            options={props.options}
            value={props.value}
          />
        </div>
      </div>
      <div className="location">
        <div className="location__title">
          <LocaleString stringKey="step_six.arrival.location"/>
        </div>
        <DropoffCheckboxContainer dropoff={props.dropoff}/>
        <DropoffLocationTextField dropoff={props.dropoff}/>
      </div>
      <div className="unaccompanied">
        <div className="unaccompanied__title">
          <LocaleString stringKey="step_six.unaccompanied"/>
        </div>
        <Paragraph>
          <LocaleString stringKey="step_six.airlines_service"/>
        </Paragraph>
        <div className="unaccompanied__has-unaccompanied">
          <UnaccompaniedCheckboxContainer
            name={stepSixFormFieldNames.arrivalUnaccompanied}
            unaccompanied={props.unaccompanied}
            transportUnaccompanied={props.transportUnaccompanied}
          />
        </div>
        <div className="unaccompanied__booked-flight">
          <AirportHasArrivalFlightBookedCheckbox/>
        </div>
        {props.hasArrivalBookedFlight && (
          <div className="unaccompanied__flight-details">
            <div className="flight-details__box">
              <div className="unaccompanied__subtitle">
                <LocaleString stringKey="step_six.arrival.flight_number"/>
              </div>
              <ArrivalFlightNumberTextInput/>
            </div>
            <div className="flight-details">
              <div className="flight-details__box">
                <div className="unaccompanied__subtitle">
                  <LocaleString stringKey="step_six.arrival.airline"/>
                </div>
                <AirlinesDropdownContainer airlines={props.airlines}/>
              </div>
              <div className="flight-details__box">
                <div className="unaccompanied__subtitle">
                  <LocaleString stringKey="step_six.arrival.date"/>
                </div>
                <DatePickerReduxForm
                  isClearable
                  name={stepSixFormFieldNames.arrivalDateTime}
                  className="step-six__text-input step-six__form-field"
                  placeholder="Arrival Date & Time"
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

PickUpSection.propTypes = {
  options: PropTypes.any,
  value: PropTypes.any,
  dropoff: PropTypes.any,
  unaccompanied: PropTypes.any,
  transportUnaccompanied: PropTypes.any,
  hasArrivalBookedFlight: PropTypes.any,
  airlines: PropTypes.any
};

export default PickUpSection;
