import { test, expect } from "@playwright/test";
import { LoginApi } from "../../pom/modules/api/loginApi";
import {
  VALID_LOGIN_PAYLOAD,
  STATUS,
  generateUserCredentials,
  RESPONSE_MESSAGE,
} from "../../fixtures";

test.describe("login API test", () => {
  let loginAPI;

  test.beforeEach("instantiate POM", ({ page }) => {
    loginAPI = new LoginApi(page);
  });
  test("should not be able to login with empty payload properties", async () => {
    const credentials = generateUserCredentials(0);
    const response = await loginAPI.login({
      email: "",
      password: "",
    });

    expect(response.message).toBe(RESPONSE_MESSAGE("INVALID_EMAIL"));
  });
  test("should be able to login with valid data", async () => {
    const response = await loginAPI.login(VALID_LOGIN_PAYLOAD);
    console.log(response);
    expect(response.status).toBe(STATUS["SUCCESS"]);
    expect(response.user.email).toBe(VALID_LOGIN_PAYLOAD.email);
  });
});
