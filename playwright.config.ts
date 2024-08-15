import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI
    ? [
        ["list"],
        ["html", { open: "never" }],
        [
          "playwright-qase-reporter",
          {
            testops: {
              api: {
                token: process.env.QASE_TESTOPS_API_TOKEN,
              },
              project: "DGLS",
              uploadAttachments: true,
              run: {
                complete: true,
              },
            },
          },
        ],
      ]
    : [
        ["list"],
        ["html", { open: "never" }],
        [
          "playwright-qase-reporter",
          {
            testops: {
              api: {
                token: process.env.QASE_TESTOPS_API_TOKEN,
              },
              project: "DGLS",
              uploadAttachments: true,
              run: {
                complete: true,
              },
            },
          },
        ],
      ],
  use: {
    baseURL: process.env.BASE_URL,
    trace: "on",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
    viewport: { width: 1280, height: 720 },
    geolocation: { longitude: 13.404954, latitude: 52.520008 },
    permissions: ["geolocation"],
    timezoneId: "Europe/Berlin",
    locale: "de-DE",
    serviceWorkers: "block",
    launchOptions: {
      args: ["--disable-web-security"],
    },
    extraHTTPHeaders: {
      "accept-encoding": "gzip, deflate, br, zstd",
      "Sec-ch-ua": `"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"`,
      "Sec-ch-ua-mobile": "?0",
      "Sec-fetch-dest": "empty",
      "Sec-fetch-mode": "cors",
      "Sec-fetch-site": "same-origin",
    },
  },
  projects: [
    {
      name: "All",
      testMatch: "**/*.spec.ts",
      use: { channel: "chrome" },
    },

    // {
    //   name: "Smoke",
    //   testMatch: "**/*.spec.ts",
    //   grep: /@Smoke/,
    //   use: { channel: "chrome" },
    // },

    // {
    //   name: "Regression",
    //   testMatch: "**/*.spec.ts",
    //   grep: /@Regression/,
    //   use: { channel: "chrome" },
    // },
  ],
});
