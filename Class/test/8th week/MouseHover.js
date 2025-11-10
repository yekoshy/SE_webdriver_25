const {By, Builder} = require('selenium-webdriver');
const assert = require("assert");
require('chromedriver');

describe('Mouse Testsuite', function () {
  let driver;
    this.timeout(0);
  before(async function () {
    driver = new Builder().forBrowser('chrome').build();
  });

  after(async () => await driver.quit());


   

  it('Mouse move and right click on an element', async function () {
      await driver.get('https://testpages.eviltester.com/pages/interaction/javascript-events/');
    await driver.manage().window().maximize();
     await driver.actions().scroll(0, 0, 0, 100).perform()
      const clickable = driver.findElement(By.id("oncontextmenu"));
      const actions = driver.actions({async: true});
      await actions.contextClick(clickable).perform();
  
      await driver.sleep(500);
      const clicked = await driver.findElement(By.id('oncontextmenustatus')).getText();
      assert.deepStrictEqual(clicked, 'Event Triggered')
    });
  
});
