import { ENDPOINTS } from "../../../fixtures/pages";
import { BaseAPI } from "./baseAPI";

export class ProductAPI extends BaseAPI {
  constructor(page, token = "") {
    super(page, token);
    this.endpoint = ENDPOINTS["PRODUCTS_ENDPOINT"];
  }
  async addProduct(payload) {
    return await this.post(this.endpoint, payload);
  }
}
