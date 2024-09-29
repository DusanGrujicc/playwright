const { test, page, expect } = require("@playwright/test");

test("registe and login", async ({ page }) => {
  await page.goto("https://automaticityacademy.ngrok.app/register");
  await page.getByRole("textbox", { name: "username" }).fill("dusan123");
  await page.getByRole("textbox", { name: "email" }).fill("dusan123@gmail.com");
  await page.getByRole("textbox", { name: "password" }).fill("test1234");
  await page.click("button:has-text('Register')");

  await expect(page.getByText("successfully registered!")).toBeVisible();
});
