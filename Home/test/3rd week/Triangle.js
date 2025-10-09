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

  
    
    assert.equal(resultText,expected[0]);
    console.log('✅ Test Passed: Correct triangle type identified');
    const script = `
        const canvas = document.querySelector("#triangle-canvas");
        if (!canvas) {
            return null; // Return null if canvas is not found
        }
        const ctx = canvas.getContext('2d');
        const imageData = ctx.getImageData(0, 0, 1, 1);
        return Array.from(imageData.data); // Returns [R, G, B, A]
        
    `;
    const pixelData = await driver.executeScript(script);
    
    if(expected[1]){
        assert.notEqual(pixelData[3],0);
    }else{
        assert.equal(pixelData[3],0);
    }
    console.log("✅ Successfully retrieved pixel data.");
    console.log(pixelData);
 
    

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
            
            { sides: [1, 2, 3], expected: ['Error: Not a Triangle',false] },
            { sides: [4, 'e', 6], expected: ['Error: Side 2 is not a Number',false] },
            { sides: ['%', 3, 4], expected: ['Error: Side 1 is not a Number',false] },
            { sides: [3, 3, 3], expected: ['Equilateral',true] },
            { sides: [5, 5, 8], expected: ['Isosceles',true] },
            { sides: [5, 4, 3], expected: ['Scalene',true] }
            
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
