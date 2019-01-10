// Modules
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, change } from 'redux-form';
import PropTypes from 'prop-types';
import queryString from 'query-string';
// Components
import Preloader from '../../components/Preloader';
// Actions
import * as initialSettingsActions from '../../actions/initialSettings';
import * as stepOneActions from '../../actions/step.one';
// Styles
import './styles.scss';

class InitialComponent extends React.Component {
  static propTypes = {
    initialSettingsActions: PropTypes.shape({
      redirectToMainPage: PropTypes.func.isRequired,
    }),
  };

  componentDidMount() {
    const { location: { search }, sport, gender, group, secondaryGroup, businessType, urlToNoProps, redirectUrlShopify } = this.props;
    const initialParams = queryString.parse(search);
    const computedSettings = {
      urlToNoProps,
      redirectUrlShopify,
      sport: sport || initialParams.sport,
      gender: gender || initialParams.gender,
      group: group || initialParams.group,
      secondaryGroup: secondaryGroup || initialParams.secondary_group,
      businessType: businessType || initialParams.business_type,
      lang: initialParams.lang || 'en',
    };
    this.setInitialSettings(computedSettings);
  }

  render() {
    return (
      <div className="start__container">
        <Preloader />
      </div>
    );
  }

  setInitialSettings = (initialSettings) => {
    const { gender, group, secondaryGroup } = initialSettings;
    if (gender) {
      this.props.dispatch(
        change('wizard', 'gender', gender),
      );
    }
    if (group || secondaryGroup) {
      this.selectGroup({ group, secondary_group: secondaryGroup });
    }
    this.props.initialSettingsActions.redirectToMainPage(initialSettings);
  };

  selectGroup = ({ group, secondary_group }) => {
    this.props.stepOneActions.selectGroup({ group, secondary_group });
  };
}

function mapStateToProps(state) {
  return {
    initialValues: { gender: state.initialSettings.gender },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    initialSettingsActions: bindActionCreators(initialSettingsActions, dispatch),
    stepOneActions: bindActionCreators(stepOneActions, dispatch),
  };
}

export default reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
})(
  connect(mapStateToProps, mapDispatchToProps)(InitialComponent)
);
