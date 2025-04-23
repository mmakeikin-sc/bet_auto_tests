import { ITestCaseHookParameter } from '@cucumber/cucumber';
import { ICustomWorld } from './world';
import { Before, After, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { chromium, ChromiumBrowser, firefox, FirefoxBrowser, webkit, WebKitBrowser } from '@playwright/test';
import { ITestCaseHookParameter } from '@cucumber/cucumber';
import { ensureDir } from 'fs-extra';
import { invokeBrowser } from '../utils/browserManager';
const reportsFolder = 'reports';

let browser: ChromiumBrowser | FirefoxBrowser | WebKitBrowser;

BeforeAll(async function () {
    switch (process.env.BROWSER) {
        case 'firefox':
            browser = await firefox.launch({ headless: false });
            break;
        case 'webkit':
            browser = await webkit.launch({ headless: false });
            break;
        default:
            browser = await chromium.launch({ headless: false });
    }
    await ensureDir(reportsFolder);
});

Before(async function (this: ICustomWorld, { pickle }: ITestCaseHookParameter) {
    this.testName = pickle.name.replace(/\W/g, '-');
    this.startTime = new Date();
    this.context = await browser.newContext({
        acceptDownloads: true,
        recordVideo: process.env.PWVIDEO ? { dir: 'screenshots' } : undefined,
        viewport: { width: 1200, height: 800 },
    });
    this.page = await this.context.newPage();
});

After(async function (this: ICustomWorld, { result }: ITestCaseHookParameter) {
    if (result?.status === 'FAILED') {
        const image = await this.page?.screenshot({ path: `reports/${this.testName}.png`, fullPage: true });
        await this.attach(image, 'image/png');
    }
    await this.page?.close();
    await this.context?.close();
});

AfterAll(async function () {
    await browser.close();
});