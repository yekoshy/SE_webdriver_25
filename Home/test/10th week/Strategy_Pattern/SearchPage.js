const {Builder, until, Key, By} = require("selenium-webdriver");
require("chromedriver");

class SearchPage {
    constructor(url) {
        this.driver = null;
        this.searchInput = "//*[@name='q']";
        this.url = url;
    }

    async open() {
        this.driver = await new Builder().forBrowser('chrome').build();
        await this.driver.get(this.url);
        console.log(this.url)
    }

  

    async search(term) {
        await this.driver.findElement(By.xpath(this.searchInput)).sendKeys(term);
        await this.driver.sleep(100);
        await this.driver.findElement(By.xpath(this.searchInput)).sendKeys(Key.ENTER);
        console.log(await this.getTitle())
        await this.driver.wait(until.titleContains(term), 2000);
    }

    async getTitle(){
        return await this.driver.getTitle();
    }

    async sleep(n){
        await this.driver.sleep(n);
    }

    async close(){
        await this.driver.quit();
    }
}

module.exports = SearchPage;
