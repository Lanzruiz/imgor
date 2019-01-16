// Modules
import React from 'react';
import LocalizedStrings from 'react-localization';
import PropTypes from 'prop-types';
import axios from 'axios';
import assign from 'lodash/assign';

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

  async componentDidMount() {
    const { lang } = this.props;

    let locale;
    let localizedStrings;
    let userSettings = {};
    let computedLocale;

    await axios(`${process.env.PUBLIC_URL}/settings/locale.${lang}.json`)
        .then(res => res.data)
        .then((data) => { userSettings = data; });

    try {
      locale = require(`../../assets/lang/${lang}.json`);
      computedLocale = assign({}, locale, userSettings);
      localizedStrings = new LocalizedStrings({ [lang]: computedLocale });
    } catch (err) {
      console.warn(err.message);
      console.log(`Set default language "${this.state.defaultLang}".`);
      locale = require(`../../assets/lang/${this.state.defaultLang}.json`);
      computedLocale = assign({}, locale, userSettings);
      localizedStrings = new LocalizedStrings({ [this.state.defaultLang]: computedLocale });
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
