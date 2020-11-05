import { createStore } from 'vuex';
import Auth from '@/classes/auth';

const store = new createStore({
    state() {
        return {
            menuKey: 0,
            auth: new Auth(localStorage.getItem('jwt'), JSON.parse(localStorage.getItem('user'))),
            services: {

            }
        }
        
    },
    getters: {
        isAdmin: state => state.auth.isAdmin,
        isLoggedIn: state => state.auth.isLoggedIn,
        auth: state => state.auth,
        services: state => state.services,
        menuKey: state => state.menuKey,
    },
    mutations: {
        setAuth(state, auth) {
            state.auth.login(auth.jwt, auth.user);
        },
        incrementMenuKey(state) {
            state.menuKey++;
        },
        logout(state) {
            state.auth.logout();
            for(const prop in state.services) {
                console.log("state.services.prop", prop);
                state.services[prop].logout();
            }
            state.menuKey++;
        }
    }
});
  
export default store;