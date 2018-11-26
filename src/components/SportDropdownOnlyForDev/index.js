// Modules
import React from 'react';
import PropTypes from 'prop-types';
import { Container, Col, Row } from 'react-grid-system';
// Components
import Dropdown from '../Dropdown';
// Styles
import './styles.scss';

const SportDropdownOnlyForDev = (props) => {
  if (process.env.NODE_ENV === 'production') return false;
  const { selectedOption } = props;
  const options = [
    { id: 1, display_name: 'Football', name: 'football' },
    { id: 2, display_name: 'Baseball', name: 'baseball' },
    { id: 3, display_name: 'Track & Field', name: 'track&field' },
    { id: 4, display_name: 'Soccer', name: 'soccer' },
    { id: 5, display_name: 'Lacrosse', name: 'lacrosse' },
    { id: 6, display_name: 'Basketball', name: 'basketball' },
    { id: 7, display_name: 'Tennis', name: 'tennis' },
    { id: 8, display_name: 'Golf', name: 'golf' },
    { id: 9, display_name: 'Performance', name: 'performance' },
  ];
  return (
    <Container>
      <Row>
        <Col>
          <div className="sport-dropdown-only-for-dev">
            <Dropdown
              options={options}
              selectedOption={selectedOption}
              handleChange={() => {}}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

SportDropdownOnlyForDev.propTypes = {
  selectedOption: PropTypes.string.isRequired,
};

SportDropdownOnlyForDev.defaultProps = {
  selectedOption: 'Choose your sport (only for development)',
};

export default SportDropdownOnlyForDev;
