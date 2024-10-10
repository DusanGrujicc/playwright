import {test, expect} from "@playwright/test"
import { LoginApi } from "../../pom/modules/api/loginApi"
import { CustomersAPI } from "../../pom/modules/api/customerAPI"
import { RESPONSE_MESSAGE, VALID_LOGIN_PAYLOAD, utils,STATUS} from "../../fixtures"

test.describe("customers API tests", () =>{
    let loginAPI, customerAPI;
    test.beforeEach("get JWT token", async({page})=>{
        loginAPI = new LoginApi(page);
        const loginResponse = await loginAPI.login(VALID_LOGIN_PAYLOAD);
        customerAPI = new CustomersAPI(page, loginResponse.auth.token);
    })
        test("should be able to get all customers with token", async()=>{
            const response = await customerAPI.getAllCustomers()

            for (let i=1; i<response.customers.length; i++){
                let id = response.customers[i].id
                expect[id].toBe(i + 1)
            }
        })
        test("should not be able to get all customers without token", async({page})=>{
            const customersAPIWithoutToken = new CustomersAPI(page)
            const response = customersAPIWithoutToken.getAllCustomers();

            expect(response.message).toBe(RESPONSE_MESSAGE["UNAUTHENTICATED"])
        })

        test("should be able to get customer", async ()=>{
            const allCustomersResponse = await customerAPI.getAllCustomers();
            const numberOfCustomers = allCustomersResponse.customers.length;
            const randomId = utils.generateRandomNumber(numberOfCustomers)
            const response = await customerAPI.getCustomer(randomId)
            expect(response.status).toBe(STATUS["SUCCESS"])

        })
        test("should be able to update customer first name",async()=>{
            const allCustomersResponse = await customerAPI.getAllCustomers();
            const numberOfCustomers = allCustomersResponse.customers.length;
            const randomId = utils.generateRandomNumber(numberOfCustomers)
            const customerToUpdate= await customerAPI.getCustomer(randomId)
            const customerInfo = customerToUpdate.customer;
            const response = await customerAPI.updateCustomer(customerInfo.id,{
                first_name: `Updated ${customerInfo.first_name}`,
            })
            console.log("response", response)
            expect(customerInfo.first_name).not.toBe(response.customer.first_name)
            expect(response.customer.first_name).toBe(`Updated ${customerInfo.first_name}`)
        })

        test.only("should delete last customer", async()=>{
            const allCustomers = await customerAPI.getAllCustomers();
            const lastCustomerId = allCustomers.customers.length;
            const response = await customerAPI.deleteCustomer(lastCustomerId)
            expect(response.status).toBe(STATUS["SUCCESS"])
            const getDeletedCustomer = await customerAPI.getCustomer(lastCustomerId)
            expect(getDeletedCustomer.error).toBe(RESPONSE_MESSAGE.NO_CUSTOMER_FOUND(lastCustomerId));
                

        })

})