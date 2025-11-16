const {Builder, By, Key, until,Origin, Button} = require('selenium-webdriver');
require("chromedriver");
const chrome = require('selenium-webdriver/chrome');
const { assert } = require('chai');
const forEach = require('mocha-each');
const path = require("path");


class Upload {

    constructor(url) {
        this.driver = null;
        this.url = url;
        
    }

    async open() {
        const options = new chrome.Options();
        options.addArguments("--force-device-scale-factor=0.75");
        this.driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
        await this.driver.get(this.url);
    }

    async setInput(id,input){
        let n = await this.driver.findElement(By.id(id));
        await n.sendKeys(input);
    }

    async click(id){
        await this.driver.findElement(By.id(id)).click()
        await this.sleep(100);
    }

    async submit(){
        await this.driver.findElement(By.css('input[type="submit"]')).submit()
        await this.sleep(100);
        await this.driver.wait(until.titleContains("Upload Results"),1000);
    }

    async getTxt(id){
        return await this.driver.findElement(By.id(id)).getText();
    }

    async getTitle(){
        return await this.driver.getTitle();
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
    
    const objct = new Upload('https://testpages.eviltester.com/pages/files/file-upload/'); 
    const file = 'selenium-snapshot.png';

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
    forEach([['selenium-snapshot.png','image'],['sampleFile.jpeg','image'],['textfile.txt','other']]).it('Uploading %s', async function (file,type) {
        
        let filePath = path.resolve('./resources/'+file);
        await objct.setInput('fileinput',filePath);
        if(type == 'image'){
            await objct.click('itsanimage');
        }else{
            await objct.click('itsafile');
        }
        await objct.submit();

        let title = await objct.getTitle();
        assert.equal(title,'File Upload - Upload Results | Test Pages')

        let txt = await objct.getTxt('uploadedfiletype');
        assert.equal(txt,type);

        txt = await objct.getTxt('uploadedfilename');
        assert.equal(txt,file);
    })

})