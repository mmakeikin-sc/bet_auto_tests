import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ICustomWorld } from '../support/world';
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';

Given('I am on the MadridBet922 homepage', async function (this: ICustomWorld) {
    const homePage = new HomePage(this.page!);
    await homePage.navigate('https://madridbet922.com/');
    await homePage.verifyPageLoaded();
});

When('I click on the registration button', async function (this: ICustomWorld) {
    const homePage = new HomePage(this.page!);
    await homePage.clickRegister();
});

When('I fill in the registration form with valid details', async function (this: ICustomWorld) {
    const LoginPage = new LoginPage(this.page!);
    await LoginPage.fillRegistrationForm({
        username: 'testuser' + Math.floor(Math.random() * 10000),
        email: `test${Math.floor(Math.random() * 10000)}@example.com`,
        password: 'Test1234!',
        confirmPassword: 'Test1234!',
        currency: 'EUR',
    });
});

Then('I should be registered successfully', async function (this: ICustomWorld) {
    const LoginPage = new LoginPage(this.page!);
    await LoginPage.verifySuccessfulRegistration();
});

Then('I should see a welcome message', async function (this: ICustomWorld) {
    const LoginPage = new LoginPage(this.page!);
    await LoginPage.verifyWelcomeMessage();
});