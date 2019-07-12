// Modules
import React from 'react';
import PropTypes from 'prop-types';
// Components
import { ReactLocalizationConsumer } from '../../providers/ReactLocalization';

const LocaleString = ({ stringKey, formatString }) => {
  const emptyString = '';
  if (!stringKey) return emptyString;
  return (
    <ReactLocalizationConsumer>
      {value => (
        value && value.strings
          ? (
              formatString
                ? value.strings.formatString(value.strings[stringKey], formatString)
                : value.strings[stringKey]
            )
          : (
              emptyString
            )
      )}
    </ReactLocalizationConsumer>
  );
};

LocaleString.propTypes = {
  formatString: PropTypes.object,
  stringKey: PropTypes.string.isRequired,
};

export default LocaleString;
