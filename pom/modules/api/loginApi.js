 import { BaseAPI } from "./baseAPI";
 
 export class LoginApi extends BaseAPI {
    constructor (page) {
        super(page)
        this.endpoint = '/api/v1/auth/login'
    }

    async login(payload){
        return await this.post(this.endpoint, payload)        
    };
   
}
