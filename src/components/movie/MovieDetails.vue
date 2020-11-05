<template>
    <div>
        <Toolbar>
        <template #left>
            <Button @click="cancel()" class="p-mr-2" label="Back" icon="pi pi-chevron-left"></Button>
            <Button @click="rent" v-if="isLoggedIn" class="p-mr-2" label="Rent" icon="pi pi-dollar"></Button>
            <Button @click="purchase" v-if="isLoggedIn" label="Purchase" icon="pi pi-shopping-cart"></Button>
            <i class="pi pi-bars p-toolbar-separator p-mr-2" v-if="isLoggedIn" />
            <ToggleButton v-model="liked" :title="liked? 'Unlike' : 'Like'" onIcon="pi pi-thumbs-up" offIcon="pi pi-thumbs-up" @click="likeMovie" v-if="isLoggedIn"/>
        </template>

        <template #right v-if="isAdmin">
            <ToggleButton icon="pi pi-check" onLabel="Available" offLabel="Unavailable" title="Edit movie" class="p-mr-2" v-model="movie.available" @change="toggleAvailable"/>
            <Button icon="pi pi-pencil" class="p-button-success p-mr-2" title="Edit movie" @click="editMovie"/>
            <Button icon="pi pi-trash" class="p-button-danger" title="Delete movie"/>
        </template>
        </Toolbar>
      
        <h3>{{movie.title}}</h3>
        <table>
            <td style="width: 100px;"><span style="font-weight: bold; width: 100px;">Rent:</span> ${{movie.rentalPrice.toFixed(2)}}</td>
            <td><span style="font-weight: bold; width: 100px;">Purchase</span>: ${{movie.salePrice.toFixed(2)}}</td>
        </table>
        
      <p>{{movie.description}}</p>

      <table>
          <div>
              
          </div>
          <div style="margin-top: 5px">
              
          </div>
      </table>
      <div>
          
      </div>

      <div>
        <Carousel :value="movie.movieImages" :numVisible="numVisible">
            <template #item="slotProps">
                <a :href="slotProps.data.url" target="_blank"><img :src="slotProps.data.url" alt="" width="100" height="100"></a>
            </template>
        </Carousel>
      </div>
      
      <div>
      </div>
  </div>

  
</template>

<script>
import Button from 'primevue/button';
import ToggleButton from 'primevue/togglebutton';
import Toolbar from 'primevue/toolbar';
import Carousel from 'primevue/carousel';

export default {
   name:'MovieDetails',
    components: {
        Button,
        ToggleButton,
        Toolbar,
        Carousel,
    },
    props: {
        movieId: Number,
        
    },
    data() {
        return {
            movie: {salePrice: 0, rentalPrice: 0,},
            liked: false,
            available: true,
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
            return this.$store.getters.isLoggedIn
        },
        numVisible() {
            if(this.movie.movieImages) {
                return this.movie.movieImages.length;
            }
            return 0;
        },
        isAdmin() {
            return this.$store.getters.isAdmin;
        },
        service() {
            return this.$store.getters.services.movieService;
        }
    },
    methods: {
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
        },
        cancel() {
            this.$emit('cancelled')    
        },
        toggleAvailable() {
            let available = this.movie.available
            this.service.toggleAvailable(this.movie.id).then(res => {
                console.log("available res", res.data);
                this.movie.available = !res.data.endsWith('unavailable');
            }).catch(() => this.movie.available != available);
        },
        editMovie() {
            this.$emit('edit-clicked', this.movie);
        }
    },
}
</script>

<style>

</style>