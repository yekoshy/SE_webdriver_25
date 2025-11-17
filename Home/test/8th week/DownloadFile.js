const {Builder, By, Key, until,Origin, Button} = require('selenium-webdriver');
require("chromedriver");
const chrome = require('selenium-webdriver/chrome');
const { assert } = require('chai');
const forEach = require('mocha-each');
const path = require("path");
const fs = require("fs");
const downloadDir = 'Download'

class Download {

    constructor(url) {
        this.driver = null;
        this.url = url;
        this.array = [];
        
    }

    async open() {
        const options = new chrome.Options();
        let folderPath = path.resolve('./'+downloadDir);
        options.setUserPreferences({
            "download.default_directory": folderPath,
            "download.prompt_for_download": false,
            "safebrowsing.enabled": true
        });
        this.driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
        await this.driver.get(this.url);
        
            
    }


    

    async click(filename){
        await this.driver.findElement(By.xpath(`//a[contains(text(),'${filename}')]`)).click()
        await this.sleep(100);
    }

    async waitforFile(filename){
        let filePath = path.resolve('./'+downloadDir+'/'+filename);
        let flag = fs.existsSync(filePath)
        if(!flag){
            await this.sleep(1000)
            this.waitforFile(filename);
            console.log('Waiting for a minute')
        }else{
        return flag;
        }
    }

    async isExisted(filename){
        let filePath = path.resolve('./'+downloadDir+'/'+filename);
        //await this.waitforFile(filename);
        await this.driver.wait(async ()=>{ let flag = await this.waitforFile(filename); return flag;},5000)
        return(fs.existsSync(filePath));
    }

    async setArray(xpath){
        let lines =await this.driver.findElement(By.xpath(xpath)).getText();
        this.array = lines.split('\n').slice(1);
        
        
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

    deleteAll(folder){
        fs.readdir(folder, (err, files) => {
        if (err) throw err;
        for (const file of files) {
        fs.unlink(path.join(folder, file), (err) => {
            if (err) throw err;
        });
        }});
    }

}



describe('Setting Data', function () {
    //remove --no-timeouts
    this.timeout(0);
    
    const objct = new Download('https://the-internet.herokuapp.com/download'); 
    let arr = []

    before(async function(){
        objct.deleteAll('Download')
        await objct.open()
        await objct.max();
        await objct.setArray("//div[@class='example']")
        arr = objct.array;
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

    it('Logging Array',async function(){
        console.log(objct.array);
    })
    
    it("Download all files", async function () {
        if(objct.array.length >10){
            for(let i=0; i<10;i++){
                let filename = objct.array[i];
                await objct.click(filename);
                let flag = await objct.isExisted(filename);
                assert.isTrue(flag, filename + " was not downloaded");
                await objct.sleep(1000);
            }
        }else{
        for (const filename  of objct.array) {
            await objct.click(filename);
            let flag = await objct.isExisted(filename)
            assert.isTrue(flag, filename + " was not downloaded");
            await objct.sleep(1000);
        }}
    });
    /*
    forEach(arr).it("Download file %s", async function (filename) {
        await objct.click(filename);
        await objct.waitforFile(filename);
        assert.isTrue(await objct.isExisted(filename), filename + " was not downloaded");
        await objct.sleep(4000);
        
    })
    */
    

});

