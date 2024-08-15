import {
  test as baseTest,
  Browser,
  BrowserContext,
  Page,
} from "@playwright/test";
import { LoginPage } from "../pages/login/loginPage";
import { AccountPage } from "../pages/account/accountPage";
import { chromium } from "playwright";

type CustomFixtures = {
  loginPage: LoginPage;
  accountPage: AccountPage;
};

type WorkerFixtures = {
  setup: {
    browser: Browser;
    context: BrowserContext;
    page: Page;
  };
};

export const test = baseTest.extend<CustomFixtures, WorkerFixtures>({
  // Setup Worker fixtures
  setup: [
    async ({}, use) => {
      const browser = await chromium.launch({
        args: [
          "--disable-blink-features=AutomationControlled",
          "--disable-web-security",
        ],
      });

      const context = await browser.newContext({
        userAgent:
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
        viewport: { width: 1280, height: 720 },
        javaScriptEnabled: true,
      });

      const page = await context.newPage();

      // Pass the initialized objects to the worker storage
      await use({ browser, context, page });

      // Cleanup after tests are done
      await browser.close();
    },
    { scope: "worker" },
  ],

  // Page fixtures
  loginPage: async ({ setup }, use) => {
    await use(new LoginPage(setup.page));
  },
  accountPage: async ({ setup }, use) => {
    await use(new AccountPage(setup.page));
  },
});
