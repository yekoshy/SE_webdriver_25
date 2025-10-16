const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const BrowsingContext = require('selenium-webdriver/bidi/browsingContext');
require('chromedriver');
const fs = require('fs'); 
const { assert } = require('chai');

async function drawTriangle(driver,sides) {
   // Locate input fields
    const side1 = await driver.findElement({id:'side1'});
    const side2 = await driver.findElement({id:'side2'});
    const side3 = await driver.findElement({id:'side3'})

    // Enter test values
    await side1.clear();
    await side1.sendKeys(sides[0]);
    await side2.clear();
    await side2.sendKeys(sides[1]);
    await side3.clear();
    await side3.sendKeys(sides[2]);

    // Click "Identify Triangle Type"
    const button = await driver.findElement({id:'identify-triangle-action'})
    await button.click()
  
}

async function runTest() {
  let driver;
  try {
     const options = new chrome.Options();
     options.enableBidi()

    driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    const id = await driver.getWindowHandle()
    const browsingContext = await BrowsingContext(driver, {browsingContextId: id,})

    await driver.get('https://testpages.eviltester.com/styled/apps/triangle/triangle001.html');
    
      const cases = [
            
            { sides: [1, 2, 3]},
            { sides: [4, 'e', 6]},
            { sides: ['%', 3, 4],},
            { sides: [3, 3, 3],},
            { sides: [5, 5, 8],},
            { sides: [5, 4, 3],}
            
        ];
    let image;
    let elementId = await driver.findElement({id:'triangle-canvas'}).getId();
    for(let i=0;i<cases.length;i++){
      await drawTriangle(driver,cases[i].sides);
      image = await browsingContext.captureElementScreenshot(elementId)
      fs.writeFileSync('eleScreenshots/screenshot-'+i+'.png', image, 'base64');
      console.log('✅ Screenshot saved as screenshot-'+i+'.png');

    }
    


    

    
  } catch (e) {
    console.error('❌ Error:', e);
  } finally {
    if (driver) await driver.quit();
  }
}

runTest();
