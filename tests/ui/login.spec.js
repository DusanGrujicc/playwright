import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pom/modules/ui/loginPage";

let loginPage;
test.describe("log in", () => {
  test.beforeEach("visit app and instantiate POM", async ({ page }) => {
    await page.goto("/login");
    await expect(page).toHaveURL(/.*login/);
    loginPage = new LoginPage(page);
  });

  test("form text inputs should be editable", async ({ page }) => {
    await expect(loginPage.emailInput).toBeEditable();
    await expect(loginPage.passwordInput).toBeEditable();
  });

  test("form should have 2 text inputs", async ({ page }) => {
    // >> if element is not direct childs
    await expect(page.locator("form >> input")).toHaveCount(2);
  });

  test("form text inputs should have same classes", async ({ page }) => {
    let classesToAsser = "w-full rounded p-inputtext p-component";
    await expect(loginPage.emailInput).toHaveClass(classesToAsser);
    await expect(loginPage.passwordInput).toHaveClass(classesToAsser);
  });

  test("for text input should both have ID atributes", async ({ page }) => {
    await expect(loginPage.emailInput).toHaveId("email");
    await expect(loginPage.passwordInput).toHaveId("password");
  });

  test("form text input should both have placeholder attribute", async ({
    page,
  }) => {
    await expect(loginPage.emailInput).toHaveAttribute("placeholder");
    await expect(loginPage.passwordInput).toHaveAttribute("placeholder");
  });

  test("form text input should both have placeholder values", async ({
    page,
  }) => {
    const emailPlaceholder = "Email address";
    const passwordPlaceholder = "Password";
    await expect(loginPage.emailInput).toHaveAttribute(
      "placeholder",
      emailPlaceholder
    );
    await expect(loginPage.passwordInput).toHaveAttribute(
      "placeholder",
      passwordPlaceholder
    );
  });

  test("form text input should both have values when typed into", async ({
    page,
  }) => {
    const emailValue = "test@email.com";
    const passwordValue = "test123";

    await loginPage.emailInput.fill(emailValue);
    await expect(loginPage.emailInput).toHaveValue(emailValue);

    await loginPage.passwordInput.fill(passwordValue);
    await expect(loginPage.passwordInput).toHaveValue(passwordValue);
  });

  test("tesxt inputs should be enabled", async () => {
    await expect(loginPage.emailInput).toBeEnabled();
    await expect(loginPage.passwordInput).toBeEnabled();
  });

  test("form submit button should be enabled", async () => {
    await expect(loginPage.submitButton).toBeEnabled();
  });

  test("forms can be focused", async () => {
    await loginPage.emailInput.click();
    await expect(loginPage.emailInput).toBeFocused();

    await loginPage.passwordInput.click();
    await expect(loginPage.passwordInput).toBeFocused();
  });

  test("forms can be empty", async () => {
    await expect(loginPage.emailInput).toBeEmpty();
    await expect(loginPage.passwordInput).toBeEmpty();
  });

  test("forms should be in viewport", async ({ page }) => {
    await expect(page.locator("form")).toBeInViewport();
    await expect(page.locator("form >> button")).toBeInViewport();
    await expect(page.locator("form >> input").nth(0)).toBeInViewport();
    await expect(page.locator("form >> input").nth(1)).toBeInViewport();
  });
});
