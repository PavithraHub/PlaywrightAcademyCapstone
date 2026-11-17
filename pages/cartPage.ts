import { Page, Locator } from "@playwright/test";


export class CartPage {
  readonly page: Page;
  readonly cartTable: Locator;
  readonly cartRows: Locator;
  readonly cartDelete: Locator;
  readonly emptyCart: Locator;
  readonly checkoutBtn:Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartTable = page.locator("#cart_info_table");
    this.cartRows = this.cartTable.locator("tbody tr");
    this.cartDelete = page.locator(".cart_delete");
    this.emptyCart = page.locator("#empty_cart");
    this.checkoutBtn =page.locator(".check_out");
  }

  async removeProductFromCart(productName: string) {
    const prodRow = this.cartRows.filter({ hasText: productName });
    const prodRemoveBtn = await prodRow.locator(".cart_quantity_delete");
    await prodRemoveBtn.click();

    /*const rowCount = await this.cartRows.count();
        for (let i = 0; i < rowCount; i++) {
            const row = this.cartRows.nth(i);   
            const productTitle = await row.locator('td').nth(1).textContent();
            if (productTitle?.trim() === productName) {
                await row.locator('.cart_delete').click();
                break;
            }*/
  }

  async getActualProducts() {
    const rowCount = await this.cartRows.count();
    const actualProducts = [];
    for (let i = 0; i < rowCount; i++) {
      const row = this.cartRows.nth(i);
      actualProducts.push({
        name: ((await row.locator(".cart_description h4 a").textContent()) ?? "").trim(),
        price: ((await row.locator(".cart_price").textContent()) ?? "").trim(),
        quantity: Number(
          (await row.locator(".cart_quantity").textContent()) ?? "0",
        ),
        total: ((await row.locator(".cart_total").textContent()) ?? "").trim(),
      });
    }
    return actualProducts;
  }

  async getExpectedProducts(inputProducts: string[]) {
    let expectedProducts: {
      name: string;
      quantity: number;
    }[] = [];
    for (const product of inputProducts) {
      const existingItem =  expectedProducts.find(
        (item) => item.name === product,
      );

      if (existingItem) {
         existingItem.quantity++;
      } else {
        expectedProducts.push({
          name: product,
          quantity: 1,
        });
      }
    }
    return expectedProducts;
  }

  async clearCart() {
    
    await this.cartTable.or(this.emptyCart).first().waitFor();

    let count = await this.cartRows.count();
    while ((count) > 0) {
      const lastRow = this.cartRows.nth(count - 1);

      await this.cartRows.first().locator(".cart_quantity_delete").click();

      // Wait until the row count shrinks so the last index disappears
      await lastRow.waitFor({ state: "detached" });
      count--;
    }
  }

  async clickProceedToCheckOut(){
    await this.checkoutBtn.click();
  }
}
