const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { BrowsingContext } = require('selenium-webdriver/bidi/browsingContext');
require('chromedriver');
const { assert } = require('chai');

async function runTest() {
    let driver;
    try {
        // 1. Enable BiDi in Chrome options
        const options = new chrome.Options();
        options.enableBidi();

        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();

        await driver.get('https://www.selenium.dev/selenium/web/formPage.html');
        
        const contextId = await driver.getWindowHandle(); 
        const element = await driver.findElement(By.id('checky'));
        const elementId = await element.getId();

        // 2. Access the BiDi interface
        let bidi = await driver.getBidi();
        
        // 3. 🚀 THE FIX: Use the low-level 'send' method to dispatch the BiDi command
        const response = await bidi.send('browsingContext.captureScreenshot', {
            context: contextId,
            clip: {
                type: 'element',
                element: elementId
            }
        });

        // The response object contains the base64 string under the 'data' property
        const base64Screenshot = response.data;

        console.log('Full response (first 10 chars):', base64Screenshot.slice(0, 10));

        const base64code = base64Screenshot.slice(0, 5);
        console.log('Prefix:', base64code);

        // Assert that the Base64 string starts with the PNG header prefix
        assert.equal(base64code, 'iVBOR');
        console.log('✅ Screenshot assertion passed!');
    } catch (e) {
        console.error('❌ Error:', e);
    } finally {
        //if (driver) await driver.quit();
    }
}

runTest();