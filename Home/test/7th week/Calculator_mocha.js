const { Builder, By, Select} = require('selenium-webdriver');
require('chromedriver');
const { assert } = require('chai');
const forEach = require('mocha-each');


class Calculator {

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

    async select(value){
        const selectElement = await this.driver.findElement(By.id('function'))
        const select = new Select(selectElement)
        await select.selectByVisibleText(value)
    }

    async getOutput(input,op){
        await this.setInput('number1',input[0]);
        await this.setInput('number2',input[1]);
        await this.sleep(100);
        await this.select(op);
        await this.sleep(100);
        await this.driver.findElement(By.id('calculate')).click();
        await this.sleep(200);
        let result = await this.driver.findElement(By.id('answer')).getText();
        return result;
    }
    async sleep(n){
        await this.driver.sleep(n);
    }
    
    async max(){
        await this.driver.manage().window().maximize();
        await this.sleep(500);
    }

    async scroll(){
        await this.driver.actions().scroll(0, 0, 0, 400).perform()
        await this.sleep(500);
    }
    async close(){
        await this.driver.quit();
    }
  
}

describe('Testsuit', function () {
    //remove --no-timeouts
    this.timeout(0);
    
    const objct = new Calculator('https://testpages.eviltester.com/apps/calculator-api/form-calculator/'); 


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



    let data= [
    {type:"Addition",input:[3,4],op:'plus',expected:7},
    {type:"Addition",input:[2,'-2'],op:'plus',expected:0},
    {type:"Addition",input:['z',48],op:'plus',expected:'Error: Unknown token: z'},
    {type:"Addition",input:[546,'&'],op:'plus',expected:'Error: Empty input'},
    {type:"Subtraction",input:[7,4],op:'minus',expected:3},
    {type:"Subtraction",input:[2,'-2'],op:'minus',expected:4},
    {type:"Subtraction",input:['z',48],op:'minus',expected:'Error: Unknown token: z'},
    {type:"Subtraction",input:[546,'&'],op:'minus',expected:'Error: Empty input'},
    {type:"Multiplication",input:[7,4],op:'times',expected:28},
    {type:"Multiplication",input:[2,'-2'],op:'times',expected:'-4'},
    {type:"Multiplication",input:['z',48],op:'times',expected:'Error: Unknown token: z'},
    {type:"Multiplication",input:[546,'&'],op:'times',expected:'Error: Empty input'},
    {type:"Division",input:[28,4],op:'divide',expected:7},
    {type:"Division",input:[2,'-2'],op:'divide',expected:'-1'},
    {type:"Division",input:['z',48],op:'divide',expected:'Error: Unknown token: z'},
    {type:"Division",input:[546,'&'],op:'divide',expected:'Error: Empty input'},
    {type:"Division",input:[546,0],op:'divide',expected:'Error: Division by zero'},    
       
    ];
    data.forEach(({type,input,op,expected})=>{
    it(`Testing ${type} ${input[0]} & ${input[1]} ......`,async function (){
        let txt = await objct.getOutput(input,op);
        assert.equal(txt,expected);
    })
})

})
