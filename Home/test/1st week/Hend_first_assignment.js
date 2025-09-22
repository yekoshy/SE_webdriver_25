const { Builder, By } = require("selenium-webdriver");
require("chromedriver");
const assert = require('node:assert');
const URL = "https://practicetestautomation.com/practice-test-login/"; 

async function performLogin(driver,username, password) {
    await driver.get(URL);
    const usernameField = await driver.findElement(By.id("username"));
    const passwordField = await driver.findElement(By.id("password"));
    const submitBtn = await driver.findElement(By.id("submit"));

    await usernameField.clear();
    await usernameField.sendKeys(username);

    await passwordField.clear();
    await passwordField.sendKeys(password);

    await submitBtn.click();
    await driver.sleep(1000); // wait for the page to update
}


async function loginTest() {
    
    const VALID_USERNAME = "student";
    const VALID_PASSWORD = "Password123";

    let driver = await new Builder().forBrowser("chrome").build();

    try {
        
        // TC1: Valid login
        await performLogin(driver,VALID_USERNAME, VALID_PASSWORD);
        let pageSource = await driver.getPageSource();
        assert.ok(pageSource.includes("Logged In Successfully"));
        console.log("TC1: Valid Login passed");

        // TC2: Invalid login
        await performLogin(driver,"hend", "Hend123");
        let errorText = await driver.findElement(By.id("error")).getText();
        console.log("TC2: Invalid Login");
        assert.strictEqual(errorText, "Your username is invalid!");

        // TC3: Blank username
        await performLogin(driver,"", VALID_PASSWORD);
        errorText = await driver.findElement(By.id("error")).getText();
        assert.strictEqual(errorText, "Your username is invalid!");
        console.log("TC3: Blank Username");

        // TC4: Blank password
        await performLogin(driver,VALID_USERNAME, "");
        errorText = await driver.findElement(By.id("error")).getText();
        assert.strictEqual(errorText, "Your password is invalid!");
        console.log("TC4: Blank Password");

        // TC5: Both fields blank
        await performLogin(driver,"", "");
        errorText = await driver.findElement(By.id("error")).getText();
        assert.strictEqual(errorText, "Your username is invalid!");
        console.log("TC5: Both Fields Blank");

    } catch (e) {
        console.log("Test Failed:", e);
    } finally {
        await driver.quit();
    }
}

loginTest();
