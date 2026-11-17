import { Page, Locator } from "@playwright/test";
import { paymentData } from "../test-data/paymentData";

export class PaymentPage {
    readonly page : Page;
    readonly nameOnCard :Locator;
    readonly cardNumber : Locator;
    readonly cvc : Locator;
    readonly expirationMonth : Locator;
    readonly expirationYear : Locator;
    readonly payAndConfirmBtn :Locator;
    readonly orderSuccessLabel : Locator;

    readonly orderConfirmedHeading : Locator;
    readonly orderConfirmedMsg : Locator;
    readonly continueBtn : Locator;

    constructor(page:Page){
        this.page = page;
        this.nameOnCard = page.locator("[data-qa ='name-on-card']");
        this.cardNumber = page.locator("[data-qa ='card-number']");
        this.cvc = page.locator("[data-qa ='cvc']");
        this.expirationMonth = page.locator("[data-qa ='expiry-month']");
        this.expirationYear = page.locator("[data-qa ='expiry-year']");
        this.payAndConfirmBtn = page.locator('#submit');
        this.orderSuccessLabel = page.locator('.alert-success.alert').first();

        this.orderConfirmedHeading = page.getByRole('heading', { name: 'ORDER PLACED!' });
        this.orderConfirmedMsg = page.getByText('Congratulations! Your order has been confirmed!');
        this.continueBtn = page.locator("[data-qa='continue-button']");
    }

    async fillPaymentDetailsAndSubmit(paymentInfo: paymentData){
        await this.nameOnCard.fill(paymentInfo.name);
        await this.cardNumber.fill(paymentInfo.cardNumber);
        await this.cvc.fill(paymentInfo.cvv);
        await this.expirationMonth.fill(paymentInfo.expiryMonth);
        await this.expirationYear.fill(paymentInfo.expiryYear);
        await this.payAndConfirmBtn.click();

    }
}