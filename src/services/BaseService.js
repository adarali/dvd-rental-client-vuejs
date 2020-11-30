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
            timeout: 3000,
            withCredentials: true
          });
        
          this.api.interceptors.response.use((response) => response, onError);

          return this;
    }

    get baseUrl() {
        return process.env.VUE_APP_BASE_URL
    }

    get headers() {
        return {
            'Authorization': 'Bearer ' + (this.auth ? this.auth.jwt : '')
        }
    }

    get axios() {
        return this.api;
    }

    logout() {
        // this.axios.get(this.baseUrl+'/auth/logout', {headers: this.headers});
        this.axios.headers = {};
    }
    
}

