import { Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    private readonly loginButton = () => this.page.locator('button:has-text("Login")');
    private readonly registerButton = () => this.page.locator('button:has-text("Register")');

    async verifyPageLoaded(): Promise<void> {
        await expect(this.loginButton()).toBeVisible();
        await expect(this.registerButton()).toBeVisible();
    }

    async clickLogin(): Promise<void> {
        await this.loginButton().click();
    }

    async clickRegister(): Promise<void> {
        await this.registerButton().click();
    }
}