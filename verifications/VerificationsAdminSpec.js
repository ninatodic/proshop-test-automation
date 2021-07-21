const expect = require('chai').expect;

const UsersDashboardPage = require('../pageObjects/UsersDashboardPage');
const EditUserPage = require('../pageObjects/EditUserPage');
const ProductDashboardPage = require('../pageObjects/ProductDashboardPage');
const EditProductPage = require('../pageObjects/EditProductPage');
const productData = require('../testData/productData');

const usersDashboardPage = new UsersDashboardPage();
const editUserPage = new EditUserPage();
const editProductPage = new EditProductPage();
const productDashboardPage = new ProductDashboardPage();

class VerificationsAdminSpec {
  async userDoesNotExist(userEmail) {
    let elements = await driver.findElements(By.css('tr>td:nth-child(3)'));
    let emails = [];
    for (let element of elements) {
      emails.push(await element.getText());
    }
    expect(emails.includes(userEmail)).to.equal(false);
  }

  async userNameWasUpdated() {
    expect(
      await usersDashboardPage.getTextFromElement(
        await usersDashboardPage.lastUserName
      )
    ).to.equal('Edited name');
  }

  async userNameWasNotUpdated(name) {
    expect(
      await usersDashboardPage.getTextFromElement(
        await usersDashboardPage.lastUserName
      )
    ).to.equal(name);
  }

  async userEmailWasUpdated() {
    expect(
      await usersDashboardPage.getTextFromElement(
        await usersDashboardPage.lastUserEmail
      )
    ).to.equal('editedEmail@example.com');
  }

  async userEmailWasNotUpdated(email) {
    expect(
      await usersDashboardPage.getTextFromElement(
        await usersDashboardPage.lastUserEmail
      )
    ).to.equal(email);
  }

  async userEditErrorMessageIs(message) {
    expect(
      await editUserPage.getTextFromElement(
        await editUserPage.errorMessageElement
      )
    ).to.have.string(message);
  }

  async userHasAdminPrivileges() {
    const element = await usersDashboardPage.isAdminIcon;
    const elementClass = await element.getAttribute('class');

    expect(elementClass).to.equal('fas fa-check');
  }

  async newProductCreated(before, after) {
    expect(after - before).to.equal(1);
  }

  async productNameWasUpdated() {
    expect(
      await productDashboardPage.getTextFromElement(
        await productDashboardPage.lastProductName
      )
    ).to.equal(productData.editedSampleProduct.name);
  }

  async productPriceWasUpdated() {
    expect(
      await productDashboardPage.getTextFromElement(
        await productDashboardPage.lastProductPrice
      )
    ).to.equal(`$${productData.editedSampleProduct.price}`);
  }

  async productEditErrorMessageIs(message) {
    expect(
      await editProductPage.getTextFromElement(
        await editProductPage.errorMessageElement
      )
    ).to.have.string(message);
  }
  async productDeleted(productCount) {
    let currentProductCount = await productDashboardPage.getCurrentTRCount();
    expect(productCount - currentProductCount).to.equal(1);
  }
}

module.exports = VerificationsAdminSpec;
