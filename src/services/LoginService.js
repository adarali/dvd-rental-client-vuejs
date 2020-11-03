import axios from 'axios'
import BaseService from './BaseService'
import {auth} from './variables';

export default class LoginService extends BaseService {
    
    login(username, password) {
        console.log("logging in")
        let url = this.baseUrl + '/auth'
        return axios.post(url, {username: username, password: password}).then(res => {
                console.log("login res", res.data.user.fullName)
                auth.jwt = res.data.jwt;
                auth.user = res.data.user;
        });
    }

}