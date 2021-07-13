const expect = require('chai').expect;
const ApiHandler = require('../apiHelpers/ApiHandler');
const UsersDashboardPage = require('../pageObjects/UsersDashboardPage');

const api = new ApiHandler();
const usersDashboardPage = new UsersDashboardPage();

class VerificationsAdminSpec {
  async userDoesNotExist(userEmail) {
    let elements = await driver.findElements(By.css('tr>td:nth-child(3)'));
    let emails = [];
    for (let element of elements) {
      emails.push(await element.getText());
    }
    expect(emails.includes(userEmail)).to.equal(false);
  }

  async userNameWasUpdated(name) {
    expect(
      await usersDashboardPage.getTextFromElement(
        await usersDashboardPage.lastUserName
      )
    ).to.equal(`${name} edited`);
  }

  async userEmailWasUpdated(name) {
    expect(
      await usersDashboardPage.getTextFromElement(
        await usersDashboardPage.lastUserEmail
      )
    ).to.equal('editedMail@example.com');
  }
}

module.exports = VerificationsAdminSpec;
