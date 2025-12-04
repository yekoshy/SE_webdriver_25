const { DuckSearch, Bing, Ecosia } = require("./Strategies.js");
const SearchTermFactory = require("../SearchTermFactory");
const forEach = require("mocha-each");
const { assert } = require('chai');

const duckObj = new DuckSearch();
const bingObj = new Bing();
const ecoObj = new Ecosia();

forEach([duckObj,bingObj,ecoObj]).describe("Strategies Example", function(objct) {
  this.timeout(0);  
  

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
      let keyword = SearchTermFactory.getSearchTerm(type);
      await objct.search(keyword);
      let title = await objct.getTitle();
      assert.include(title,keyword)
    } catch(e) {
      console.log(e)
      
    }
  });
});
