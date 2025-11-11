/*
    To pick up a draggable item, press the space bar.
    While dragging, use the arrow keys to move the item.
    Press space again to drop the item in its new position, or press escape to cancel.
*/

const { Builder, By, Key } = require('selenium-webdriver');
require('chromedriver');
const { assert } = require('chai');
const forEach = require('mocha-each');
const dropID = 'drop-zone';


class DragnDrop {
  constructor(url) {
    this.driver = null;
    this.url = url;
  }

    async open() {
        this.driver = await new Builder().forBrowser('chrome').build();
        await this.driver.get(this.url);
    }

    async getList(){
        let list = await this.driver.findElement(By.xpath("//div[@data-test='drag-drop-list']")).getText();
        return list;
    }

    async move(item){
        let btn = await this.driver.findElement(By.xpath(`//button[@data-test='drag-handle-Item ${item}']`))
        
        await this.driver.actions().move({ origin: btn }).click().perform();

        // Press Space to "pick up" the draggable item
        await this.driver.actions().keyDown(Key.SPACE).keyUp(Key.SPACE).perform();
        await this.sleep(100);
        // Move the item using Arrow keys
        await this.driver.actions().sendKeys(Key.ARROW_DOWN).perform();
        await this.sleep(100);
        await this.driver.actions().sendKeys(Key.ARROW_DOWN).perform();
        await this.sleep(100);
        await this.driver.actions().sendKeys(Key.ARROW_DOWN).perform();
        await this.sleep(100);
        await this.driver.actions().sendKeys(Key.ARROW_DOWN).perform();
        await this.sleep(100);
        // Press Space again to "drop" the item
        await this.driver.actions().keyDown(Key.SPACE).keyUp(Key.SPACE).perform();
        await this.sleep(100);
    }
  
    async sleep(n){
        await this.driver.sleep(n);
    }

    async close(){
        await this.driver.quit();
    }
        async max(){
        await this.driver.manage().window().maximize();
        await this.sleep(500);
    }

    async scroll(y){
        await this.driver.actions().scroll(0, 0, 0, y).perform()
        await this.sleep(500);
    }


}




describe('Testsuit', function () {
    //remove --no-timeouts
    this.timeout(0);
    
    const objct = new DragnDrop('https://moatazeldebsy.github.io/test-automation-practices/?#/drag-drop'); 


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
    const testcases =[{item:1,expected:"Item 2\nItem 3\nItem 4\nItem 5\nItem 1"},
                      {item:2,expected:"Item 3\nItem 4\nItem 5\nItem 1\nItem 2"},
                      {item:3,expected:"Item 4\nItem 5\nItem 1\nItem 2\nItem 3"},
                      {item:4,expected:"Item 5\nItem 1\nItem 2\nItem 3\nItem 4"},
                      {item:5,expected:"Item 1\nItem 2\nItem 3\nItem 4\nItem 5"}, 
    ]
    testcases.forEach(({item,expected})=>{
        it(`Testing item no.${item}`,async function(){
        console.log(item);
        await objct.move(item);
        list = await objct.getList();
        assert.equal(list,expected);
    })
    })
    



})


