const axios = require('axios');
const config = require('../config/config');

class BaseApi {
  constructor() {
    this.adminToken = '';
    this.api = axios.create({ baseURL: config.baseUrl });
  }
  async loginAdmin() {
    try {
      const response = await this.api.post(`/api/users/login`, {
        email: config.adminEmail,
        password: config.adminPassword,
      });
      this.adminToken = response.data.token;
      return response;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  }
}

module.exports = BaseApi;
