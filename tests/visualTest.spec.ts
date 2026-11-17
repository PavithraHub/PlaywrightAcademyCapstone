// tests/visual.spec.ts
import { test, expect } from "../fixtures/testFixture";
import { homeData } from "../test-data/homeData";

test.describe("Visual Regression Tests", () => {
  test("Home page layout matches baseline", async ({ page, homePage }) => {
    // Mask dynamic areas like carousels or ads so they don't cause false failures
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot("home-page.png", {
      fullPage: true,
      mask: [page.locator("#slider-carousel")],
    });
  });

  test("Cart table matches baseline", async ({ homePage, cartPage }) => {
    await homePage.addMultipleProductsToCart(homeData.products);
    await homePage.clickViewCartButton();
    await expect(cartPage.cartTable).toBeVisible();
    
    // Capture a screenshot of just the cart table element
    await expect(cartPage.cartTable).toHaveScreenshot("cart-table.png");
  });
});