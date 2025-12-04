// npx mocha input_elements_test.js

const { Builder, By, Key, until } = require("selenium-webdriver");
const { expect } = require("chai");
const path = require("path");
const mouseLastEvent = ['mouseleave', 'change', 'blur'];

// --- Test Case Arrays ---

// Test cases for color
const colorCases=[
     // --- 1. Valid Cases ---
    {name: "color", id:"color-input", value: '#EDBB09', expectValue: '#edbb09', lastEvent: mouseLastEvent[0]},
    {name: "color", id:"color-input", value: '#0C065E', expectValue: '#0c065e', lastEvent: mouseLastEvent[0]},
    {name: "color", id:"color-input", value: '#B09081', expectValue: '#b09081', lastEvent: mouseLastEvent[0]},
    {name: "color", id:"color-input", value: '#E672EB', expectValue: '#e672eb', lastEvent: mouseLastEvent[0]},
    {name: "color", id:"color-input", value: '#0DA416', expectValue: '#0da416', lastEvent: mouseLastEvent[0]},
    // --- 2. Unusual/Invalid Cases ---
    {name: "color", id:"color-input", value: 'audiv', expectValue: '#000000', lastEvent: mouseLastEvent[0]},
    {name: "color", id:"color-input", value: '#doqivn', expectValue: '#000000', lastEvent: mouseLastEvent[0]},
    {name: "color", id:"color-input", value: '#2843983', expectValue: '#000000', lastEvent: mouseLastEvent[0]},
    {name: "color", id:"color-input", value: '#00)(*^', expectValue: '#000000', lastEvent: mouseLastEvent[0]},
    {name: "color", id:"color-input", value: '^&**$#@', expectValue: '#000000', lastEvent: mouseLastEvent[0]}
];

// Test cases for files
const uploadCases = [
    {name: "file", id:"file-input", value: path.resolve(__dirname, 'pic1.jpg'), expectValue: 'C:\\fakepath\\pic1.jpg', lastEvent: mouseLastEvent[1]},
    // large file
    {name: "file", id:"file-input", value: path.resolve(__dirname, 'THFRec.aiff'), expectValue: 'C:\\fakepath\\THFRec.aiff', lastEvent:mouseLastEvent[1]}
];

// Test cases for datetime local
const datetimeLocalCase = [
    // --- 1. Valid Cases ---
    {name: "datetime-local", id:"datetime-local-input", value: '07-02-2026' + Key.TAB + '10:59', expectValue: '2026-02-07T10:59', lastEvent:mouseLastEvent[2]},
    {name: "datetime-local", id:"datetime-local-input", value: '15-05-2030' + Key.TAB + '14:30', expectValue: '2030-05-15T14:30', lastEvent:mouseLastEvent[2]},
    {name: "datetime-local", id:"datetime-local-input", value: '23-11-2090' + Key.TAB + '09:00', expectValue: '2090-11-23T09:00', lastEvent:mouseLastEvent[2]},
    {name: "datetime-local", id:"datetime-local-input", value: '01-08-3026' + Key.TAB + '21:15', expectValue: '3026-08-01T21:15', lastEvent:mouseLastEvent[2]},
    {name: "datetime-local", id:"datetime-local-input", value: '10-03-1884' + Key.TAB + '05:45', expectValue: '1884-03-10T05:45', lastEvent:mouseLastEvent[2]},
    // --- 2. Unusual/Invalid Cases ---
    {name: "datetime-local", id:"datetime-local-input", value: '29-13-900' + Key.TAB + '18:20', expectValue: '0900-12-29T18:20', lastEvent:mouseLastEvent[2]},
    {name: "datetime-local", id:"datetime-local-input", value: '17-09-ytre' + Key.TAB + '-00:00', expectValue: '', lastEvent:mouseLastEvent[2]},
    {name: "datetime-local", id:"datetime-local-input", value: '04-06-9026' + Key.TAB + '111:31', expectValue: '9026-06-04T11:31', lastEvent:mouseLastEvent[2]},
    {name: "datetime-local", id:"datetime-local-input", value: '20-10-2028' + Key.TAB + 'ttuiog', expectValue: '', lastEvent:mouseLastEvent[2]},
    {name: "datetime-local", id:"datetime-local-input", value: 'h-t-2026' + Key.TAB + '06:-50', expectValue: '0006-02-20T06:50', lastEvent:mouseLastEvent[2]}
];

// Test cases for date
const dateCases = [
    // --- 1. Valid Cases ---
    {name: "date", id:"date-input", value: '21-07-2027', expectValue: '2027-07-21', lastEvent:mouseLastEvent[2]}, // Standard future date
    {name: "date", id:"date-input", value: '05-12-1998', expectValue: '1998-12-05', lastEvent:mouseLastEvent[2]}, // Standard past date
    {name: "date", id:"date-input", value: '29-02-2028', expectValue: '2028-02-29', lastEvent:mouseLastEvent[2]}, // Valid Leap year day
    {name: "date", id:"date-input", value: '01-01-700', expectValue: '0700-01-01', lastEvent:mouseLastEvent[2]}, // Start of year/month edge
    {name: "date", id:"date-input", value: '31-03-3090', expectValue: '3090-03-31', lastEvent:mouseLastEvent[2]}, // End of month edge

    // --- 2. Unusual/Invalid Cases ---
    {name: "date", id:"date-input", value: '90-04-2025', expectValue: '42025-01-09', lastEvent:mouseLastEvent[2]}, // Invalid Day (90) 
    {name: "date", id:"date-input", value: '15-17-2025', expectValue: '2025-12-15', lastEvent:mouseLastEvent[2]}, // Invalid Month (17) 
    {name: "date", id:"date-input", value: '30-2-700', expectValue: '', lastEvent:mouseLastEvent[2]}, // Invalid Day (2.30) 
    {name: "date", id:"date-input", value: '10-$G-2025', expectValue: '0025-02-10', lastEvent:mouseLastEvent[2]}, // Special characters in input 
    {name: "date", id:"date-input", value: '10-10-10000000', expectValue: '0001-10-10', lastEvent:mouseLastEvent[2]} // Extreme Year 
];


const monthCases = [
    // --- 1. Valid Cases
    {name: "month", id:"month-input", value: 'January' + Key.TAB + '2025', expectValue: '2025-01', lastEvent:mouseLastEvent[2]}, // Start of year
    {name: "month", id:"month-input", value: 'June' + Key.TAB + '2030', expectValue: '2030-06', lastEvent:mouseLastEvent[2]}, // Middle of year
    {name: "month", id:"month-input", value: 'December' + Key.TAB + '1999', expectValue: '1999-12', lastEvent:mouseLastEvent[2]}, // End of year
    {name: "month", id:"month-input", value: '02' + Key.TAB + '2028', expectValue: '2028-02', lastEvent:mouseLastEvent[2]}, // Using month number
    {name: "month", id:"month-input", value: '10' + Key.TAB + '2026', expectValue: '2026-10', lastEvent:mouseLastEvent[2]}, // Using month number

    // --- 2. Unusual/Invalid Cases---
    {name: "month", id:"month-input", value: '13' + Key.TAB + '2025', expectValue: '2025-01', lastEvent:mouseLastEvent[2]}, // Invalid Month Number (13) 
    {name: "month", id:"month-input", value: 'Mag' + Key.TAB + '10000000', expectValue: '0001-03', lastEvent:mouseLastEvent[2]}, // Alphabet in Month + Extreme Year 
    {name: "month", id:"month-input", value: 'Olive' + Key.TAB + '', expectValue: '', lastEvent:mouseLastEvent[2]}, // Empty year
    {name: "month", id:"month-input", value: '^t' + Key.TAB + 'ABCD', expectValue: '', lastEvent:mouseLastEvent[2]}, // Alphabet in Year Field 
    {name: "month", id:"month-input", value: 'Jazz' + Key.TAB + '!', expectValue: '', lastEvent:mouseLastEvent[2]} // Special characters in Year Field 
];


const weekCases = [
    // --- 1. Valid Cases 
    {name: "week", id:"week-input", value: '012025', expectValue: '2025-W01', lastEvent:mouseLastEvent[2]}, // Valid standard week
    {name: "week", id:"week-input", value: '152028', expectValue: '2028-W15', lastEvent:mouseLastEvent[2]}, // Middle of year
    {name: "week", id:"week-input", value: '522026', expectValue: '2026-W52', lastEvent:mouseLastEvent[2]}, // Week 52
    {name: "week", id:"week-input", value: '051999', expectValue: '1999-W05', lastEvent:mouseLastEvent[2]}, // Past year
    {name: "week", id:"week-input", value: '402035', expectValue: '2035-W40', lastEvent:mouseLastEvent[2]}, // Future year

    // --- 2. Unusual/Invalid Cases
    {name: "week", id:"week-input", value: '602025', expectValue: '2025-W06', lastEvent:mouseLastEvent[2]}, // Invalid Week Number (60)
    {name: "week", id:"week-input", value: '10999999', expectValue: '275760-W10', lastEvent:mouseLastEvent[2]}, // Extreme Year (too large for standard date formats), 275760-W10 is the maximum
    {name: "week", id:"week-input", value: 'AA2026', expectValue: '0026-W20', lastEvent:mouseLastEvent[2]}, // Alphabet in Week field
    {name: "week", id:"week-input", value: '05ABCD', expectValue: '', lastEvent:mouseLastEvent[2]}, // Alphabet in Year field
    {name: "week", id:"week-input", value: '002027', expectValue: '2027-W01', lastEvent:mouseLastEvent[2]} // Invalid Week 00
];

const timeCases = [
    // --- 1. Valid Cases  ---
    {name: "time", id:"time-input", value: '09:00', expectValue: '09:00', lastEvent:mouseLastEvent[2]}, // Morning
    {name: "time", id:"time-input", value: '12:30', expectValue: '12:30', lastEvent:mouseLastEvent[2]}, // Lunchtime
    {name: "time", id:"time-input", value: '23:59', expectValue: '23:59', lastEvent:mouseLastEvent[2]}, // Near midnight
    {name: "time", id:"time-input", value: '00:01', expectValue: '00:01', lastEvent:mouseLastEvent[2]}, // Just past midnight
    {name: "time", id:"time-input", value: '18:45', expectValue: '18:45', lastEvent:mouseLastEvent[2]}, // Evening

    // --- 2. Unusual/Invalid Cases 
    {name: "time", id:"time-input", value: '25:00', expectValue: '23:00', lastEvent:mouseLastEvent[2]}, // Invalid Hour (25)
    {name: "time", id:"time-input", value: '10:60', expectValue: '10:59', lastEvent:mouseLastEvent[2]}, // Invalid Minute (60)
    {name: "time", id:"time-input", value: '10:AM', expectValue: '', lastEvent:mouseLastEvent[2]}, // Alphabet in Minutes field
    {name: "time", id:"time-input", value: 'AB:30', expectValue: '03:00', lastEvent:mouseLastEvent[2]}, // Alphabet in Hour field
    {name: "time", id:"time-input", value: '14:30:15', expectValue: '14:15', lastEvent:mouseLastEvent[2]} // Including Seconds (updated expectation based on browser behavior)
];

const dateMinMaxCases =[
    // --- 1. Valid Cases 
    {name: "date (min, max)", id:"date-input-min-max", value: '15-03-2025', expectValue: '2025-03-15', lastEvent:mouseLastEvent[2]}, // Valid date
    {name: "date (min, max)", id:"date-input-min-max", value: '01-01-2024', expectValue: '2024-01-01', lastEvent:mouseLastEvent[2]}, // Start of a year
    {name: "date (min, max)", id:"date-input-min-max", value: '31-12-2030', expectValue: '2030-12-31', lastEvent:mouseLastEvent[2]}, // End of a year
    {name: "date (min, max)", id:"date-input-min-max", value: '29-02-2028', expectValue: '2028-02-29', lastEvent:mouseLastEvent[2]}, // Leap year date (2028 is a leap year)
    {name: "date (min, max)", id:"date-input-min-max", value: '10-10-2026', expectValue: '2026-10-10', lastEvent:mouseLastEvent[2]}, // Standard date

    // --- 2. Unusual/Invalid Cases 
    {name: "date (min, max)", id:"date-input-min-max", value: '32-05-2025', expectValue: '2025-05-31', lastEvent:mouseLastEvent[2]}, // Invalid Day (32) corrected to max day (31)
    {name: "date (min, max)", id:"date-input-min-max", value: '10-13-2025', expectValue: '2025-12-10', lastEvent:mouseLastEvent[2]}, // Invalid Month (13) corrected to max month (12)
    {name: "date (min, max)", id:"date-input-min-max", value: '15-02-202500', expectValue: '2500-02-15', lastEvent:mouseLastEvent[2]}, // Extreme Year 
    {name: "date (min, max)", id:"date-input-min-max", value: 'AA-BB-CCCC', expectValue: '', lastEvent:mouseLastEvent[2]}, // Alphabetic characters
    {name: "date (min, max)", id:"date-input-min-max", value: '29-02-2027', expectValue: '', lastEvent:mouseLastEvent[2]} // Invalid Leap Day (2027 is not a leap year)
];


// class
class inputElements {
    constructor(url){
        this.driver = null;
        this.url = url;  

    }
    async _locateInputArea(id) {
        return this.driver.findElement(By.id(id));
    }
    
    // open the page
    async open(){
        this.driver = await new Builder().forBrowser('chrome').build();
        await this.driver.get(this.url);
        await this.driver.manage().window().maximize();
        await this.driver.executeScript("document.body.style.zoom='25%'");
        await this.driver.sleep(500); 
     }

    async mouseMove(id){
        const inputArea = await this._locateInputArea(id);
        await this.driver.actions().move({ origin: inputArea }).perform();
     }

    async mouseLeave(id){
        const inputArea = await this._locateInputArea(id);
         //Moving to the top-left corner of the viewport (0, 0) is a reliable way to leave the element.
        await this.driver.actions().move({ origin: inputArea, x: -100, y: -100 }).perform();
      
     }

    async mouseClick(id){
        const inputArea = await this._locateInputArea(id); 
        await inputArea.click();
     
     }
       
    async inputValue(id, value){
        const inputArea = await this._locateInputArea(id);
        await inputArea.clear();
        await this.driver.sleep(50);
        await inputArea.sendKeys(value);

      }


    async clickThePage(){
        await this.driver.actions().click().perform();
      }

    async upload(id,value){
         await this.driver.findElement(By.id(id)).sendKeys(value);
      }
    
    // get event result text 
    async getEventResult(id){
        await this.driver.wait(until.elementLocated(By.id(`${id}-event-value`)), 5000, 
            `The event value element could not be located on the page.`);
        const eventValueSpan = await this.driver.findElement(By.id(`${id}-event-value`)); 
        const actualEvent = await eventValueSpan.getText();
        return actualEvent;
    }

      // get the value result text 
    async getValueResult(id){
        const displaySpan = await this.driver.findElement(By.id(`${id}-value-value`));
        const actualValue = await displaySpan.getText();
        return actualValue;
    }

    // pause
    async sleep(n) {
        await this.driver.sleep(n);
     }

    // close
    async close() {
        if (this.driver) {
        await this.driver.quit();
        }
    }

}


//-- mocha test--

describe ( 'Special Format Controls tests' , function (){

    this.timeout (0); 
    const input = new inputElements('https://testpages.eviltester.com/pages/input-elements/special-formats/');

    before(async function() {
        // open the browser
       await input.open(); 
    });

    after(async function() {
        // close the browser 
        await input.close();
    });

async function executeMouseActions(input, {id}) {
    // Verify 'mousemove'
    await input.mouseMove(id);
    let actualEvent = await input.getEventResult(id);
    expect(actualEvent).to.equal(
        'mousemove',
        `Event value should be 'mousemove'. Found: '${actualEvent}'.`
    );
    await input.sleep(100);

    // Verify 'mouseleave'
    await input.mouseLeave(id);
    actualEvent = await input.getEventResult(id);
    expect(actualEvent).to.equal(
        'mouseleave',
        `Event value should be 'mouseleave'. Found: '${actualEvent}'.`
    );   
    await input.sleep(150);
}

async function executeUploadTestSequence (input, { id, value}) {
    await input.upload(id,value);
    await input.clickThePage(); 
    await input.sleep(100);
};

async function executeInputTestSequence (input, { id, value}) {

       // Verify 'click'
    await input.mouseClick(id);
    let actualEvent = await input.getEventResult(id);
    await input.sleep(150);
    expect(actualEvent).to.equal(
        'click',
        `Event value should be 'click'. Found: '${actualEvent}'.`     
    );  
    await input.sleep(100);
    await input.inputValue(id, value);
    await input.clickThePage(); 
};

async function executeVerification (input, { id, expectValue, lastEvent }) {
    //Verify the final expected event
    let actualEvent = await input.getEventResult(id);
    expect(actualEvent).to.equal(
        lastEvent,
        `Final event value should be ${lastEvent}. Found: '${actualEvent}'.`     
    );  

    //Verify the final value
    const actualValue = await input.getValueResult(id);
    expect(actualValue).to.equal(
        expectValue,
        `Final value should be '${expectValue}'. Found: '${actualValue}'.`     
    );
};


async function runUploadTestFlow(input, testCase) {
    // 1. Execute Mouse actions (mousemove, mouseleave)
    await executeMouseActions(input, testCase);

    // 2. Perform upload Value action 
    await executeUploadTestSequence(input, testCase);

    // 3. Verify final event and value
    await executeVerification(input, testCase);
}

async function runInputTestFlow(input, testCase) {
    // 1. Execute Mouse actions (mousemove, mouseleave)
    await executeMouseActions(input, testCase);

    // 2. Execute Mouse actions (click) + Perform Input Value action (inputValue and blur)
    await executeInputTestSequence(input, testCase);

    // 3. Verify final event and value
    await executeVerification(input, testCase);
};


// Mocha test

// color value test
colorCases.forEach ( (testCase) => {
    const { name, value, expectValue, lastEvent } = testCase;
    
    it(`Testing mouse events for ${name}: 1. Verify 'mousemove', 'mouseleave', and 'click' action, last action is '${lastEvent}'. 2. Ensure input value '${value}' results in '${expectValue}'.`,async function (){
        await runInputTestFlow(input, testCase);
    });
});

// upload test
uploadCases.forEach ( (testCase) => {
    const { name, value, expectValue, lastEvent } = testCase;
    
    it(`Testing mouse events for ${name}: 1. Verify 'mousemove', 'mouseleave', and 'click' action, last action is '${lastEvent}'. 2. Ensure input value '${value}' results in '${expectValue}'.`,async function (){
        await runUploadTestFlow(input, testCase);
    });
});


// date time local test
datetimeLocalCase.forEach ( (testCase) => {
    const { name, value, expectValue, lastEvent } = testCase;
    
    it(`Testing mouse events for ${name}: 1. Verify 'mousemove', 'mouseleave', and 'click' action, last action is '${lastEvent}'. 2. Ensure input value '${value}' results in '${expectValue}'.`,async function (){
        await runInputTestFlow(input, testCase);
    });
});


// date test
dateCases.forEach ( (testCase) => {
    const { name, value, expectValue, lastEvent } = testCase;
    it(`Testing mouse events for ${name}: 1. Verify 'mousemove', 'mouseleave', and 'click' sequence, followed by '${lastEvent}'. 2. Ensure input value '${value}' results in '${expectValue}'.`,async function (){
        await runInputTestFlow(input, testCase);
    });
});

// month test
monthCases.forEach ( (testCase) => {
    const { name, value, expectValue, lastEvent } = testCase;
    
    it(`Testing mouse events for ${name}: 1. Verify 'mousemove', 'mouseleave', and 'click' sequence, followed by '${lastEvent}'. 2. Ensure input value '${value}' results in '${expectValue}'.`,async function (){
        await runInputTestFlow(input, testCase);
    });
});

// week test
weekCases.forEach ( (testCase) => {
    const { name, value, expectValue, lastEvent } = testCase;
    
    it(`Testing mouse events for ${name}: 1. Verify 'mousemove', 'mouseleave', and 'click' sequence, followed by '${lastEvent}'. 2. Ensure input value '${value}' results in '${expectValue}'.`,async function (){
        await runInputTestFlow(input, testCase);
    });
});


// time test
timeCases.forEach ( (testCase) => {
    const { name, value, expectValue, lastEvent } = testCase;
    
    it(`Testing mouse events for ${name}: 1. Verify 'mousemove', 'mouseleave', and 'click' sequence, followed by '${lastEvent}'. 2. Ensure input value '${value}' results in '${expectValue}'.`,async function (){
        await runInputTestFlow(input, testCase);
    });
});

// date (min, max) test
dateMinMaxCases.forEach ( (testCase) => {
    const { name, value, expectValue, lastEvent } = testCase;
    it(`Testing mouse events for ${name}: 1. Verify 'mousemove', 'mouseleave', and 'click' sequence, followed by '${lastEvent}'. 2. Ensure input value '${value}' results in '${expectValue}'.`,async function (){
        await runInputTestFlow(input, testCase);
    });
});

})