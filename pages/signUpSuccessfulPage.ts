import {Page, Locator} from '@playwright/test';

export class SignUpSuccessfulPage {
    readonly page: Page;
    readonly accountCreatedMessage: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.accountCreatedMessage = page.locator("[data-qa='account-created']");
        this.continueButton = page.locator("[data-qa='continue-button']");
    }

    async clickContinueButton() {
        await this.continueButton.click();
    }
}