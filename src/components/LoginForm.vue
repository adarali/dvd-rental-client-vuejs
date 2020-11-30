<template>
  <div class="card">
        <div class="p-fluid">
            <div class="p-field">
                <label for="firstname">Username</label>
                <InputText v-model="request.username" />
            </div>
            <div class="p-field">
                <label for="lastname">Password</label>
                <Password v-model="request.password" :feedback="false"/>
            </div>
        </div>
        <Button class="p-mr-2" @click="login()">Log in</Button>
        <Button class="p-button-danger p-mr-2" @click="cancel()">Cancel</Button>
        <div>
            <a :href="apiBaseUrl+'/oauth2/authorization/github'" class="btn-auth btn-github large">GitHub</a>
            <a :href="apiBaseUrl+'/oauth2/authorization/google'" class="btn-auth btn-google large">
                Sign in with <b>Google</b></a>
            
        </div>
    </div>
  
</template>

<script>
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';

import LoginService from '@/services/LoginService';

// import { inject } from 'vue';

export default {
    components: {
        InputText,
        Password,
        Button,
    },
    prpos: {
        token: String,
    },
    data() {
        return {
            service: new LoginService(),
            request: {
                username: '',
                password: '',
            }
        }
    },
    created() {
        this.$store.commit('pageTitle', "Login")
    },
    mounted() {
        let token = new URLSearchParams(window.location.search).get('token');
        console.log(token)
        if(token) {
            console.log("token", token)
            this.login(token);
            window.history.replaceState({}, document.title, "./");
        } else {
            console.log("no token")
        }
    },
    computed: {
        auth() {
            return this.$store.getters.auth;
        },
        apiBaseUrl() {
            return process.env.VUE_APP_BASE_URL
        }
    },
    methods: {
        login(token = '') {
            this.$store.getters.services.loginService = this.service;
            let auth = this.auth;
            console.log("token", token)
            let loginFuture = token? this.service.login(token) : this.service.login2(this.request);
            loginFuture.then(res => {
                console.log(res, auth);
                auth.login(res.data.jwt, res.data.user);
                console.log("auth", auth.jwt);
                this.$store.commit('incrementMenuKey');

                this.cancel();    
            }
            ).catch((error) => this.$messages.showError(error.response.data.message, this));
        },
        cancel() {
            this.$router.push('/movie');
        },
        loginWithGitHub() {
            window.open('http://www.mylinuxpc.com:8080/oauth2/authorization/github');
        }
    }
    
}
</script>

<style>
@import url('https://gitcdn.link/repo/necolas/css3-social-signin-buttons/gh-pages/auth-buttons.css');

</style>