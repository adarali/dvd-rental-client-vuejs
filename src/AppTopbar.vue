<template>
	<div class="layout-topbar">
		<button class="p-link layout-menu-button" @click="onMenuToggle">
			<span class="pi pi-bars"></span>
		</button>
		<div class="layout-topbar-icons">
			
			<button class="p-link" title="Logout">
				<span class="layout-topbar-item-text">Logout</span>
				<span class="layout-topbar-icon pi pi-sign-out" @click="logout"></span>
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
		logout() {
			this.$store.commit('logout');
		}
    }
}
</script>