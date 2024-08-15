import { Locator, Page, test } from "@playwright/test";
import { Pages } from "../pages/pagesUrls";

export async function checkElementIsVisible(
  myElement: Locator,
): Promise<boolean> {
  return await test.step(`Wait for ${myElement} to be visible`, async () => {
    return await myElement
      .waitFor({ state: "visible", timeout: 5000 })
      .then(() => true)
      .catch(() => false);
  });
}

export async function acceptAllCookies(page: Page) {
  await test.step(`Accept all cookies in dialog window`, async () => {
    const dialogAcceptButton = page.getByTestId("uc-accept-all-button");
    const isVisible = await checkElementIsVisible(dialogAcceptButton);
    if (isVisible) {
      await dialogAcceptButton.click();
    }
  });
}

export async function openUrl(page: Page, pages: Pages, waitForUrl = true) {
  await test.step(`Go to ${pages} page`, async () => {
    await page.goto(process.env.BASE_URL || "");
    await page.waitForLoadState("load");
    await page.goto(pages);
    if (waitForUrl) {
      await page.waitForURL(`**/${pages}`);
      await page.waitForLoadState("load");
    }
  });
}
