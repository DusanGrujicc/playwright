class RegisterApi {
    constructor (page){
        this.page = page
    }


async registerViable (username,email,password){
    let response = await this.page.request.post('/api/v1/auth/register', {
        headers : {Accept:"application/json" },
        data:{
            username: username,
            email:email,
            password:password,
        },
    });
    let responseJson = await response.json()

    return responseJson
}
}
