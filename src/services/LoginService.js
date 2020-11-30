import BaseService from './BaseService'
// import {auth} from './variables';

export default class LoginService extends BaseService {

    constructor() {
        super();
        this.createAxios();
    }
    
    login2(request) {
        let url = this.baseUrl + '/login/auth'
        return this.axios.post(url, request)
        // .then(res => {
        //         console.log("login res", res.data.user.fullName)
        //         auth.jwt = res.data.jwt;
        //         auth.user = res.data.user;
        // });
    }

    login(token) {
        let url = this.baseUrl + '/login/auth?token='+token;
        console.log(url);
        return this.axios.get(url);
    }

    logout(jwt) {
        this.jwt = jwt;
        return this.axios.get(this.baseUrl + "/auth/logout", {headers: this.headers})
    }

}