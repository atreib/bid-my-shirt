import type { Page } from "@playwright/test";

export async function mockSignIn(page: Page) {
  /* Log in through home page */
  await page.goto("/");
  await page.getByRole("link", { name: "Log in" }).click();

  /* Fill email address */
  await page.getByLabel("Email address").click();
  await page.getByLabel("Email address").fill("doe+clerk_test@example.com");
  await page.getByRole("button", { name: "Continue" }).click();

  /* Use mock MFA */
  await page.getByRole("link", { name: "Use another method" }).click();
  await page
    .getByRole("button", { name: "Email code to doe+clerk_test@example.com" })
    .click();
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

  /* Wait for auth to end */
  await page.waitForURL("**/dashboard");
}
