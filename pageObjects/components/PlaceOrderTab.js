const BasePage = require('../BasePage');

class PlaceOrderTab extends BasePage {
  get placeOrderBtn() {
    return this.getElementByClassName('btn-block');
  }

  async placeOrderAndContinue() {
    // await driver.wait(until.elementLocated(await this.placeOrderBtn), 5000);
    // console.log(await this.getTextFromElement(await this.placeOrderBtn));
    await this.clickElement(await this.placeOrderBtn);
  }
}

module.exports = PlaceOrderTab;
