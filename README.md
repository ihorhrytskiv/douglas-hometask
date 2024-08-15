# Douglas home task: Playwright Automation Project

## Overview

This project uses Playwright, a Node.js library to automate tests for web application form

Douglas website is using Forter for security and I guess for bot detection. Becuase of that tests are not really stable

Tests are integrated with the QASE Test Management system
[QASE Project](https://app.qase.io/project/DGLS)

```sh
        [
          "playwright-qase-reporter",
          {
            testops: {
              api: {
                token: process.env.QASE_TESTOPS_API_TOKEN,
              },
              project: "DGLS",
              uploadAttachments: true,
              run: {
                complete: true,
              },
            },
          },
        ],
```
Running a test would create a test run in QASE App with the results, screenshots, traces.

## Prerequisites

- Node.js
- npm

Local Variables setup:
In order to run tests you should have your local variables setup or use mine:
```sh
export QASE_TESTOPS_API_TOKEN="82a4b02c264d6b8efbd5237f3212cd5619cf175786041c8d20b0eec43b2e61d1"
export QASE_MODE="testops"
export BASE_URL="https://www.douglas.de/de/"
export USER_EMAIL="ihor.qa.test@douglas.com"
export USER_PASSWORD="Ihorqa@douglas7"
```

## Installation

To get started with this project, clone the repository and install the dependencies:

```sh
git clone https://github.com/ihorhrytskiv/douglas-hometask.git
cd <repository-directory>
npm install
npx playwright install
```

## Running Tests

To run the automated tests, use the following command:

```sh
npx playwright test
```

### Running Specific Tests

To run tests in a specific file:

```sh
npx playwright test tests/path/to/test-file.spec.ts
```

To run tests matching a name pattern:

```sh
npx playwright test -g "test name pattern"
```

## Project Structure

- `playwright.config.ts`: Configuration file for Playwright tests.
- `tests/`: Test scripts for automated browser testing.
- `fixtures/`: Custom fixture, page context setup
- `pages/`: Page object models representing pages and components of the web applications.
- `utils/`: Different helpers, commonly used functions, etc...
- `package.json`: Project metadata and dependencies.

## Test Results and Reporting

### HTML report

Test results will be displayed in the console upon completion, detailing which tests have passed or failed.

Also, there will be HTML report generated.
It can be opened in the browser to see the test results with the command:

```sh
npx playwright show-report
```

## Authors

- **Ihor Hrytskiv** - Initial work - [ihorhrytskiv](https://github.com/ihorhrytskiv)
