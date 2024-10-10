import {test, expect} from "@playwright/test"
import { LoginApi } from "../../pom/modules/api/loginApi"
import { ProductAPI } from "../../pom/modules/api/productsAPI";
import { STATUS, VALID_LOGIN_PAYLOAD, utils} from "../../fixtures";

test.describe("Product API tests", () =>{
    let loginAPI, productAPI;
    test.beforeEach("get JWT token", async({page})=>{
        loginAPI = new LoginApi(page);
        const loginResponse = await loginAPI.login(VALID_LOGIN_PAYLOAD);
        productAPI = new ProductAPI(page, loginResponse.auth.token);
    })
test ("should be able to post new product", async()=>{
    const newProduct = {
        name: utils.generateRandomString(8),
        description: utils.generateRandomString(22),
        price:Number (`${utils.generateRandomNumber(100)}.${utils.generateRandomNumber(99)}}`),
        in_stock: true,
        quantity:utils.generateRandomNumber(100),
        rating: Number(`${utils.generateRandomNumber(5)}.${utils.generateRandomNumber(9)}}`),
} 
const response = await productAPI.newProduct(newProduct)
console.log(response)
expect(response.status).toBe(STATUS["SUCCESS"])

})

})