const SearchPage = require("../SearchPage");

class DuckSearch extends SearchPage {

    constructor() {
         super('https://duckduckgo.com/');
        
    }

}

class Ecosia extends SearchPage {

    constructor() {
         super('https://www.ecosia.org/');
        
    }

}

class Bing extends SearchPage {

    constructor(){
        super('https://www.bing.com/');
    }
}


module.exports = { DuckSearch, Bing, Ecosia };