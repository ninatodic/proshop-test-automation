const expect = require('chai').expect;
const config = require('../config/config');
const userData = require('../testData/userData');
const UserApi = require('../apiHelpers/UserApi');
const UserProfilePage = require('../pageObjects/UserProfilePage');

const api = new UserApi();
const userProfilePage = new UserProfilePage();

class VerificationsUserSpec {
  async userNameWasNotUpdated() {
    expect(
      await (await userProfilePage.userNameField).getAttribute('value')
    ).to.equal(config.userName);
  }

  async userNameWasUpdated() {
    expect(
      await (await userProfilePage.userNameField).getAttribute('value')
    ).to.equal(userData.editedData.name);
  }

  async userEmailWasNotUpdated() {
    expect(
      await (await userProfilePage.userEmailField).getAttribute('value')
    ).to.equal(config.userEmail);
  }

  async userEmailWasUpdated() {
    expect(
      await (await userProfilePage.userEmailField).getAttribute('value')
    ).to.equal(userData.editedData.email);
  }

  async errorMessageIs(message) {
    expect(
      await userProfilePage.getTextFromElement(
        await userProfilePage.errorMessageEl
      )
    ).to.equal(message);
  }

  async userPasswordWasUpdated() {
    const response = await api.loginUser(
      userData.editedData.email,
      userData.editedData.password
    );
    expect(response.status).to.equal(200);
  }

  async userCannotLoginWithOldPass() {
    const response = await api.loginUser(
      config.userEmail,
      config.userPassword,
      false
    );
    expect(response.status).to.equal(401);
  }
}

module.exports = VerificationsUserSpec;
