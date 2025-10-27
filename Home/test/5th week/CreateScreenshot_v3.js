const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const BrowsingContext = require('selenium-webdriver/bidi/browsingContext');
require('chromedriver');
const fs = require('fs'); 
const { assert } = require('chai');


async function runTest(url) {
  let driver;
  try {
     const options = new chrome.Options();
     options.enableBidi()

    driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    const id = await driver.getWindowHandle()
    const browsingContext = await BrowsingContext(driver, {browsingContextId: id,})

    await driver.get(url);
    let image = await browsingContext.captureScreenshot()
    fs.writeFileSync('saved/screenshot.png', image, 'base64');
    console.log('✅ Screenshot saved as screenshot.png');
    
    


    

    
  } catch (e) {
    console.error('❌ Error:', e);
  } finally {
    if (driver) await driver.quit();
  }
}

runTest('http://practicetestautomation.com/logged-in-successfully/');
