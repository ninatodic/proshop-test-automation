//imports
require('dotenv').config();
const chrome = require('selenium-webdriver/chrome');
require('chromedriver');
require('geckodriver');
const firefox = require('selenium-webdriver/firefox');
const { Builder, By, Key, until } = require('selenium-webdriver');
const Mocha = require('mocha');
const mochaOptions = require('./mochaOptions');
const glob = require('glob');
const config = require('./config/config');

//initialize mocha
const mocha = new Mocha(mochaOptions);

// add all test files
glob('test/**/*.js', function (err, files) {
  files.forEach((file) => {
    mocha.addFile(file);
  });
});

// mocha.addFile('./test/ui/admin.spec.js');

//initialize chromeOptions and add arguments
const chromeOptions = new chrome.Options();
chromeOptions.addArguments('start-maximized');

//create driver and add it to global object

const createDriver = async (browser) => {
  if (browser === 'chrome') {
    return await new Builder()
      .forBrowser(browser)
      .withCapabilities(chromeOptions)
      .build();
  } else {
    return await new Builder().forBrowser(browser).build();
  }
};

createDriver(config.browser).then((driver) => {
  global.driver = driver;
  global.By = By;
  global.Key = Key;
  global.until = until;

  mocha
    .run()
    .on('fail', function (test, err) {
      console.log('Test failed');
      console.log(err);
    })
    .on('end', async function () {
      await driver.close();
      console.log('All tests done');
    });
});
