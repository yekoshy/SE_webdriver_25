const { Builder, By } = require('selenium-webdriver');
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

  async dragDrop(dragID,dropID){
    const draggable = await this.driver.findElement(By.id(dragID));
    const droppable = await this.driver.findElement(By.id(dropID));
    const actions = this.driver.actions({async: true});
    await actions.dragAndDrop(draggable, droppable).perform();
    
  }

  async getDragTxt(dragID){
    return await this.driver.findElement(By.id(dragID)).getText();
  }
  async getDroppedItem(dragID){
    let xpath = `//div[@id="${dropID}"]/div[@id="${dragID}"]`
    return await this.driver.findElement(By.xpath(xpath));
    
  }

  async getDroppedEle(dragTxt){
    let xpath = `//div[@id="dropped-items-list"]/div[@class='dropped-item-name' and text()='${dragTxt}']`
    return await this.driver.findElement(By.xpath(xpath));
    
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
    
    const objct = new DragnDrop('https://yekoshy.github.io/Drag-n-Drop/SeleniumEasyDragnDrop.html'); 


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




const droppable = ['draggable-1','draggable-2','draggable-3','draggable-4'] 

forEach(droppable).it('Testing dropping %s',async function (dragID){
      await objct.dragDrop(dragID,dropID);
      let txt = await objct.getDragTxt(dragID);
      let ele = await objct.getDroppedEle(txt);
      assert.exists(ele);
      ele = await objct.getDroppedItem(dragID);
      assert.exists(ele);


    })
})

