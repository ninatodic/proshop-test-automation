const { expect } = require('chai');
const ProductApi = require('../../apiHelpers/ProductApi');
const productData = require('../../testData/productData');

const api = new ProductApi();

describe('product api suite', () => {
  before(async () => {
    await api.loginAdmin();
  });

  let id;

  it('should not create a new sample product without token', async () => {
    const response = await api.createSampleProductWithoutToken();
    expect(response.status).to.equal(401);
    expect(response.data.message).to.equal('Not authorized, no token');
  });

  it('should create a new sample product', async () => {
    const response = await api.createSampleProduct();
    expect(response.status).to.equal(201);
    expect(response.data._id).to.not.be.undefined;
    expect(response.data.name).to.equal(productData.sampleProduct.name);
    expect(response.data.price).to.equal(productData.sampleProduct.price);
    expect(response.data.brand).to.equal(productData.sampleProduct.brand);
    expect(response.data.countInStock).to.equal(
      productData.sampleProduct.countInStock
    );
    expect(response.data.category).to.equal(productData.sampleProduct.category);
    expect(response.data.description).to.equal(
      productData.sampleProduct.description
    );
    expect(response.data.image).to.equal(productData.sampleProduct.image);
    id = response.data._id;
  });

  it('shold not return any product if invalid id is sent', async () => {
    const incorrectId = '123gsg3412wqafd';
    const response = await api.getProduct(incorrectId, false);
    expect(response.status).to.equal(500);
    expect(response.data.message).to.contain('Cast to ObjectId failed');
  });

  it('shold return product with given id', async () => {
    const response = await api.getProduct(id);
    expect(response.status).to.equal(200);
    expect(response.data.name).to.equal(productData.sampleProduct.name);
    expect(response.data.price).to.equal(productData.sampleProduct.price);
    expect(response.data.brand).to.equal(productData.sampleProduct.brand);
    expect(response.data.countInStock).to.equal(
      productData.sampleProduct.countInStock
    );
    expect(response.data.category).to.equal(productData.sampleProduct.category);
    expect(response.data.description).to.equal(
      productData.sampleProduct.description
    );
    expect(response.data.image).to.equal(productData.sampleProduct.image);
  });

  it('should return all the products', async () => {
    const response = await api.getAllProducts();
    expect(response.status).to.equal(200);
    expect(response.data.products.length).to.equal(7);
  });

  it('should return all the products with given keyword', async () => {
    const response = await api.getAllProducts('sample');
    expect(response.status).to.equal(200);
    expect(response.data.products.length).to.equal(1);
    expect(response.data.products[0]._id).to.equal(id);
  });

  it('should not edit sample product without name', async () => {
    productData.withoutNameProduct._id = id;
    const response = await api.editProduct(
      productData.withoutNameProduct,
      false
    );
    expect(response.status).to.equal(500);
    expect(response.data.message).to.equal(
      'Product validation failed: name: Path `name` is required.'
    );
  });

  it('should not edit sample product without price', async () => {
    productData.withoutPriceProduct._id = id;
    const response = await api.editProduct(
      productData.withoutPriceProduct,
      false
    );
    expect(response.status).to.equal(500);
    expect(response.data.message).to.equal(
      'Product validation failed: price: Path `price` is required.'
    );
  });

  it('should not edit sample product without brand', async () => {
    productData.withoutBrandProduct._id = id;
    const response = await api.editProduct(
      productData.withoutBrandProduct,
      false
    );
    expect(response.status).to.equal(500);
    expect(response.data.message).to.equal(
      'Product validation failed: brand: Path `brand` is required.'
    );
  });

  it('should not edit sample product without count in stock', async () => {
    productData.withoutCountInStockProduct._id = id;
    const response = await api.editProduct(
      productData.withoutCountInStockProduct,
      false
    );
    expect(response.status).to.equal(500);
    expect(response.data.message).to.equal(
      'Product validation failed: countInStock: Path `countInStock` is required.'
    );
  });

  it('should not edit sample product without category', async () => {
    productData.withoutCategoryProduct._id = id;
    const response = await api.editProduct(
      productData.withoutCategoryProduct,
      false
    );
    expect(response.status).to.equal(500);
    expect(response.data.message).to.equal(
      'Product validation failed: category: Path `category` is required.'
    );
  });

  it('should not edit sample product without description', async () => {
    productData.withoutDescriptionProduct._id = id;
    const response = await api.editProduct(
      productData.withoutDescriptionProduct,
      false
    );
    expect(response.status).to.equal(500);
    expect(response.data.message).to.equal(
      'Product validation failed: description: Path `description` is required.'
    );
  });

  it('should not edit sample product without image path', async () => {
    productData.withoutImagePathProduct._id = id;
    const response = await api.editProduct(
      productData.withoutImagePathProduct,
      false
    );
    expect(response.status).to.equal(500);
    expect(response.data.message).to.equal(
      'Product validation failed: image: Path `image` is required.'
    );
  });

  it('should not edit sample product without token', async () => {
    productData.editedSampleProduct._id = id;
    const response = await api.editProductWithoutToken(
      productData.editedSampleProduct,
      false
    );
    expect(response.status).to.equal(401);
    expect(response.data.message).to.equal('Not authorized, no token');
  });

  it('should not edit sample product with incorrect id', async () => {
    productData.editedSampleProduct._id = '123498ufjvjd9e8ehdd';
    const response = await api.editProduct(
      productData.editedSampleProduct,
      false
    );
    expect(response.status).to.equal(500);
    expect(response.data.message).to.contain('Cast to ObjectId failed');
  });

  it('should edit sample product', async () => {
    productData.editedSampleProduct._id = id;
    const response = await api.editProduct(productData.editedSampleProduct);
    expect(response.status).to.equal(200);
    expect(response.data.name).to.equal(productData.editedSampleProduct.name);
    expect(response.data.price).to.equal(productData.editedSampleProduct.price);
    expect(response.data.brand).to.equal(productData.editedSampleProduct.brand);
    expect(response.data.countInStock).to.equal(
      productData.editedSampleProduct.countInStock
    );
    expect(response.data.category).to.equal(
      productData.editedSampleProduct.category
    );
    expect(response.data.description).to.equal(
      productData.editedSampleProduct.description
    );
    expect(response.data.image).to.equal(productData.editedSampleProduct.image);
  });

  it('should not delete sample product without token', async () => {
    const response = await api.deleteProductWithoutToken(id);
    expect(response.status).to.equal(401);
    expect(response.data.message).to.equal('Not authorized, no token');
  });

  it('should not delete product with incorrect id', async () => {
    const incorrectId = '123498ufjvjd9e8ehdd';
    const response = await api.deleteProduct(incorrectId, false);
    expect(response.status).to.equal(500);
    expect(response.data.message).to.contain('Cast to ObjectId failed');
  });

  it('should delete product', async () => {
    const response = await api.deleteProduct(id);
    expect(response.status).to.equal(200);
    expect(response.data.message).to.equal('Product removed');
  });
});
