const BasePage = require('./BasePage');

class CartPage extends BasePage {
  get productInCartName() {
    return this.getElementByCss('.list-group-item  a');
  }
  get productInCartPrice() {
    return this.getElementByCss('.list-group-item div:nth-child(3)');
  }
  get productInCartQty() {
    return this.getElementByCss('.row select');
  }
  get productInCartDeleteBtn() {
    return this.getElementByClassName('fa-trash');
  }
  get subtotalHeadline() {
    return this.getElementByCss('.list-group-item > h2 ');
  }

  get allProductsInCartNames() {
    return driver.findElements(By.css('.list-group-item  a'));
  }
  get allProductsInCartQty() {
    return driver.findElements(By.css('.row select'));
  }
  get proceedToCheckoutBtn() {
    return this.getElementByClassName('btn-primary');
  }

  async getSubtotalPrice() {
    return (
      await this.getTextFromElement(
        await this.getElementByCss('.card .list-group-item')
      )
    ).split('$')[1];
  }

  async getCurrentProductInCartCount() {
    let products = await driver.findElements(By.className('list-group-item'));
    return products.length;
  }

  async waitUntilProductInCartIsDisplayed(currentCount) {
    try {
      await driver.wait(async () => {
        let products = await driver.findElements(
          By.className('list-group-item')
        );
        return products.length > currentCount;
      }, 10 * 1000);
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async waitUntilProductInCartIsRemoved(currentCount) {
    try {
      await driver.wait(async () => {
        let products = await driver.findElements(
          By.className('list-group-item')
        );
        return products.length < currentCount;
        console.log('ovone bi treb');
      }, 10 * 1000);
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async deleteProductFromCart() {
    await this.clickElement(await this.productInCartDeleteBtn);
  }

  async proceedToCheckout() {
    await this.clickElement(await this.proceedToCheckoutBtn);
  }
}

module.exports = CartPage;
