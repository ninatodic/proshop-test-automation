const expect = require('chai').expect;
const config = require('./../../config/config');
const registrationData = require('../../testData/registrationData');
const RegisterPage = require('../../pageObjects/RegisterPage');
const Verifications = require('../../verifications/VerificationsRegisterSpec');
const UserApi = require('../../apiHelpers/UserApi');
const NavBar = require('../../pageObjects/components/NavBar');

const registerPage = new RegisterPage();
const navBar = new NavBar();
const verify = new Verifications();
const api = new UserApi();

describe('Register suite', () => {
  beforeEach(async () => {
    await driver.get(`${config.baseUrl}/register`);
  });

  it('should not register user without name', async () => {
    await registerPage.registerUser(registrationData.withoutName);
    await verify.registrationErrorMessageIs(
      'User validation failed: name: Path `name` is required.'
    );
  });

  it('should not register user without email', async () => {
    await registerPage.registerUser(registrationData.withoutEmail);
    await verify.registrationErrorMessageIs(
      'User validation failed: email: Path `email` is required.'
    );
  });

  it('should not register user without password', async () => {
    await registerPage.registerUser(registrationData.withoutPassword);
    await verify.registrationErrorMessageIs(
      'User validation failed: password: Path `password` is required.'
    );
  });

  it('should not register user with unmatched passwords', async () => {
    await registerPage.registerUser(registrationData.unmatchingPassword);
    await verify.registrationErrorMessageIs('Passwords do not match');
  });

  it('should succesfully register a user', async () => {
    await registerPage.registerUser(registrationData.correctData);
    await verify.userIsRegistered(registrationData.correctData);
    await navBar.logout();
  });

  it('should not register a user with existing email', async () => {
    await registerPage.registerUser(registrationData.correctData);
    await verify.registrationErrorMessageIs('User already exists');
  });

  after('clean up', async () => {
    await api.loginAdmin();
    const allUsers = await api.getUsers();
    let testUserId = await allUsers.data.find(
      (element) => element.email == 'testUser@example.com'
    )._id;
    await api.deleteUser(testUserId);
  });
});
