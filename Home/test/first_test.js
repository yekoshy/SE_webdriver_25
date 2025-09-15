//import chromedriver in order for Selenium to open a Chrome browser by itself
require("chromedriver"); 

//import the following classes from Selenium
const {Builder, By, Key, until} = require('selenium-webdriver');

async function example() {
  //open Chrome browser
  let driver = await new Builder().forBrowser('chrome').build();
  
  await driver.get('http://www.google.com/')
}

example()