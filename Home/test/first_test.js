//import chromedriver in order for Selenium to open a Chrome browser by itself
require("chromedriver"); 
const assert = require('node:assert')
//import the following classes from Selenium
const {Builder, By, Key, until} = require('selenium-webdriver');

async function test() {
  //open Chrome browser

  let driver 
  try{
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://duckduckgo.com/')  
    let searchEle = await driver.findElement({name:'q'}).sendKeys('Selenium webdriver', Key.RETURN);
    console.log(await driver.getTitle())
    await driver.wait(until.titleContains('Selenium webdriver'),1000)    
    console.log(await driver.getTitle())
    assert.equal(await driver.getTitle(),'Selenium webdriver at DuckDuckGo')
  }catch(e){
    
    console.log(e)
  }finally{
    
    await driver.quit()
  }

}

test()