const {Browser, Builder} = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');


describe('Open Firefox', function () {
  let driver;
    this.timeout(0);
  before(async function () {
    
    driver = await new Builder().forBrowser('firefox').build();
  });

  after(async () => await driver.quit());

  it('Basic Firefox test', async function () {
    await driver.get('https://www.selenium.dev/selenium/web/blank.html');
  });
});