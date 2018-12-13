// Modules
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

class Api {
  static getInstance() {
    if (!Api.instance) {
        Api.instance = new Api();
    }
    return Api.instance;
  };

  async req({ apiCall, res200, res404, reject, apiCallParams }) {
    return await apiCall(apiCallParams)
      .then(function({ data, status }) {
        if (status === 200) res200(data);
        if (status === 404) res404();
      })
      .catch(function(err) {
        reject(err);
      });
  };

  async createCart() {
    return await instance.post('cart');
  };

  async getCatalogCampsGroup({ sport }) {
    return await instance.get('catalog/camps/groups', {
      params: {
        sport,
      },
    });
  };

  async getCatalogCamps({ business_type, program_type, sport, age, gender, start_date, end_date }) {
    return await instance.get('catalog/camps', {
      params: {
        business_type,
        program_type,
        sport,
        age,
        gender,
        start_date,
        end_date,
      },
    });
  };

  async postCartCartIdParticipant({ cartId, email }) {
    return await instance.post(`cart/${cartId}/participant`, {
      email,
    });
  };

  async getCatalogGear() {
    return await instance.get('catalog/gear');
  };

  async getCatalogCampsCalendar({ age, boarding, business_type, gender, package_type, sport, group, secondary_group, length, }) {
    return await instance.get('catalog/camps/calendar', {
      params: {
        age,
        boarding,
        business_type,
        gender,
        package_type,
        sport,
        group,
        secondary_group,
        length,
      },
    });
  };

  async putCartCartIdParticipantParticipantId({ cartId, participantId, gender, age }) {
    return await instance.put(`cart/${cartId}/participant/${participantId}`, {
      gender,
      age,
    });
  };

  async getCatalogCampsLevels(args) {
    const {
      sport, business_type, package_type, gender, boarding, group, secondary_group, age, date,
    } = args;
    return await instance.get('catalog/camps/levels', {
      params: {
        sport,
        business_type,
        package_type,
        gender,
        boarding,
        age,
        group,
        secondary_group,
        date,
      },
    });
  };

  async postCartCartIdParticipantIdProduct({ cartId, id, product, participant_id }) {
    return await instance.post(`cart/${cartId}/participant/${participant_id}/product`, {
      product,
      product_id: id,
    });
  };

  async getCatalogCampsHistogram({ sport, gender, boarding, days, age }) {
    return await instance.get('catalog/camps/histogram', {
      params: {
        sport,
        gender,
        boarding,
        days,
        age,
      },
    });
  };

  async getCatalogTransport() {
    return await instance.get('catalog/transport');
  };

  async getCatalogAirlines() {
    return await instance.get('catalog/airlines');
  };

  async getCatalogTransportUnaccompanied() {
    return await instance.get('catalog/transport/unaccompanied');
  };

  async getCatalogCampCampId(selectedCampId) {
    return await instance.get(`catalog/camp/${selectedCampId}`);
  };

  async getCatalogGearUpsellNew({ business_type, package_type, sport, gender, boarding, age, start_date }) {
    return await instance.get('catalog/gear/upsell-new', {
      params: {
        business_type,
        package_type,
        sport,
        gender,
        boarding,
        age,
        start_date,
      },
    });
  }
}

export default Api.getInstance();
