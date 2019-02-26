import _ from 'lodash';

const GTM_CHANGE_STATE = '@GTM/change_state';

export const stateChangeTypes = {
  OR_CAMPER_EMAIL: 'OR-camper-email',
  OR_CAMP_DURATION: 'OR-cam-duration',
  OR_CAMPER_BOARDING: 'OR-camper-boarding',
  OR_CAMPER_CALENDAR: 'OR-camper-calendar',
  OR_CAMPER_INFORMATION: 'OR-camper-information',
  OR_CAMPER_PROGRAM: 'OR-camper-program',
  OR_CART: 'OR-cart'
};

export const gtmStateChange = (stateChangeType) => (dispatch) => {
  dispatch({
    type: GTM_CHANGE_STATE,
    payload: { stateChangeType }
  })
};

const gtmStateChangeHandlerDebounced = _.debounce(gtmStateChangeHandler, 1000);

export const gtmReduxMiddleware = (state) => (next) => (action) => {
  const { cart, form: { wizard }, initialSettings, stepOne, weeks } = state.getState();
  
  if(action.type === GTM_CHANGE_STATE){
    gtmStateChangeHandlerDebounced(
      action.payload.stateChangeType,
      { ...initialSettings, ...stepOne, ...cart, ...weeks, ...(wizard || {}).values || {} }
    );
  }
  next(action);
};

function pushToDataLayer(data) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);
}

function gtmStateChangeHandler(pageType = '', state) {
  
  const gtmParams = {
    event: 'newPage',
    newPageData: {
      params: {
        age: state.age,
        boarding: state.boarding || state.sleepaway,
        business_type: state.business_type || state.businessType,
        gender: state.gender,
        length_program: state.weeksCounter || state.secondary_group,
        package_type: state.package_type || state.packageType,
        refundable: state.refundable,
        sport: state.sport
      },
      title: document.title,
      type: pageType,
      language: state.language,
      url: `${window.location.href}`,
      sport: state.sport
    },
    newUserData:{
      billing: {
        address: null,
        contact_number: null,
        coupon_number: null,
        coupon_code: null,
        coupon_data: [],
        email: state.email,
        first_name: state.first_name,
        last_name: state.last_name,
        price_total: state.price_total,
        total_discount: state.total_discount,
      },
      campers: [{
        id: null,
        created: null,
        updated: null,
        address: null,
        first_name: state.guardian_information.first_name,
        last_name: state.guardian_information.last_name,
        email: state.guardian_information.email,
        phone: state.guardian_information.phone,
        medical_waiver: null,
        preferred_shirt_size: state.shirt_size,
        preferred_short_size: state.shirt_size,
        dob: state.dob,
        gender: state.gender,
        position: state.position,
        price_total: state.price_total,
        age: state.age,
        quantity: 1
      }]
    }
  };
  
  pushToDataLayer(gtmParams);
}
