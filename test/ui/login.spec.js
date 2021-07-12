const expect = require('chai').expect;
const config = require('../../config/config');
const { loginCredentials } = require('../../testData/loginCredentials');
const LoginPage = require('../../pageObjects/LoginPage');
const Navbar = require('../../pageObjects/NavBar');
const VerificationsUI = require('../../verifications/VerificationsUI');

const loginPage = new LoginPage();
const navBar = new Navbar();
const verify = new VerificationsUI();

describe('Login suite', () => {
  beforeEach(async () => {
    await driver.get(`${config.baseUrl}/login`);
  });

  it('should not login without email', async () => {
    await loginPage.login(loginCredentials.noEmailCredentials);
    await verify.loginErrorMessageIs('Invalid email or password');
  });

  it('should not login without password', async () => {
    await loginPage.login(loginCredentials.noPasswordCredentials);
    await verify.loginErrorMessageIs('Invalid email or password');
  });

  it('should login as administrator', async () => {
    await loginPage.login(loginCredentials.adminCredentials);
    await verify.userIsAdministrator();
    await navBar.logout();
  });

  it('should login as customer', async () => {
    await loginPage.login(loginCredentials.customerCredentials);
    await verify.userIsNotAdministrator();
    await navBar.logout();
  });
});
