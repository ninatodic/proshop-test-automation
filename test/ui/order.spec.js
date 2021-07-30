const ProductApi = require('../../apiHelpers/ProductApi');
const SingleProductPage = require('../../pageObjects/SingleProductPage');
const VerificationsOrderSpec = require('../../verifications/VerificationsOrderSpec');
const CartPage = require('../../pageObjects/CartPage');
const LoginPage = require('../../pageObjects/LoginPage');
const NavBar = require('../../pageObjects/components/NavBar');
const ShippingTab = require('../../pageObjects/components/ShippingTab');
const PaymentMethodTab = require('../../pageObjects/components/PaymentMethodTab');
const PlaceOrderTab = require('../../pageObjects/components/PlaceOrderTab');
const productData = require('../../testData/productData');
const shippingData = require('../../testData/shippingData');
const config = require('../../config/config');

const productApi = new ProductApi();
const singleProductPage = new SingleProductPage();
const cartPage = new CartPage();
const verify = new VerificationsOrderSpec();
const loginPage = new LoginPage();
const navBar = new NavBar();
const shippingTab = new ShippingTab();
const paymentMethodTab = new PaymentMethodTab();
const placeOrderTab = new PlaceOrderTab();

describe.only('Order suite', () => {
  let products = [
    productData.product1,
    productData.product2,
    productData.product3,
  ];
  before('Create products', async () => {
    await productApi.loginAdmin();
    for (const product of products) {
      product._id = (await productApi.createSampleProduct()).data._id;
      await productApi.editProduct(product);
    }
  });
  it('should add product to the cart', async () => {
    await driver.get(`${config.baseUrl}/product/${productData.product1._id}`);
    await singleProductPage.addProductToCart();
    await verify.productIsInTheCart(products[0]);
    await verify.subtotalDisplaysCorrectAmountAndPrice();
  });

  it('should add multiple product to the cart', async () => {
    await driver.get(`${config.baseUrl}/product/${productData.product2._id}`);
    await singleProductPage.addProductToCart();
    let currentCount = await cartPage.getCurrentProductInCartCount();
    await cartPage.waitUntilProductInCartIsDisplayed(currentCount);
    await driver.get(`${config.baseUrl}/product/${productData.product3._id}`);
    await singleProductPage.addProductToCart();
    currentCount = await cartPage.getCurrentProductInCartCount();
    await cartPage.waitUntilProductInCartIsDisplayed(currentCount);
    await verify.productsAreInTheCart(products);
    await verify.subtotalDisplaysCorrectAmountAndPrice();
  });
  it('should change product quantity in the cart', async () => {
    await driver.get(`${config.baseUrl}/cart`);
    let quantities = await cartPage.allProductsInCartQty;
    for (let i = 1; i <= quantities.length; i++) {
      await quantities[i - 1].sendKeys(i);
    }
    await verify.subtotalDisplaysCorrectAmountAndPrice();
  });
  it('should remove product from the cart', async () => {
    await driver.get(`${config.baseUrl}/cart`);
    currentCount = await cartPage.getCurrentProductInCartCount();
    await cartPage.deleteProductFromCart();
    await cartPage.waitUntilProductInCartIsRemoved(currentCount);
    await verify.productIsDeleted(products);
  });
  it('should ask for sign in when proceeding to checkout if no user logged in', async () => {
    await driver.get(`${config.baseUrl}/cart`);
    await cartPage.proceedToCheckout();
    await verify.signInPageIsOpen();
  });
  it('should proceed to checkout after user login', async () => {
    await driver.get(`${config.baseUrl}/cart`);
    await cartPage.proceedToCheckout();
    await loginPage.login({
      email: config.userEmail,
      password: config.userPassword,
    });
    await driver.wait(until.urlIs(`${config.baseUrl}/shipping`));
    await verify.shippingTabIsDisplayed();
    await navBar.logout();
  });
  it('should not ask for sing in when proceeding to checkout if user is previously logged in', async () => {
    await driver.get(`${config.baseUrl}/login`);
    await loginPage.login({
      email: config.userEmail,
      password: config.userPassword,
    });
    await driver.wait(until.elementIsVisible(await navBar.userNameDoropdown));
    await driver.get(`${config.baseUrl}/product/${productData.product1._id}`);
    await singleProductPage.addProductToCart();
    await driver.wait(
      until.elementIsEnabled(await singleProductPage.addToCartBtn)
    );
    await cartPage.proceedToCheckout();
    await driver.wait(until.urlIs(`${config.baseUrl}/shipping`));
    await verify.shippingTabIsDisplayed();
  });
  it('should not proceed to payment method if address field is not filled', async () => {
    await driver.get(`${config.baseUrl}/shipping`);
    await shippingTab.fillInShippingDataAndContinue(
      shippingData.withoutAddress
    );
    await verify.elementDisplaysValidationMessage(
      await shippingTab.addressField
    );
    await verify.shippingTabIsDisplayed();
  });
  it('should not proceed to payment method if city field is not filled', async () => {
    await driver.get(`${config.baseUrl}/shipping`);
    await shippingTab.fillInShippingDataAndContinue(shippingData.withoutCity);
    await verify.elementDisplaysValidationMessage(await shippingTab.cityField);
    await verify.shippingTabIsDisplayed();
  });
  it('should not proceed to payment method if postalCode field is not filled', async () => {
    await driver.get(`${config.baseUrl}/shipping`);
    await shippingTab.fillInShippingDataAndContinue(
      shippingData.withoutPostalCode
    );
    await verify.elementDisplaysValidationMessage(
      await shippingTab.postalCodeField
    );
    await verify.shippingTabIsDisplayed();
  });
  it('should not proceed to payment method if country field is not filled', async () => {
    await driver.get(`${config.baseUrl}/shipping`);
    await shippingTab.fillInShippingDataAndContinue(
      shippingData.withoutCountry
    );
    await verify.elementDisplaysValidationMessage(
      await shippingTab.countryField
    );
    await verify.shippingTabIsDisplayed();
  });
  it('should proceed to payment method if all fields are filled', async () => {
    await driver.get(`${config.baseUrl}/shipping`);
    await shippingTab.fillInShippingDataAndContinue(shippingData.correctData);
    await verify.paymentMethodTabIsDisplayed();
    await verify.shippingDataIsSavedToLocalStorage(shippingData.correctData);
  });

  it('should select payment method and proceed to "place and order" tab', async () => {
    await driver.get(`${config.baseUrl}/payment`);
    await paymentMethodTab.selectPaymentMethodAndContinue();
    await verify.placeOrderTabIsDisplayed();
    await verify.displayedDataIsCorrect();
  });
  it('should create an order', async () => {
    await driver.get(`${config.baseUrl}/payment`);
    await paymentMethodTab.selectPaymentMethodAndContinue();
    await placeOrderTab.placeOrderAndContinue();
    await verify.orderIsCreated();
  });

  after('cleanup', async () => {
    for (const product of products) {
      await productApi.deleteProduct(product._id);
    }
  });
});
