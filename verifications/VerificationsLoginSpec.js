const NavBar = require('../pageObjects/components/NavBar');
const LoginPage = require('../pageObjects/LoginPage');
const expect = require('chai').expect;

const navBar = new NavBar();
const loginPage = new LoginPage();

class VerificationsLoginSpec {
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

module.exports = VerificationsLoginSpec;
