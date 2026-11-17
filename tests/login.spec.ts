import { test, expect } from '../fixtures/testFixture';
import { validLoginData, invalidLoginData, LoginData } from '../test-data/loginData';

// Disable automatic login for all tests in this file
test.use({
  loggedInUser: async ({}, use) => {
    await use();
  },
});

test.describe('Login Tests', () => {

    test.beforeEach(async ({ homePage }) => {
        await homePage.clickSignInLink();
    });
    
    test('Valid Login Test', async ({ loginPage,homePage }) => {
        await loginPage.login(validLoginData.email, validLoginData.password);
        await expect(homePage.loggedInAs).toBeVisible();
        await expect(homePage.logoutLink).toBeVisible();
    });

    test('Invalid Login Test', async ({ loginPage }) => {
        await loginPage.login(invalidLoginData.email, invalidLoginData.password);
        await expect(loginPage.loginErrorMessage).toBeVisible();
    })



})