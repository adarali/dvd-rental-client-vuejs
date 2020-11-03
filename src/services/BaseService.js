// import axios from 'axios';

import { auth } from './variables';

export default class BaseService {
    
    constructor() {
        this.jwt = "";
    }

    get baseUrl() {
        if(window.webpackHotUpdate) {
            return "http://www.mylinuxpc.com";
        }
        return "";
    }

    get headers() {
        return {
            'jwt': auth.jwt
        }
    }
    
}

