const { until } = require('selenium-webdriver');
const BasePage = require('./BasePage');

class UsersDashboardPage extends BasePage {
  get lastUserName() {
    return this.getElementByCss('tr:last-child > td:nth-child(2)');
  }

  get lastUserEmail() {
    return this.getElementByCss('tr:last-child > td:nth-child(3)');
  }

  get isAdminIcon() {
    return this.getElementByClassName('tr:last-child > td:nth-child(4 > i)');
  }

  get lastUserEditBtn() {
    return this.getElementByCss('tr:last-child > td:nth-child(5) > a');
  }

  get lastUserDeleteBtn() {
    return this.getElementByCss(' tr:last-child > td:last-child > button ');
  }

  async deleteLastUser() {
    await this.clickElement(await this.lastUserDeleteBtn);
    await driver.switchTo().alert().accept();
  }

  async goToUserEditPage() {
    await this.clickElement(await this.lastUserEditBtn);
  }

  async getCurrentUsersCount() {
    await this.getElementByCss('tr');
    return (await driver.findElements(By.css('tr'))).length;
  }

  async waitUntilUserCountChanges(currentCount) {
    console.log(currentCount);
    await driver.wait(async () => {
      return (await this.getCurrentUsersCount()) !== currentCount;
    }, 5000);
  }
}

module.exports = UsersDashboardPage;
