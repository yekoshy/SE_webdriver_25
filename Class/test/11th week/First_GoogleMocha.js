const {Builder, By, Key} = require('selenium-webdriver');
const { assert } = require('chai');

async function write(driver,text){
    let queryEle = await driver.findElement(By.id('APjFqb'));
    await queryEle.sendKeys(text);
    await queryEle.sendKeys(Key.ENTER);
        
    await driver.sleep(3000);
    
   
    
}

describe('Testsuit for testing Search query in Google', function () {
    let driver;
    let queryEle;
    this.timeout(0);
    beforeEach(async function(){
        driver = await new Builder().forBrowser('firefox').build();
        await driver.get('https://www.google.com/');

        let button = await driver.findElement(By.css("#W0wltc > div"));
        await driver.actions().scroll(0, 0, 0, 0, button).perform()
        button.click()
        
    })
    
    afterEach(async function(){
        await driver.quit();
    })

    it('Trying with normal text', async function(){
        await write(driver,'testing')
        let textArea = await driver.findElement(By.id('tw-source-text-ta'));
        let textTA = await textArea.getText();
        
        assert.equal(textTA,'testing','We have a diff output');

    });
    it('Trying with special character', async function(){
        await write(driver,'§$%&/()')
        let textArea = await driver.findElement(By.css("#Odp5De span.hgKElc>b"))
        let textTA = await textArea.getText();
        assert.include(textTA,'und','Not giving the same output that was given in first place!')

    });
    it('Trying with empty text', async function(){
        await write(driver,'');
        await driver.findElement(By.css('.QCzoEc.z1asCe.MZy1Rb')).click()
        let dropdown = await driver.findElement(By.css('div.ynRric'))
        let textDD = await dropdown.getText();
        assert.include(textDD,'Trends','Empty string do not suggest Trendy subjects');
    });


});