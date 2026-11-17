import {Page,Locator} from '@playwright/test';
import {accountDetails} from '../test-data/signUpData';

export class LoginPage {
    readonly page: Page;
    readonly loginEmailAddress : Locator;
    readonly password : Locator;
    readonly loginButton : Locator; 
    readonly loginErrorMessage : Locator;
    readonly signUpName : Locator;
    readonly signUpEmailAddress : Locator;
    readonly signUpButton : Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginEmailAddress = page.locator('[data-qa="login-email"]');
        this.password = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.loginErrorMessage =  page.locator('p:has-text("Your email or password is incorrect!")');
        this.signUpName = page.getByRole('textbox', { name: 'Name' });
        this.signUpEmailAddress =  page.locator('[data-qa="signup-email"]');
        this.signUpButton = page.getByRole('button', { name: 'Signup' });
    }   

    async login(email: string, password: string) {
        await this.loginEmailAddress.fill(email);
        await this.password.fill(password);
        await this.loginButton.click();
    }

    async signUp() {
        await this.signUpName.fill(accountDetails.name);
        await this.signUpEmailAddress.fill(accountDetails.email);
        await this.signUpButton.click();
    }


   
}