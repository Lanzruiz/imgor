import * as cartTypes from '../constants/cart';
import _ from 'lodash';

const cartTypesArray = [cartTypes.CREATE_CART, cartTypes.DELETE_CART, cartTypes.UPDATE_CART];

const gtmStateChangeDebounced = _.debounce(gtmStateChange, 1000);

export const gtmReduxMiddleware = (state) => (next) => (action) => {
  const { cart, form: { wizard }, initialSettings, stepOne } = state.getState();
  
  const updateCart = cartTypesArray.indexOf(action.type) > -1;
  const formChange = '@@redux-form/CHANGE' === action.type;
  
  if(updateCart || formChange){
    gtmStateChangeDebounced('OR-cart', { ...initialSettings, ...stepOne, ...cart, ...(wizard || {}).values || {} })
  }
  next(action);
};


function pushToDataLayer(data) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);
}

function gtmStateChange(pageType = '', state) {
  const gtmParams = {
    event: 'newPage',
    newPageData: {
      params: {
        age: state.age,
        boarding: state.boarding,
        business_type: state.business_type || state.businessType,
        gender: state.gender,
        length_program: state.lengthProgram,
        package_type: state.package_type || state.packageType,
        refundable: state.refundable,
        sport: state.sport
      },
      title: '',
      type: pageType,
      language: state.language,
      url: `${window.location.pathname}${window.location.search}`,
      sport: state.sport
    },
    newUserData: {
      billing: {
        address: state.address,
        contact_number: state.contact_number || state.phone,
        coupon_code: state.coupon_code,
        coupon_data: state.coupon_data,
        email: state.email,
        first_name: state.first_name,
        last_name: state.last_name,
        price_total: state.price_total,
        total_discount: state.total_discount
      },
      campers: []
    }
  };
  
  
  if (state.token) {
    gtmParams.newUserData.billing.token = state.token;
  }
  
  _.mergeWith(gtmParams.newUserData.campers, state.participants, function(objValue, srcValue, key, object, source, stac) {
    if (key === 'products') {
      return [];
    }
  });
  
  _.forEach(gtmParams.newUserData.campers, function(camper) {
    delete camper.products;
  });
  
  // if (pageType === 'OR-order-complete' || pageType === 'OR-card-approved') {
  //   const products = [];
  //
  //   _.forEach(cart.participants, function(camper) {
  //     Array.prototype.push.apply(products, camper.products);
  //   });
  //
  //   gtmParams.newPageData.products = products;
  //   gtmParams.newPageData.transactionId = cart.transactions[cart.transactions.length-1].transaction_id;
  //   gtmParams.newPageData.transactionTotal = cart.price_total;
  //
  //   // if (pageType === 'OR-order-complete') {
  //   //   CartService.clearCart();
  //   // }
  // }
  
  console.log('gtmParams', gtmParams);
  
  pushToDataLayer(gtmParams);
}

const sports = {
  'Baseball': ['1'],
  'Bollettieri Boys Tennis': ['11'],
  'Bollettieri Girls Tennis': ['12'],
  'Boys Basketball': ['2'],
  'Boys Soccer': ['9'],
  'Football': ['4'],
  'Girls Basketball': ['3'],
  'Girls Soccer': ['10'],
  'Golf': ['5'],
  'Boys Lacrosse': ['6'],
  'Girls Lacrosse': ['7'],
  'Performance': ['8'],
  'Track and Field and Cross Country': ['13'],
  'Fashion': ['14'],
  'Basketball': ['15'],
  'Soccer Boys': ['9'],
  'Tennis Boys': ['11', '16'],
  'Tennis Girls': ['12', '16'],
  'Tennis': ['16'],
  'Soccer': ['17'],
  'Soccer Girls': ['10', '17'],
  'Basketball Boys': ['2', '15'],
  'Basketball Girls': ['3', '15'],
  'Track & Field and Cross Country': ['13'],
  'Lacrosse': ['18'],
  'Lacrosse Boys': ['6', '18'],
  'Lacrosse Girls': ['7', '18'],
  'Academics': ['19']
};
