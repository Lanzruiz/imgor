// Modules
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-grid-system';
// Components
import Button from '../Button';
import LocaleString from '../LocaleString';

const LoadMoreButton = (props) => {
  const { shouldRender, onClick } = props;
  return shouldRender && (
    <Row>
      <Col />
      <Col>
        <Button
          className="step-five__load-more-bth"
          onClick={onClick}
          children={<LocaleString stringKey="load_more" />}
        />
      </Col>
      <Col />
    </Row>
  );
};

LoadMoreButton.propTypes = {
  shouldRender: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

LoadMoreButton.defaultProps = {
  shouldRender: false,
  onClick: () => {},
};

export default LoadMoreButton;
