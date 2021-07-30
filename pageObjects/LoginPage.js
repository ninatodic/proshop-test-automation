const BasePage = require('./BasePage');

class LoginPage extends BasePage {
  get signInTitle() {
    return this.getElementByCss('#root h1');
  }
  get emailField() {
    return this.getElementById('email');
  }
  get passwordField() {
    return this.getElementById('password');
  }
  get signInBtn() {
    return this.getElementByClassName('btn-primary');
  }
  get errorMsgElement() {
    return this.getElementByCss('.alert-danger.show');
  }

  async login(loginCredentials) {
    if (loginCredentials.email) {
      await this.inputTextIntoField(
        await this.emailField,
        loginCredentials.email
      );
    }
    if (loginCredentials.password) {
      await this.inputTextIntoField(
        await this.passwordField,
        loginCredentials.password
      );
    }
    await this.clickElement(await this.signInBtn);
  }
}

module.exports = LoginPage;
