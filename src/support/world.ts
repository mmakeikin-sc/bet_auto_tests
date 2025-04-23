import { IWorldOptions, World } from '@cucumber/cucumber';
import { BrowserContext, Page, PlaywrightTestOptions, APIRequestContext } from '@playwright/test';

export interface CucumberWorldConstructorParams {
    parameters: { [key: string]: string };
}

export interface ICustomWorld extends World {
    context?: BrowserContext;
    page?: Page;
    testName?: string;
    startTime?: Date;
    server?: APIRequestContext;
    playwrightOptions?: PlaywrightTestOptions;
}

export class CustomWorld extends World implements ICustomWorld {
    constructor(options: IWorldOptions) {
        super(options);
    }
    page?: Page;
    context?: BrowserContext;
}