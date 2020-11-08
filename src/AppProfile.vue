<template>
	<div class="layout-profile">
		<div>
			<img src="assets/layout/images/no-profile-pic.jpg" alt="" style="width: 120px; height: 80px;"/>
		</div>
		<button class="p-link layout-profile-link" @click="onClick" v-if="auth.isLoggedIn">
			<span class="username">{{auth.user.fullName}}</span>
			<i class="pi pi-fw pi-cog"></i>
		</button>
		<div v-else><Button class="p-link layout-profile-link" @click="login()">Login</Button></div>
        <transition name="layout-submenu-wrapper">
            <ul v-show="expanded">
                <li><button class="p-link" @click="logout"><i class="pi pi-fw pi-power-off"></i><span>Logout</span></button></li>
            </ul>
        </transition>
		
	</div>
</template>

<script>
import Button from 'primevue/button';

	export default {
		components: {
			Button,
		},

		props: {
			user: Object,
		},
		data() {
			return {
				expanded: false
			}
		},
		computed: {
			isLoggedIn() {
				return this.auth.isLoggedIn;
			},
			auth() {
				return this.$store.getters.auth;
			}
		},
		methods: {
			onClick(event){
				this.expanded = !this.expanded;
				event.preventDefault();
			},
			login() {
				this.$router.push({path: '/login'});
			},
			logout() {
				this.$store.commit('logout');
				this.expanded = false;
				this.$router.push('/login');
			}
		},
	}
</script>

<style scoped>

</style>