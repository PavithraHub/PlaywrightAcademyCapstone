import { homeData } from "../test-data/homeData";
import { test, expect } from "../fixtures/testFixture";

test.describe("Search Tests", () => {
  test("Search for a product", async ({  homePage }) => {
    await homePage.clickProducts();
    await homePage.searchProduct("Sleeveless");
    await expect(homePage.searchedProductTitle).toBeVisible();
    await expect(homePage.searchedProductTitle).toHaveText("Searched Products");
    const productCount = await homePage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
    const productTitles = await homePage.getProductTitleText();
    for (const title of productTitles) {
      expect(title.toLowerCase()).toContain("sleeveless");
    }
  });
});

test.describe("Validating adding product to cart", () => {
  test("Add products to cart", async ({ homePage,cartPage }) => {
    //await homePage.clickProducts();
    // for (const product of homeData.products) {
    //     await homePage.addProductToCart(product);
    //     await homePage.clickContineShoppingButton();
    // }
    
    await homePage.addMultipleProductsToCart(homeData.products);
    /*for (let i = 0; i < homeData.products.length; i++) {
      await homePage.addProductToCart(homeData.products[i]);

      if (i < homeData.products.length - 1) {
        await homePage.clickContineShoppingButton();
      }
    }*/

    await expect(homePage.modalViewCartButton).toBeVisible();
    await homePage.clickViewCartButton();
  });
});
