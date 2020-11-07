<template>
	<div class="layout-profile">
		<div>
			<img src="assets/layout/images/no-profile-pic.jpg" alt="" style="width: 120px; height: 80px;"/>
		</div>
		<button class="p-link layout-profile-link" @click="onClick" v-if="auth.isLoggedIn">
			<span class="username">{{auth.user.fullName}}</span>
			<i class="pi pi-fw pi-cog"></i>
		</button>
		<div v-else><Button @click="login()">Log in</Button></div>
        <transition name="layout-submenu-wrapper">
            <ul v-show="expanded">
                <li><button class="p-link"><i class="pi pi-fw pi-user"></i><span>Account</span></button></li>
                <li><button class="p-link"><i class="pi pi-fw pi-inbox"></i><span>Notifications</span><span class="menuitem-badge">2</span></button></li>
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
			}
		},
	}
</script>

<style scoped>

</style>