import { test, expect } from "@playwright/test";
import { RegisterApi } from "../../pom/modules/api/registerApi";
import { generateUserCredentials ,STATUS} from "../../fixtures";


test.describe('register API test', ()=>{
    let registerAPI;

    test.beforeEach('instantiate POM',({page})=>{
        registerAPI = new RegisterApi(page)
    })
      
    test("registed user with valid credentials", async()=>{
        const response = await registerAPI.register(generateUserCredentials(5))

        expect(response.status).toBe(STATUS["SUCCESS"])
        console.log(response)

    })
     
    
})