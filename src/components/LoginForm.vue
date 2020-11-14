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
        <Button class="p-button-danger" @click="cancel()">Cancel</Button>
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
    computed: {
        auth() {
            return this.$store.getters.auth;
        }
    },
    methods: {
        login() {
            this.$store.getters.services.loginService = this.service;
            let auth = this.auth;
            this.service.login(this.request).then(res => {
                auth.login(res.data.jwt, res.data.user);

                this.$store.commit('incrementMenuKey');

                this.cancel();    
            }).catch((error) => this.$messages.showError(error.response.data.error.message, this));
        },
        cancel() {
            this.$router.back();
        }
    }
    
}
</script>

<style>

</style>