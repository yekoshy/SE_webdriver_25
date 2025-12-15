const {Builder, By, Key, until,Origin, Button} = require('selenium-webdriver');
require("chromedriver");
const chrome = require('selenium-webdriver/chrome');
const { assert } = require('chai');
const forEach = require('mocha-each');
const { URL } = require('url');

class BrokenImgLnk {

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


    

    async click(id){
        await this.driver.findElement(By.id(id)).click()
        await this.sleep(100);
    }

    async fetchData(link) {
        try {
            // 1. Make the request
            const response = await fetch(link, { method: 'GET' });
            return response.ok;
            


        } catch (error) {
            // Handle network errors or non-200 HTTP status codes
            //console.error('There was a problem with the fetch operation:', error);
            return false;
        }
    }

    //a or img
    async getAll(type){
        let list =  await this.driver.findElements(By.css(type));
        return list;
    }
    async getLink(name,type){
        let link = await name.getAttribute(type);
        return link;
    }
    //src or href
    async checkBorken(link){
        
        let response = await this.fetchData(link); 
        return response;
        
    }

    async getTxt(id){
        return await this.driver.findElement(By.id(id)).getText();
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
    
    //const objct = new BrokenImgLnk('https://the-internet.herokuapp.com/broken_images'); 
    const objct = new BrokenImgLnk('https://moatazeldebsy.github.io/test-automation-practices/?#/broken-images')

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

    forEach([['Links','a','href'],['Images','img','src']]).it('Testing borken links',async function(name,tag,type){
        let list = await objct.getAll(tag);
        const failures = [];
        for(let i=0;i<list.length;i++){
            let link = await objct.getLink(list[i],type);
            console.log('############# Testing '+ link)
            let flag = await objct.checkBorken(link);
            if (!flag) {
                // Instead of throwing an error, record the failure
                failures.push(`${name} : ${link} is broken!`);
                console.error(`[FAILURE DETECTED] ${link} is broken!`);
            }else{
                console.error(`[Success DETECTED] ${link} is Response.OK!`);
            }
        }
        if (failures.length > 0) {
            // This will fail the test only once, listing all errors
            assert.fail(`Found ${failures.length} broken items:\n${failures.join('\n')}`);
        }else {
            assert.isTrue(true);
        }
    })

    
})