import { ENDPOINTS } from "../../../fixtures/pages";
export class LoginApi {
  constructor(page) {
    this.page = page;
  }

  async loginWithApi(email, password) {
    return await this.page.request.post(ENDPOINTS["LOGIN_ENDPOINT"], {
      headers: { Accept: "application/json" },
      data: {
        email: email,
        password: password,
      },
    });
  }
}
