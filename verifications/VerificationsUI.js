const RegisterPage = require('../pageObjects/RegisterPage');
const NavBar = require('../pageObjects/NavBar');
const LoginPage = require('../pageObjects/LoginPage');
const expect = require('chai').expect;

const registerPage = new RegisterPage();
const navBar = new NavBar();
const loginPage = new LoginPage();

class VerificationsUI {
  async registrationErrorMessageIs(message) {
    expect(
      await registerPage.getTextFromElement(await registerPage.errorMsgElement)
    ).to.equal(message);
  }
  async customerIsRegistered(data) {
    expect(
      await navBar.getTextFromElement(await navBar.userNameDoropdown)
    ).to.eql(data.name.toUpperCase());
  }

  async loginErrorMessageIs(message) {
    expect(
      await loginPage.getTextFromElement(await loginPage.errorMsgElement)
    ).to.equal(message);
  }

  async userIsAdministrator() {
    expect(
      await navBar.getTextFromElement(await navBar.adminDoropdown)
    ).to.equal('ADMIN');
  }

  async userIsNotAdministrator() {
    expect(await navBar.adminDoropdown).to.equal(false);
  }
}

module.exports = VerificationsUI;
