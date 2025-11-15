const {Builder, By, Key, until,Origin, Button} = require('selenium-webdriver');
require("chromedriver");
const chrome = require('selenium-webdriver/chrome');
const { assert } = require('chai');
const forEach = require('mocha-each');

class Interaction {

    constructor(url) {
        this.driver = null;
        this.url = url;
        
    }

    async open() {
        const options = new chrome.Options();
        options.addArguments("--force-device-scale-factor=0.5");
        this.driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
        await this.driver.get(this.url);
    }

    async setInput(id,input){
        let n = await this.driver.findElement(By.id(id));
        await n.sendKeys(input);
    }

    async sendTab(){
        await this.driver.switchTo().activeElement().sendKeys(Key.TAB);
    }

    async getClass(id){
        const button = await this.driver.findElement(By.id(id));
        const classes = await button.getAttribute('class');
        return classes;
    }

    async click(id){
        await this.driver.findElement(By.id(id)).click()
        await this.sleep(100);
    }

    async doubleClick(id){
        const clickable = await this.driver.findElement(By.id(id));
        const actions =  this.driver.actions({async: true});
        await actions.doubleClick(clickable).perform();
        await this.sleep(100);
    }

    async mouseDown(id){
        const clickable = await this.driver.findElement(By.id(id));
        const actions = this.driver.actions({async: true});
        await actions.move({origin:clickable}).press(Button.LEFT).perform();
        await this.sleep(500);
        
    }

    async mouseUp(){
        const actions = this.driver.actions({async: true});
        await actions.release().perform();
        await this.sleep(100);
    }

    async rightClick(id){
        const clickable = await this.driver.findElement(By.id(id));
        const actions =  this.driver.actions({async: true});
        await actions.contextClick(clickable).perform();
        await this.sleep(100);
    }

    async moveIn(id){
        const ele = this.driver.findElement(By.id(id));
        const actions = this.driver.actions({async: true});
        await actions.move({origin: ele}).perform();
        await this.sleep(100);
        
    }

    async moveOut(){
        const actions = this.driver.actions({async: true});
        await actions.move({x: 50, y: 50, origin: Origin.POINTER}).click().perform()
        await this.sleep(100);
    }


    async max(){
        await this.driver.manage().window().maximize();
        await this.sleep(500);
    }

    async scroll(y){
        await this.driver.actions().scroll(0, 0, 0, y).perform()
        await this.sleep(500);
    }



    async getTxt(id){
        return await this.driver.findElement(By.id(id)).getText();
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
    
    const objct = new Interaction('https://testpages.eviltester.com/pages/interaction/javascript-events/'); 
    const expectedTxt = 'Event Triggered'
    const expectedClass ='styled-click-button-triggered'

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

    it('Testing OnBlur',async function(){
        let id= 'onblur';
        await objct.click(id)
        await objct.sendTab();
        let txt = await objct.getTxt(id+'status');
        assert.equal(txt,expectedTxt);
        let classes = await objct.getClass(id);
        assert.include(classes,expectedClass);

    })

    it('Testing OnClick',async function(){
        let id='onclick'
        await objct.click(id)
        let txt = await objct.getTxt(id+'status');
        assert.equal(txt,expectedTxt);
        let classes = await objct.getClass(id);
        assert.include(classes,expectedClass);
    })

    it('Testing onContextmenu',async function(){
        let id= 'oncontextmenu'
        await objct.rightClick(id)
        let txt = await objct.getTxt(id+'status');
        assert.equal(txt,expectedTxt);
        let classes = await objct.getClass(id);
        assert.include(classes,expectedClass);

    })
    it('Testing OnDoubleClick',async function(){
        let id='ondoubleclick'
        await objct.doubleClick(id)
        let txt = await objct.getTxt(id+'status');
        assert.equal(txt,expectedTxt);
        let classes = await objct.getClass(id);
        assert.include(classes,expectedClass);
    })

    it('Testing OnFocus',async function(){
        let id='onfocus'
        await objct.click(id)
        await objct.sendTab();
        let txt = await objct.getTxt(id+'status');
        assert.equal(txt,expectedTxt);
        let classes = await objct.getClass(id);
        assert.include(classes,expectedClass);
    })
    forEach([['onkeydown',Key.ARROW_DOWN],['onkeyup',Key.ARROW_UP],['onkeypress',Key.SPACE]]).it('Testing %s',async function(name,key){
        await objct.click(name)
        await objct.setInput(name,key);
        let txt = await objct.getTxt(name+'status');
        assert.equal(txt,expectedTxt);
        let classes = await objct.getClass(name);
        assert.include(classes,expectedClass);
    })

    it('Testing OnMouseOver',async function () {
        let id='onmouseover'
        await objct.moveIn(id)
        let txt = await objct.getTxt(id+'status');
        assert.equal(txt,expectedTxt);
        let classes = await objct.getClass(id);
        assert.include(classes,expectedClass);
        
        
    })

     it('Testing OnMouseLeave',async function () {
        let id='onmouseleave'
        await objct.moveIn(id)
        await objct.moveOut();
        let txt = await objct.getTxt(id+'status');
        assert.equal(txt,expectedTxt);
        let classes = await objct.getClass(id);
        assert.include(classes,expectedClass);
        
        
    })

    it('Testing OnMouseDown', async function(){
        let id='onmousedown'
        await objct.mouseDown(id);
        let txt = await objct.getTxt(id+'status');
        assert.equal(txt,expectedTxt);
        let classes = await objct.getClass(id);
        assert.include(classes,expectedClass);

        
    })

    
})