<template>
  <div>
      <div class="card">
        <MovieDetails v-if="detailsVisible" />
        <MovieList v-else/>
      </div>
  </div>
</template>

<script>
import MovieService from '@/services/MovieService.js'
import MovieList from './MovieList.vue'
import MovieDetails from './MovieDetails.vue';
import { provide } from 'vue';

export default {
    name: 'Movie',
    setup() {
        provide('service', new MovieService());
    },
    components: {
        MovieList,
        MovieDetails,
    },
    data() {
        return {
            detailsVisible: false,
        }
    }
    
}
</script>

<style>

</style>