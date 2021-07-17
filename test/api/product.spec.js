const { expect } = require('chai');
const ProductApi = require('../../apiHelpers/ProductApi');

const api = new ProductApi();

describe('product tests', () => {
  before(async () => {
    await api.loginAdmin();
  });

  let id;
  it('should create a new sample product', async () => {
    const response = await api.createSampleProduct();
    expect(response.status).to.equal(201);
    expect(response.data._id).to.not.be.undefined;
    id = response.data._id;
  });

  it('should delete product', async () => {
    const response = await api.deleteProduct(id);
    expect(response.status).to.equal(200);
    expect(response.data.message).to.equal('Product removed');
  });
});
