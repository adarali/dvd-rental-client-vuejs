<template>
  <div class="card">
        <h3>Login Form</h3>
        <div class="p-fluid">
            <div class="p-field">
                <label for="firstname">Username</label>
                <InputText v-model="request.username" />
            </div>
            <div class="p-field">
                <label for="lastname">Password</label>
                <Password v-model="request.password"/>
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

import { inject } from 'vue';

export default {
    components: {
        InputText,
        Password,
        Button,
    },
    data() {
        return {
            service: new LoginService(),
            auth: inject('auth'),
            request: {
                username: '',
                password: '',
            }
        }
    },
    methods: {
        login() {
            let auth = this.auth;
            this.service.login(this.request).then(res => {
                console.log("login res", res.data.user.fullName)


                auth.login(res.data.jwt, res.data.user);

                localStorage.setItem('jwt', auth.jwt);
                localStorage.setItem('user', JSON.stringify(auth.user));

                this.cancel();    
            }).catch(error => {
                console.log(error)
                // this.$toast.add({severity:'error', summary: 'Login failed', detail:error.response.data.error.message, life: 3000});
            });
        },
        cancel() {
            this.$router.back();
        }
    }
    
}
</script>

<style>

</style>