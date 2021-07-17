const BasePage = require('./BasePage');

class EditUserPage extends BasePage {
  get userNameField() {
    return this.getElementById('name');
  }

  get userEmailField() {
    return this.getElementById('email');
  }

  get isAdminCheckbox() {
    return this.getElementById('isadmin');
  }

  get updateBtn() {
    return this.getElementByClassName('btn-primary');
  }

  get goBackBtn() {
    return this.getElementByLinkText('GO BACK');
  }

  get errorMessageElement() {
    return this.getElementByCss('.alert-danger');
  }

  async editUserName(name) {
    await this.clearAndInputTextIntoField(await this.userNameField, name);
    await this.clickElement(await this.updateBtn);
  }
  async editUserEmail(email) {
    await this.clearAndInputTextIntoField(await this.userEmailField, email);
    await this.clickElement(await this.updateBtn);
  }
  async setUserToAdmin() {
    await this.clickElement(await this.isAdminCheckbox);
    await this.clickElement(await this.updateBtn);
  }
  async goBack() {
    await this.clickElement(await this.goBackBtn);
  }
}

module.exports = EditUserPage;
