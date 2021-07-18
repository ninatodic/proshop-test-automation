const BasePage = require('./BasePage');

class EditProductPage extends BasePage {
  get goBackBtn() {
    return this.getElementByClassName('btn-light');
  }

  async goBack() {
    await this.clickElement(await this.goBackBtn);
  }
}

module.exports = EditProductPage;
