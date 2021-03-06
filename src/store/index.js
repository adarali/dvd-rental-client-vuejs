import { createStore } from 'vuex';
import Auth from '@/classes/auth';
import BaseService from '../services/BaseService';

const store = new createStore({
    state() {
        return {
            menuKey: 0,
            auth: new Auth(localStorage.getItem('jwt'), JSON.parse(localStorage.getItem('user')?localStorage.getItem('user'): '{}')),
            services: {

            },
            pageTitle: 'Movies',
        }
        
    },
    getters: {
        isAdmin: state => state.auth.isAdmin,
        isLoggedIn: state => state.auth.isLoggedIn,
        auth: state => state.auth,
        services: state => state.services,
        menuKey: state => state.menuKey,
        pageTitle: state => state.pageTitle,
    },
    mutations: {
        setAuth(state, auth) {
            state.auth.login(auth.jwt, auth.user);
        },
        incrementMenuKey(state) {
            state.menuKey++;
        },
        logout(state) {
            let service = new BaseService(state.auth);
            if(service) service.logout();
            state.auth.logout();
            state.menuKey++;
        },
        pageTitle(state, title) {
            state.pageTitle = title;
        }
    }
});
  
export default store;