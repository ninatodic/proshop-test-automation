const { Driver } = require('selenium-webdriver/edge');
const BasePage = require('../BasePage');

class NavBar extends BasePage {
  get adminDoropdown() {
    return this.getElementById('adminmenu', undefined, false);
  }

  get adminDropdownUsers() {
    return this.getElementByLinkText('Users');
  }

  get adminDropdownProducts() {
    return this.getElementByLinkText('Products');
  }

  get userNameDoropdown() {
    return this.getElementById('username');
  }

  get userDropdownLogout() {
    return this.getElementByLinkText('Logout');
  }

  get userDropdownProfile() {
    return this.getElementByLinkText('Profile');
  }

  async logout() {
    await this.clickElement(await this.userNameDoropdown);
    await this.clickElement(await this.userDropdownLogout);
  }

  async goToUserProfilePage() {
    await this.clickElement(await this.userNameDoropdown);
    await this.clickElement(await this.userDropdownProfile);
  }

  async goToUserDashboard() {
    await this.clickElement(await this.adminDoropdown);
    await this.clickElement(await this.adminDropdownUsers);
  }

  async goToProductDashboard() {
    await this.clickElement(await this.adminDoropdown);
    await this.clickElement(await this.adminDropdownProducts);
  }
}

module.exports = NavBar;
