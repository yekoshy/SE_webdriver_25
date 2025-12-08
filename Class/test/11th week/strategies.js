const Upload = require('./UploadFile');
require("chromedriver");
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const edge = require('selenium-webdriver/edge');
const safari = require('selenium-webdriver/safari');
const {Builder, Browser} = require('selenium-webdriver');



class chromeUpload extends Upload {
    constructor() {
        super();
        this.browser  = "chrome";
    }

    async open() {
            const options = new chrome.Options();
            options.addArguments("--force-device-scale-factor=0.75");
            this.driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
            await this.driver.get(this.url);
    }
}


class firefoxUpload extends Upload {
    constructor() {
        super();
        this.browser = "firefox";
    }

    async open() {
        let options = new firefox.Options();
        options.setPreference('layout.css.devPixelsPerPx', '0.7');
        //this.driver = await new Builder().forBrowser('firefox').setFirefoxOptions(options).build();
        const service = new firefox.ServiceBuilder('C:\\Tools\\geckodriver\\geckodriver.exe');
        this.driver = await new Builder().forBrowser('firefox').setFirefoxService(service).setFirefoxOptions(options).build();
        
        await this.driver.get(this.url);
        await this.driver.executeScript(`
            document.body.style.transform = "scale(0.75)";
            document.body.style.transformOrigin = "0 0";
            document.documentElement.style.width = (100 / 0.75) + "%";
        `);
    }
}


class edgeUpload extends Upload {
    constructor() {
        super();
        this.browser = "edge";
    }

    async open() {
        let options = new edge.Options();
        options.addArguments("--force-device-scale-factor=0.75");
        this.driver = new Builder().forBrowser(Browser.EDGE).setEdgeOptions(options).build();
        await this.driver.get(this.url);
    }
}

class safariUpload extends Upload {
    constructor() {
        super();
        this.browser = "safari";
    }

    async open() {
        //const options = new safari.Options();
        //options.addArguments("--force-device-scale-factor=0.75");
        //this.driver = new Builder().forBrowser(Browser.SAFARI).setSafariOptions(options).build();
        this.driver = new Builder().forBrowser(Browser.SAFARI).build();
        await this.driver.get(this.url);
        const scaleFactor = 0.75;
        await driver.executeScript(`document.body.style.zoom = ${scaleFactor}`);
    }
}
module.exports = {chromeUpload, firefoxUpload, edgeUpload, safariUpload};