const {Builder, By, Key, until,Origin, Button} = require('selenium-webdriver');
require("chromedriver");
const chrome = require('selenium-webdriver/chrome');
const { assert } = require('chai');
const forEach = require('mocha-each');

class Picker {

    constructor(url) {
        this.driver = null;
        this.url = url;
        
    }

    pad(num){ 
        return num.toString().padStart(2, '0');
    }

    async open() {
        const options = new chrome.Options();
        options.addArguments("--force-device-scale-factor=0.3");
        this.driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
        await this.driver.get(this.url);
          
    }


    

    async click(id){
        await this.driver.findElement(By.id(id)).click()
        await this.sleep(100);
    }

    async getTxt(id){
        return await this.driver.findElement(By.id(id)).getText();
    }

    async getValue(id){
        return await this.driver.findElement(By.id(id)).getAttribute('value');
    }

    async setValue(id,txt){
        let ele = await this.driver.findElement(By.id(id));
        //ele.clear();
        //ele.sendKeys(txt);
        await this.driver.executeScript(`arguments[0].value = arguments[1];`, ele, txt);
        await this.driver.executeScript(`arguments[0].dispatchEvent(new Event('input', { bubbles: true }));`, ele);
        await this.driver.executeScript(`arguments[0].dispatchEvent(new Event('change', { bubbles: true }));`, ele);

        await this.driver.sleep(500);
        
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

    getRandomHexColorComponents() {
        // Function to get a single random hex component (00-FF).
        function getComponent() {
            // Math.random() * 256 gives a float between 0 and < 256.
            const component = Math.floor(Math.random() * 256);
    
            // Convert to hex and pad with a leading '0' if only 1 character long.
            const hex = component.toString(16).padStart(2, '0');
            //const hex = component.toString(16);
            return hex;
        }

        const red = getComponent();
        const green = getComponent();
        const blue = getComponent();

        return '#' + red + green + blue;
    }

    getRandomDateMaxMin(){
        const nowDate = new Date();
        const year = nowDate.getFullYear();
        const month = this.pad(nowDate.getMonth() + 1); // getMonth() is 0-indexed
        const daysMonth = new Date(year, month + 1, 0).getDate();
        const day = this.pad(Math.floor(Math.random() * daysMonth) + 1);
        return `${year}-${month}-${day}`;

    }
    getRandomDateTimeLocal(startYear = 1800, endYear = 2300,type) {
    // Helper function to pad single digits with a leading zero
    

    // 1. Generate a random timestamp within the specified year range
    
    // Get timestamps for the start and end of the range
    const startTimestamp = new Date(startYear, 0, 1).getTime(); // Start of Jan 1st of startYear
    const endTimestamp = new Date(endYear + 1, 0, 1).getTime(); // Start of Jan 1st of (endYear + 1)
    
    // Calculate a random timestamp between the start and end
    const randomTimestamp = startTimestamp + Math.random() * (endTimestamp - startTimestamp);

    // Create a new Date object from the random timestamp
    const randomDate = new Date(randomTimestamp);

    // 2. Extract and format the components
    
    // Date components
    const year = randomDate.getFullYear();
    const month = this.pad(randomDate.getMonth() + 1); // getMonth() is 0-indexed
    const day = this.pad(randomDate.getDay());
    const hours = this.pad(randomDate.getHours());
    const minutes = this.pad(randomDate.getMinutes());
    const week = this.pad(Math.floor(Math.random() * 52) + 1);

    if(type == 'date'){
        return `${year}-${month}-${day}`;
    }else if(type == 'dateTime'){
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }else if(type == 'monthYear'){
        return `${year}-${month}`;
    }else if(type == 'time'){
        return `${hours}:${minutes}`;
    }else if(type == 'weekYear'){
        return `${year}-W${week}`;
    }
    
    
}
    


}



describe('Testsuit', function () {
    //remove --no-timeouts
    this.timeout(0);
    
    const objct = new Picker('https://testpages.eviltester.com/pages/input-elements/special-formats/'); 
    

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

    it('Testing Color Picker',async function (){
        let id = 'color-input'
        let color = objct.getRandomHexColorComponents()
       await objct.setValue(id,color)
       assert.equal(await objct.getTxt(id+'-value-value'),color);
       assert.equal(await objct.getValue(id),color);
       console.log(objct.getRandomDateMaxMin());
       
    })

    let testcases =[{name:'Date and Time',id:'datetime-local-input',type:'dateTime'},
                    {name:'Date',id:'date-input',type:'date'},
                    {name:'Month & Year',id:'month-input',type:'monthYear'},
                    {name:'Time',id:'time-input',type:'time'},
                    {name:'Week & Year',id:'week-input',type:'weekYear'},
                    {name:'Date with Min & Max',id:'date-input-min-max',type:'dateMinMax'}]
    testcases.forEach(({name,id,type})=>{
        it('Testing '+name,async function(){
            let date ='';
            if(type == 'dateMinMax'){
                date = objct.getRandomDateMaxMin();
            }else{
                date = objct.getRandomDateTimeLocal(1600,2300,type);
            }
            await objct.setValue(id,date);
            assert.equal(await objct.getTxt(id+'-value-value'),date);
            assert.equal(await objct.getValue(id),date);
            console.log(await objct.getValue(id));
       
        })
    })
    
    
    

})