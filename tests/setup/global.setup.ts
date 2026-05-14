import { test as setup, type Page } from '@playwright/test';
import LoginPage from '../pages/login-page';

const storageStateFile = './storageState.json'; // Define storageState file

/**
 * Logs into the page and stores the authentication state in the storageState file
 */
setup('Perform login', async ({ page }) => {
    const username = process.env.DEMO_USERNAME!;
    const password = process.env.DEMO_PASSWORD!;

    await doLogin(page, username, password); // Log in
    await page.context().storageState({ path: storageStateFile }); // Store authentication state
});

/**
 * Logs into the page and verifies that the login is successful
 * 
 * @param page object of login page
 * @param username to log in with
 * @param password to log in with
 */
async function doLogin(page: Page, username: string, password: string) {
    const baseURL = setup.info().project.use.baseURL!; // Get baseURL in playwright.config.ts
    const loginPage = new LoginPage(page); // Instantiate new LoginPage object

    await page.goto(baseURL); // Navigate to login page
    await loginPage.doLogin(username, password); // Perform login
    await loginPage.checkLoggedIn(); // Verify successful login
}