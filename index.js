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
const getFiles = require('./utils/getFiles');

//initialize mocha
const mocha = new Mocha(mochaOptions);

if (config.suite === 'api') {
  (async () => {
    if (!config.spec) {
      // add all test files in api directory

      const files = await getFiles('test/api/*.js');
      files.forEach((file) => {
        mocha.addFile(file);
      });
    } else {
      // add one test file
      try {
        mocha.addFile(`./test/api/${config.spec}`);
      } catch (error) {
        console.log('Please enter correct name of a file ');
      }
    }

    mocha
      .run()
      .on('fail', function (test, err) {
        console.log('Test failed');
        console.log(err);
      })
      .on('end', async function () {
        console.log('All tests done');
      });
  })();
} else {
  //initialize chromeOptions and add arguments
  const chromeOptions = new chrome.Options();
  chromeOptions.addArguments('start-maximized');

  //initialize firefoxOptions
  const firefoxOptions = new firefox.Options();

  if (config.headless) {
    chromeOptions.addArguments('--headless');
    chromeOptions.addArguments('--window-size=1920,1080');

    firefoxOptions.addArguments('--headless');
  }

  //add test files
  if (!config.spec && !config.suite) {
    // add all test files
    glob('test/**/*.js', function (err, files) {
      files.forEach((file) => {
        mocha.addFile(file);
      });
    });
  } else if (!config.spec && config.suite == 'ui') {
    // add all test files in ui directory
    glob('test/ui/*.js', function (err, files) {
      files.forEach((file) => {
        mocha.addFile(file);
      });
    });
  } else {
    try {
      mocha.addFile(`./test/ui/${config.spec}`);
    } catch (error) {
      console.log('Please enter correct name of a file');
    }
  }

  const createDriver = async (browser) => {
    if (browser === 'chrome') {
      return await new Builder()
        .forBrowser(browser)
        .withCapabilities(chromeOptions)
        .build();
    } else {
      return await new Builder()
        .forBrowser(browser)
        .withCapabilities(firefoxOptions)
        .build();
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
}
