class BasePage {
  constructor() {
    this.timeout = 20 * 1000;
  }

  //Locates elements by the ID attribute
  async getElementById(id, timeout = this.timeout, log = true) {
    try {
      let element = await driver.wait(until.elementLocated(By.id(id)), timeout);
      return element;
    } catch (err) {
      if (log) console.log(err.message);
      return false;
    }
  }

  //Locates element using CSS selector
  async getElementByCss(selector, timeout = this.timeout) {
    try {
      let element = await driver.wait(
        until.elementLocated(By.css(selector)),
        timeout
      );
      return element;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  //Locates element that have a specific class name
  async getElementByClassName(className, timeout = this.timeout) {
    try {
      let element = await driver.wait(
        until.elementLocated(By.className(className)),
        timeout
      );
      return element;
    } catch (err) {
      console.log(err.message);
      return false;
    }
  }

  //Locates element matching a XPath selector
  async getElementByXPath(xpath, timeout = this.timeout) {
    try {
      let element = await driver.wait(
        until.elementLocated(By.xpath(xpath)),
        timeout
      );
      return element;
    } catch (err) {
      console.log(err.message);
      return false;
    }
  }

  //Locates elements whose name attribute has the given value
  async getElementByName(name, timeout = this.timeout) {
    try {
      let element = await driver.wait(
        until.elementLocated(By.name(name)),
        timeout
      );
      return element;
    } catch (err) {
      console.log(err.message);
      return false;
    }
  }

  //Locates link elements whose visible text matches the given string.
  async getElementByLinkText(text, timeout = this.timeout) {
    try {
      let element = await driver.wait(
        until.elementLocated(By.linkText(text)),
        timeout
      );
      return element;
    } catch (err) {
      console.log(err.message);
      return false;
    }
  }

  //input text into text field
  async inputTextIntoField(element, text) {
    if (element) {
      try {
        await element.sendKeys(text);
      } catch (err) {
        console.log(err.message);
      }
    } else {
      console.log('element not selected');
    }
  }

  //clear field then input text into text field
  async clearAndInputTextIntoField(element, text) {
    if (element) {
      try {
        await element.clear();
        await element.sendKeys(text);
      } catch (err) {
        console.log(err.message);
      }
    } else {
      console.log('element not selected');
    }
  }

  async clearField(element) {
    if (element) {
      try {
        while ((await element.getAttribute('value')) != '') {
          element.sendKeys(Key.BACK_SPACE);
        }
      } catch (err) {
        console.log(err.message);
      }
    } else {
      console.log('element not selected');
    }
  }

  //click element
  async clickElement(element) {
    if (element) {
      try {
        await element.click();
      } catch (err) {
        console.log(err.message);
      }
    } else {
      console.log('element not selected');
    }
  }

  async getTextFromElement(element) {
    if (element) {
      try {
        let text = await element.getText();
        return text;
      } catch (err) {
        console.log(err.message);
        return false;
      }
    } else {
      console.log('element not selected');
    }
  }

  async getCurrentTRCount() {
    await this.getElementByCss('tr');
    return (await driver.findElements(By.css('tr'))).length;
  }

  async waitUntilTRCountChanges(currentCount) {
    try {
      await driver.wait(async () => {
        return (await this.getCurrentTRCount()) !== currentCount;
      }, 5000);
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getLocalStorageItem(key) {
    try {
      return await driver.executeScript(
        `return window.localStorage.getItem("${key}");`
      );
    } catch (error) {
      return false;
      console.log(error);
    }
  }
}

module.exports = BasePage;
