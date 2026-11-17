# Automation Exercise Playwright Framework

This repository contains a UI automation framework for the [Automation Exercise](https://www.automationexercise.com/) website. It uses Playwright Test with TypeScript and the Page Object Model (POM) to organize browser interactions, test data, and test suites.

## Requirements

- Node.js (LTS recommended) and npm
- Playwright installed
- Internet access to `automationexercise.com`

## Getting started


Run the tests selected by the current Playwright configuration:

```bash
npx playwright test
```

Run a specific configured test file:

```bash
npx playwright test tests/home.spec.ts
```

The HTML reporter is configured by default. After a test run, open the report with:

```bash
npx playwright show-report
```

## Framework structure


.
├── .github/
│   └── workflows/
│       └── playwright.yml       # GitHub Actions(Not implemented)
├── config/                      # Reserved for additional 
├── fixtures/
│   └── testFixture.ts           # Shared and custom Playwright 
├── pages/                       # Page Object Model classes
│   ├── cartPage.ts
│   ├── checkoutPage.ts
│   ├── contactUsPage.ts
│   ├── home.ts
│   ├── loginPage.ts
│   ├── paymentPage.ts
│   ├── signUpPage.ts
│   └── signUpSuccessfulPage.ts
├── test-data/                   # Reusable test data and upload 
│   ├── contactUsData.ts
│   ├── homeData.ts
│   ├── loginData.ts
│   ├── paymentData.ts
│   ├── signUpData.ts
│   └── sample-file.txt
├── tests/                       # Playwright test specifications
│   ├── accessibility.spec.ts
│   ├── cart.spec.ts
│   ├── contactUs.spec.ts
│   ├── home.spec.ts
│   ├── login.spec.ts
│   ├── payment.spec.ts
│   ├── signUp.spec.ts
│   └── visualTest.spec.ts
├── utils/                       # Shared utilities
│   ├── blockAds.ts
│   ├── eventListener.ts
│   └── randomData.ts
├── package.json
├── package-lock.json
└── playwright.config.ts
```

## How the framework is organized

- **`playwright.config.ts`** sets the test directory, browser project, base URL, execution mode, and reporter. 
- **`fixtures/testFixture.ts`** extends Playwright's built-in fixtures to provide page objects, ad blocking, accessibility scan setup, and an automatic `loggedInUser` fixture. That fixture signs in using the configured test account, clears the cart, and returns to the home page. Tests that should not use it override the fixture in their spec.
- **`pages/`** holds page objects. Each class encapsulates page locators and user actions for a site area such as login, cart, checkout, or payment.
- **`tests/`** contains feature-level specifications:
  - `home.spec.ts`: product search and add-to-cart behavior
  - `login.spec.ts`: valid and invalid login
  - `signUp.spec.ts`: account creation
  - `cart.spec.ts`: cart contents, item removal, and cart clearing
  - `contactUs.spec.ts`: contact form and file upload
  - `payment.spec.ts`: order/payment flow
  - `accessibility.spec.ts`: axe accessibility scans
  - `visualTest.spec.ts`: visual snapshots for the home page and cart
- **`test-data/`** stores reusable inputs for the test cases. Sign-up and contact test data use random name/email helpers to reduce duplicate-account collisions. `sample-file.txt` is uploaded by the contact form test.
- **`utils/`** contains shared helpers for blocking ad requests, handling browser dialogs, and generating random values.


## Test selection

Although `tests/` contains eight spec files, the configured `testMatch` currently includes only five: login, sign-up, home, payment, and contact. The cart, accessibility, and visual specs are therefore not part of the default run. To include every spec by default, change `testMatch` in `playwright.config.ts` to:

```ts
testMatch: ["**/*.spec.ts"],
```

## Reports and generated files

Playwright writes test results to `test-results/` and the HTML report to `playwright-report/`. These generated directories, along with `node_modules/`, are excluded from Git by `.gitignore`.

## Updating the test account

The automatic login fixture uses `validLoginData` from `test-data/loginData.ts`. 
