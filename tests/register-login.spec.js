import { test, expect } from "@playwright/test";

test.describe("register test", () => {
  test.beforeEach("visit app", async ({ page }) => {
    await page.goto("https://automaticityacademy.ngrok.app");
  });

  test("registe and login", async ({ page }) => {
    await page.click("button:has-text('Sign up')");
    expect(true).toBe(true);
    await page.getByRole("textbox", { name: "username" }).fill("dusan123");
    await page
      .getByRole("textbox", { name: "email" })
      .fill("dusan123@gmail.com");
    await page.getByRole("textbox", { name: "password" }).fill("test1234");
    await page.click("button:has-text('Register')");
  });

  test("login", async ({ page }) => {
    expect(true).toBe(true);
    await page.click("button:has-text('Sign up')");
    await page.click("a:has-text('Log in now!')");

    await page
      .getByRole("textbox", { name: "email" })
      .fill("dusan123@gmail.com");
    await page.getByRole("textbox", { name: "password" }).fill("test1234");
    await page.click("button:has-text('Sign in')");
  });
});
