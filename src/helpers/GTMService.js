import _ from 'lodash';


const GTM_CHANGE_STATE = '@GTM/change_state';

// const sports = {
//   'Baseball': ['1'],
//   'Bollettieri Boys Tennis': ['11'],
//   'Bollettieri Girls Tennis': ['12'],
//   'Boys Basketball': ['2'],
//   'Boys Soccer': ['9'],
//   'Football': ['4'],
//   'Girls Basketball': ['3'],
//   'Girls Soccer': ['10'],
//   'Golf': ['5'],
//   'Boys Lacrosse': ['6'],
//   'Girls Lacrosse': ['7'],
//   'Performance': ['8'],
//   'Track and Field and Cross Country': ['13'],
//   'Fashion': ['14'],
//   'Basketball': ['15'],
//   'Soccer Boys': ['9'],
//   'Tennis Boys': ['11', '16'],
//   'Tennis Girls': ['12', '16'],
//   'Tennis': ['16'],
//   'Soccer': ['17'],
//   'Soccer Girls': ['10', '17'],
//   'Basketball Boys': ['2', '15'],
//   'Basketball Girls': ['3', '15'],
//   'Track & Field and Cross Country': ['13'],
//   'Lacrosse': ['18'],
//   'Lacrosse Boys': ['6', '18'],
//   'Lacrosse Girls': ['7', '18'],
//   'Academics': ['19']
// };

export const stateChangeTypes = {
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
  const { cart, form: { wizard }, initialSettings, stepOne } = state.getState();
  
  if(action.type === GTM_CHANGE_STATE){
    gtmStateChangeHandlerDebounced(
      action.payload.stateChangeType,
      { ...initialSettings, ...stepOne, ...cart, ...(wizard || {}).values || {} }
    );
  }
  next(action);
};

function pushToDataLayer(data) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);
}

function gtmStateChangeHandler(pageType = '', state) {
  
  // const sportKey = Object.keys(sports).find(key => (key || '').toLowerCase() === (state.sport || '').toLowerCase());
  
  const gtmParams = {
    event: 'newPage',
    newPageData: {
      params: {
        age: state.age,
        boarding: state.boarding || state.sleepaway,
        business_type: state.business_type || state.businessType,
        gender: state.gender,
        length_program: state.lengthProgram,
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
  };
  
  console.log('GTM >>', gtmParams);
  
  pushToDataLayer(gtmParams);
}
