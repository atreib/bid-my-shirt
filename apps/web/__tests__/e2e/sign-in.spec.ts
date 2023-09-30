import { test, expect } from "@playwright/test";
import { mockSignIn } from "./fixtures";

test("Should sign-in", async ({ page }) => {
  await mockSignIn(page);
  await expect(page).toHaveTitle(/Dashboard/);
});
