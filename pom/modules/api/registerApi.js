import { ENDPOINTS } from "../../../fixtures/pages";
export class RegisterApi {
  constructor(page) {
    this.page = page;
  }
  async registerWithApi(username, email, password) {
    return await this.page.request.post(ENDPOINTS["REGISTER_ENDPOINT"], {
      headers: { Accept: "application/json" },
      data: {
        username: username,
        email: email,
        password: password,
      },
    });
  }
}
