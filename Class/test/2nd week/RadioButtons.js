
const { WebDriver,until,Builder, By,Key,Browser } = require("selenium-webdriver");

require("chromedriver");
const { Options } = require("selenium-webdriver/chrome");
const assert = require('node:assert');


async function test(){
    try{
        

        
        var driver = await new Builder().forBrowser(Browser.CHROME).build();

        

        await driver.get('https://demoqa.com/radio-button');
        await driver.manage().window().maximize();
        // to Scroldown to see the elements
        await driver.executeScript("window.scrollTo(0, document.body.scrollHeight/3);");
        await driver.sleep(4000);
        
        let yesRadio = await driver.findElement({id:'yesRadio'})
        let selected = await yesRadio.isSelected();
        console.log('Yes is selected:'+selected);
        await driver.findElement(By.css('label[for="yesRadio"]')).click()
        console.log('Yes is clicked');
        selected = await yesRadio.isSelected();
        console.log('Yes is selected:'+selected);
        
    }catch(e){
        console.log(e)
    }finally{ 
        await driver.quit()
    
    }
    
}

test()