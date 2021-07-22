const BaseApi = require('./BaseApi');

class ProductApi extends BaseApi {
  async createSampleProduct() {
    try {
      const response = await this.api.post(
        `/api/products`,
        {},
        {
          headers: { Authorization: `Bearer ${this.adminToken}` },
        }
      );
      return response;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  }

  async getProduct(id) {
    try {
      const response = await this.api.get(`/api/products/${id}`);
      return response;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  }

  async deleteProduct(id) {
    try {
      const response = await this.api.delete(`/api/products/${id}`, {
        headers: { Authorization: `Bearer ${this.adminToken}` },
      });
      return response;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  }
}

module.exports = ProductApi;
