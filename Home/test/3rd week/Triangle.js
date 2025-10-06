const { Builder, By, until } = require('selenium-webdriver');
require("chromedriver");
const { assert } = require('chai');
//const assert = require('node:assert');

async function testTriangleType(driver,sides,expected) {
 

  try {
    
    // Locate input fields
    const side1 = await driver.findElement({id:'side1'});
    const side2 = await driver.findElement({id:'side2'});
    const side3 = await driver.findElement({id:'side3'})

    // Enter test values
    await side1.clear();
    await side1.sendKeys(sides[0]);
    await side2.clear();
    await side2.sendKeys(sides[1]);
    await side3.clear();
    await side3.sendKeys(sides[2]);

    // Click "Identify Triangle Type"
    const button = await driver.findElement({id:'identify-triangle-action'})
    await button.click();

    // Wait for the result text to appear
    const resultElement = await driver.wait(until.elementLocated({id:'triangle-type'}), 3000);

    const resultText = await resultElement.getText();
    console.log('Triangle Type Displayed:', resultText);

  
    
    assert.equal(resultText,expected);
    console.log('✅ Test Passed: Correct triangle type identified');
    let width = await driver.findElement({id:'triangle-canvas'}).getAttribute('width')
    assert.notEqual(width,0)
    let height = await driver.findElement({id:'triangle-canvas'}).getAttribute('height')
    assert.notEqual(height,0)

  }catch (error) {
        console.error('Test encountered an error:', error);
    }
}

async function runTest() {
    let driver;
    try{
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://testpages.eviltester.com/styled/apps/triangle/triangle001.html')  
        const cases = [
            { sides: [3, 3, 3], expected: 'Equilateral' },
            { sides: [5, 5, 8], expected: 'Isosceles' },
            { sides: [5, 4, 3], expected: 'Scalene' },
            { sides: [1, 2, 3], expected: 'Error: Not a Triangle' },
            { sides: [4, 'e', 6], expected: 'Error: Side 2 is not a Number' },
            { sides: ['%', 3, 4], expected: 'Error: Side 1 is not a Number' }
        ];

        for(let i=0;i<cases.length;i++){
            await testTriangleType(driver,cases[i].sides,cases[i].expected);
        }
    }catch(e){
        console.log(e)
    }finally{
        await driver.quit()
    }  
}

runTest()
