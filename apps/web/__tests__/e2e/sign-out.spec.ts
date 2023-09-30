import { test, expect } from "@playwright/test";
import { getLandingPageContent } from "cms";
import { mockSignIn } from "./fixtures";

const content = getLandingPageContent("homepage");

test("Should sign-out", async ({ page }) => {
  await mockSignIn(page);

  await page.getByTestId("account-button-wrapper").locator("button").click();
  await page.getByRole("button", { name: "Sign out" }).click();

  await page.waitForURL("/");
  const title = page.getByRole("heading", { name: content.title });
  expect(title).toBeDefined();
});
