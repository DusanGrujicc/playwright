import { test, expect } from "@playwright/test";
import {
  generateUserCredentials,
  HEADING,
  URLS,
  utils,
  errorMessages,
} from "../fixtures";
import { LoginPage } from "../pom/modules/ui/loginPage";
import { RegisterPage } from "../pom/modules/ui/registerPage";
import { ERROR_MESSAGES } from "../fixtures/errorMessages";

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

test("Negative-Registe with existing username", async ({ page }) => {
  const registerPage = new RegisterPage(page);
  await registerPage.invalidRegister(page, registerPage.exisistingUsername);
  await expect(page.locator(registerPage.errorMessages)).toBeVisible();
  await expect(page.locator(registerPage.errorMessages)).toHaveText(
    ERROR_MESSAGES["USERNAME_EXISTS"]
  );
});

test("Negative-Register with invalid email format", async ({ page }) => {
  const registerPage = new RegisterPage(page);
  await registerPage.invalidRegister(page, registerPage.invalidEmailFormat);
  await expect(page.locator(registerPage.errorMessage)).toBeVisible();
  await expect(page.locator(registerPage.errorMessage)).toHaveText(
    ERROR_MESSAGES["INVALID_EMAIL_FORMAT"]
  );
});
test("Negative-Register with password too short", async ({ page }) => {
  const registerPage = new RegisterPage(page);
  await registerPage.invalidRegister(page, registerPage.shortPassword);
  await expect(page.locator(registerPage.errorMessage)).toBeVisible();
  await expect(page.locator(registerPage.errorMessage)).toHaveText(
    ERROR_MESSAGES["PASSWORD_TOO_SHORT"]
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
test("Negative-Login with empty fields", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.invalidLogin(page, loginPage.emptyFields);
  await expect(page.locator(loginPage.errorMessage)).toBeVisible();
  await expect(page.locator(loginPage.errorMessage)).toHaveText(
    "Please fill in all fields"
  );
});
