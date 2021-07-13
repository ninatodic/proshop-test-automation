const BasePage = require('./BasePage');

class EditUserPage extends BasePage {
  get userNameField() {
    return this.getElementById('name');
  }

  get userEmailField() {
    return this.getElementById('email');
  }

  get isAdminCheckBox() {
    return this.getElementById('isadmin');
  }

  get updateBtn() {
    return this.getElementByClassName('btn-primary');
  }

  async editUserName() {
    await this.inputTextIntoField(await this.userNameField, ' edited');
    await this.clickElement(await this.updateBtn);
  }
  async editUserEmail() {
    await this.clearAndInputTextIntoField(
      await this.userEmailField,
      'editedMail@example.com'
    );
    await this.clickElement(await this.updateBtn);
  }
}

module.exports = EditUserPage;
