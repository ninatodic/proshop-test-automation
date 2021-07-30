const BaseApi = require('./BaseApi');

class UserApi extends BaseApi {
  async registerUser(regData) {
    try {
      const response = await this.api.post(`/api/users`, {
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
      const response = await this.api.get(`/api/users`, {
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
      const response = await this.api.delete(`/api/users/${id}`, {
        headers: { Authorization: `Bearer ${this.adminToken}` },
      });
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

      return response;
    } catch (error) {
      if (log) console.log(error);
      return error.response;
    }
  }
}

module.exports = UserApi;
