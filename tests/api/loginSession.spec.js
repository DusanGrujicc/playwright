import {test,expect} from "@playwright/test"
import { LoginPage } from "../../pom/modules/ui/loginPage";
import { URLS } from "../../fixtures";

let webContext
test.describe("test saved state", ()=>{
   test.beforeAll("create context and log in" ,async ({browser})=>{
    
        //initialize context
        const context = await browser.newContext();
        const page = await context.newPage();
        const loginPage = new LoginPage(page);

        await page.route("**/api/v1/auth/login", async(route, request)=>{
            console.log("DATA", request.postData)

            await route.continue()
        })
        //UI login preko POMA
        await page.goto(URLS["LOGIN"]);
        await loginPage.login('filip@test.com','test123')
        await expect(page.getByText("Buy some stuff bruh")).toBeVisible();

        // save state ili snimiti sesiju cuvamo kao json file
        await context.storageState({path:"state.json"})

        //inject state
        //pravimo drugi kontekst  i ucitavamo secondContext
        webContext = await browser.newContext({ storageState:"state.json"})
    })
    
    test.only('test',async()=>{
        const page= await webContext.newPage();
        await page.goto(URLS.DASHBOARD)

        await expect(page.getByText("Buy some stuff bruh")).toBeVisible()
    })
})