const BasePage = require('./BasePage');

class UserProfilePage extends BasePage {
  get userNameField() {
    return this.getElementById('name');
  }
  get userEmailField() {
    return this.getElementById('email');
  }
  get userPasswordField() {
    return this.getElementById('password');
  }
  get userConfirmPasswordField() {
    return this.getElementById('confirmPassword');
  }
  get updateBtn() {
    return this.getElementByClassName('btn-primary');
  }

  get errorMessageEl() {
    return this.getElementByClassName('alert-danger');
  }

  async editUserProfileField(field, inputData) {
    await this.clearAndInputTextIntoField(field, inputData);
    await this.clickElement(await this.updateBtn);
  }

  async clearAndUpdateField(field) {
    await this.clearField(field);
    await this.clickElement(await this.updateBtn);
  }
}

module.exports = UserProfilePage;
