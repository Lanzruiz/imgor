// Modules
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import queryString from 'query-string';
// Components
import Preloader from '../../components/Preloader';
// Actions
import * as initialSettingsActions from '../../actions/initialSettings';
// Styles
import './styles.scss';

class InitialComponent extends React.Component {
  static propTypes = {
    initialSettingsActions: PropTypes.shape({
      redirectToMainPage: PropTypes.func.isRequired,
    }),
  };

  componentDidMount() {
    const { location: { search } } = this.props;
    const initialParams = queryString.parse(search);
    this.setInitialSettings(initialParams);
  }

  render() {
    return (
      <div className="start__container">
        <Preloader />
      </div>
    );
  }

  setInitialSettings = (initialSettings) => {
    const { sport, lang = 'en', business_type, package_type } = initialSettings;
    const computedSettings = {
      sport,
      lang,
      businessType: business_type,
      packageType: package_type,
    };
    this.props.initialSettingsActions.redirectToMainPage(computedSettings);
  }
}

function mapDispatchToProps(dispatch) {
  return {
    initialSettingsActions: bindActionCreators(initialSettingsActions, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(InitialComponent);
