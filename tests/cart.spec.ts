import { test, expect } from "../fixtures/testFixture";
import { homeData } from "../test-data/homeData";

test.describe("Cart Tests", () => {
  test.beforeEach(async({homePage})=>{
    await homePage.addMultipleProductsToCart(homeData.products);
    await homePage.clickViewCartButton();
  })

  test("Check product in cart", async ({ homePage, cartPage }) => {
    //await homePage.addMultipleProductsToCart(homeData.products);
    //await homePage.clickViewCartButton();
    await expect(cartPage.cartTable).toBeVisible();
    const actualItems = await cartPage.getActualProducts();
    const actualProducts = actualItems.map((item) => ({
      name: item.name,
      quantity: item.quantity,
    }))
    await actualProducts.sort((a, b) => a.name.localeCompare(b.name));
    const expectedProducts = await cartPage.getExpectedProducts(homeData.products);
    await expectedProducts.sort((a, b) => a.name.localeCompare(b.name));
    expect(actualProducts).toEqual(expectedProducts);

  });

  test('Remove Product',async({cartPage})=>{
    const prodCountBeforeRemoval = await cartPage.cartRows.count();
    await cartPage.removeProductFromCart(homeData.products[0]);
    //const prodCountAfterRemoval = await cartPage.cartRows.count();
    await expect(cartPage.cartRows).toHaveCount(prodCountBeforeRemoval-1);

  });

  test("Clear cart",async({homePage,cartPage})=>{
    //await homePage.clickCartIcon();
    const count = await cartPage.cartRows.count();
    await cartPage.clearCart();
    console.log(count);
    await expect(cartPage.emptyCart).toBeVisible();

  });

});
