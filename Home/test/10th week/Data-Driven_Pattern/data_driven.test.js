const { assert } = require('chai');
const SearchPage = require("../SearchPage");
const data = require("./search.json");

describe("Data Driven Example", function() {
  this.timeout(0);  
  const objct = new SearchPage();

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
