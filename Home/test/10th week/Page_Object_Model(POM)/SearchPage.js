const {Builder, until, Key} = require("selenium-webdriver");
require("chromedriver");

class SearchPage {
    constructor() {
        this.driver = null;
        this.searchInput = { id: 'searchbox_input' };
        this.url = 'https://duckduckgo.com/';
    }

    async open() {
        this.driver = await new Builder().forBrowser('chrome').build();
        await this.driver.get(this.url);
    }

  

    async search(term) {
        await this.driver.findElement(this.searchInput).sendKeys(term, Key.ENTER);
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
