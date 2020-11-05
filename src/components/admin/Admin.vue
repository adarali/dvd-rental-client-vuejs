<template>
<div class="card">
    <ChangeLog v-if="changeLogVisible"/>
    <RentLog v-else-if="rentLogVisible"/>
    <PurchaseLog v-else/>
</div>
</template>

<script>
import ChangeLog from './ChangeLog.vue'
import RentLog from './RentLog.vue'
import PurchaseLog from './PurchaseLog.vue'


import AdminService from '@/services/AdminService';


export default {
    components: {
        ChangeLog,
        RentLog,
        PurchaseLog,
    },
    props: {
        view: String,
    },
    data() {
        return {

        }
    },
    created() {
        this.$store.getters.services.adminService = new AdminService(this.$store.getters.auth);
    },
    computed: {
        changeLogVisible() {
            return "changelog" == this.view;
        },
        rentLogVisible() {
            return "rentlog" == this.view;
        }
    }
}
</script>

<style>

</style>