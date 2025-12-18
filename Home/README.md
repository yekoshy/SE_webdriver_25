# SE_webdriver_25 - Home Folder

A comprehensive **Selenium WebDriver** test automation project with progressive exercises organized by week. This folder emphasizes **real-world design patterns**, **test architecture**, and **advanced automation concepts**. Special focus on Week 10, which demonstrates multiple design patterns applied to the same search functionality.

---

## 📁 Folder Structure

```
Home/
├── package.json                        # Project dependencies (Selenium, Mocha, CSV parser, etc.)
├── README.md                           # This file
├── test/
│   ├── 1st week/                       # Basic WebDriver setup & simple tests
│   │   ├── first_test.js
│   │   └── Hend_first_assignment.js
│   ├── 2nd week/                       # UI interaction basics
│   │   └── SimpleNoteTaker.js
│   ├── 3rd week/                       # CSV data reading & dropdowns
│   │   ├── CreateScreenshot.js
│   │   ├── readCSV.js                  # CSV parsing example
│   │   ├── select_documentation.js
│   │   ├── select.js
│   │   ├── Triangle.js
│   │   ├── data.csv                    # Test data in CSV format
│   │   └── screenshots/                # Captured screenshots
│   ├── 4th week/                       # Drag & Drop + Content browsing
│   │   ├── browsingContent_documentation.js
│   │   ├── CalcTest.js
│   │   ├── CreateScreenshot_V2.js
│   │   ├── Drag-n-Drop.js
│   │   ├── drag&drop_documentation.js
│   │   └── eleScreenshots/
│   ├── 5th week/                       # Advanced screenshots & login tests
│   │   ├── CreateScreenshot_v3.js
│   │   ├── CreateScreenshot_v4.js
│   │   ├── Login_Mocha.js
│   │   └── saved/                      # Saved screenshots
│   ├── 6th week/                       # Mocha test framework integration
│   │   ├── SimpleNoteTaker_mocha.js
│   │   └── report.html                 # Test report
│   ├── 7th week/                       # Mocha + advanced features
│   │   ├── Calculator_mocha.js
│   │   ├── DragnDropDemo.js
│   │   ├── triangle_mocha_v2.js
│   │   └── screenshots/
│   ├── 8th week/                       # Mouse/Keyboard actions + File handling
│   │   ├── DownloadFile.js
│   │   ├── DragnDrop_Keyboard.js
│   │   ├── Keyboard_documentation.js
│   │   ├── Mouse-n-Keyboard.js
│   │   ├── Upload_documentation.js
│   │   ├── UploadFile.js
│   │   ├── resources/                  # Test files (textfile.txt)
│   │   └── Download/                   # Downloaded test files
│   │       ├── file.json
│   │       ├── Myfile.feature
│   │       ├── offerApproval.feature
│   │       ├── random_data.txt
│   │       ├── Sample.txt
│   │       ├── some-file.txt
│   │       └── tmpgikjgb62.txt
│   ├── 9th week/                       # Advanced interaction & links
│   │   ├── BrokenLinksImages.js
│   │   ├── Color_Date_Time_Picker.js
│   │   ├── new_Window_Tab_Documentation.js
│   │   └── testLink.js
│   ├── 10th week/ ⭐                   # **DESIGN PATTERNS SHOWCASE**
│   │   ├── SearchPage.js               # Base POM class
│   │   ├── SearchTermFactory.js        # Factory pattern factory
│   │   ├── .mocharc.json               # Mocha configuration
│   │   ├── report.html                 # Test report
│   │   ├── search.json                 # Test data
│   │   ├── Page_Object_Model(POM)/     # POM pattern example
│   │   │   └── search_pom.test.js
│   │   ├── Data-Driven_Pattern/        # Data-driven pattern example
│   │   │   └── data_driven.test.js
│   │   ├── Factory_Pattern/            # Factory pattern example
│   │   │   └── factory_pattern.test.js
│   │   ├── Strategy_Pattern/           # Strategy pattern (basic)
│   │   │   ├── Strategies.js
│   │   │   └── strategy.test.js
│   │   ├── Strategy_Pattern_DD/        # Strategy + Data-Driven combined
│   │   │   ├── Strategies.js
│   │   │   ├── strategy.test.js
│   │   │   └── report.html
│   │   └── Strategy_Pattern_Factory/   # Strategy + Factory combined
│   │       ├── Strategies.js
│   │       └── strategy.test.js
│   ├── 11th week/                      # (Placeholder for future exercises)
│   └── 12th week/                      # (Placeholder for future exercises)
└── node_modules/                       # Installed dependencies

```

---

## 🎯 Project Overview

This project is a **progressive learning journey** through professional test automation, with emphasis on **design patterns** and **reusable architecture**.

### **Weeks 1–9: Fundamentals & Advanced Interactions**
- Basic WebDriver setup & page navigation
- Form interactions & UI elements
- CSV data reading & parsing
- Drag & Drop actions
- Screenshots at different scales
- Mocha test framework integration
- Mouse & Keyboard actions
- File upload/download handling
- Broken links detection
- Color, date & time pickers
- New tabs & windows

### **Week 10: Design Patterns Showcase** ⭐
The crown jewel of this project! Week 10 demonstrates **four professional design patterns** applied to the **same search functionality**:

1. **Page Object Model (POM)** — Encapsulate page elements & actions
2. **Data-Driven Testing** — Run tests with multiple data sets
3. **Factory Pattern** — Create test objects dynamically
4. **Strategy Pattern** — Support multiple browser/URL combinations
5. **Hybrid Patterns** — Combine strategies above (DD+Strategy, Factory+Strategy)

Each pattern is isolated in its own folder with a complete, runnable test suite.


## 🛠️ Setup & Installation

### Prerequisites
- **Node.js** (v16+) and **npm**

### Install Dependencies

From the `Home/` folder:

```bash
npm install
```

This installs:
- `selenium-webdriver` (v4.38.0) — Selenium WebDriver
- `chromedriver` — Chrome driver
- `mocha` (v11.7.4) — Test framework
- `mocha-each` — Parameterized testing
- `mocha-simple-html-reporter` — HTML test reports
- `csv-parser` — CSV file parsing
- Other utilities (assert, etc.)

---

## ✅ Running Tests

### **Basic Tests (Weeks 1–9)**

Run a specific week's test:

```bash
# Week 2 - Simple Note Taker
npx mocha test/2nd\ week/SimpleNoteTaker.js

# Week 3 - CSV reading
node test/3rd\ week/readCSV.js

# Week 8 - File upload
npx mocha test/8th\ week/UploadFile.js
```

### **Design Patterns Tests (Week 10)** ⭐

Navigate to Week 10:

```bash
cd test/10th\ week
```

**Option 1: Run all patterns with Mocha config:**

```bash
npx mocha
```

This uses `.mocharc.json` configuration to run all test files.

**Option 2: Run a specific pattern:**

```bash
# Page Object Model pattern
npx mocha Page_Object_Model/search_pom.test.js

# Data-Driven pattern
npx mocha Data-Driven_Pattern/data_driven.test.js

# Factory pattern
npx mocha Factory_Pattern/factory_pattern.test.js

# Strategy pattern (basic)
npx mocha Strategy_Pattern/strategy.test.js

# Strategy + Data-Driven
npx mocha Strategy_Pattern_DD/strategy.test.js

# Strategy + Factory
npx mocha Strategy_Pattern_Factory/strategy.test.js
```

**Option 3: Run with specific reporter:**

```bash
# Generate HTML report
npx mocha --reporter mocha-simple-html-reporter

# List reporter (detailed console output)
npx mocha --reporter spec
```

---

### **package.json**
- Project metadata & dependencies
- Selenium WebDriver, Mocha, CSV parser, drivers

---

## 📚 Learning Path

| Week | Focus | Key Concepts |
|------|-------|--------------|
| 1–2 | Fundamentals | WebDriver setup, basic interactions |
| 3 | Data Handling | CSV parsing, dropdowns |
| 4–5 | Advanced UI | Drag & Drop, screenshots |
| 6–7 | Test Frameworks | Mocha integration, advanced tests |
| 8 | File Handling | Upload, download, keyboard/mouse |
| 9 | Advanced Interactions | Links, color pickers, windows/tabs |
| **10** | **Design Patterns** | **POM, Data-Driven, Factory, Strategy** |
| 11+ | Extensions | (Future exercises) |

---

## 🎓 Design Patterns Reference

| Pattern | Use Case | Benefit |
|---------|----------|---------|
| **POM** | Encapsulate page elements & methods | Maintainability, reusability |
| **Data-Driven** | Run tests with multiple data sets | Reduce duplication, comprehensive coverage |
| **Factory** | Create objects dynamically | Flexibility, reduced coupling |
| **Strategy** | Support multiple implementations | Extensibility, clean code |
| **POM + DD** | POM + multiple data | Best of both worlds |
| **Strategy + DD** | Multiple browsers + multiple data | Comprehensive cross-browser testing |
| **Strategy + Factory** | Dynamic strategy & data creation | Professional, scalable architecture |

---

## 📖 References

- **Selenium WebDriver**: https://www.selenium.dev/documentation/
- **Mocha**: https://mochajs.org/
- **Page Object Model**: https://www.selenium.dev/documentation/test_practices/encouraged/page_object_models/
- **Design Patterns**: https://refactoring.guru/design-patterns
- **CSV Parser**: https://www.npmjs.com/package/csv-parser

---


## ✨ Summary

This project showcases **professional test automation practices** with:
- ✅ Progressive learning from basics to advanced patterns
- ✅ Six design patterns demonstrated in Week 10
- ✅ Real-world examples (search functionality across multiple engines)
- ✅ CSV data handling & external data sources
- ✅ Cross-browser testing support
- ✅ HTML test reports & logging
- ✅ File upload/download handling
- ✅ Reusable, maintainable code architecture

**Week 10 is especially valuable** — it shows how the same functionality can be tested using different professional patterns, helping you understand when and how to apply each pattern in real projects.

**Happy testing! 🧪**
