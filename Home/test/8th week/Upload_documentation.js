
const {Browser, By, until, Builder} = require("selenium-webdriver");
const path = require("path");
const assert = require('node:assert');
require("chromedriver");


describe('File Upload Test', function() {
  let driver;
    this.timeout(0);
  before(async function() {
    driver = new Builder()
      .forBrowser(Browser.CHROME)
      .build();
  });

  after(async() => await driver.quit());

  it('Should be able to upload a file successfully', async function() {
    const image = path.resolve('./resources/selenium-snapshot.png')

    await driver.manage().setTimeouts({implicit: 5000});

    // Navigate to URL
    await driver.get('https://the-internet.herokuapp.com/upload');
    // Upload snapshot
    await driver.findElement(By.id("file-upload")).sendKeys(image);
    await driver.findElement(By.id("file-submit")).submit();

    const revealed = await driver.findElement(By.id('uploaded-files'))
    await driver.wait(until.elementIsVisible(revealed), 2000);
    const data = await driver.findElement(By.css('h3'));

    assert.equal(await data.getText(), `File Uploaded!`);
  });
});