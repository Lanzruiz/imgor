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
  }

  async req({ apiCall, res200, res404, reject, apiCallParams }) {
    return await apiCall(apiCallParams)
      .then(function({ data, status }) {
        if (status === 200) res200(data);
        if (status === 404) res404();
      })
      .catch(function(err) {
        reject(err);
      });
  }

  async createCart() {
    return await instance.post('cart');
  }

  async getCatalogCampsGroup({ sport }) {
    return await instance.get('catalog/camps/groups', {
      params: {
        sport,
      },
    });
  }

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
  }

  async postCartCartIdParticipant({ cartId, email }) {
    return await instance.post(`cart/${cartId}/participant`, {
      email,
    });
  }

  async getCatalogGear() {
    return await instance.get('catalog/gear');
  }

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
  }

  async putCartCartIdParticipantParticipantId({ cartId, participantId, gender, age }) {
    return await instance.put(`cart/${cartId}/participant/${participantId}`, {
      gender,
      age,
    });
  }

  async getCatalogCampsLevels(args) {
    const {
      sport, business_type, package_type, gender, boarding, group, secondary_group, age, start_date, length_program,
    } = args;
    return await instance.get('catalog/camps/levels', {
      params: {
        sport,
        business_type,
        package_type,
        gender,
        boarding,
        age,
        start_date,
        group,
        secondary_group,
        length_program,
      },
    });
  }

  async postCartCartIdParticipantIdProduct({ cartId, id }) {
    return await instance.post(`cart/${cartId}/participant/${id}/product`);
  }

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
  }
}

export default Api.getInstance();
