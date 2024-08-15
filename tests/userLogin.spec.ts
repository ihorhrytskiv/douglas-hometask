import { test } from "../fixtures";
import { acceptAllCookies, openUrl } from "../utils/pageHelpers";
import { getCsrfToken, populateCookieHeader } from "../utils/functionHelper";
import { interceptApiRequestHeaders } from "../utils/api";
import { Pages } from "../pages/pagesUrls";
import { faker } from "@faker-js/faker/locale/en_US";
import { qase } from "playwright-qase-reporter";
import { expect, Response } from "@playwright/test";

// Forter security is annoying
// test.describe.configure({ mode: "serial" });

test.describe("Login form", async () => {
  test.beforeEach(async ({ loginPage }) => {
    await openUrl(loginPage.page, Pages.LOGIN);
    await acceptAllCookies(loginPage.page);
  });

  test("Can login with correct credentials", async ({
    loginPage,
    accountPage,
  }) => {
    let response: Response;
    await test.step("Inject CSRF token and cookie header into login request", async () => {
      const csrfToken = await getCsrfToken(loginPage.page);
      const cookieHeader = await populateCookieHeader(loginPage.page);
      await interceptApiRequestHeaders(
        loginPage.page,
        "**/jsapi/v2/users/login",
        csrfToken,
        cookieHeader,
      );
    });
    await test.step("Fill out the login form", async () => {
      await loginPage.emailInput.fill(process.env.USER_EMAIL || "");
      await loginPage.passwordInput.fill(process.env.USER_PASSWORD || "");
      await loginPage.rememberMeCheckbox.click();
    });
    await test.step("Submit the form and wait for the response", async () => {
      const responsePromise = loginPage.page.waitForResponse(
        "**/jsapi/v2/users/login",
      );
      await loginPage.submitLoginForm();
      response = await responsePromise;
      expect(response.status()).toBe(200);
    });
    await test.step("Verify the user is logged in", async () => {
      const accountName = "Ihor QA";
      const accountNameLocator = await accountPage.accountName(accountName);
      await expect(accountNameLocator).toBeVisible();
    });
  });

  test("Can see an error when using wrong credentials", async ({
    loginPage,
  }) => {
    await test.step("Fill out the login form with wrong credentials", async () => {
      const wrongEmail = faker.internet.email();
      const wrongPassword = faker.internet.password();
      await loginPage.emailInput.fill(wrongEmail);
      await loginPage.passwordInput.fill(wrongPassword);
    });
    await test.step("Submit the form and wait for the response", async () => {
      await loginPage.submitLoginForm();
      const response = await loginPage.page.waitForResponse(
        "**/jsapi/v2/users/login",
      );
      const responseBody = await response.json();
      expect(responseBody.errorDetails).toBe("invalid loginID or password");
    });
    await test.step("Verify the error message is displayed", async () => {
      const alertText = "Falsche Zugangsdaten";
      const alertTextLocator = await loginPage.loginAlert(alertText);
      expect(alertTextLocator).toBeVisible();
    });
  });

  test("Can see validation error when email and password are empty", async ({
    loginPage,
  }) => {
    await test.step("Submit form without email and password", async () => {
      await loginPage.submitLoginForm();
    });
    await test.step("Verify the error message is displayed", async () => {
      const alertText = "Bitte überprüfe deine Angaben";
      const uiValidationError = "* Pflichtfeld";
      const alertTextLocator = await loginPage.loginAlert(alertText);
      expect(alertTextLocator).toBeVisible();
      await expect(loginPage.emailFieldUIValidationError).toBeVisible();
      await expect(loginPage.emailFieldUIValidationError).toHaveText(
        uiValidationError,
      );
      await expect(loginPage.passwordFieldUIValidationError).toBeVisible();
      await expect(loginPage.passwordFieldUIValidationError).toHaveText(
        uiValidationError,
      );
    });
  });

  test("Can view password in plain text by clicking on the eye icon", async ({
    loginPage,
  }) => {
    let randomPassword: string;
    await test.step("Fill in random password", async () => {
      randomPassword = faker.internet.password();
      await loginPage.passwordInput.fill(randomPassword);
    });
    await test.step("Click an eye icon and see if field type changed", async () => {
      await loginPage.passwordFieldEyeIcon.click();
      await expect(loginPage.passwordInput).toHaveAttribute("type", "text");
      await expect(loginPage.passwordInput).toHaveValue(randomPassword);
    });
  });
});
