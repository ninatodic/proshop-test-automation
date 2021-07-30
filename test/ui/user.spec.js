const Navbar = require('../../pageObjects/components/NavBar');
const LoginPage = require('../../pageObjects/LoginPage');
const UserProfilePage = require('../../pageObjects/UserProfilePage');
const config = require('../../config/config');
const userData = require('../../testData/userData');
const VerificationsUserSpec = require('../../verifications/VerificationsUserSpec');
const { userPassword } = require('../../config/config');

const navBar = new Navbar();
const loginPage = new LoginPage();
const userProfilePage = new UserProfilePage();
const verify = new VerificationsUserSpec();

describe('User suite', () => {
  before('Login user', async () => {
    await driver.get(`${config.baseUrl}/login`);
    await loginPage.login({
      email: config.userEmail,
      password: config.userPassword,
    });
  });

  describe('User profile', () => {
    beforeEach('Go to user profile page', async () => {
      await navBar.goToUserProfilePage();
    });

    it('should not update name if empty field updated', async () => {
      let userName = await userProfilePage.userNameField;
      await userProfilePage.clearAndUpdateField(userName);
      await driver.wait(until.stalenessOf(userName));
      await verify.userNameWasNotUpdated();
    });

    it('should update users name', async () => {
      let userName = await userProfilePage.userNameField;
      await userProfilePage.editUserProfileField(
        userName,
        userData.editedData.name
      );
      await driver.wait(until.stalenessOf(userName));
      await verify.userNameWasUpdated();
    });

    it('should not change email if empty field updated', async () => {
      let userEmail = await userProfilePage.userEmailField;
      await userProfilePage.clearAndUpdateField(userEmail);
      await driver.wait(until.stalenessOf(userEmail));
      await verify.userEmailWasNotUpdated();
    });

    it('should update users email', async () => {
      let userEmail = await userProfilePage.userEmailField;
      await userProfilePage.editUserProfileField(
        userEmail,
        userData.editedData.email
      );
      await driver.wait(until.stalenessOf(userEmail));
      await verify.userEmailWasUpdated();
    });

    it("should not update password if confirmPassword don't match", async () => {
      let userPassword = await userProfilePage.userPasswordField;
      await userProfilePage.editUserProfileField(
        userPassword,
        userData.editedData.password
      );
      await verify.errorMessageIs('Passwords do not match');
    });

    it('should update users password ', async () => {
      await userProfilePage.editUserProfileField(
        await userProfilePage.userPasswordField,
        userData.editedData.password
      );
      await userProfilePage.editUserProfileField(
        await userProfilePage.userConfirmPasswordField,
        userData.editedData.password
      );
      await driver.wait(
        until.stalenessOf(await userProfilePage.userPasswordField)
      );
      await driver.wait(
        until.elementIsVisible(await userProfilePage.userPasswordField)
      );
      await verify.userPasswordWasUpdated();
      await verify.userCannotLoginWithOldPass();
    });
  });

  after('Logout user', async () => {
    await userProfilePage.editUserProfileField(
      await userProfilePage.userNameField,
      config.userName
    );
    await driver.wait(until.stalenessOf(await userProfilePage.userNameField));
    await userProfilePage.editUserProfileField(
      await userProfilePage.userEmailField,
      config.userEmail
    );
    await driver.wait(until.stalenessOf(await userProfilePage.userEmailField));
    await userProfilePage.editUserProfileField(
      await userProfilePage.userPasswordField,
      config.userPassword
    );
    await userProfilePage.editUserProfileField(
      await userProfilePage.userConfirmPasswordField,
      config.userPassword
    );
    await navBar.logout();
  });

  describe('Users orders', () => {});
});
