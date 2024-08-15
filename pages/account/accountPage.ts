import { Page } from "@playwright/test";

export class AccountPage {
  constructor(public readonly page: Page) {}

  async accountName(accountName: string) {
    return this.page.getByRole("heading", { name: `${accountName}` });
  }
}
