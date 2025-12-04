const { DuckSearch, Bing, Ecosia } = require("./Strategies.js");
const SearchTermFactory = require("../SearchTermFactory");
const forEach = require("mocha-each");
const { assert } = require('chai');

const duckObj = new DuckSearch();
const bingObj = new Bing();
const ecoObj = new Ecosia();

[duckObj,bingObj,ecoObj].forEach(objct => { describe("Strategies Example with Factory in "+objct.url, function() {
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
  let data = [{type:'selenuim'},{type:'mocha'},{type:'javascript'},{type:'other'}]
  
  data.forEach(testData => {
    it(`Search for: ${testData.type}`, async function() {  

    try {
      let keyword = SearchTermFactory.getSearchTerm(testData.type);
      await objct.search(keyword);
      let title = await objct.getTitle();
      assert.include(title,keyword)
    } catch(e) {
      console.log(e)
      
    }
  });
});
})})
