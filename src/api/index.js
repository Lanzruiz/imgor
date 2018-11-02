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

  async req({ apiCall, res200, res404, reject }) {
    return await apiCall()
      .then(function({ data, status }) {
        if (status === 200) res200(data);
        if (status === 404) res404();
      })
      .catch(function(err) {
        console.log(err);
        reject(err);
      });
  }

  async createCart() {
    return await instance.post('cart');
  }

  async getCatalogGroup({ sport }) {
    return await instance.get('catalog/group', { params: { sport } });
  }

  async postCartCartIdParticipant({ cartId, email }) {
    return await instance.post(`cart/${cartId}/participant`, { email });
  }

  async getCatalogGear({ sport, gender, start_date, end_date }) {
    return await instance.get('catalog/gear', { sport, gender, start_date, end_date });
  }
}

export default Api.getInstance();
