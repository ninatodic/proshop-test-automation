const expect = require('chai').expect;
const CartPage = require('../pageObjects/CartPage');
const LoginPage = require('../pageObjects/LoginPage');
const ShippingTab = require('../pageObjects/components/ShippingTab');
const PaymentMethodTab = require('../pageObjects/components/PaymentMethodTab');
const PlaceOrderTab = require('../pageObjects/components/PlaceOrderTab');
const config = require('../config/config');

const cartPage = new CartPage();
const loginPage = new LoginPage();
const shippingTab = new ShippingTab();
const paymentMethodTab = new PaymentMethodTab();
const placeOrderTab = new PlaceOrderTab();

class VerificationsOrderSpec {
  async productIsInTheCart(product) {
    expect(
      await cartPage.getTextFromElement(await cartPage.productInCartName)
    ).to.equal(product.name);
    expect(
      await cartPage.getTextFromElement(await cartPage.productInCartPrice)
    ).to.equal(`$${product.price}`);
    const cartItems = JSON.parse(
      await cartPage.getLocalStorageItem('cartItems')
    );
    expect(cartItems[0].product).to.equal(product._id);
  }

  async productsAreInTheCart(products) {
    expect((await cartPage.allProductsInCartNames).length).to.equal(
      products.length
    );
    const cartItems = JSON.parse(
      await cartPage.getLocalStorageItem('cartItems')
    );
    for (let i = 0; i < cartItems.length; i++) {
      expect(await cartItems[i].product).to.equal(products[i]._id);
    }
  }

  async productIsDeleted(products) {
    expect((await cartPage.allProductsInCartNames).length).to.equal(
      products.length - 1
    );
    const cartItems = JSON.parse(
      await cartPage.getLocalStorageItem('cartItems')
    );
    expect(cartItems.length).to.equal(
      (await cartPage.allProductsInCartNames).length
    );
  }

  async subtotalDisplaysCorrectAmountAndPrice() {
    const cartItems = JSON.parse(
      await cartPage.getLocalStorageItem('cartItems')
    );
    let cartItemsTotalValue = 0;
    for (const item of cartItems) {
      cartItemsTotalValue += item.price * item.qty;
    }
    expect(parseFloat(await cartPage.getSubtotalPrice())).to.equal(
      cartItemsTotalValue
    );
  }

  async signInPageIsOpen() {
    expect(
      await loginPage.getTextFromElement(await loginPage.signInTitle)
    ).to.equal('SIGN IN');
  }

  async shippingTabIsDisplayed() {
    expect(
      await shippingTab.getTextFromElement(await shippingTab.title)
    ).to.equal('SHIPPING');
    expect(await driver.getCurrentUrl()).to.equal(`${config.baseUrl}/shipping`);
  }

  async elementDisplaysValidationMessage(element) {
    const message = await shippingTab.getValidationMessage(await element);
    expect(await message).to.equal('Please fill out this field.');
  }
  async userIsOnShippingTab() {
    expect(
      await shippingTab.getTextFromElement(await shippingTab.title)
    ).to.equal('SHIPPING');
    expect(await driver.getCurrentUrl()).to.equal(`${config.baseUrl}/shipping`);
  }

  async paymentMethodTabIsDisplayed() {
    expect(
      await paymentMethodTab.getTextFromElement(
        await paymentMethodTab.paymentMethodTitle
      )
    ).to.equal('PAYMENT METHOD');
  }
  async shippingDataIsSavedToLocalStorage(data) {
    const shippingAddress = JSON.parse(
      await shippingTab.getLocalStorageItem('shippingAddress')
    );
    expect(shippingAddress.address).to.equal(data.address);
    expect(shippingAddress.city).to.equal(data.city);
    expect(shippingAddress.postalCode).to.equal(data.postalCode);
    expect(shippingAddress.country).to.equal(data.country);
  }

  async placeOrderTabIsDisplayed() {
    expect(await driver.getCurrentUrl()).to.equal(
      `${config.baseUrl}/placeorder`
    );
    let h1s = await driver.findElements(By.css('h2'));
    expect(h1s).to.have.length(4);
    expect(await placeOrderTab.getTextFromElement(h1s[0])).to.equal('SHIPPING');
    expect(await placeOrderTab.getTextFromElement(h1s[1])).to.equal(
      'PAYMENT METHOD'
    );
    expect(await placeOrderTab.getTextFromElement(h1s[2])).to.equal(
      'ORDER ITEMS'
    );
    expect(await placeOrderTab.getTextFromElement(h1s[3])).to.equal(
      'ORDER SUMMARY'
    );
  }
  async displayedDataIsCorrect() {}

  async orderIsCreated() {}
}

module.exports = VerificationsOrderSpec;
