import { test, expect } from '../fixtures/testFixture';
import {addressDetails, accountDetails} from '../test-data/signUpData';

// Disable automatic login for all tests in this file
test.use({
  loggedInUser: async ({}, use) => {
    await use();
  },
});

test.describe('Sign Up Tests', () => {

    test.beforeEach(async ({ homePage }) => {
        await homePage.clickSignInLink();
    }); 

    test('Sign Up Test', async ({ loginPage,signUpPage,signUpSuccessfulPage }) => {

        await loginPage.signUp();

        const title = accountDetails.title ?? '';
        const email = accountDetails.email ?? '';
        const password = accountDetails.password ?? '';
        const day = accountDetails.day ?? '';
        const month = accountDetails.month ?? '';
        const year = accountDetails.year ?? '';

        await signUpPage.fillAccountDetails(title, email, password, day, month, year);
        await signUpPage.fillAddressDetails(
            addressDetails.firstName ?? '',
            addressDetails.lastName ?? '',
            addressDetails.company ?? '',
            addressDetails.address1 ?? '',
            addressDetails.address2 ?? '',
            addressDetails.country ?? '',
            addressDetails.state ?? '',
            addressDetails.city ?? '',
            addressDetails.zipcode ?? '',
            addressDetails.mobileNumber ?? ''
        );
        await signUpPage.createAccount();

        await expect(signUpPage.page).toHaveURL(/.*account_created/);
        await expect(signUpSuccessfulPage.accountCreatedMessage).toBeVisible();
        await expect(signUpSuccessfulPage.accountCreatedMessage).toHaveText('Account Created!');
        await expect(signUpSuccessfulPage.continueButton).toBeVisible();
        await signUpSuccessfulPage.clickContinueButton();

    })
})