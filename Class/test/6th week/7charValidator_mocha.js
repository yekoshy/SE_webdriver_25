
const { WebDriver,until,Builder, Key, By } = require("selenium-webdriver");
require("chromedriver");
const { assert } = require('chai');
const forEach = require("mocha-each");


class Validator{

    constructor(url) {
        this.driver = null;
        this.url = url;
        
    }

    async open() {
        this.driver = await new Builder().forBrowser('chrome').build();
        await this.driver.get(this.url);
    }

    async setInput(xpath,input){
        let n = await this.driver.findElement(By.xpath(xpath));
        await n.clear()
        await n.sendKeys(input);
    }

    async click(xpath){
        await this.driver.findElement(By.xpath(xpath)).click()
    }


    async sleep(n){
        await this.driver.sleep(n);
    }

    async setAllInput(txt){
        await this.setInput("//input[@name='characters']",txt)
        await this.click("//input[@name='validate']")
        await this.sleep(100)

    }

    async getOutput(){
        return await this.driver.findElement(By.xpath("//input[@name='validation_message']")).getAttribute('value')
    }

    async close(){
        await this.driver.quit();
    }
   
  
}






        

describe('Testsuit', function () {
    //remove --no-timeouts
    this.timeout(0);
    const Objct = new Validator('https://testpages.eviltester.com/styled/apps/7charval/simple7charvalidation.html'); 

    before(async function(){
        //await Objct.open()
    })

    beforeEach(async function(){
        await Objct.open()
    })

    after(async function(){
        //await Objct.close()
    })

    afterEach(async function(){
        await Objct.close()
    })
    forEach([
    [9999999, 'Valid Value'],
    ['#$%^#', 'Invalid Value'],
    ['hendd**', 'Valid Value'],
    ['AHYEDIO', 'Valid Value'],
    ['jdtegdj', 'Valid Value'],
    [3705490, 'Valid Value'],
    ['ASHFbnj', 'Valid Value'],
    ['hye76BG', 'Valid Value'],
    ['23BgbG*', 'Valid Value'],
    ['gyr$%8N', 'Invalid Value'],
    ['bhtr50', 'Invalid Value'],
    ['huy bh', 'Invalid Value']
]).it('Asserting %s is %s', async function (input,expectedOutput) {
        await Objct.setAllInput(input)
        let txt = await Objct.getOutput()
        assert.equal(txt,expectedOutput)
    }); 
    })