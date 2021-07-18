const BasePage = require('../BasePage');

class NavBar extends BasePage {
  get userNameDoropdown() {
    return this.getElementById('username');
  }

  get adminDoropdown() {
    return this.getElementById('adminmenu', undefined, false);
  }

  get adminDropdownUsers() {
    return this.getElementByLinkText('Users');
  }

  get adminDropdownProducts() {
    return this.getElementByLinkText('Products');
  }

  get userDropdownLogout() {
    return this.getElementByCss('.dropdown.nav-item > div > a:nth-child(2)');
  }

  async logout() {
    await this.clickElement(await this.userNameDoropdown);
    await this.clickElement(await this.userDropdownLogout);
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
