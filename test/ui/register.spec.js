const expect = require('chai').expect;
const config = require('./../../config/config');
const { registrationData } = require('../../testData/registrationData');
const { loginCredentials } = require('../../testData/loginCredentials');
const RegisterPage = require('../../pageObjects/RegisterPage');
const VerificationsUI = require('../../verifications/VerificationsUI');
const ApiHandler = require('../../apiHelpers/ApiHandler');

const registerPage = new RegisterPage();
const verify = new VerificationsUI();
const api = new ApiHandler();

console.log('dosao sam do ovde');

describe('Register suite', () => {
  beforeEach(async () => {
    await driver.get(`${config.baseUrl}/register`);
  });

  it('should not register customer without name', async () => {
    await registerPage.registerCustomer(registrationData.withoutName);
    await verify.registrationErrorMessageIs(
      'User validation failed: name: Path `name` is required.'
    );
  });

  it('should not register customer without email', async () => {
    await registerPage.registerCustomer(registrationData.withoutEmail);
    await verify.registrationErrorMessageIs(
      'User validation failed: email: Path `email` is required.'
    );
  });

  it('should not register customer without password', async () => {
    await registerPage.registerCustomer(registrationData.withoutPassword);
    await verify.registrationErrorMessageIs(
      'User validation failed: password: Path `password` is required.'
    );
  });

  it('should not register customer with unmatched passwords', async () => {
    await registerPage.registerCustomer(registrationData.unmatchingPassword);
    await verify.registrationErrorMessageIs('Passwords do not match');
  });

  it('should succesfully register a customer', async () => {
    await registerPage.registerCustomer(registrationData.correctData);
    await verify.customerIsRegistered(registrationData.correctData);
  });

  it('should not register a customer with existing email', async () => {
    await registerPage.registerCustomer(registrationData.correctData);
    await verify.registrationErrorMessageIs('User already exists');
  });

  after('clean up', async () => {
    await api.loginAdmin({
      email: config.adminEmail,
      password: config.adminPassword,
    });
    const allUsers = await api.getUsers();
    let testUserId = await allUsers.data.find(
      (element) => element.email == 'testUser@example.com'
    )._id;
    await api.deleteUser(testUserId);
  });
});
