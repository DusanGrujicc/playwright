 export class LoginApi {
    constructor (page) {
        this.page = page;
    }

    async loginViable(email,password){
        let response = await this.page.request.post('/api/v1/auth/login', {
        
            headers: {Accept:"application"},
            data:{
                email:email,
                password:password,
            },
        
        
    });
    let responseJson = await response.json()

    return responseJson
}
}