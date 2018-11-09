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

  async postCartCartIdParticipant({ cartId, email }) {
    return await instance.post(`cart/${cartId}/participant`, {
      email,
    });
  }

  async getCatalogGear({ sport, gender, start_date, end_date }) {
    return await instance.get('catalog/gear', {
      params: {
        sport,
        gender,
        start_date,
        end_date,
      },
    });
  }

  async getCatalogCampsCalendar({ package_type, sport, length_program }) {
    return await instance.get('catalog/camps/calendar', {
      params: {
        package_type,
        sport,
        length_program,
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
      sport, business_type, package_type, gender, boarding, length, length_program, days, age, date, start_date, end_date, year,
    } = args;
    return await instance.get('catalog/camps/levels', {
      params: {
        sport,
        business_type,
        package_type,
        gender,
        boarding,
        length,
        length_program,
        days,
        age,
        date,
        start_date,
        end_date,
        year,
      },
    });
  }
}

export default Api.getInstance();
