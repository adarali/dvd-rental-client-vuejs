<template>
	<div class="layout-menu-container">
		<AppSubmenu :items="menu" class="layout-menu" :root="true" @menuitem-click="onMenuItemClick" />
	</div>
</template>

<script>
import AppSubmenu from './AppSubmenu';

export default {
	props: {
		model: Array
	},
	data() {
		return {
			menu : [
                {label: 'Movies', icon: 'pi pi-fw pi-video', to: '/movie'},
				{
					label: 'Admin', icon: 'pi pi-fw pi-sitemap', visible: false,
					items: [
						{label: 'Change Log', icon: 'pi pi-fw pi-id-card', to: '/admin/changelog'},
						{label: 'Rent Log', icon: 'pi pi-fw pi-check-square', to: '/admin/rentlog'},
                        {label: "Purchase Log", icon: "pi pi-fw pi-bookmark", to: "/admin/purchaselog"},
					]
				},
				
            ]
		}
	},
    methods: {
        onMenuItemClick(event) {
            this.$emit('menuitem-click', event);
        }
	},
	mounted() {
		this.menu[1].visible = this.$store.getters.auth.isAdmin;
	},
	components: {
		'AppSubmenu': AppSubmenu
	},
	computed: {
		auth() {
			return this.$store.getters.auth;
		}
	}
}
</script>

<style scoped>

</style>