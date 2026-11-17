import {Page,Locator} from '@playwright/test';


export class HomePage {
    readonly page: Page;
    readonly signInLink: Locator;
    readonly loggedInAs: Locator;
    readonly logoutLink: Locator;
    readonly productsLink: Locator;
    readonly cartIcon:Locator;
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly productTitleList : Locator;
    readonly searchedProductTitle : Locator;
    readonly productList : Locator;
    readonly productOverlay: Locator;
    readonly modalTitle: Locator;
    readonly modalMessage: Locator;
    readonly modalContinueButton: Locator;
    readonly modalViewCartButton: Locator;
    readonly contactUsIcon: Locator;

    

    constructor(page: Page) {
        this.page = page;
        this.signInLink =  page.getByRole('link', { name: 'Signup / Login' });
        this.loggedInAs =  page.locator('a').filter({ hasText: 'Logged in as ' })
        this.logoutLink = page.getByRole('link', { name: 'Logout' });
        this.productsLink = page.getByRole('link', { name: 'Products' });
        this.cartIcon = page.getByRole('link', { name: 'Cart' }).first();
        this.searchInput = page.getByPlaceholder('Search');
        this.searchButton = page.locator('#submit_search');
        this.productTitleList = page.locator('.productinfo p');
        this.searchedProductTitle = page.locator('h2:has-text("Searched Products")')
        this.productList = page.locator('.single-products');
        this.productOverlay = page.locator('.product-overlay');
        this.modalTitle = page.locator('.modal-title');
        this.modalMessage = page.locator('.modal-body p');
        this.modalContinueButton = page.locator('.modal-footer button');
        this.modalViewCartButton = page.locator('.modal-body a');
        this.contactUsIcon =page.getByRole('link', { name: 'Contact us' })
      }

    async navigate() {
       // await this.page.goto("https://pavithrahub.github.io/BloomHavenProject/");
        await this.page.goto("https://automationexercise.com/",{waitUntil: "domcontentloaded"});
    }

    async clickSignInLink() {
        await this.signInLink.click();
    }

    async clickProducts(){
        await this.productsLink.click();
    }

    async searchProduct(searchProduct: string) {  
        await this.searchInput.fill(searchProduct);
        await this.searchButton.click();
    }

    async clearSearch() {
        await this.searchInput.clear();
    }

    async getProductTitleText(): Promise<string[]>{
        return await this.productTitleList.allTextContents();
    }

    async getProductCount() : Promise<number>{
        return await this.productTitleList.count();
    }

    async addProductToCart(productName: string) {   
       const productGrid =  this.productList.filter({hasText: productName}).first();
       await productGrid.hover();
       const addToCartButton = this.productOverlay.filter({hasText: productName}).locator('a').filter({hasText: 'Add to cart'});
       await addToCartButton.click();
    }

    async addMultipleProductsToCart(productNames: string[]) {
        for (let i = 0; i < productNames.length; i++) {
              await this.addProductToCart(productNames[i]);
        
              if (i < productNames.length - 1) {
                await this.clickContineShoppingButton();
              }
            }
    }

    async clickCartIcon(){
        await this.cartIcon.click();
    }

    async clickContineShoppingButton() {
        await this.modalContinueButton.click();
    }

    

    async clickViewCartButton() {
        await this.modalViewCartButton.click();
    }
}
