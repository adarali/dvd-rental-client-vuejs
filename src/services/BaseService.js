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
            timeout: 3000
          });

          this.api.interceptors.response.use((response) => response, onError);

          return this;
    }

    get baseUrl() {
        if(process.env.NODE_ENV === 'development') {
            return "http://192.168.1.5";
        }
        return "https://limitless-temple-47840.herokuapp.com";
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

