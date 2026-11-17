import { Page, Locator } from "@playwright/test";

export class ContactUsPage {
    readonly page: Page;
    readonly name : Locator;
    readonly email : Locator;
    readonly subject : Locator;
    readonly message : Locator;
    readonly chooseFile : Locator;
    readonly submitBtn : Locator;
    readonly contactUsSuccessMsg : Locator;

    constructor(page:Page){
        this.page = page;
        this.name = page.locator('[data-qa="name"]');
        this.email = page.locator('[data-qa="email"]');
        this.subject = page.locator('[data-qa="subject"]');
        this.message = page.locator('[data-qa="message"]');
        this.chooseFile = page.locator('input[name="upload_file"]');
        this.submitBtn = page.locator('[data-qa="submit-button"]')
        this.contactUsSuccessMsg = page.locator('.status.alert.alert-success');
    }
}