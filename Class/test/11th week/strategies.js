const Upload = require('./UploadFile');
require("chromedriver");
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const edge = require('selenium-webdriver/edge');
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
        options.addArguments("--force-device-scale-factor=0.75");
        //options.setPreference("layout.css.devPixelsPerPx", "0.75");
        this.driver = new Builder().forBrowser(Browser.FIREFOX).setFirefoxOptions(options).build();
        await this.driver.get(this.url);
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

module.exports = {chromeUpload, firefoxUpload, edgeUpload};