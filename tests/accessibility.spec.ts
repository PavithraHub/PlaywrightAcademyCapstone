import { test, expect } from "../fixtures/testFixture";

test.describe("Accessibility Tests", () => {
  test("Home page should have no WCAG violations", async ({ homePage, makeAxeBuilder }) => {
    const accessibilityScanResults = await makeAxeBuilder().analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("Cart page should have no WCAG violations", async ({ homePage, cartPage, makeAxeBuilder }) => {
    await homePage.addMultipleProductsToCart(["Blue Top"]);
    await homePage.clickViewCartButton();
    await expect(cartPage.cartTable).toBeVisible();

    const accessibilityScanResults = await makeAxeBuilder()
      // Optional: exclude third-party widgets or known issues
      .exclude("#google_esf")
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});