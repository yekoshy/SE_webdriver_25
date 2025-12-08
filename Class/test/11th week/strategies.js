const Upload = require('./UploadFile');
require("chromedriver");
const chrome = require('selenium-webdriver/chrome');
//const firefox = require('selenium-webdriver/firefox');
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
        //let options = new firefox.Options();
        //options.setPreference('layout.css.devPixelsPerPx', 1.33333333);
        //this.driver = await new Builder().forBrowser('firefox').setFirefoxOptions(options).build();
        this.driver = await new Builder().forBrowser('firefox').build();
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