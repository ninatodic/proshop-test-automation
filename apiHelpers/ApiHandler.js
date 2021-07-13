const axios = require('axios');
const config = require('../config/config');
const { registrationData } = require('../testData/registrationData');

const a = axios.create({});

class ApiHandler {
  constructor() {
    this.adminToken = '';
  }
  async loginAdmin(
    authCredentials = {
      email: config.adminEmail,
      password: config.adminPassword,
    }
  ) {
    try {
      const response = await axios.post(`${config.baseUrl}/api/users/login`, {
        email: authCredentials.email,
        password: authCredentials.password,
      });
      this.adminToken = response.data.token;
      return response;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  }

  async registerUser(regData) {
    try {
      const response = await axios.post(`${config.baseUrl}/api/users`, {
        name: regData.name,
        email: regData.email,
        password: regData.password,
      });
      return response;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  }

  async getUsers() {
    try {
      const response = await axios.get(`${config.baseUrl}/api/users`, {
        headers: { Authorization: `Bearer ${this.adminToken}` },
      });
      return response;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  }

  async deleteUser(id) {
    try {
      const response = await axios.delete(`${config.baseUrl}/api/users/${id}`, {
        headers: { Authorization: `Bearer ${this.adminToken}` },
      });
      return response;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  }
}

module.exports = ApiHandler;
