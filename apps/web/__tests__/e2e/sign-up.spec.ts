import { test, expect } from "@playwright/test";

test("Should sign up and delete account", async ({ page }) => {
  await page.goto("/");

  /* Click main CTA */
  await page.getByRole("link", { name: "Get started" }).first().click();

  /* Sign up */
  await page.getByRole("link", { name: "Sign up" }).click();
  await page.waitForURL("**/sign-up?**");

  await page.getByLabel("Email address").click();
  await page.getByLabel("Email address").fill("jane+clerk_test@example.com");
  await page.getByRole("button", { name: "+55" }).click();
  await page.getByText("United States").click();
  await page.getByLabel("Phone number").click();
  await page.getByLabel("Phone number").fill("9735550133");
  await page.getByLabel("Password", { exact: true }).click();
  await page
    .getByLabel("Password", { exact: true })
    .fill("anfsdklf;jdsklafjakfkds");
  await page.getByRole("button", { name: "Continue" }).click();

  /* Enter MFA for email */
  await page.getByLabel("Enter verification code.  Digit 1").click();
  await page.getByLabel("Enter verification code.  Digit 1").fill("4");
  await page.getByLabel("Digit 2").click();
  await page.getByLabel("Digit 2").fill("2");
  await page.getByLabel("Digit 3").click();
  await page.getByLabel("Digit 3").fill("4");
  await page.getByLabel("Digit 4").click();
  await page.getByLabel("Digit 4").fill("2");
  await page.getByLabel("Digit 5").click();
  await page.getByLabel("Digit 5").fill("4");
  await page.getByLabel("Digit 6").click();
  await page.getByLabel("Digit 6").fill("2");

  /* Enter MFA for cellphone */
  await page.getByLabel("Enter verification code.  Digit 1").click();
  await page.getByLabel("Enter verification code.  Digit 1").fill("4");
  await page.getByLabel("Digit 2").click();
  await page.getByLabel("Digit 2").fill("2");
  await page.getByLabel("Digit 3").click();
  await page.getByLabel("Digit 3").fill("4");
  await page.getByLabel("Digit 4").click();
  await page.getByLabel("Digit 4").fill("2");
  await page.getByLabel("Digit 5").click();
  await page.getByLabel("Digit 5").fill("4");
  await page.getByLabel("Digit 6").click();
  await page.getByLabel("Digit 6").fill("2");

  /* Expect to get to dashboard */
  await page.waitForURL("**/dashboard");
  await expect(page).toHaveTitle(/Dashboard/);

  /* Delete account */
  await page.getByTestId("account-button-wrapper").locator("button").click();
  await page.getByRole("button", { name: "Manage account" }).click();
  await page.getByLabel("Delete account").click();
  await page.getByPlaceholder("Delete account").click();
  await page.getByPlaceholder("Delete account").fill("Delete account");
  await page.locator("button").filter({ hasText: "Delete account" }).click();
});
