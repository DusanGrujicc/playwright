import { BaseAPI } from "./baseAPI";


export class ProductAPI extends BaseAPI {
    constructor(page, token = ""){
        super(page,token);
        this.endpoint = "/api/v1/products"
    }
 async addProduct(payload){
    return await this.post(this.endpoint, payload)
 }
}