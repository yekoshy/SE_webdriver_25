const { Builder, By, Select} = require('selenium-webdriver');
require('chromedriver');
const { assert } = require('chai');



class Calculator {

    constructor(driver,url) {
        this.driver = driver;
        this.url = url;
    }

    async open() {
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

    async getOutput(op){
        await this.select(op);
        await this.driver.findElement(By.id('calculate')).click();
        let result = await this.driver.findElement(By.id('answer')).getText();
        return result;
    }
  
}


async function test() {
  //open Chrome browser

  let driver 
  try{
    driver = await new Builder().forBrowser('chrome').build();
    let url = 'https://testpages.eviltester.com/styled/calculator';
    let obj = new Calculator(driver,url)
    await obj.open();
    let data= [
    {type:"Addition",in1:3,in2:4,op:'plus',expected:7},
    {type:"Addition",in1:2,in2:'-2',op:'plus',expected:0},
    {type:"Addition",in1:'z',in2:48,op:'plus',expected:'ERR'},
    {type:"Addition",in1:546,in2:'&',op:'plus',expected:'ERR'},
    {type:"Subtraction",in1:7,in2:4,op:'minus',expected:3},
    {type:"Subtraction",in1:2,in2:'-2',op:'minus',expected:4},
    {type:"Subtraction",in1:'z',in2:48,op:'minus',expected:'ERR'},
    {type:"Subtraction",in1:546,in2:'&',op:'minus',expected:'ERR'},
    {type:"Multiplication",in1:7,in2:4,op:'times',expected:28},
    {type:"Multiplication",in1:2,in2:'-2',op:'times',expected:'-4'},
    {type:"Multiplication",in1:'z',in2:48,op:'times',expected:'ERR'},
    {type:"Multiplication",in1:546,in2:'&',op:'times',expected:'ERR'},
    {type:"Division",in1:28,in2:4,op:'divide',expected:7},
    {type:"Division",in1:2,in2:'-2',op:'divide',expected:'-1'},
    {type:"Division",in1:'z',in2:48,op:'divide',expected:'ERR'},
    {type:"Division",in1:546,in2:'&',op:'divide',expected:'ERR'},
        
       
    ]
    for(let i=0;i<data.length;i++){
        await obj.setInput('number1',data[i].in1);
        await obj.setInput('number2',data[i].in2);
        let result = await obj.getOutput(data[i].op);
        assert.equal(data[i].expected, result)
        console.log('✅ Test Passed: '+ data[i].type +' for '+ data[i].in1 +' & '+ data[i].in2);
    }
  }catch(e){
    
    console.log(e)
  }finally{
    
    await driver.quit()
  }

}

test()
    
