const BasePage = require('./BasePage');

class RegisterPage extends BasePage {
  constructor() {
    super();
  }

  get nameField() {
    return this.getElementById('name');
  }
  get emailField() {
    return this.getElementById('email');
  }
  get passwordField() {
    return this.getElementById('password');
  }
  get confirmPasswordField() {
    return this.getElementById('confirmPassword');
  }
  get registerBtn() {
    return this.getElementByClassName('btn-primary');
  }

  get errorMsgElement() {
    return this.getElementByCss('.alert-danger.show');
  }

  async registerUser(registrationData) {
    if (registrationData.name) {
      await this.inputTextIntoField(
        await this.nameField,
        registrationData.name
      );
    }
    if (registrationData.email) {
      await this.inputTextIntoField(
        await this.emailField,
        registrationData.email
      );
    }
    if (registrationData.password) {
      await this.inputTextIntoField(
        await this.passwordField,
        registrationData.password
      );
    }
    if (registrationData.confirmedPassword) {
      await this.inputTextIntoField(
        await this.confirmPasswordField,
        registrationData.confirmedPassword
      );
    }
    await this.clickElement(await this.registerBtn);
  }
}

module.exports = RegisterPage;
