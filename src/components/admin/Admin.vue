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
        let serv = new AdminService(this.$store.getters.auth);
        serv.createAxios((error) => {
            if(error.response.status == 401) {
                this.$router.push('/login');
            }
            if(error.response.status == 422) {
                return Promise.reject(error);    
            }
            this.$messages.showError(error.response.data.error.message, this);
            return Promise.reject(error);
        });
        this.$store.getters.services.adminService = serv
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