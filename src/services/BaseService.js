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
            return "http://192.168.1.5";
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
        this.axios.get(this.baseUrl+'/auth/logout', {headers: this.headers});
        this.axios.headers = {};
    }
    
}

