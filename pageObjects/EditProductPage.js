const { Driver } = require('selenium-webdriver/chrome');
const BasePage = require('./BasePage');

class EditProductPage extends BasePage {
  get goBackBtn() {
    return this.getElementByClassName('btn-light');
  }
  get nameField() {
    return this.getElementById('name');
  }
  get priceField() {
    return this.getElementById('price');
  }
  get brandField() {
    return this.getElementById('brand');
  }
  get countInStockField() {
    return this.getElementById('countInStock');
  }
  get categoryField() {
    return this.getElementById('category');
  }
  get descriptionField() {
    return this.getElementById('description');
  }

  get updateBtn() {
    return this.getElementByClassName('btn-primary');
  }
  get errorMessageElement() {
    return this.getElementByClassName('alert-danger');
  }

  async goBack() {
    await this.clickElement(await this.goBackBtn);
  }

  async editProductField(field, inputData) {
    await this.clearAndInputTextIntoField(field, inputData);
    await this.clickElement(await this.updateBtn);
  }

  async clearAndUpdateField(field) {
    await this.clearField(field);
    await this.clickElement(await this.updateBtn);
  }
}

module.exports = EditProductPage;
