<template>
<div class="card">
    <MovieDetails v-if="detailsVisible" :movieId="movieId" @cancelled="reset" @rent-clicked="onRentClicked" @purchase-clicked="onPurchaseClicked" @edit-clicked="onEditClicked"/>
    <MovieRent v-else-if="rentVisible" :movie="movie" @cancelled="onRentCancelled" @rent-ok="onRentCancelled"/>
    <MoviePurchase v-else-if="purchaseVisible" :movie="movie" @cancelled="onPurchaseCancelled" @purchase-ok="onRentCancelled"/>
    <MovieForm v-else-if="formVisible" :movie="movie" @save-ok="onSaveOk" @cancelled="onFormCancelled"/>
    <MovieList v-else @movie-selected="onMovieSelected" @add-clicked="onAddClicked"/>
    
</div>
</template>

<script>
import MovieService from '@/services/MovieService.js'
import MovieList from './MovieList.vue'
import MovieDetails from './MovieDetails.vue';
import MovieRent from './MovieRent.vue';
import MoviePurchase from './MoviePurchase.vue';
import MovieForm from './MovieForm.vue';

import { services } from '@/services/variables'

export default {
    name: 'Movie',
    setup() {
        
    },
    components: {
        MovieList,
        MovieDetails,
        MovieRent,
        MoviePurchase,
        MovieForm,
    },
    data() {
        return {
            movieId: null,
            movie: {},
            detailsVisible: false,
            rentVisible: false,
            purchaseVisible: false,
            formVisible: false,
        }
    },
    created() {
        let auth = this.$store.getters.auth;
        services.movieService = new MovieService(auth);
        this.$store.getters.services.movieService = services.movieService;
        this.$store.commit('pageTitle', 'Movies')
    },
    mounted() {
        let serv = services.movieService;
        serv.createAxios((error) => {
            if([401, 403].includes(error.response.status)) {
                this.$router.push('/login');
            }
            if(error.response.status == 422) {
                return Promise.reject(error);    
            }
            this.$messages.showError(error.response.data.message, this);
            return Promise.reject(error);
        });
    },
    methods: {
        onMovieSelected(movie) {
            this.detailsVisible = true;
            this.movieId = movie.id;
        },
        reset() {
            this.detailsVisible = false;
            this.rentVisible = false;
            this.purchaseVisible = false;
            this.formVisible = false;
        },
        onRentClicked(movie) {
            this.movie = movie;
            this.detailsVisible = false;
            this.rentVisible = true;
        },
        onRentCancelled() {
            this.reset();
            this.detailsVisible = true;
        },
        onPurchaseClicked(movie) {
            this.movie = movie;
            this.reset();
            this.purchaseVisible = true;
        },
        onPurchaseCancelled() {
            this.reset();
            this.detailsVisible = true;
        },
        onAddClicked() {
            this.reset();
            this.movie = {};
            this.formVisible = true;    
        },
        onSaveOk(movieId) {
            this.movieId = movieId;
            this.reset();
            this.detailsVisible = true;
        },
        onEditClicked(movie) {
            this.movie = movie;
            this.reset();
            this.formVisible = true;
        },
        onFormCancelled(id) {
            if(!id) this.reset();
            else this.onRentCancelled();
        }
    }
    
}
</script>

<style>
    
</style>