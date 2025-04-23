import { Page } from '@playwright/test';

export abstract class BasePage {
    constructor(protected readonly page: Page) {}

    async navigate(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async waitForTimeout(timeout: number): Promise<void> {
        await this.page.waitForTimeout(timeout);
    }
}