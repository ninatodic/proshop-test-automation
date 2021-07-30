const BasePage = require('../BasePage');

class ShippingTab extends BasePage {
  get title() {
    return this.getElementByCss('h1');
  }
  get addressField() {
    return this.getElementById('address');
  }
  get cityField() {
    return this.getElementById('city');
  }
  get postalCodeField() {
    return this.getElementById('postalCode');
  }
  get countryField() {
    return this.getElementById('country');
  }
  get continueBtn() {
    return this.getElementByClassName('btn-primary');
  }

  async getValidationMessage(element) {
    return await element.getAttribute('validationMessage');
  }

  async fillInShippingDataAndContinue(shippingData) {
    if (shippingData.address) {
      await this.clearAndInputTextIntoField(
        await this.addressField,
        shippingData.address
      );
    }
    if (shippingData.city) {
      await this.clearAndInputTextIntoField(
        await this.cityField,
        shippingData.city
      );
    }
    if (shippingData.postalCode) {
      await this.clearAndInputTextIntoField(
        await this.postalCodeField,
        shippingData.postalCode
      );
    }
    if (shippingData.country) {
      await this.clearAndInputTextIntoField(
        await this.countryField,
        shippingData.country
      );
    }
    await this.clickElement(await this.continueBtn);
  }
}

module.exports = ShippingTab;
