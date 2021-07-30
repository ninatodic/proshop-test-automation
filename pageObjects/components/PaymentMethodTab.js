const BasePage = require('../BasePage');

class PaymentMethodTab extends BasePage {
  get paymentMethodTitle() {
    return this.getElementByCss('h1');
  }
  get payPalRadioBtn() {
    return this.getElementById('PayPal');
  }
  get continueBtn() {
    return this.getElementByClassName('btn-primary');
  }

  async selectPaymentMethodAndContinue() {
    await this.clickElement(await this.payPalRadioBtn);
    await this.clickElement(await this.continueBtn);
  }
}

module.exports = PaymentMethodTab;
