// Modules
import React from 'react';
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

export default LocaleString;
