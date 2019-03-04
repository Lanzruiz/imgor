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
      {({ strings }) => (
        strings
          ? (
              formatString
                ? strings.formatString(strings[stringKey], formatString)
                : strings[stringKey]
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
