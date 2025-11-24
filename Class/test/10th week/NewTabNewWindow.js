const {Builder, By, Key, until,Origin, Button} = require('selenium-webdriver');
require("chromedriver");
const chrome = require('selenium-webdriver/chrome');
const { assert } = require('chai');
const forEach = require('mocha-each');
const { URL } = require('url');

class NewTabWindow {

    constructor(url) {
        this.driver = null;
        this.url = url;
        
    }

    async open() {
        //const options = new chrome.Options();
        //options.addArguments("--force-device-scale-factor=0.3");
        //this.driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
        this.driver = await new Builder().forBrowser('chrome').build();
        await this.driver.get(this.url);
          
    }


    

    async click(type){
        let btns = await this.driver.findElements(By.css('.custom_btn'))
        if(type == 'tab'){
            await btns[0].click()
        }else{
            await btns[2].click()
        }
        
        await this.sleep(100);
    }



    //a or img

    async getTxt(id){
        return await this.driver.findElement(By.id(id)).getText();
    }

    async getAllHandles(){
        return await this.driver.getAllWindowHandles();
    }

    async getCurrentHandle(){
        let current = await this.driver.getWindowHandle();
        console.log("Current:"+ current);
    }

    async switchHandle(n){
        await this.getCurrentHandle();
        let windows = await this.getAllHandles();
        await this.driver.switchTo().window(windows[n]);
        await this.getCurrentHandle();    
    }


       
     
    async max(){
        await this.driver.manage().window().maximize();
        await this.sleep(500);
    }

    async scroll(y){
        await this.driver.actions().scroll(0, 0, 0, y).perform()
        await this.sleep(500);
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
    
    const objct = new NewTabWindow('https://practice-automation.com/window-operations/'); 
    

    before(async function(){
        await objct.open()
        await objct.max();
    })

    beforeEach(async function(){
        //await objct.open()
        //await objct.max();
    })

    after(async function(){
        await objct.close()
    })

    afterEach(async function(){
        //await objct.close()
    })

    it('Testing new Tab',async function(){
        let handles = await objct.getAllHandles();
        console.log(handles);
        await objct.click('tab')
        handles = await objct.getAllHandles();
        console.log(handles);
        await objct.switchHandle(1);
        await objct.sleep(300);
        await objct.switchHandle(0);
    })

     it('Testing new Window',async function(){
        await objct.getCurrentHandle();
        let handles = await objct.getAllHandles();
        console.log(handles);
        await objct.click('window')
        handles = await objct.getAllHandles();
        console.log(handles);
    })

})