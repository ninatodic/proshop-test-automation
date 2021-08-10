const axios = require('axios');
const config = require('../config/config');

class BaseApi {
  constructor() {
    this.token = '';
    this.api = axios.create({ baseURL: config.baseUrl });
  }
  async loginAdmin() {
    try {
      const response = await this.api.post(`/api/users/login`, {
        email: config.adminEmail,
        password: config.adminPassword,
      });
      this.token = response.data.token;
      return response;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  }

  async loginUser(email, password, log = true) {
    try {
      const response = await this.api.post(`/api/users/login`, {
        email: email,
        password: password,
      });
      this.token = response.data.token;
      return response;
    } catch (error) {
      if (log) console.log(error);
      return error.response;
    }
  }
}

module.exports = BaseApi;
