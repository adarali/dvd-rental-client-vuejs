import axios from 'axios';

export default class BaseService {
    
    constructor(jwt = "") {
        this.jwt = jwt;
        
        this.createAxios();
        
    }

    createAxios(onError = (error) => {
        return Promise.reject(error);
    }) {
        this.api = axios.create({
            baseURL: '',
            timeout: 1000,
            headers: this.headers
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
            'jwt': this.jwt
        }
    }

    get axios() {
        return this.api;
    }
    
}

