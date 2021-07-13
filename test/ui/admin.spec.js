const LoginPage = require('../../pageObjects/LoginPage');
const ApiHandler = require('../../apiHelpers/ApiHandler');
const NavBar = require('../../pageObjects/components/NavBar');
const UserDashboardPage = require('../../pageObjects/UsersDashboardPage');
const VerificationsAdminSpec = require('../../verifications/VerificationsAdminSpec');
const EditUserPage = require('../../pageObjects/EditUserPage');
const config = require('../../config/config');
const { registrationData } = require('../../testData/registrationData');

const loginPage = new LoginPage();
const api = new ApiHandler();
const navBar = new NavBar();
const userDashboardPage = new UserDashboardPage();
const editUserPage = new EditUserPage();
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
      await api.registerUser(registrationData.correctData);
      await navBar.goToUserDashboard();
    });

    it('should succesfully update user name', async () => {
      await userDashboardPage.goToUserEditPage();
      await editUserPage.editUserName();
      await verify.userNameWasUpdated(registrationData.correctData.name);
    });

    it('should keep previous user name if empty field updated', () => {});

    it('should succesfully update user email', async () => {
      await userDashboardPage.goToUserEditPage();
      await editUserPage.editUserEmail();
      await verify.userEmailWasUpdated();
    });

    it('should keep previous email if empty field updated', () => {});

    it('should not update if email of other user used', () => {});

    it('should delete user', async () => {
      await userDashboardPage.deleteLastUser();
      await driver.sleep(1000);
      await verify.userDoesNotExist(registrationData.correctData.email);
    });
  });
});
