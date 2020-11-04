<template>
  <div>
      <h3>Purchase: {{movie.title}}</h3>
      <div class="p-fluid">
            <div class="p-field">
                <label for="lastname">Quantity</label>
                <InputNumber id="quantity" v-model="purchase.quantity" showButtons :min="1"/>
            </div>
            <div>Price: {{price}}</div>
        </div>
        <Button @click="doPurchase()" class="p-mr-2" label="Purchase"></Button>
        <Button @click="cancel()" class="p-button-danger" label="Cancel"></Button>
  </div>
</template>

<script>
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';

import {inject} from 'vue';

export default {
    name: 'MoviePurchase',
    components: {
       InputNumber,
       Button,
    },
    props: {
        movie: Object,
    },
    data() {
        return {
            service: inject('service'),
            purchase: {
                movieId: this.movie.id,
                quantity: 1,
            }
        }
    },
    computed: {
        price() {
            return this.purchase.quantity * this.movie.salePrice;
        }
    },
    methods: {
        doPurchase() {
            this.service.purchaseMovie(this.purchase).then(() => {
                this.$toast.add({severity:'success', summary: 'Purchase successful', detail:"You've purchased this movie successfully", life: 3000});
                this.$emit('purchase-ok');
            });
        },
        cancel() {
            this.$emit('cancelled');
        }
    }
}
</script>

<style>

</style>