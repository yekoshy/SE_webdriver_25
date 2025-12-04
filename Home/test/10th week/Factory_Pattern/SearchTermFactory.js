// factory/SearchTermFactory.js

class SearchTermFactory {
  static getSearchTerm(type) {
    switch (type) {
      case "selenium":
        return "Selenium WebDriver";
      case "mocha":
        return "Mocha JS Testing";
      case "javascript":
        return "JavaScript Automation";
      default:
        return "DuckDuckGo";
    }
  }
}

module.exports = SearchTermFactory;
