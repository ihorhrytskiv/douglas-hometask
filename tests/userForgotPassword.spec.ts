import { test } from "../fixtures";
import { acceptAllCookies, openUrl } from "../utils/pageHelpers";
import { Pages } from "../pages/pagesUrls";
import { faker } from "@faker-js/faker/locale/en_US";
import { qase } from "playwright-qase-reporter";
import { expect } from "@playwright/test";

test.describe("Forgot password form", async () => {
  test("Can send reset password", async ({ loginPage }) => {
    let randomEmail: string;
    await test.step("Navigate to Login page and accept cookies", async () => {
      await openUrl(loginPage.page, Pages.LOGIN);
      await acceptAllCookies(loginPage.page);
    });
    await test.step("Click forgot password", async () => {
      await loginPage.forgotPasswordLink.click();
      await loginPage.forgotPasswordFormContainer.waitFor();
    });
    await test.step("Submit the form with email", async () => {
      randomEmail = faker.internet.email();
      await loginPage.forgotPasswordEmailInput.fill(randomEmail);
      await loginPage.forgotPasswordSubmitButton.click();
    });
    await test.step("Verify alert message displayed with correct email", async () => {
      await expect(loginPage.forgotPasswordAlertMessage).toBeVisible();
      await expect(loginPage.forgotPasswordAlertMessageEmail).toHaveText(
        randomEmail,
      );
    });
  });
});
