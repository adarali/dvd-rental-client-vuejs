<template>
  <div>
      <h3>{{movie.title}}</h3>
  </div>
</template>

<script>
import { auth } from '@/services/variables';
import MovieService from '@/services/MovieService.js'

export default {
   name:'MovieDetails',
    
    props: {
        movieId: Number,
        
    },
    data() {
        return {
            movie: {},
            service: new MovieService(),
            liked: false
        }
    },
    mounted() {
        this.service.getMovieDetails(this.movieId).then(data => {
            this.movie = data;
            this.liked = data.liked;
        });
    },
    computed: {
        isLoggedIn() {
            if(auth.user.username) {
                return true;
            }
            return false;
        }
    },
    methods: {
        cancel() {
            this.$emit('cancel-clicked');
        },
        likeMovie() {
            this.service.likeMovie(this.movie.id).then(data => {
                this.liked = data;
            });
        },
        rent() {
            this.$emit("rent-clicked", this.movie)
        },
        purchase() {
            this.$emit("purchase-clicked", this.movie)
        }
    }
}
</script>

<style>

</style>