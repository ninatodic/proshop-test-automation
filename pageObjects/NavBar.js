const BasePage = require('./BasePage');

class NavBar extends BasePage {
  get userNameDoropdown() {
    return this.getElementById('username');
  }

  get adminDoropdown() {
    return this.getElementById('adminmenu', undefined, false);
  }

  get logoutMenuItem() {
    return this.getElementByCss('.dropdown.nav-item > div > a:nth-child(2)');
  }

  async logout() {
    await this.clickElement(await this.userNameDoropdown);
    await this.clickElement(await this.logoutMenuItem);
  }
}

module.exports = NavBar;
