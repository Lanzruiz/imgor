// Modules
import React from 'react';
import LocalizedStrings from 'react-localization';
import PropTypes from 'prop-types';
import axios from 'axios';
import assign from 'lodash/assign';
import isEqual from 'lodash/isEqual';

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
    this.setLocalizedStrings();
  }

  componentDidUpdate(prevProps) {
    const { lang, contentPath } = this.props;
    if (!isEqual(lang, prevProps.lang) || !isEqual(contentPath, prevProps.contentPath)) {
      this.setLocalizedStrings();
    }
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

  setLocalizedStrings = () => {
    const { lang, contentPath } = this.props;

    let locale;
    let localizedStrings;
    let userSettings = {};
    let computedLocale;

    axios(contentPath)
      .then(res => res.data)
      .then((data) => { userSettings = data; })
      .catch((err) => { console.log(err); })
      .then(() => {
        locale = require(`../../assets/lang/${lang}.json`);
        computedLocale = assign({}, locale, userSettings);
        localizedStrings = new LocalizedStrings({ [lang]: computedLocale });
        this.setState({ strings: localizedStrings });
      })
      .catch((err) => {
        console.warn(err);
        console.log(`Set default language "${this.state.defaultLang}".`);
        locale = require(`../../assets/lang/${this.state.defaultLang}.json`);
        computedLocale = assign({}, locale, userSettings);
        localizedStrings = new LocalizedStrings({ [this.state.defaultLang]: computedLocale });
        this.setState({ strings: localizedStrings });
      });
  }
}

export const ReactLocalizationConsumer = ReactLocalizationContext.Consumer;
