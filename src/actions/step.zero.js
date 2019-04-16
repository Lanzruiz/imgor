import Api from '../api';
import { STEP_ZERO_DONE_CATALOG, STEP_ZERO_LOADING_CATALOG } from '../constants/step.zero';


export function getCatalogCampsHistogramRequestOnly({ sport, gender, businessType }) {
  return function(dispatch) {
    dispatch({ type: STEP_ZERO_LOADING_CATALOG });
    
    Api.req({
      apiCall: Api.getCatalogCampsHistogramOnly,
      res200: data => {
        const results = data.results;
  
        const total = data.total;
        const minAge = (data.results.age_from[0] || {}).name || 8;
        const maxAge = (data.results.age_to[0] || {}).name || 18;
        const genders = (data.results.gender || []).map(v => v.name);
        
        dispatch({
          type: STEP_ZERO_DONE_CATALOG,
          payload: {
            data: results,
            total,
            minAge,
            maxAge,
            genders: genders || ['Male', 'Female']
          }
        })
      },
      res404: () => console.log('Api.getCatalogCampsHistogram() => 404'), // TODO: Add error handler!
      reject: err => console.log(err), // TODO: Add error handler!
      apiCallParams: { sport, gender, business_type: businessType },
    });
  }
}
