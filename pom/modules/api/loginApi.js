import { ENDPOINTS } from "../../../fixtures/pages";
import { BaseAPI } from "./baseAPI";
export class LoginApi extends BaseAPI {
  constructor(page, token = "") {
    super(page, token);
  }

  async loginWithApi(email, password) {
    return await this.page.request.post(ENDPOINTS["LOGIN_ENDPOINT"], {
      headers: this.getHeaders(),
      data: {
        email: email,
        password: password,
      },
    });
  }
}
