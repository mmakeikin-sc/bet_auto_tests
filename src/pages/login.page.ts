import { Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }
    
    private readonly nameField = () => this.page.locator('button:has-text("Register")');
    private readonly loginButton = () => this.page.locator('button:has-text("Login")');

    async verifyPageLoaded(): Promise<void> {
        await expect(this.loginButton()).toBeVisible();
        await expect(this.nameField()).toBeVisible();
    }

    async clickLogin(): Promise<void> {
        await this.loginButton().click();
    }
}