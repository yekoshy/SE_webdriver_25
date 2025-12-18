# SE_webdriver_25 - Class Folder

A comprehensive **Selenium WebDriver** and **Playwright** automation testing project with progressive exercises organized by week. This folder contains test scripts that demonstrate web automation concepts, design patterns (POM, Strategy, Data-Driven), and cross-browser testing.

---

## 📁 Folder Structure

```
Class/
├── package.json                    # Project dependencies (Selenium, Playwright, Mocha, etc.)
├── README.md                       # This file
├── test/
│   ├── 1st week/                   # Basic element selection and interaction
│   │   ├── Add_Remove_Element.js
│   │   └── first_test.js
│   ├── 2nd week/                   # Radio buttons & form validation
│   │   ├── 7charValidator.js
│   │   └── RadioButtons.js
│   ├── 3rd week/                   # Checkboxes & multi-select handling
│   │   ├── Checkbox.js
│   │   └── MultiSelectRadioBtn.js
│   ├── 4th week/                   # Advanced select dropdown handling
│   │   └── newSelectClasses_Silvia.js
│   ├── 5th week/                   # Multi-select search functionality
│   │   └── multiSelectSearch.js
│   ├── 6th week/                   # Mocha test runner integration
│   │   ├── 7charValidator_mocha.js
│   │   ├── RadioBtn_mocha.js
│   │   └── radiobuttons_mocha_Silvia.js
│   ├── 7th week/                   # Test frameworks & screenshots
│   │   ├── triangle_mocha.js
│   │   └── screenshots/            # Captured screenshots from test runs
│   ├── 8th week/                   # Mouse actions & keyboard interactions
│   │   ├── MouseActionDocumentation.js
│   │   └── MouseContextMenu.js
│   ├── 9th week/                   # (placeholder for week 9 exercises)
│   ├── 10th week/                  # New tabs & windows handling
│   │   └── NewTabNewWindow.js
│   ├── 11th week/                  # **File upload + Design Patterns**
│   │   ├── UploadFile.js           # Selenium WebDriver POM (Page Object Model)
│   │   ├── upload.test.js          # Selenium WebDriver test with Mocha (data-driven)
│   │   ├── strategies.js           # Selenium browser strategy classes (Chrome, Firefox, Edge)
│   │   ├── data.json               # Test data (shared with Playwright)
│   │   ├── resources/              # Test files for upload
│   │   │   ├── selenium-snapshot.png
│   │   │   ├── sampleFile.jpeg
│   │   │   └── textfile.txt
│   │   ├── report.html             # Mocha test report (HTML)
│   │   ├── edge.js                 # Edge browser driver setup
│   │   ├── firefox.js              # Firefox driver setup
│   │   ├── safari.js               # Safari driver setup
│   │   └── playwright/             # **Playwright implementation of file upload**
│   │       ├── UploadFiles.js      # Playwright POM (Page Object Model)
│   │       ├── upload.test.js      # Playwright test using @playwright/test
│   │       ├── strategies.js       # Playwright strategy classes
│   │       ├── playwright.config.js # Playwright test runner config
│   │       ├── data.json           # Shared test data (copy of parent)
│   │       └── (test-results/)     # Artifacts: videos, traces, screenshots
│   ├── 12th week/                  # (placeholder for week 12 exercises)
│   ├── Projects/
│   │   └── input_elements_test.js  # Additional project test
│   └── test-results/               # Test artifacts from all test runs
│       └── .last-run.json
└── node_modules/                   # Installed dependencies

```

---

## 🎯 Project Overview

This project is a **progressive learning journey** through web automation testing:

### **Weeks 1–10: Selenium WebDriver Fundamentals**
- Basic element selection (CSS, ID, XPath)
- Form interactions (text input, radio buttons, checkboxes, dropdowns)
- Advanced UI components (multi-select, search)
- Test frameworks (Mocha for organizing tests)
- Screenshots & artifacts
- Mouse & keyboard actions
- Multi-window/tab handling

### **Week 11: Design Patterns & File Upload** ⭐
Two parallel implementations demonstrating professional test architecture:

#### **11th Week – Selenium WebDriver Version**
- **UploadFile.js**: Page Object Model (POM) encapsulating page actions
- **strategies.js**: Browser strategy classes (chromeUpload, firefoxUpload, edgeUpload, safariUpload)
- **upload.test.js**: Data-driven test (uses `data.json`) with Mocha
- **Design Patterns Used**:
  - **Page Object Model (POM)**: Centralize UI element selectors and methods
  - **Strategy Pattern**: Encapsulate browser-specific setup logic
  - **Data-Driven Testing**: Run same test with multiple data sets from JSON

#### **11th Week – Playwright Version** (NEW)
Located in `playwright/` subfolder:
- **UploadFiles.js**: POM using Playwright locators & APIs
- **strategies.js**: Strategy classes (InputFileStrategy, DragDropStrategy)
- **upload.test.js**: Data-driven test using `@playwright/test`
- **playwright.config.js**: Cross-browser runner config (Chromium, Firefox, WebKit)
- **Same Design Patterns** as Selenium version, adapted for Playwright

### **Week 12+: Future Extensions**

---

## 🛠️ Setup & Installation

### Prerequisites
- **Node.js** (v16+) and **npm**
- **Git** (optional, for cloning)

### Install Dependencies

From the `Class/` folder:

```bash
npm install
```

This installs:
- `selenium-webdriver` (v4.39.0) — Selenium WebDriver
- `chromedriver`, `geckodriver` — Browser drivers
- `mocha` (v11.7.4) — Test framework
- `mocha-each` — Parameterized testing
- `@playwright/test` (v1.57.0, devDependency) — Playwright test framework
- Other utilities (assert, csv-parser, etc.)

### Optional: Install Playwright Browsers

If running Playwright tests, ensure browsers are installed:

```bash
npx playwright install
```

---

## ✅ Running Tests


## 📊 Test Reports

### **Selenium + Mocha (HTML Report)**

Generate after running tests:

```bash
npx mocha test/11th\ week/upload.test.js --reporter mocha-simple-html-reporter
```

Opens: `test/11th week/report.html`

### **Playwright (HTML Report)**

View after any test run:

```bash
cd test/11th\ week/playwright
npx playwright show-report
```

---



## 📚 Learning Path

| Week | Topic | Focus |
|------|-------|-------|
| 1–2 | Basic Selectors & Forms | Element selection, input, radio buttons |
| 3–5 | UI Components | Dropdowns, multi-select, search |
| 6–7 | Test Frameworks | Mocha integration, screenshots |
| 8 | Mouse & Keyboard | Advanced interactions |
| 9–10 | Windows & Tabs | Multi-window handling |
| **11** | **File Upload + Patterns** | **POM, Strategy, Data-Driven** |
| 12+ | Extensions | (Future exercises) |

---

## 🤝 Contributing

- Add new weeks of exercises in `test/<week>/`
- Maintain POM structure for consistency
- Use data-driven approach where applicable
- Include both Selenium and Playwright versions for cross-framework learning

---

## 📖 References

- **Selenium WebDriver**: https://www.selenium.dev/documentation/
- **Playwright**: https://playwright.dev/
- **Mocha**: https://mochajs.org/
- **Page Object Model**: https://www.selenium.dev/documentation/test_practices/encouraged/page_object_models/
- **Strategy Pattern**: https://refactoring.guru/design-patterns/strategy

---


## ✨ Summary

This project demonstrates **professional test automation practices** with:
- ✅ Progressive learning from basic to advanced concepts
- ✅ Multiple frameworks (Selenium WebDriver, Playwright)
- ✅ Industry design patterns (POM, Strategy, Data-Driven)
- ✅ Cross-browser testing (Chrome, Firefox, Edge, Safari, WebKit)
- ✅ Rich reporting (HTML, Mocha, Playwright reports)
- ✅ Visual debugging (screenshots, videos, traces, Inspector)

**Happy testing! 🧪**
