# SE_webdriver_25 - Complete Test Automation Project

A comprehensive, progressive **Selenium WebDriver** and **Playwright** test automation learning project organized by weeks. This repository contains two parallel learning paths: **Class** (Selenium WebDriver with Playwright) and **Home** (Selenium WebDriver with design patterns focus). Together, they provide a complete education in modern web automation testing practices.

---

## 📁 Project Structure

```
SE_webdriver_25/
├── README.md                           # This file (master overview)
├── .git/                               # Git repository
├── Class/                              # Selenium + Playwright implementation
│   ├── package.json
│   ├── README.md                       # Class folder details
│   ├── test/
│   │   ├── 1st-10th week/             # Progressive exercises (basic to advanced)
│   │   ├── 11th week/ ⭐              # File upload with design patterns
│   │   │   ├── UploadFile.js          # Selenium POM
│   │   │   ├── upload.test.js         # Selenium data-driven test
│   │   │   ├── strategies.js          # Selenium browser strategies
│   │   │   ├── playwright/            # Playwright version
│   │   │   │   ├── UploadFiles.js     # Playwright POM
│   │   │   │   ├── upload.test.js     # Playwright data-driven test
│   │   │   │   ├── strategies.js      # Playwright strategies
│   │   │   │   ├── playwright.config.js
│   │   │   │   └── data.json
│   │   │   ├── data.json
│   │   │   └── resources/
│   │   └── test-results/
│   └── node_modules/
│
├── Home/                               # Selenium WebDriver with Design Patterns focus
│   ├── package.json
│   ├── README.md                       # Home folder details
│   ├── test/
│   │   ├── 1st-9th week/              # Progressive exercises
│   │   ├── 10th week/ ⭐              # Design patterns showcase
│   │   │   ├── SearchPage.js          # Base POM class
│   │   │   ├── SearchTermFactory.js   # Factory pattern
│   │   │   ├── search.json            # Test data
│   │   │   ├── .mocharc.json
│   │   │   ├── Page_Object_Model(POM)/
│   │   │   ├── Data-Driven_Pattern/
│   │   │   ├── Factory_Pattern/
│   │   │   ├── Strategy_Pattern/
│   │   │   ├── Strategy_Pattern_DD/   # Strategy + Data-Driven hybrid
│   │   │   └── Strategy_Pattern_Factory/ # Strategy + Factory hybrid
│   │   ├── 11th-12th week/            # (Future exercises)
│   │   └── test-results/
│   └── node_modules/
│
└── (Project workspace root)
```

---

## 🎯 Two Learning Paths

### **Path 1: Class Folder** — Selenium + Playwright
Focus: **Multi-framework implementation**, cross-browser testing, modern test runner

- **Weeks 1–10**: Basic to advanced Selenium WebDriver exercises
- **Week 11**: File upload using three design patterns (**POM, Strategy, Data-Driven**)
  - **Selenium WebDriver** implementation with Mocha
  - **Playwright** implementation with `@playwright/test` (same patterns, different framework)
- **Week 12+**: Future extensions

**Best for**: Learning how to migrate from Selenium to Playwright, understanding framework differences, visual debugging with Playwright Inspector

---

### **Path 2: Home Folder** — Selenium with Design Patterns
Focus: **Professional architecture**, design pattern mastery, real-world test strategies

- **Weeks 1–9**: Progressive fundamentals (selectors, forms, interactions, file handling)
- **Week 10**: Design patterns showcase (6 different patterns on the same functionality)
  - **Pattern 1**: Page Object Model (POM)
  - **Pattern 2**: Data-Driven Testing
  - **Pattern 3**: Factory Pattern
  - **Pattern 4**: Strategy Pattern
  - **Pattern 5**: Strategy + Data-Driven (hybrid)
  - **Pattern 6**: Strategy + Factory (hybrid)
- **Week 11+**: Future extensions

**Best for**: Deep understanding of test architecture, learning when/how to apply design patterns, professional code organization

---

## 🛠️ Setup & Installation

### Prerequisites
- **Node.js** (v16+) and **npm**
- **Git** (for cloning)

### Install Dependencies

**For Class folder**:
```bash
cd Class
npm install
# For Playwright (if running Playwright tests)
cd test/11th\ week/playwright
npm init -y
npm i -D @playwright/test
npx playwright install
```

**For Home folder**:
```bash
cd Home
npm install
```

---

## ✅ Running Tests

### **Class Folder: Selenium WebDriver Tests (Weeks 1–10)**

```bash
cd Class

# Run a specific week's test with Mocha
npx mocha test/6th\ week/7charValidator_mocha.js

# Run Week 11 file upload test (Selenium)
npx mocha test/11th\ week/upload.test.js

# Generate HTML report
npx mocha test/11th\ week/upload.test.js --reporter mocha-simple-html-reporter
```

### **Class Folder: Playwright Tests (Week 11)**

```bash
cd Class/test/11th\ week/playwright

# Run all browsers (Chromium, Firefox, WebKit)
npx playwright test

# Run a single browser
npx playwright test --project=chromium

# Run headed (see browser window)
npx playwright test --headed

# Run serially (one by one)
npx playwright test --workers=1

# Interactive debugging
$env:PWDEBUG = 1; npx playwright test

# View HTML report
npx playwright show-report

# View trace (if captured)
npx playwright show-trace test-results/.../trace.zip
```

### **Home Folder: Selenium Tests (Weeks 1–9)**

```bash
cd Home

# Run a specific week
npx mocha test/8th\ week/UploadFile.js

# Run a raw script
node test/3rd\ week/readCSV.js
```

### **Home Folder: Design Patterns Tests (Week 10)** ⭐

```bash
cd Home/test/10th\ week

# Run all patterns
npx mocha

# Run a specific pattern
npx mocha Page_Object_Model/search_pom.test.js
npx mocha Data-Driven_Pattern/data_driven.test.js
npx mocha Factory_Pattern/factory_pattern.test.js
npx mocha Strategy_Pattern/strategy.test.js

# Run hybrid patterns
npx mocha Strategy_Pattern_DD/strategy.test.js      # Strategy + Data-Driven
npx mocha Strategy_Pattern_Factory/strategy.test.js # Strategy + Factory

# Generate HTML report
npx mocha --reporter mocha-simple-html-reporter

# View report
open report.html  # macOS
start report.html # Windows
```

---

## 📚 Learning Progression

### **Timeline: Class Folder**
| Week | Topic | Framework |
|------|-------|-----------|
| 1–5 | Selectors, forms, dropdowns | Selenium |
| 6–7 | Mocha framework, screenshots | Selenium |
| 8–10 | Advanced interactions | Selenium |
| **11** | **File upload + POM, Strategy, Data-Driven** | **Selenium + Playwright** |

### **Timeline: Home Folder**
| Week | Topic | Pattern Focus |
|------|-------|---|
| 1–3 | Fundamentals | Basic selectors |
| 4–6 | UI interactions | Screenshots, frameworks |
| 7–9 | Advanced features | File handling, links |
| **10** | **6 design patterns on search** | **POM, DD, Factory, Strategy, Hybrids** |

### **Recommended Learning Path**
1. Start with **Class Weeks 1–10** (Selenium WebDriver basics)
2. Study **Class Week 11** (File upload + patterns in Selenium)
3. Try **Playwright** version of Week 11 (same patterns, different framework)
4. Dive into **Home Weeks 1–9** (extended fundamentals)
5. Master **Home Week 10** (6 design patterns on the same functionality)
6. Combine learnings and build professional test suites

---

## 🎓 Design Patterns Reference

### **When to Use Each Pattern**

| Pattern | When | Example |
|---------|------|---------|
| **POM** | Always | Any test that interacts with a page |
| **Data-Driven** | Multiple test cases | Testing with different inputs (files, search terms) |
| **Factory** | Dynamic object creation | Creating different test data or page objects |
| **Strategy** | Multiple implementations | Testing across different browsers or URLs |
| **Strategy + DD** | Multiple browsers × multiple data | Comprehensive cross-browser testing |
| **Strategy + Factory** | Flexible creation | Professional, scalable test frameworks |

---

## 🔧 Dependencies

Both folders include:
- **selenium-webdriver** (v4.38–4.39) — WebDriver API
- **mocha** (v11.7.4) — Test framework
- **mocha-each** — Parameterized testing
- **mocha-simple-html-reporter** — HTML reports
- **chromedriver** — Chrome driver
- **geckodriver** — Firefox driver
- **csv-parser** — CSV reading (Home folder)
- **@playwright/test** (Class folder devDep) — Playwright test runner

---

## 📋 Repository Overview

**This repository is a complete test automation education platform** with:

✅ **Two parallel learning paths** (Class + Home)  
✅ **Progressive difficulty** (Weeks 1–12)  
✅ **Design patterns mastery** (POM, Factory, Strategy, Data-Driven, Hybrids)  
✅ **Two frameworks** (Selenium WebDriver + Playwright)  
✅ **Cross-browser testing** (Chrome, Firefox, Edge, Safari, WebKit)  
✅ **Visual debugging** (Screenshots, videos, traces, Inspector)  
✅ **HTML test reports** (Mocha + Playwright)  
✅ **Real-world examples** (File upload, search, form validation)  
✅ **Professional code organization** (POM, strategies, factories)  
✅ **Data-driven testing** (JSON, CSV, parameterized)  

---

## 🤝 Folder-Specific Details

For in-depth information about each folder:
- **Class folder details**: See `Class/README.md`
- **Home folder details**: See `Home/README.md`

---

