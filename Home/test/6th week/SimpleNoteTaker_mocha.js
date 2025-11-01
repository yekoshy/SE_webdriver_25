//npx mocha .\SimpleNoteTaker_mocha.js --reporter mocha-simple-html-reporter --reporter-options output=report.html
const {Builder, By, Key, until} = require('selenium-webdriver');
require("chromedriver");
const { assert } = require('chai');
const fs = require('fs');
const forEach = require('mocha-each');

class SimpleNote {

    constructor(url) {
        this.driver = null;
        this.url = url;
        
    }

    async open() {
        this.driver = await new Builder().forBrowser('chrome').build();
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

    async editClick(dataKey){
        await this.driver.findElement(By.xpath("//button[@class='edit-note-in-list' and @data-key='"+ dataKey +"']")).click()
        await this.sleep(100);
        return await this.getStatus();
    }

    async deleteClick(dataKey,flag){
        await this.driver.findElement(By.xpath("//button[@class='delete-note-in-list' and @data-key='"+ dataKey +"']")).click()
        await this.sleep(100);
        await this.respond(flag);
        return await this.getStatus();
    }

    async respond(flag){
        await this.driver.wait(until.alertIsPresent());
        let alert = await this.driver.switchTo().alert();
        if(flag){
            await alert.accept();
        }else{
            await alert.dismiss();
        }
    }

    async load(){
        await this.click('load-notes');
        return await this.getStatus();
    }
    async updateNote(title,note){
        await this.setInput('note-title-input',title);
        await this.setInput('note-details-input',note);
        await this.click('update-note');
        return await this.getStatus();
    }

    async show(){
        await this.click('show-notes');
        
        await this.driver.actions().scroll(0, 0, 0, 300).perform()
        await this.sleep(100);
        
        return await this.getStatus();
    }

    async clearAll(flag){
              
        await this.load();
        await this.show();
        await this.click('clear-notes');
        await this.respond(flag);
        
        return await this.getStatus();
        
    }

    async max(){
        await this.driver.manage().window().maximize();
        await this.sleep(100);
    }

    async scroll(){
        await this.driver.actions().scroll(0, 0, 0, 300).perform()
        await this.sleep(100);
    }


    async getNoteCount(){
        let childElements = await this.driver.findElements(By.css('#list-of-notes > *'));
        return childElements.length;
    }

    async setNote(title,note){
        await this.setInput('note-title-input',title);
        await this.setInput('note-details-input',note);
        await this.click('add-note');
        
    }

    async getStatus(){
        return await this.driver.findElement(By.id('note-status-details')).getText();
    }

    async getNoteTitles(){
        let titlesEle = await this.driver.findElements(By.className('title-note-in-list'));
        const titles = [];
        for (const el of titlesEle) {
            titles.push(await el.getText());
        }
        return titles;
    }

    async getDataKey(title){
        let ele = await this.driver.findElement(By.xpath("//p[@class='title-note-in-list' and text()='"+title+"']"))
        return ele.getAttribute('data-key');
    }


    async sleep(n){
        await this.driver.sleep(n);
    }

    async close(){
        await this.driver.quit();
    }

    async refresh(){
        await this.sleep(500);
        await this.scroll();
        await this.load();
        await this.show();
    }

   

   
  
}



describe('Testsuit', function () {
    //remove --no-timeouts
    this.timeout(0);
    
    const objct = new SimpleNote('https://testpages.eviltester.com/apps/note-taker/'); 
    const title = 'test';
    const note = 'test';

    before(async function(){
        await objct.open()
        await objct.max();
    })

    beforeEach(async function(){
        //await objct.open()
    })

    after(async function(){
        await objct.close()
    })

    afterEach(async function(){
        //await objct.close()
    })

    forEach([['Empty Title','','test test'],['Empty Note','test','']]).it('Testing %s', async function (testcase,title,note) {
        await objct.setNote(title,note);
        await objct.sleep(100);
        let txt = await objct.getStatus();
        assert.equal(txt,"Error Adding Note")
    });

    
    forEach([['test1','test1'],['test2','test2'],['test3','test3']]).it('Testing Adding Note with title %s', async function (title,note) {
        
        await objct.setNote(title,note);
        await objct.refresh();
        //Check title 
        let titles = await objct.getNoteTitles();
        assert.include(titles,title);
        
    });

    it('Testing Adding & Editing', async function(){
        let newTitle = title+' new';
        let newNote = note +' new';
        
        await objct.setNote(title,note);
        await objct.refresh();
        
        //edit
        let datakey= await objct.getDataKey(title);
        let txt = await objct.editClick(datakey);
        assert.equal(txt,"Editing note: "+ datakey);
        
        await objct.updateNote(newTitle,newNote);
        await objct.refresh();

        let titles = await objct.getNoteTitles();
        assert.include(titles,newTitle);
        

    });

    it('Asserting Load & Show messages',async function(){
        //Load & Show 
        txt = await objct.load();
        assert.equal(txt,"Loaded Available Notes")
        txt = await objct.show();
        assert.equal(txt,"Notes Shown")
    })


forEach([['Deleted Note: ',true],['Delete Note Cancelled',false]]).it('Testing Adding & Deleting', async function(expectedTxt,flag){
     
        await objct.setNote(title,note);
        await objct.refresh();
        //edit
        let datakey= await objct.getDataKey(title);
        let txt = await objct.deleteClick(datakey,flag);
        if(flag){
            assert.equal(txt,expectedTxt+datakey);
        }else{
            assert.equal(txt,expectedTxt);
        }
        


    });

    forEach([['No Notes Deleted',false],['Deleted All Notes',true]]).it("Testing Clear All and %s", async function(expectedTxt,flag){
        //maximize & scroll
        
        

        let txt = await objct.clearAll(flag)
        assert.equal(txt,expectedTxt)
        await objct.sleep(100);

        let count = await objct.getNoteCount()
        if(flag){
            assert.equal(count,0);
        }else{
            assert.isAbove(count,0);
        }
    })

});