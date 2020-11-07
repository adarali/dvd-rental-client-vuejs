import BaseService from './BaseService'
// import {auth} from './variables';

export default class LoginService extends BaseService {

    constructor() {
        super();
        this.createAxios();
    }
    
    login(request) {
        let url = this.baseUrl + '/auth'
        return this.axios.post(url, request)
        // .then(res => {
        //         console.log("login res", res.data.user.fullName)
        //         auth.jwt = res.data.jwt;
        //         auth.user = res.data.user;
        // });
    }

    logout(jwt) {
        this.jwt = jwt;
        return this.axios.get(this.baseUrl + "/auth/logout", {headers: this.headers})
    }

}