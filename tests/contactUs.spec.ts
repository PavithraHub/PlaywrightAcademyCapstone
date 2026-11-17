import { test, expect } from "../fixtures/testFixture";
import { contactData } from "../test-data/contactUsData";
//import path from "node:path";

import { acceptEventListener } from "../utils/eventListener";

test.describe("Contact Us Tests", () => {
  test("Submit the contact us form", async ({ homePage, contactusPage }) => {
    await homePage.contactUsIcon.click();
    await contactusPage.name.fill(contactData.name);
    await contactusPage.subject.fill(contactData.subject);
    await contactusPage.message.fill(contactData.message);
    await contactusPage.email.fill(contactData.email);

    const filePath = "test-data/sample-file.txt";
    //path.resolve(process.cwd(), "test-data/sample-file.txt");
    await contactusPage.chooseFile.setInputFiles(filePath);

    //accept the pop up event
    contactusPage.page.once('dialog', async (dialog) => {
    expect(dialog.message()).toContain('Press OK to proceed!');
    await dialog.accept();
    });
    await contactusPage.submitBtn.click();
   // acceptEventListener(contactusPage.page);

    

    //Validate the success msg once contact us is submitted
    await expect(contactusPage.contactUsSuccessMsg).toBeVisible();
    await expect(contactusPage.contactUsSuccessMsg).toHaveText(
      "Success! Your details have been submitted successfully.",
    );
  });
});
