<template>
  <div>
      <h3>Rent: {{movie.title}}</h3>
        <div class="p-fluid">
            <div class="p-field">
                <label for="firstname">Days</label>
                <InputNumber id="days" v-model="rent.rentDays" showButtons :min="1"/>
            </div>
            <div class="p-field">
                <label for="lastname">Quantity</label>
                <InputNumber id="quantity" v-model="rent.quantity" showButtons :min="1"/>
            </div>
        </div>
        <div>
            Price: {{price}}
        </div>
        <Button @click="doRent()" class="p-mr-2">Rent</Button>
        <Button @click="cancel()" class="p-button-danger">Cancel</Button>
        
  </div>
</template>

<script>
// import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
// import Toast from 'primevue/toast';

export default {
    name: 'MovieRent',
    components: {
        // InputText,
        InputNumber,
        Button,
        // Toast
    },
    props: {
        movie: Object,
    },
    data() {
        return {
            
            rent: {
                movieId: this.movie.id,
                rentDays: 1,
                quantity: 1,
            }
        }
    },
    computed: {
        price() {
            return this.movie.rentalPrice * this.rent.rentDays * this.rent.quantity;
        },
        service() {
            return this.$store.getters.services.movieService;
        }
    },
    methods: {
        doRent() {
            this.service.rentMovie(this.rent).then(res => {
                console.log(res);
                this.$toast.add({severity:'success', summary: 'Rent successful', detail:"You've rented this movie successfully", life: 3000});
                this.$emit('rent-ok');
            })
        },
        cancel() {
            this.$emit('cancelled')
        }
    }

}
</script>

<style>

</style>