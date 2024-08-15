import { Page } from "@playwright/test";

export class LoginPage {
  constructor(public readonly page: Page) {}

  // Login Form
  readonly loginFormContainer = this.page.locator("#loginForm");
  readonly emailInput = this.loginFormContainer.locator('input[name="email"]');
  readonly passwordInput = this.loginFormContainer.locator(
    'input[name="password"]',
  );
  readonly rememberMeCheckbox = this.loginFormContainer.getByTestId(
    "checkbox-remember-me",
  );
  readonly rememberMeCheckboxState = this.loginFormContainer.getByTestId(
    "checkbox-remember-me",
  );
  readonly submitButton = this.loginFormContainer.locator(
    'button[type="submit"]',
  );
  async loginAlert(alertText: string) {
    return this.page.getByTestId("alert").filter({ hasText: `${alertText}` });
  }
  readonly emailFieldUIValidationError = this.loginFormContainer
    .locator(".login__email")
    .locator(".input__error");
  readonly passwordFieldUIValidationError = this.loginFormContainer
    .locator(".login__password")
    .locator(".input__error");
  readonly passwordFieldEyeIcon = this.loginFormContainer
    .locator(".login__password")
    .getByRole("button");
  async submitLoginForm() {
    await this.submitButton.click();
  }

  // Forgot Password Form
  readonly forgotPasswordLink = this.loginFormContainer.getByText(
    "Passwort vergessen?",
  );
  readonly forgotPasswordFormContainer = this.page.locator(
    "#forgotPasswordForm",
  );
  readonly forgotPasswordEmailInput = this.forgotPasswordFormContainer.locator(
    'input[name="forgotPasswordEmail"]',
  );
  readonly forgotPasswordSubmitButton =
    this.forgotPasswordFormContainer.getByRole("button", {
      name: "E-Mail absenden",
    });
  readonly forgotPasswordAlertMessage = this.page
    .getByRole("dialog")
    .locator(".alert--success");
  readonly forgotPasswordAlertMessageEmail = this.page
    .getByRole("dialog")
    .locator(".forgot-password__confirmation-email");
}
