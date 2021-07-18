const BasePage = require('./BasePage');

class ProductDashboardPage extends BasePage {
  get createProductBtn() {
    return this.getElementByClassName('btn-primary');
  }

  get lastProductDeleteBtn() {
    return this.getElementByCss(' tr:last-child > td:last-child > button ');
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
