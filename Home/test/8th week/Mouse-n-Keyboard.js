const {Builder, By, Key, until} = require('selenium-webdriver');
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
        options.addArguments("--force-device-scale-factor=0.4");
        this.driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
        await this.driver.get(this.url);
    }

    async setInput(id,input){
        let n = await this.driver.findElement(By.id(id));
        await n.sendKeys(input);
    }

    async click(id){
        await this.driver.findElement(By.id(id)).click()
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
