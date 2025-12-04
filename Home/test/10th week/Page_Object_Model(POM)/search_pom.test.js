const { assert } = require('chai');
const SearchPage = require("./SearchPage");

describe("POM Example", function() {
  this.timeout(0);  
  const objct = new SearchPage();

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
