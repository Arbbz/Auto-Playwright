import { test, expect } from "@playwright/test";

test("Recording Session", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc/#/");
  await page.getByText("This is just a demo of").click();
  await page.getByRole("textbox", { name: "What needs to be done?" }).click();
  await page
    .getByRole("textbox", { name: "What needs to be done?" })
    .fill("Can you test me?");
  await page
    .getByRole("textbox", { name: "What needs to be done?" })
    .press("Enter");
  await page.getByRole("link", { name: "Completed" }).click();
  await page.getByRole("link", { name: "All" }).click();
  await expect(page.getByRole("link", { name: "Completed" })).toBeVisible();
  await expect(page.locator("body")).toContainText("Completed");
  await expect(page.getByTestId("todo-title")).toMatchAriaSnapshot(
    `- text: Can you test me?`,
  );
});
