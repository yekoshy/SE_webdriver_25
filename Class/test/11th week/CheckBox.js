const {By,Builder} = require('selenium-webdriver');

async function CheckBoxTest() {
    let driver;

    try {
       driver = await new Builder().forBrowser('firefox').build();
       await driver.get('https://the-internet.herokuapp.com/checkboxes');
       
       let txt= await driver.findElement(By.css('h3')).getText();
       console.log (txt);
       
       let chckbx=  await driver.findElement(By.xpath('//*[@id="checkboxes"]/input[1]'))
       let flag = await chckbx.isSelected()
       if(!flag){ 
           await chckbx.click()
       }else{
           console.log('Checkbox is already selected');	
       }
       
       chckbx=  await driver.findElement(By.xpath('//*[@id="checkboxes"]/input[2]'))
       flag = await chckbx.isSelected()
       if(!flag){ 
           await chckbx.click()
       }else{
           console.log('Checkbox is already selected');	
       }
       

    } catch (e) {
        console.log(e)
    } finally {
        await driver.quit();
    }
}

CheckBoxTest()