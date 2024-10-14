import { ENDPOINTS } from "../../../fixtures/pages";
import { BaseAPI } from "./baseAPI";
export class RegisterApi extends BaseAPI {
  constructor(page, token = "") {
    super(page, token);
  }
  async registerWithApi(username, email, password) {
    return await this.page.request.post(ENDPOINTS["REGISTER_ENDPOINT"], {
      headers: this.getHeaders(),
      data: {
        username: username,
        email: email,
        password: password,
      },
    });
  }
}
