const RegisterPage = require('../pageObjects/RegisterPage');
const NavBar = require('../pageObjects/components/NavBar');
const expect = require('chai').expect;

const registerPage = new RegisterPage();
const navBar = new NavBar();

class VerificationsRegisterSpec {
  async registrationErrorMessageIs(message) {
    expect(
      await registerPage.getTextFromElement(await registerPage.errorMsgElement)
    ).to.equal(message);
  }
  async userIsRegistered(data) {
    expect(
      await navBar.getTextFromElement(await navBar.userNameDoropdown)
    ).to.eql(data.name.toUpperCase());
  }
}

module.exports = VerificationsRegisterSpec;
