const { Builder, By } = require('selenium-webdriver');
require('chromedriver');
const fs = require('fs'); 



async function runTest(url) {
  let driver;
  try {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get(url);
    let image = await driver.takeScreenshot()
    fs.writeFileSync('saved/screenshot.png', image, 'base64');
    console.log('✅ Screenshot saved as screenshot.png');
    
    


    

    
  } catch (e) {
    console.error('❌ Error:', e);
  } finally {
    if (driver) await driver.quit();
  }
}

runTest('http://practicetestautomation.com/logged-in-successfully/');
