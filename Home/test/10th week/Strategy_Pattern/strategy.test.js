const { DuckSearch, Bing, Ecosia } = require("./Strategies.js");
const forEach = require("mocha-each");
const { assert } = require('chai');

const duckObj = new DuckSearch();
const bingObj = new Bing();
const ecoObj = new Ecosia();

[duckObj,bingObj,ecoObj].forEach(objct => { describe("Strategies Example, Searching in "+objct.url, function() {
  this.timeout(0);  
  

  before(async function(){
    await objct.open()
  })

  beforeEach(async function(){
    //await objct.open()
  })

  after(async function(){
    await objct.close()
  })

  afterEach(async function(){
    //await objct.close()
  })

  it("Search using Page Object", async function() {
    

    try {
      let keyword = "Selenium Webdriver"
      await objct.search(keyword);
      let title = await objct.getTitle();
      assert.include(title,keyword)
    } catch(e) {
      console.log(e)
      
    }
  });
});
})
