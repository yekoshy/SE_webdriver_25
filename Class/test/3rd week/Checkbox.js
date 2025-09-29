

const { WebDriver,until,Builder, Key,By } = require("selenium-webdriver");

require("chromedriver"); 
//const assert = require('node:assert');
const { assert } = require('chai');



async function test(){
    try{
        var driver = new Builder()
    .forBrowser('chrome')
    .build();

        await driver.get('https://yekoshy.github.io/RadioBtn-n-Checkbox/')
        let enabled = await driver.findElement({id:'check-default-disabled'}).isEnabled();        
        assert.isFalse(enabled);
        let selected = await driver.findElement({id:'check-default-checked'}).isSelected();
        assert.isTrue(selected);
        await driver.findElement({id:'check-primary'}).click()
        let classlist = await driver.findElement({id:'single-checkbox-message'}).getAttribute('class');
        assert.notInclude(classlist,'hidden');

    }catch(e){
        console.log(e)
    }finally{ 
        
        await driver.quit()
    
    }
    
}

test()