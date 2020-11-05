import axios from 'axios';

export default class BaseService {
    
    constructor(auth) {
        this.auth = auth;
        
        this.createAxios();
        
    }

    createAxios(onError = (error) => {
        return Promise.reject(error);
    }) {
        this.api = axios.create({
            baseURL: '',
            timeout: 1000
          });

          this.api.interceptors.response.use((response) => response, onError);

          return this;
    }

    get baseUrl() {
        if(window.webpackHotUpdate) {
            return "http://www.mylinuxpc.com";
        }
        return "";
    }

    get headers() {
        return {
            'jwt': this.auth ? this.auth.jwt : ''
        }
    }

    get axios() {
        return this.api;
    }

    logout() {
        console.log("logout auth", this.auth);
        this.axios.headers = {};
    }
    
}

