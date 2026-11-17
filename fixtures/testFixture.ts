import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { HomePage } from "../pages/home";
import { SignUpPage } from "../pages/signUpPage";
import { SignUpSuccessfulPage } from "../pages/signUpSuccessfulPage";
import { blockGoogleAds } from "../utils/blockAds";
import { CartPage } from "../pages/cartPage";
import { validLoginData } from "../test-data/loginData";
import AxeBuilder from "@axe-core/playwright";
import { PaymentPage } from "../pages/paymentPage";
import { CheckOutPage } from "../pages/checkoutPage";
import { ContactUsPage } from "../pages/contactUsPage";

export type MyFixtures = {
  // validLoginData : LoginData;
  // invalidLoginData : LoginData;
  loginPage: LoginPage;
  homePage: HomePage;
  signUpPage: SignUpPage;
  signUpSuccessfulPage: SignUpSuccessfulPage;
  cartPage : CartPage;
  loggedInUser : void;
  // homePage : HomePage;
  
  checkoutPage : CheckOutPage;
  paymentPage : PaymentPage;
  contactusPage : ContactUsPage;
  blockAds: void;
  makeAxeBuilder: () => AxeBuilder;
};

export const test = base.extend<MyFixtures>({
  blockAds: [
    async ({ context }, use) => {
      await blockGoogleAds(context);
      await use();
    },
    { auto: true },
  ],

  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    await use(homePage);
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
    //loginPage.login(validLoginData.email, validLoginData.password);
  },
  signUpPage: async ({ page }, use) => {
    const signUpPage = new SignUpPage(page);
    await use(signUpPage);
  },

  signUpSuccessfulPage: async ({ page }, use) => {
    const signUpSuccessfulPage = new SignUpSuccessfulPage(page);
    await use(signUpSuccessfulPage);
  },

  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },

  checkoutPage : async ({ page }, use) =>{
    const checkoutPage = new CheckOutPage(page);
    await use(checkoutPage);
  },

  paymentPage : async ({page}, use) =>{
    const paymentPage = new PaymentPage(page);
    await use(paymentPage);
  },

  contactusPage: async ({page}, use)=>{
    const contactusPage  = new ContactUsPage(page);
    await use(contactusPage);
  },
  

  loggedInUser: [async ({ loginPage, homePage,cartPage }, use) => {
    await homePage.clickSignInLink();
    await loginPage.login(validLoginData.email, validLoginData.password);
    await homePage.clickCartIcon();
    await cartPage.clearCart();
    await homePage.navigate(); 
    await use();
  },
    { auto: true },
  ],
  
  makeAxeBuilder: async ({ page }, use) => {
    const makeAxeBuilder = () =>
      new AxeBuilder({ page })
        // Optional: target specific WCAG standards
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]);
    await use(makeAxeBuilder);
  },
 
});

export { expect } from "@playwright/test";
