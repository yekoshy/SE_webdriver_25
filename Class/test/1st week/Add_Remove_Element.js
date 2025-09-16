const { WebDriver,until,Builder, Key,By } = require("selenium-webdriver");
require("chromedriver"); 
const assert = require('node:assert');

async function test(){
    try{
        var driver = new Builder()
    .forBrowser('chrome')
    .build();

        await driver.get('https://the-internet.herokuapp.com/add_remove_elements/')
        for(let i=0;i<5;i++){
            await driver.findElement(By.xpath('//button[text()="Add Element"]')).click()
        }

        let elements = await driver.findElements(By.className('added-manually'));
        
        for(let i= 0;i<elements.length;i++){
            await elements[i].click()
        }
        let count = await driver.findElement({id:'elements'}).getAttribute('childElementCount')
        assert.equal(count,0);
        //await driver.findElements(By.xpath('//button[text()="Delete"]'))
    }catch(e){
        console.log(e)
    }finally{ 
        await driver.quit()
    
    }
    
}

test()