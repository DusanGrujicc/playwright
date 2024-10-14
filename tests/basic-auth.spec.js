import { test, expect } from "@playwright/test";
import { generateUserCredentials, HEADING, URLS } from "../fixtures";
import { LoginPage } from "../pom/modules/ui/loginPage";
import { RegisterPage } from "../pom/modules/ui/registerPage";

let loginEmail, loginPassword;
test.describe.configure({ mode: "serial" });
test.describe("registed a user and log in", () => {
  test("register a user with valid data", async ({ page }) => {
    const { username, email, password } = generateUserCredentials(5);
    loginEmail = email;
    loginPassword = password;

    //instantiate POM class
    const registerPage = new RegisterPage(page);

    //visit page and validate
    await page.goto(URLS["REGISTER"]);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("h1")).toHaveText(HEADING["REGISTER"]);

    //fill in form and submit
    registerPage.register(username, email, password);

    //verify redirect
    await page.waitForURL(URLS["DASHBOARD"]);
    await expect(page.getByText(HEADING["DASHBOARD"])).toBeVisible();
  });

  test("log in with registered user", async ({ page }) => {
    await page.goto(URLS["LOGIN"]);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("h1")).toHaveText(HEADING["LOGIN"]);

    const loginPage = new LoginPage(page);

    //fill in form and submit
    loginPage.login(loginEmail, loginPassword);

    //wait for and verify redirect
    await page.waitForURL(URLS["DASHBOARD"]);
    await expect(page.getByText(HEADING["DASHBOARD"])).toBeVisible();
  });
});