// Modules
import React from 'react';
import LocalizedStrings from 'react-localization';
import PropTypes from 'prop-types';

const ReactLocalizationContext = React.createContext();

export default class ReactLocalization extends React.Component {
  state = {
    strings: null,
    defaultLang: 'en',
  };

  static propTypes = {
    lang: PropTypes.string,
  };

  static defaultProps = {
    lang: 'en',
  };

  componentDidMount() {
    const { lang } = this.props;
    let locale;
    let localizedStrings;
    try {
      locale = require(`../../assets/lang/${lang}.json`);
      localizedStrings = new LocalizedStrings({ [lang]: locale });
    } catch (err) {
      console.warn(err.message);
      console.log(`Set default language "${this.state.defaultLang}".`);
      locale = require(`../../assets/lang/${this.defaultProps.lang}.json`);
      localizedStrings = new LocalizedStrings({ [this.defaultProps.lang]: locale });
    }
    this.setState({ strings: localizedStrings });
  }

  render() {
    const { children } = this.props;
    const { strings } = this.state;
    return (
      <ReactLocalizationContext.Provider
        children={children}
        value={{ strings }}
      />
    );
  }
}

export const ReactLocalizationConsumer = ReactLocalizationContext.Consumer;
