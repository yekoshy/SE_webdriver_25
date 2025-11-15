const {By, Builder,Origin} = require('selenium-webdriver');
const assert = require("assert");
require('chromedriver');

describe('Mouse Testsuite', function () {
    let driver;
    this.timeout(0);

  beforeEach(async function () {
    driver = new Builder().forBrowser('chrome').build();
  });

  afterEach(async function() {
    await driver.quit()

  });



  it('Double-click on an element', async function () {
    await driver.get('https://www.selenium.dev/selenium/web/mouse_interaction.html');
    const clickable = driver.findElement(By.id("clickable"));
    const actions = driver.actions({async: true});
    await actions.doubleClick(clickable).perform();

    await driver.sleep(500);
    const status = await driver.findElement(By.id('click-status')).getText();
    assert.deepStrictEqual(status, `double-clicked`)
  });

  it('Mouse move into an element', async function () {
    await driver.get('https://www.selenium.dev/selenium/web/mouse_interaction.html');
    const hoverable = driver.findElement(By.id("hover"));
    const actions = driver.actions({async: true});
    await actions.move({origin: hoverable}).perform();

    const status = await driver.findElement(By.id('move-status')).getText();
    assert.deepStrictEqual(status, `hovered`)
  });

    it('Mouse move and right click on an element', async function () {
    await driver.get('https://www.selenium.dev/selenium/web/mouse_interaction.html');
    const clickable = driver.findElement(By.id("clickable"));
    const actions = driver.actions({async: true});
    await actions.contextClick(clickable).perform();

    await driver.sleep(500);
    const clicked = await driver.findElement(By.id('click-status')).getText();
    assert.deepStrictEqual(clicked, `context-clicked`)
  });

   it('Mouse move and mouseDown on an element', async function () {
    await driver.get('https://www.selenium.dev/selenium/web/mouse_interaction.html');
    let clickable = driver.findElement(By.id("clickable"));
    const actions = driver.actions({async: true});
    await actions.move({origin: clickable}).press().perform();
  });

  it('From current pointer location', async function () {
    await driver.get('https://selenium.dev/selenium/web/mouse_interaction.html');
    const actions = driver.actions({async: true});
    await actions.move({x: 6, y: 3}).perform()

    await actions.move({x: 13, y: 15, origin: Origin.POINTER}).perform()

    let result = await driver.findElement(By.id('absolute-location')).getText();
    result = result.split(', ');
    assert.deepStrictEqual(Math.abs(parseInt(result[0]) - 6 - 13) < 2, true)
    assert.deepStrictEqual(Math.abs(parseInt(result[1]) - 3 - 15) < 2, true)
  });

});
