
const { WebDriver,until,Builder, Key,By } = require("selenium-webdriver");

require("chromedriver"); 
//const assert = require('node:assert');
const { assert } = require('chai');

async function checkRadioValue(driver,type,age) {
        try{
        //await driver.findElement({value: type}).click()
        await driver.findElement(By.xpath("//div[@id='radio-group-sex']/input[@value='"+type+"']")).click()
        
        let txt = await driver.findElement({id:'group-sex-output'}).getText()
        assert.equal(txt,type)
        //await driver.findElement({value: age }).click()
        await driver.findElement(By.xpath("//div[@id='radio-group-age']/input[@value='"+age+"']")).click()
        txt = await driver.findElement({id:'group-age-output'}).getText()
        assert.equal(txt,age)
        
        }catch(e){
            console.log(e)
        }
    
}

async function test(){
    try{
        var driver = new Builder()
    .forBrowser('chrome')
    .build();

        await driver.get('https://yekoshy.github.io/RadioBtn-n-Checkbox/')
        let types=['Male','Female']
        let ages = ['0 - 5','5 - 15','15 - 50']
        for(let i=0;i<types.length;i++){
            for(let j=0;j<ages.length;j++){
                console.log('Testing : '+ types[i]+' and '+ages[j])

                await checkRadioValue(driver,types[i],ages[j])
                
                console.log('PASSED'


                )
            }
        }
        
        

    }catch(e){
        console.log(e)
    }finally{ 
        
        await driver.quit()
    
    }
    
}

test()