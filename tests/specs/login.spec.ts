import { test } from '@playwright/test';
import LoginPage from '../pages/login-page';

// Define variables
const username = process.env.DEMO_USERNAME!;
const password = process.env.DEMO_PASSWORD!;
let loginPage: LoginPage;

// Initialize empty storageState; ensures all tests start logged out
test.use({ storageState: { cookies: [], origins: [] }});

// Run tests in serial mode instead of in parallel
test.describe.configure({ mode: 'serial' });

// Navigate to the login page and instantiate a new LoginPage object
test.beforeEach(async ({ page }) => {
    await page.goto(''); // Navigate to baseURL
    loginPage = new LoginPage(page);
});

// Test scenario with positive and negative cases
test.describe('Demo Log In', () => {

    // Positive test case
    test('Successful login', async () => {
        await loginPage.doLogin(username, password);
        await loginPage.checkLoggedIn();
    });

    // Negative test cases
    test('Unsuccessful login - Invalid username', async () => {
        const invalidUsername = 'INVALID_USERNAME';
        await loginPage.doLogin(invalidUsername, password);
        await loginPage.checkInvalidCredentials();
    });

    test('Unsuccessful login - Invalid password', async () => {
        const invalidPassword = 'INVALID_PASSWORD';
        await loginPage.doLogin(username, invalidPassword);
        await loginPage.checkInvalidCredentials();
    });

});