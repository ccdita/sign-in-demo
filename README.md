# Playwright test suite for verifying login flow using stored authentication state

Welcome! This is a repository of Playwright tests that verify the login flow of [Swag Labs](https://www.saucedemo.com/), a demo website, using stored authentication state. This repo is my solution to Ch 1, exercise 6 in the [TAU Advanced Playwright course](https://github.com/ccdita/tau-advanced-playwright).

## What does this test suite demonstrate?
This test suite consists of two types of tests:
- **Regular sign-in (`./tests/specs/login.spec.ts`):** Every test (or group of tests) sign into the application
- **Global setup (`./tests/setup/global.setup.ts`):** Authentication occurs once before all tests run, and the authentication state is used across all tests

## How does each method work?
**Regular sign-in:**

- Tests that employ regular sign-in have their own test file (e.g., `./tests/specs/login.spec.ts`)
- Within this test file...
    - An empty `storageState` is initialized to ensure all tests start logged out
    - Tests are run sequentially rather in parallel, to prevent issues with tests trying to run with the same authentication state
    - A `beforeEach` hook navigates to the login page and creates a page object before every test
    - Each test case logs into the application and has its own authentication state

**Global setup:**
- `playwright.config.ts` defines global setup as a project dependency to be run before all tests in other projects
- `global.setup.ts` runs once, signing into the application and storing the authentication state in a `storageState` JSON file
- This authentication state is used across all tests

Both methods use the `login-page.ts` POM  to interact with the login page.

## How do regular sign-in and global setup differ?
| Feature | Regular Sign-in | Global Setup |
| ----- | ----- | ----- |
| **Execution** | Runs repeatedly | Runs once before all tests |
| **Storage State** | Test authenticates and stays in that one context | Saves session to a file for all tests to use |
| **Performance** | Slower (multiple logins add overhead) | Faster |

## What are some use cases for either method?
| Regular Sign-in | Global Setup |
| ----- | ----- |
| Testing the login process itself | Creating a test suite that uses the same user account |
| Using different user roles per test | |

## References
- https://www.saucedemo.com/
- https://playwright.dev/docs/test-configuration
- https://playwright.dev/docs/test-global-setup-teardown#configure-globalsetup-and-globalteardown
- https://testautomationu.applitools.com/playwright-intro/
- https://testautomationu.applitools.com/playwright-advanced/