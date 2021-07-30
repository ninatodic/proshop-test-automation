const BasePage = require('./BasePage');

class SingleProductPage extends BasePage {
  get addToCartBtn() {
    return this.getElementByCss('.card .btn-primary');
  }

  async addProductToCart() {
    await this.clickElement(await this.addToCartBtn);
  }
}

module.exports = SingleProductPage;
