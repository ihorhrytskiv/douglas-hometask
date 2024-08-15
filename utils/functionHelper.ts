import { Page } from "@playwright/test";

export async function getCsrfToken(myPage: Page) {
  const scriptContent = await myPage.$eval(
    "#state-body",
    (element) => element.textContent,
  );
  // Extract the CSRF token using a regular expression
  const csrfTokenMatch = scriptContent?.match(/"csrf":\{"token":"(.*?)"\}/);
  let csrfToken = null;
  if (csrfTokenMatch) {
    csrfToken = csrfTokenMatch[1];
  }
  console.log("CSRF Token:", csrfToken);
  return csrfToken || "";
}

export async function populateCookieHeader(myPage: Page) {
  // Set required headers and cookies
  const cookies = await myPage.context().cookies();
  const cookieHeader = cookies
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");
  return cookieHeader;
}
