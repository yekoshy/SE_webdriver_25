
const { WebDriver,until,Builder, Key, By } = require("selenium-webdriver");
require("chromedriver");
const { assert } = require('chai');
const forEach = require("mocha-each");


class RadioBtn{

    constructor(url) {
        this.driver = null;
        this.url = url;
        
    }

    async open() {
        this.driver = await new Builder().forBrowser('chrome').build();
        await this.driver.get(this.url);
    }


    async click(id){
        await this.driver.findElement(By.id(id)).click()
    }

    async isSelected(id){
        return await this.driver.findElement(By.id(id)).isSelected()
    }

    
    async sleep(n){
        await this.driver.sleep(n);
    }

    async getOutput(id){
        return await this.driver.findElement(By.id(id)).getText()
    }

    async close(){
        await this.driver.quit();
    }
   
  
}



describe('Testsuit for Radiobutton Page', function () {
    //remove --no-timeouts
    this.timeout(0);
    const Objct = new RadioBtn('https://yekoshy.github.io/RadioBtn-n-Checkbox/'); 

    before(async function(){
        //await Objct.open()
    })

    beforeEach(async function(){
        await Objct.open()
    })

    after(async function(){
        //await Objct.close()
    })

    afterEach(async function(){
        await Objct.close()
    })
    
    forEach([['male-single','Male'],['female-single','Female']
    ]).it('Asserting %s is selected & message found', async function (id,expectedMsg) {
        await Objct.click(id)
        await Objct.sleep(100);
        let flag = await Objct.isSelected(id);
        assert.isTrue(flag);
        let msg = await Objct.getOutput('single-radio-output');
        assert.include(msg,expectedMsg);

    }); 
    

    forEach([['gender-male','age-0-5','Male','0 - 5'],
             ['gender-male','age-5-15','Male','5 - 15'],
             ['gender-male','age-15-50','Male','15 - 50'],
             ['gender-female','age-0-5','Female','0 - 5'],
             ['gender-female','age-5-15','Female','5 - 15'],
             ['gender-female','age-15-50','Female','15 - 50']
        
    ]).it('Asserting %s & %s is selected & message found', async function (gId,ageId,gMsg,ageMsg) {
        await Objct.click(gId)
        await Objct.click(ageId)
        await Objct.sleep(100);
        let flag = await Objct.isSelected(gId);
        assert.isTrue(flag);
        flag = await Objct.isSelected(ageId);
        assert.isTrue(flag);
        let msg = await Objct.getOutput('group-gender-output');
        assert.equal(msg,gMsg);
        msg = await Objct.getOutput('group-age-output');
        assert.equal(msg,ageMsg);

    }); 
    })