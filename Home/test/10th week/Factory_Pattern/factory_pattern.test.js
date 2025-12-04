const SearchTermFactory = require("./SearchTermFactory");
const SearchPage = require("../SearchPage");
const forEach = require("mocha-each");
const { assert } = require('chai');

describe("Factory Pattern Example (DuckDuckGo Search)", function () {
    this.timeout(0);  
    const objct = new SearchPage('https://duckduckgo.com/');

    before(async function(){
        //await objct.open()
    })

    beforeEach(async function(){
        await objct.open()
    })

    after(async function(){
        //await objct.close()
    })

    afterEach(async function(){
        await objct.close()
    })
  
    forEach(['selenuim','mocha','javascript','other']).it("Search using Factory-generated term", async function(type){

        

        try {
            const searchTerm = SearchTermFactory.getSearchTerm(type);
            await objct.search(searchTerm);
            let title = await objct.getTitle();
            assert.include(title,searchTerm);
            

        } catch (e) {
            console.log(e);
        }
    });
});
