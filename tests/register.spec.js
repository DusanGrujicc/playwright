import { test, expect } from "@playwright/test";
import { RegisterPage } from "../pom/modules/ui/registerPage";
import { describe } from "node:test";

test.describe("Register",()=>{
    test.beforeEach('visit app and instantiate POM',async({page})=>{
        await page.goto('/register')
        registerPage= new RegisterPage(page)
    })
    
})