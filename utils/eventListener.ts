import {Page} from '@playwright/test'

export async function acceptEventListener(page:Page){
    page.once('dialog', async (dialog) => {
    await dialog.accept();
  });

}