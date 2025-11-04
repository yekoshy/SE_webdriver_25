
//npx mocha .\SimpleNoteTaker_mocha.js --reporter mocha-simple-html-reporter --reporter-options output=report.html
const {Builder, By, Key, until} = require('selenium-webdriver');
require("chromedriver");
const chrome = require('selenium-webdriver/chrome');
const BrowsingContext = require('selenium-webdriver/bidi/browsingContext');
const { assert } = require('chai');
const fs = require('fs');
const forEach = require('mocha-each');

class Triangle {

    constructor(url) {
        this.driver = null;
        this.url = url;
        this.browsingContext = null;
        
    }

    async open() {
        const options = new chrome.Options();
        options.addArguments("--force-device-scale-factor=0.9");
        options.enableBidi()
        this.driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
        const id = await this.driver.getWindowHandle()
        this.browsingContext = await BrowsingContext(this.driver, {browsingContextId: id,})
        await this.driver.get(this.url);
    }

    async setInput(id,input){
        let n = await this.driver.findElement(By.id(id));
        await n.clear()
        await n.sendKeys(input);
    }

    async click(id){
        await this.driver.findElement(By.id(id)).click()
    }

    async setTriangle(sides,count){
        await this.setInput('side1',sides[0])
        await this.setInput('side2',sides[1])
        await this.setInput('side3',sides[2])
        await this.scroll(300);
        await this.click('identify-triangle-action')
        await this.sleep(500);
        //await this.getScreenshot(count);
        await this.getScreenshot();
    }

/*    
    async getScreenshot(count){
        //Failed to take screenshot of the canvas!!
        //let elementId = await this.driver.findElement(By.css('.triangle-canvas-container')).getId();
        //let image = await this.browsingContext.captureElementScreenshot(elementId);
        let image = await this.browsingContext.captureScreenshot()
        fs.writeFileSync('screenshots/screenshot-'+count+'.png', image, 'base64');
        console.log('✅ Screenshot saved');
        
    }
*/
    async getScreenshot(){
        let image = await this.browsingContext.captureScreenshot()
        fs.writeFileSync('screenshot.png', image, 'base64');
        console.log('✅ Screenshot saved');
    }

    readPng(img){
        return  fs.readFileSync(img, 'base64');
    }

    async max(){
        await this.driver.manage().window().maximize();
        await this.sleep(500);
    }

    async scroll(y){
        await this.driver.actions().scroll(0, 0, 0, y).perform()
        await this.sleep(500);
    }



    async getType(){
        return await this.driver.findElement(By.id('triangle-type')).getText();
    }


    async sleep(n){
        await this.driver.sleep(n);
    }

    async close(){
        await this.driver.quit();
    }

  
  
}

describe('Testsuit', function () {
    //remove --no-timeouts
    this.timeout(0);
    
    const objct = new Triangle('https://testpages.eviltester.com/apps/triangle/'); 


    before(async function(){
        //await objct.open()
        //await objct.max();
    })

    beforeEach(async function(){
        await objct.open()
        await objct.max();
    })

    after(async function(){
        //await objct.close()
    })

    afterEach(async function(){
        await objct.close()
    })




const cases = [
            { sides: [3, 3, 3], expected: ['Equilateral',true] },
            { sides: [1, 2, 3], expected: ['Error: Not a Triangle',false] },
            { sides: [4, 'e', 6], expected: ['Error: Side 2 is not a Number',false] },
            { sides: ['%', 3, 4], expected: ['Error: Side 1 is not a Number',false] },
            { sides: [6, 6, 8], expected: ['Isosceles',true] },
            { sides: [7, 8, 3], expected: ['Scalene',true] }
            
        ];
let count = 0;
cases.forEach(({sides,expected})=>{
    it(`Testing sides ${sides[0]},${sides[1]},${sides[2]} & expecting: ${expected[0]}`,async function (){
        await objct.setTriangle(sides,count);
        let txt = await objct.getType();
        assert.equal(txt,expected[0]);
        let savedImg = objct.readPng(`screenshots/screenshot-${count}.png`)
        let newImg = objct.readPng('screenshot.png')
        assert.equal(savedImg,newImg);
        count++;

    })
})

})