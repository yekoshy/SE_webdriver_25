const { WebDriver,until,Builder, Key,By } = require("selenium-webdriver");

require("chromedriver"); 
const assert = require('node:assert');

async function test(){
    try{
        var driver = new Builder()
    .forBrowser('chrome')
    .build();

        await driver.get('https://yekoshy.github.io/Dropdown/')
        await driver.findElement({css:'textarea.select2-search__field'}).sendKeys('San');
        let list = await driver.findElements(By.css('.select2-results__option--selectable'))
        if(list.length>0){
            await list[0].click();
            if(list.length>1){
                for(let i=1; i<list.length;i++){
                    await driver.findElement({css:'textarea.select2-search__field'}).sendKeys('San');
                    list = await driver.findElements(By.css('.select2-results__option--selectable'))
                    await list[i].click()
                }
                let text =  await driver.findElement({css:'.select2-selection'}).getText();
                console.log(text)
                
            }else{
            let text =  await driver.findElement({css:'.select2-selection'}).getText();
            console.log(text)
            }
        }
        
    }catch(e){
        console.log(e)
    }finally{ 
        await driver.quit()
    
    }
    
}

test()