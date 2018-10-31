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

  async createCart() {
    return await instance.post('cart');
  }
}

export default Api.getInstance();
