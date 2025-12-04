const { DuckSearch, Bing, Ecosia } = require("./Strategies.js");
const data = require("../search.json");
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

  data.forEach(testData => {
    it(`Search for: ${testData.query}`, async function() {
    

    try {
      let keyword = testData.query;
      await objct.search(keyword);
      let title = await objct.getTitle();
      assert.include(title,keyword)
    } catch(e) {
      console.log(e)
      
    }
  });
});
})
