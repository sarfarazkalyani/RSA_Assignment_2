import { test, expect } from "@playwright/test";

/*
The built-in page fixture provides a ready-to-use page for the test.
Playwright automatically manages that page and its context.
A browser context is a separate session container that can hold multiple pages.
A fresh context has isolated session state, such as cookies, local storage and cache.
In this test, the email entered on the fixture page did not appear on the fresh context’s page.
*/

test('Login page smoke test', async ({ page }) => {
  await page.goto("/login");
  await expect(page).toHaveTitle(/EventHub/);
  await expect(page.getByLabel("Email")).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign In" })).toBeVisible();
});


test("Browser context and page isolation", async ({ page, browser }) => {
  await page.goto("/login");
  await page.getByLabel("Email").fill("beginner@sample.com");
  await expect(page.getByLabel("Email")).toHaveValue("beginner@sample.com");

  const isolatedContext = await browser.newContext();
  const isolatedPage = await isolatedContext.newPage();
  await isolatedPage.goto("https://eventhub.rahulshettyacademy.com/login");
  await expect(isolatedPage.getByRole("heading", { name: "Sign in to EventHub" })).toBeVisible();
  await expect(isolatedPage.getByLabel("Email")).toBeEmpty();
  // await expect(isolatedPage.getByLabel("Email")).toHaveValue("");
  await isolatedContext.close()
});

