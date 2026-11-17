import { paymentDetails } from "../test-data/paymentData";
import type { paymentData } from "../test-data/paymentData";
import { homeData } from "../test-data/homeData";
import { test, expect } from "../fixtures/testFixture";

test.beforeEach(async ({ homePage, cartPage, checkoutPage }) => {
  await homePage.addMultipleProductsToCart(homeData.products);
  await homePage.clickViewCartButton();
  await cartPage.clickProceedToCheckOut();
  await checkoutPage.clickPlaceOrder();
});

test.describe("Payment and order placement", () => {
  test("Order placement", async ({ paymentPage }) => {
    await expect(paymentPage.page).toHaveURL(
      "https://automationexercise.com/payment",
    );
    let paymentInfo: paymentData = {
      name: paymentDetails.name,
      cardNumber: paymentDetails.cardNumber,
      cvv: paymentDetails.cvv,
      expiryMonth: paymentDetails.expiryMonth,
      expiryYear: paymentDetails.expiryYear,
    };
    await paymentPage.fillPaymentDetailsAndSubmit(paymentInfo);
    await expect(paymentPage.orderSuccessLabel).toBeVisible();
    await paymentPage.page.waitForURL("**/payment_done/**");
    await expect(paymentPage.orderConfirmedHeading).toBeVisible();
    await expect(paymentPage.orderConfirmedMsg).toBeVisible();
    await paymentPage.continueBtn.click();
  });
});
