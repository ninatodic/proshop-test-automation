const BasePage = require('./BasePage');

class ProductDashboardPage extends BasePage {
  get createProductBtn() {
    return this.getElementByClassName('btn-primary');
  }

  get lastProductId() {
    return this.getElementByCss('tr:last-child > td:nth-child(1)');
  }

  get lastProductName() {
    return this.getElementByCss('tr:last-child > td:nth-child(2)');
  }

  get lastProductPrice() {
    return this.getElementByCss('tr:last-child > td:nth-child(3)');
  }

  get lastProductBrand() {
    return this.getElementByCss('tr:last-child > td:nth-child(5)');
  }

  get lastProductCategory() {
    return this.getElementByCss('tr:last-child > td:nth-child(4)');
  }

  get lastProductDeleteBtn() {
    return this.getElementByCss(' tr:last-child > td:last-child > button ');
  }
  get lastProductEditBtn() {
    return this.getElementByCss('tr:last-child > td:nth-child(6) > a');
  }

  async goToProductEditPage() {
    await this.clickElement(await this.lastProductEditBtn);
  }

  async deleteLastProduct() {
    await this.clickElement(await this.lastProductDeleteBtn);
    await driver.switchTo().alert().accept();
  }

  async createSampleProduct() {
    await this.clickElement(await this.createProductBtn);
  }
}

module.exports = ProductDashboardPage;
