<template>
	<div class="layout-topbar">
		<button class="p-link layout-menu-button" @click="onMenuToggle">
			<span class="pi pi-bars"></span>
		</button>
		<div class="page-title">{{pageTitle}}</div>
		<div class="layout-topbar-icons">
			
			<button class="p-link" title="Logout" v-if="isLoggedIn">
				<span class="layout-topbar-item-text">Logout</span>
				<span class="layout-topbar-icon pi pi-sign-out" @click="logout"></span>
			</button>
			<button class="p-link" title="Login" v-if="!isLoggedIn">
				<span class="layout-topbar-item-text">Login</span>
				<span class="layout-topbar-icon pi pi-sign-in" @click="login"></span>
			</button>
		</div>
	</div>
</template>

<script>
export default {
    methods: {
        onMenuToggle(event) {
            this.$emit('menu-toggle', event);
		},
		login() {
			this.$router.push('/login');
		},
		logout() {
			this.$store.commit('logout');
			this.$router.push('/login');
		},
	},
	computed: {
		isLoggedIn() {
			return this.$store.getters.auth.isLoggedIn;
		},
		pageTitle() {
			return this.$store.getters.pageTitle;
		}
	}
}
</script>

<style lang="scss" scoped>

	.layout-topbar > * {
		display: inline-block;
	}

	.page-title {
		display: inline-block;
		margin-left: 5px;
		font-size: 14pt;
		overflow: hidden;
		width: auto;
		max-width: calc(100% - 68px);
		white-space: nowrap;
		text-overflow: clip;
	}
</style>