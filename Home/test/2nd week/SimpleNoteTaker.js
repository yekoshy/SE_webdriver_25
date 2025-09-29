require("chromedriver"); 
const assert = require('node:assert')
//import the following classes from Selenium
const {Builder, By, Key, until} = require('selenium-webdriver');

async function emptyTitleTest(driver) {
    try{
        console.log('Running emptyTitleTest...')
        await driver.findElement({id:'note-title-input'}).clear()
        await driver.findElement({id:'add-note'}).click()
        let errorTxt = await driver.findElement({id:'note-status-details'}).getText()
        assert.equal(errorTxt,"Error Adding Note")
        console.log('## emptyTitleTest   Passed')
    }catch(e){
        console.log('## emptyTitleTest   Failed')
        console.log(e)
    }    
}

async function emptyNoteTest(driver,title) {
    try{
        console.log('Running emptyNoteTest...')
        
        await driver.findElement({id:'note-title-input'}).clear()
        await driver.findElement({id:'note-title-input'}).sendKeys(title)
        
        await driver.findElement({id:'note-details-input'}).clear()
        
        await driver.findElement({id:'add-note'}).click()
        let errorTxt = await driver.findElement({id:'note-status-details'}).getText()
        assert.equal(errorTxt,"Error Adding Note")
        console.log('## emptyNoteTest  Passed')
    }catch(e){
        console.log('## emptyNoteTest   Failed')
        console.log(e)
        
    }    
}

async function addingNoteTest(driver,title,note) {
    try{
        console.log('Running addingNoteTest...')
        
        await driver.findElement({id:'note-title-input'}).clear()
        await driver.findElement({id:'note-title-input'}).sendKeys(title)
        
        await driver.findElement({id:'note-details-input'}).clear()
        await driver.findElement({id:'note-details-input'}).sendKeys(note)

        await driver.findElement({id:'add-note'}).click()
        
        //first assertion
        let Txt = await driver.findElement({id:'note-status-details'}).getText();
        assert.equal(Txt,"Added Note");

        //Second assertion
        let titles = await driver.findElements(By.className('title-note-in-list'));
        let newTitle = await titles[titles.length - 1].getText();
        assert.equal(newTitle,title);
               
        console.log('## addingNoteTest  Passed')
        return titles[titles.length - 1].getAttribute('data-key');
    }catch(e){
        console.log('## addingNoteTest Failed')
        console.log(e)
    }    
}

async function noteListBtnTest(driver) {
    try{
        console.log('Running noteListBtnTest...')
        
        await driver.findElement({id:'load-notes'}).click()
        let txt = await driver.findElement({id:'note-status-details'}).getText()
        assert.equal(txt,"Loaded Available Notes")
        
        await driver.findElement({id:'show-notes'}).click()
        txt = await driver.findElement({id:'note-status-details'}).getText()
        assert.equal(txt,"Notes Shown")

        await driver.findElement({id:'clear-notes'}).click()

        await driver.wait(until.alertIsPresent());
        let alert = await driver.switchTo().alert();
        await alert.accept();

        let childElements = await driver.findElements(By.css('#list-of-notes > *'));
        assert.equal(childElements.length,0);
        
        txt = await driver.findElement({id:'note-status-details'}).getText()
        assert.equal(txt,"Deleted All Notes")

           
        console.log('## noteListBtnTest   Passed')
    }catch(e){
        console.log('## noteListBtnTest   Failed')
        console.log(e)
    }    
}

async function addEditDeleteNoteTest(driver,title,note,newTitle,newNote) {
    try{
        let dataKey = await addingNoteTest(driver,title,note);

        console.log('Running addEditDeleteNoteTest...')

        await driver.findElement(By.xpath("//button[@class='edit-note-in-list' and @data-key='"+ dataKey +"']")).click()
        
        
        //first assertion
        let txt = await driver.findElement({id:'note-status-details'}).getText();
        assert.equal(txt,"Editing note: "+ dataKey);
        
        
        await driver.findElement({id:'note-title-input'}).clear()
        await driver.findElement({id:'note-title-input'}).sendKeys(newTitle)
        
        await driver.findElement({id:'note-details-input'}).clear()
        await driver.findElement({id:'note-details-input'}).sendKeys(newNote)

        await driver.findElement({id:'update-note'}).click()
        
        //first assertion
        txt = await driver.findElement({id:'note-status-details'}).getText();
        assert.equal(txt,"Updated Note");

        //Second assertion
        
        let updatedTitle = await driver.findElement(By.xpath("//p[@class='title-note-in-list' and @data-key='"+ dataKey +"']")).getText()
        assert.equal(newTitle,updatedTitle);

        await driver.findElement(By.xpath("//button[@class='delete-note-in-list' and @data-key='"+ dataKey +"']")).click()
        
        await driver.wait(until.alertIsPresent());
        let alert = await driver.switchTo().alert();
        await alert.accept();

        txt = await driver.findElement({id:'note-status-details'}).getText();
        assert.equal(txt,"Deleted Note: "+dataKey);


        console.log('## addEditDeleteNoteTest  Passed')
    }catch(e){
        console.log('## addEditDeleteNoteTest Failed')
        console.log(e)
    }    
}

async function  runTests() {
    let driver;
    try{
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://testpages.eviltester.com/styled/apps/notes/simplenotes.html')  
        
        await emptyTitleTest(driver);
        
        await emptyNoteTest(driver,'Hello');
        
        let notes =[['test1','test1'],['test2','test2'],['test3','test3']];
        for(let i=0;i<notes.length;i++){
            await addingNoteTest(driver,notes[i][0],notes[i][1]);
        }

        await noteListBtnTest(driver);

        await addEditDeleteNoteTest(driver,'test','test','newTest','newTest');

    }catch(e){
        console.log(e)
    }finally{
        await driver.quit()
    }
    
    
}


runTests()