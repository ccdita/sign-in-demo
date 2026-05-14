import { type Page, type Locator, expect } from '@playwright/test';

class LoginPage {
    // Variables
    readonly page: Page;
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;

    // Constructor
    constructor(page: Page) {
        this.page = page;
        this.usernameField = page.getByPlaceholder('Username');
        this.passwordField = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    // Methods

    /**
     * Fills the username field with the given username
     * 
     * @param username to fill field with
     */
    async fillUsername(username: string) {
        await this.usernameField.fill(username);
    }

    /**
     * Fills the password field with the given password
     * 
     * @param password to fill field with
     */
    async fillPassword(password: string) {
        await this.passwordField.fill(password);
    }

    /**
     * Logs into the page with the given username and password
     * 
     * @param username to log in with
     * @param password to log in with
     */
    async doLogin(username: string, password: string) {
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.loginButton.click();
    }

    /**
     * Checks for a successful login
     */
    async checkLoggedIn() {
        await expect(this.page).toHaveURL(/.*inventory.html/);
    }
}

export default LoginPage;