const LoginPage = require('../../pageObjects/LoginPage');
const UserApi = require('../../apiHelpers/UserApi');
const NavBar = require('../../pageObjects/components/NavBar');
const UserDashboardPage = require('../../pageObjects/UsersDashboardPage');
const VerificationsAdminSpec = require('../../verifications/VerificationsAdminSpec');
const EditUserPage = require('../../pageObjects/EditUserPage');
const ProductDashboardPage = require('../../pageObjects/ProductDashboardPage');
const EditProductPage = require('../../pageObjects/EditProductPage');
const config = require('../../config/config');
const registrationData = require('../../testData/registrationData');
const productData = require('../../testData/productData');

const loginPage = new LoginPage();
const usersApi = new UserApi();
const navBar = new NavBar();
const userDashboardPage = new UserDashboardPage();
const editUserPage = new EditUserPage();
const productDashboardPage = new ProductDashboardPage();
const editProductPage = new EditProductPage();
const verify = new VerificationsAdminSpec();

describe('Admin suite', () => {
  before('Login as administrator', async () => {
    await driver.get(`${config.baseUrl}/login`);
    await loginPage.login({
      email: config.adminEmail,
      password: config.adminPassword,
    });
  });

  describe('Users dashboard', () => {
    before('Register a user', async () => {
      await usersApi.registerUser(registrationData.correctData);
      await navBar.goToUserDashboard();
    });

    it('should keep previous user name if empty field updated', async () => {
      await userDashboardPage.goToUserEditPage();
      await editUserPage.editUserName('');
      await verify.userNameWasNotUpdated(registrationData.correctData.name);
    });

    it('should succesfully update user name', async () => {
      await userDashboardPage.goToUserEditPage();
      await editUserPage.editUserName('Edited name');
      await verify.userNameWasUpdated();
    });

    it('should keep previous email if empty field updated', async () => {
      await userDashboardPage.goToUserEditPage();
      await editUserPage.editUserEmail('');
      await verify.userEmailWasNotUpdated(registrationData.correctData.email);
    });

    it('should succesfully update user email', async () => {
      await userDashboardPage.goToUserEditPage();
      await editUserPage.editUserEmail('editedEmail@example.com');
      await verify.userEmailWasUpdated();
    });

    it('should not update if email of other user used', async () => {
      await userDashboardPage.goToUserEditPage();
      await editUserPage.editUserEmail(config.adminEmail);
      await verify.userEditErrorMessageIs(
        'E11000 duplicate key error collection:'
      );
      await editUserPage.goBack();
    });

    it('should set user to have admin privileges', async () => {
      await userDashboardPage.goToUserEditPage();
      await editUserPage.setUserToAdmin();
      await verify.userHasAdminPrivileges();
    });

    it('should delete user', async () => {
      let currentUserCount = await userDashboardPage.getCurrentTRCount();
      await userDashboardPage.deleteLastUser();
      await userDashboardPage.waitUntilTRCountChanges(currentUserCount);
      await verify.userDoesNotExist(registrationData.correctData.email);
    });
  });

  describe.only('Products dashboard', () => {
    beforeEach('goto Product dashboard page', async () => {
      await navBar.goToProductDashboard();
    });
    it('should create sample product', async () => {
      let productCountBefore = await productDashboardPage.getCurrentTRCount();
      await productDashboardPage.createSampleProduct();
      await driver.wait(until.urlContains('edit'), 5000);
      await editProductPage.goBack();
      await driver.wait(
        until.urlIs('http://proshopappnina.herokuapp.com/admin/productlist'),
        2000
      );
      let productCountAfter = await productDashboardPage.getCurrentTRCount();
      await verify.newProductCreated(productCountBefore, productCountAfter);
    });

    it.only('should display error if empty name field updated', async () => {
      await productDashboardPage.goToProductEditPage();
      await editProductPage.editProductField(
        await editProductPage.nameField,
        ''
      );
      await verify.productEditErrorMessageIs(
        'Product validation failed: name: Path `name` is required.'
      );
    });

    it('should edit product name', async () => {
      await productDashboardPage.goToProductEditPage();
      await editProductPage.editProductField(
        await editProductPage.nameField,
        productData.editedSampleProduct.name
      );
      await verify.productNameWasUpdated();
    });

    it('should display error if empty price field updated', async () => {
      await productDashboardPage.goToProductEditPage();
      await editProductPage.editProductField(
        await editProductPage.priceField,
        ''
      );
      await verify.productEditErrorMessageIs(
        'Product validation failed: price: Path `price` is required.'
      );
    });

    it('should edit product price', async () => {
      await productDashboardPage.goToProductEditPage();
      await editProductPage.editProductField(
        await editProductPage.priceField,
        productData.editedSampleProduct.price
      );
      await verify.productPriceWasUpdated();
    });

    it('should delete sample product', async () => {
      let productCount = await productDashboardPage.getCurrentTRCount();
      await productDashboardPage.deleteLastProduct();
      await productDashboardPage.waitUntilTRCountChanges(productCount);
      await verify.productDeleted(productCount);
    });
  });

  after('logout admin', async () => {
    await navBar.logout();
  });
});
