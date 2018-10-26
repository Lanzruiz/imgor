// Modules
import React from 'react';
import PropTypes from 'prop-types';
// Components
import { ReactLocalizationConsumer } from '../../providers/ReactLocalization';

const LocaleString = ({ stringKey }) => {
  if (!stringKey) return '';
  return (
    <ReactLocalizationConsumer>
      {({ strings }) => (
        strings
          ? strings[stringKey]
          : ''
      )}
    </ReactLocalizationConsumer>
  );
};

LocaleString.propTypes = {
  stringKey: PropTypes.string.isRequired,
};

export default LocaleString;
