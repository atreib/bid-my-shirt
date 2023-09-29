import { test, expect } from "@playwright/test";
import { getLandingPageContent } from "cms";

test("Homepage", async ({ page }) => {
  const content = getLandingPageContent("homepage");
  await page.goto("/");

  const title = page.getByRole("heading", { name: content.title });
  expect(title).toBeDefined();

  const subtitle = page.getByRole("heading", { name: content.subtitle });
  expect(subtitle).toBeDefined();

  const mainCTA = page.getByRole("button", { name: "Get started" });
  expect(mainCTA).toBeDefined();

  const menuCTA = page.getByRole("link", { name: "Get started" });
  expect(menuCTA).toBeDefined();

  const menuSignIn = page.getByRole("link", { name: "Log in" });
  expect(menuSignIn).toBeDefined();
});
