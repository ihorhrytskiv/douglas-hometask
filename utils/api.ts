import { Page } from "@playwright/test";

export async function interceptApiRequestHeaders(
  myPage: Page,
  url: string,
  csrfToken: string,
  cookieHeader: string,
) {
  await myPage.route(`${url}`, async (route, request) => {
    // Clone the request with the added header
    const headers = {
      ...request.headers(),
      cookie: cookieHeader,
      Origin: "https://www.douglas.de",
      Referer: "https://www.douglas.de/de/login",
      "x-csrf-token": `${csrfToken}`,
    };
    // Continue the request with the modified headers
    await route.continue({ headers });
  });
}
