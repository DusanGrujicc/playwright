import { test, expect } from "@playwright/test";
import { generateUserCredentials, HEADING, URLS, utils } from "../fixtures";
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

    //fill in form and register
    await page.locator("#username").fill(username);
    await page.locator("#email").fill(email);
    await page.locator("#password").fill(password);
    await page.locator("button").click();
    //fill in form and submit
    registerPage.register(username, email, password);

    //verify redirect
    await page.waitForURL(URLS["DASHBOARD"]);
    await expect(page.getByText(HEADING["DASHBOARD"])).toBeVisible();
  });

  test("log in with registered user", async ({ page }) => {
    await page.goto(URLS["LOGIN"]);
    await expect(page.locator(loginPage.heading)).toBeVisible();
    await expect(page.locator(loginPage.heading)).toHaveText(HEADING["LOGIN"]);

    const loginPage = new LoginPage(page);

    //fill in form and submit
    loginPage.login(email, password);

    //wait for and verify redirect
    await page.waitForURL(URLS["DASHBOARD"]);
    await expect(page.getByText(HEADING["DASHBOARD"])).toBeVisible();
  });
});

test("Negative-Registe with existing username", async ({ page }) => {
  const registerPage = new RegisterPage(page);
  await registerPage.invalidRegister(page, registerPage.exisistingUsername);
  await expect(page.locator(registerPage.errorMessage)).toBeVisible();
  await expect(page.locator(registerPage.errorMessage)).toHaveText(
    "Username already exists"
  );
});

test("Negative-Register with invalid email format", async ({ page }) => {
  const registerPage = new RegisterPage(page);
  await registerPage.invalidRegister(page, registerPage.invalidEmailFormat);
  await expect(page.locator(registerPage.errorMessage)).toBeVisible();
  await expect(page.locator(registerPage.errorMessage)).toHaveText(
    "Invalid email format"
  );
});
test("Negative-Register with password too short", async ({ page }) => {
  const registerPage = new RegisterPage(page);
  await registerPage.invalidRegister(page, registerPage.shortPassword);
  await expect(page.locator(registerPage.errorMessage)).toBeVisible();
  await expect(page.locator(registerPage.errorMessage)).toHaveText(
    "Password must be at least 8 characters long"
  );
});

test("Negative-Login with non-existent username", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.invalidLogin(page, loginPage.nonExistentUsername);
  await expect(page.locator(loginPage.errorMessage)).toBeVisible();
  await expect(page.locator(loginPage.errorMessage)).toHaveText(
    "Username does not exist"
  );
});
test("Negative-Login with incorrect password", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.invalidLogin(page, loginPage.incorrectPassword);
  await expect(page.locator(loginPage.errorMessage)).toBeVisible();
  await expect(page.locator(loginPage.errorMessage)).toHaveText(
    "Incorrect password"
  );
});
//mala izmena