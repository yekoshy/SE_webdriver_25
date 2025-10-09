
const {By, Browser, Builder, Select} = require('selenium-webdriver')
require("chromedriver");
const { assert } = require('chai');


async function test() {
  //open Chrome browser

  let driver 
  try{
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://yekoshy.github.io/Dropdown/select_demo.html')  
    
    
    const selectElement = await driver.findElement(By.id('day-select'))
    const select = new Select(selectElement)
    await select.selectByVisibleText('Monday')
    let selected = await select.getAllSelectedOptions();
    console.log(await selected[0].getText());
    let text = await driver.findElement(By.css('#selected-day-display > strong')).getText()
    console.log(text)
  }catch(e){
    console.log(e)
  }finally{
    
   await driver.quit()
  }

}

test()