
const { WebDriver,until,Builder, Key } = require("selenium-webdriver");

require("chromedriver"); 
const assert = require('node:assert');

async function test(){
    try{
        var driver = new Builder()
    .forBrowser('chrome')
    .build();

        await driver.get('https://duckduckgo.com/')
        console.log(await driver.getTitle())
        await driver.findElement({id:'searchbox_input'}).sendKeys('Selenium Webdriver',Key.ENTER);
        await driver.wait(until.titleContains('Selenium'),1000);
        console.log(await driver.getTitle())
        assert.equal(await driver.getTitle(),'Selenium Webdriver at DuckDuckGo')
        
    }catch(e){
        console.log(e)
    }finally{ 
        await driver.quit()
    
    }
    
}

test()