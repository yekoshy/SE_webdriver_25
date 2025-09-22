
const { WebDriver,until,Builder, Key } = require("selenium-webdriver");

require("chromedriver"); 
const assert = require('node:assert');
const data = [
    { 'input': 9999999, 'expectedOutput': 'Valid Value' },
    { 'input': '#$%^#', 'expectedOutput': 'Invalid Value' },
    { 'input': 'hendd**', 'expectedOutput': 'Valid Value' },
    { 'input': 'AHYEDIO', 'expectedOutput': 'Valid Value' },
    { 'input': 'jdtegdj', 'expectedOutput': 'Valid Value' },
    { 'input': 3705490, 'expectedOutput': 'Valid Value' },
    { 'input': 'ASHFbnj', 'expectedOutput': 'Valid Value' },
    { 'input': 'hye76BG', 'expectedOutput': 'Valid Value' },
    { 'input': '23BgbG*', 'expectedOutput': 'Valid Value' },
    { 'input': 'gyr$%8N', 'expectedOutput': 'Invalid Value' },
    { 'input': 'bhtr50', 'expectedOutput': 'Invalid Value' },
    { 'input': 'huy bh', 'expectedOutput': 'Invalid Value' }
];


async function inputOutput(driver,value) {
    await driver.findElement({name:'characters'}).clear()
    await driver.findElement({name:'characters'}).sendKeys(value);
    await driver.findElement({name:'validate'}).click();
    let output = await driver.findElement({name:'validation_message'}).getAttribute('value');
    return output;
}

async function test(){
    try{
        var driver = new Builder()
    .forBrowser('chrome')
    .build();

        await driver.get('https://testpages.eviltester.com/styled/apps/7charval/simple7charvalidation.html')
        console.log(await inputOutput(driver,'Yasmin88'));
        let actual;
        for(let i=0;i<data.length;i++){
            actual = await inputOutput(driver,data[i].input);
            assert.equal(actual,data[i].expectedOutput);
            console.log('Test #'+i+' passed for '+data[i].input);
        }
    }catch(e){
        console.log(e)
    }finally{ 
       

        await driver.quit()
    
    }
    
}

test()