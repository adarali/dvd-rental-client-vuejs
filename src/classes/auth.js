export default class Auth {
    constructor(jwt = null, user = {}){
        this.login(jwt, user == null ? {} : user);
    }

    get isLoggedIn() {
        if(this.jwt) {
            return true;
        }
        return false;
    }

    get isAdmin() {
        if(this.isLoggedIn && this.user.admin) {
            return true;
        }
        return false;
    }

    login(jwt, user) {
        let auth = this;

        auth.jwt = jwt;
        auth.user = user;

        localStorage.setItem('jwt', auth.jwt);
        localStorage.setItem('user', JSON.stringify(auth.user));
    }

    logout() {
        this.jwt = '';
        this.user = {};

        this.updateLocalStorage();
    }

    updateLocalStorage() {
        localStorage.setItem('jwt', this.jwt);
        localStorage.setItem('user', JSON.stringify(this.user));
    }

}