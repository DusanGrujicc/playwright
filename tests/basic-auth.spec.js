import {test, expect} from "@playwright/test"

import {  generateUserCredentials,HEADING , URLS, utils } from "../fixtures"
import { LoginPage } from "../pom/modules/ui/loginPage";
import { RegisterPage } from "../pom/modules/ui/registerPage";



let loginEmail , loginPassword;
test.describe.configure({mode:"serial"})
test.describe("registed a user and log in ", ()=>{
    test("register a user with valid data", async({page}) => {
        //generate random user credentials
        const {username,email,password} = generateUserCredentials(5)
        loginEmail = email;
        loginPassword = password;

        //instantiate POM class
        const registerPage = new RegisterPage(page)


        //visit page and validate
        await page.goto(URLS["REGISTER"])
        await expect(page.locator(registerPage.heading)).toBeVisible();
        await expect(page.locator(registerPage.heading)).toHaveText(HEADING["REGISTER"]);

        //fill in form and register
        await  page.locator("#username").fill(username)
        await  page.locator("#email").fill(email)
        await  page.locator("#password").fill(password)
        await  page.locator("button").click()
        //fill in form and submit
        registerPage.register(username,email,password)


        //verify redirect
        await page.waitForURL (URLS["DASHBOARD"])
        await expect(page.getByText(HEADING["DASHBOARD"])).toBeVisible();
    })

    test("log in with registered user", async ({page})=>{
        await page.goto(URLS["LOGIN"])
        await expect(page.locator(loginPage.heading)).toBeVisible();
        await expect(page.locator(loginPage.heading)).toHaveText(HEADING["LOGIN"]);

        const loginPage = new LoginPage(page)

        //fill in form and submit
       loginPage.login(email,password)

        //wait for and verify redirect
        await page.waitForURL (URLS["DASHBOARD"])
        await expect(page.getByText(HEADING["DASHBOARD"])).toBeVisible();
        })
})

