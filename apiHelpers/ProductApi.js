const BaseApi = require('./BaseApi');

class ProductApi extends BaseApi {
  async createSampleProduct(log = true) {
    try {
      const response = await this.api.post(
        `/api/products`,
        {},
        {
          headers: { Authorization: `Bearer ${this.token}` },
        }
      );
      return response;
    } catch (error) {
      if (log) console.log(error);
      return error.response;
    }
  }

  async createSampleProductWithoutToken() {
    try {
      const response = await this.api.post(`/api/products`);
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async editProduct(product, log = true) {
    try {
      const response = await this.api.put(
        `/api/products/${product._id}`,
        product,
        {
          headers: { Authorization: `Bearer ${this.token}` },
        }
      );
      return response;
    } catch (error) {
      if (log) console.log(error);
      return error.response;
    }
  }
  async editProductWithoutToken(product) {
    try {
      const response = await this.api.put(
        `/api/products/${product._id}`,
        product
      );
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async getProduct(id, log = true) {
    try {
      const response = await this.api.get(`/api/products/${id}`);
      return response;
    } catch (error) {
      if (log) console.log(error);
      return error.response;
    }
  }

  async getAllProducts(keyword = '') {
    try {
      const response = await this.api.get(`/api/products/?keyword=${keyword}`);
      return response;
    } catch (error) {
      console.log;
      return error.response;
    }
  }

  async deleteProduct(id, log = true) {
    try {
      const response = await this.api.delete(`/api/products/${id}`, {
        headers: { Authorization: `Bearer ${this.token}` },
      });
      return response;
    } catch (error) {
      if (log) console.log(error);
      return error.response;
    }
  }

  async deleteProductWithoutToken(id) {
    try {
      const response = await this.api.delete(`/api/products/${id}`);
      return response;
    } catch (error) {
      return error.response;
    }
  }
}

module.exports = ProductApi;
