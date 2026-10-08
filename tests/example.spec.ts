import { test, expect } from "@playwright/test";

const BASE_URL = "https://playwright.dev/";

test("has title", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test("Basic Action", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  await expect(page).toHaveURL(/.*intro/);

  await page.getByRole("link", { name: "Writing tests", exact: true }).click();

  await page.getByRole("button", { name: "Search" }).click();

  const locator_search = page.locator(".DocSearch-Form");
  await expect(locator_search).toBeVisible();

  const searchInput = page.getByRole("searchbox", { name: "Search" });

  await searchInput.click();
  await searchInput.pressSequentially("Testing", { delay: 300 });
  await expect(searchInput).toHaveValue("Testing");
  await searchInput.press("Enter");
  await page.waitForTimeout(2000);
});

test("Assertion Test", async ({ page }) => {
  await page.goto(BASE_URL);

  await page.getByRole("link", { name: "Get started" }).click();

  await expect(page).toHaveURL(/.*intro/);

  await page.getByRole("link", { name: "Writing tests", exact: true }).click();

  const targetCell = page.getByRole("cell", { name: "Click the element" });

  await targetCell.scrollIntoViewIfNeeded();

  await expect(targetCell).toBeVisible();

  await page.getByRole("link", { name: "GitHub repository" }).hover();
});
