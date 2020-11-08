<template>
    <div>
        <Toolbar>
        <template #left>
            <Button @click="cancel()" class="p-mr-2" label="Back" icon="pi pi-chevron-left"></Button>
            <Button @click="rent" v-if="isLoggedIn" class="p-mr-2" label="Rent" icon="pi pi-dollar"></Button>
            <Button @click="purchase" v-if="isLoggedIn" label="Purchase" icon="pi pi-shopping-cart"></Button>
            <i class="pi pi-bars p-toolbar-separator p-mr-2" v-if="isLoggedIn" />
            <ToggleButton class="p-mr-2" v-model="liked" :title="liked? 'Unlike' : 'Like'" onIcon="pi pi-thumbs-up" offIcon="pi pi-thumbs-up" :onLabel="likes" :offLabel="likes" @click="likeMovie" v-if="isLoggedIn"/>
            <span class="pm-ml-2">{{likes == 0 ? 'No' : likes}} {{likes == 1 ? 'like' : 'likes'}}</span>
        </template>

        <template #right v-if="isAdmin">
            <ToggleButton icon="pi pi-check" onLabel="Available" offLabel="Unavailable" :title="movie.available ? 'Make unavailable' : 'Make available'" class="p-mr-2" v-model="movie.available" @change="toggleAvailable"/>
            <Button icon="pi pi-pencil" class="p-button-success p-mr-2" title="Edit movie" @click="editMovie"/>
            <Button icon="pi pi-trash" class="p-button-danger" title="Delete movie" @click="openConfirmation"/>
        </template>
        </Toolbar>
        <Dialog header="Confirmation" v-model:visible="displayConfirmation" :style="{width: '350px'}" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
                <span>Are you sure you want to delete this movie?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" @click="closeConfirmation" class="p-button-text"/>
                <Button label="Yes" icon="pi pi-check" @click="deleteMovie" class="p-button-text" autofocus />
            </template>
        </Dialog>
      
        <h3>{{movie.title}}</h3>
        <table>
            <td style="width: 100px;"><span style="font-weight: bold; width: 100px;">Rent:</span> ${{movie.rentalPrice.toFixed(2)}}</td>
            <td><span style="font-weight: bold; width: 100px;">Purchase</span>: ${{movie.salePrice.toFixed(2)}}</td>
        </table>
        
      
      <Panel header="Description">
          {{movie.description}}
      </Panel>

      <table>
          <div>
              
          </div>
          <div style="margin-top: 5px">
              
          </div>
      </table>
      <div>
          
      </div>

      <div>
        <div v-for="image in movie.movieImages" :key="image.url" class="image-container">
            <a :href="image.url" target="_blank"><img :src="image.url" alt="" height="500"></a>
        </div>
        
        
      </div>
      
      <div>
      </div>
  </div>

  
</template>

<script>
import Button from 'primevue/button';
import ToggleButton from 'primevue/togglebutton';
import Toolbar from 'primevue/toolbar';
import Dialog from 'primevue/dialog';
import Panel from 'primevue/panel';

export default {
   name:'MovieDetails',
    components: {
        Button,
        ToggleButton,
        Toolbar,
        Panel,
        Dialog,
    },
    props: {
        movieId: Number,
        
    },
    data() {
        return {
            movie: {salePrice: 0, rentalPrice: 0,},
            liked: false,
            likes: 0,
            available: true,
            displayConfirmation: false,
        }
    },
    mounted() {
        this.service.getMovieDetails(this.movieId).then(data => {
            this.movie = data;
            this.liked = data.liked;
            this.likes = data.likes;
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
                this.liked = data.liked;
                this.likes = data.likes;
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
                this.movie.available = !res.data.endsWith('unavailable');
            }).catch(() => this.movie.available != available);
        },
        editMovie() {
            this.$emit('edit-clicked', this.movie);
        },
        deleteMovie() {
            this.closeConfirmation();
            this.service.deleteMovie(this.movie.id).then(() => {
                this.$messages.showSuccess("The movie was deleted successfully", this);
                this.cancel();
            });
        },
        openConfirmation() {
            this.displayConfirmation = true;
        },
        closeConfirmation() {
            this.displayConfirmation = false;
        },
    },
}
</script>

<style scoped>
.confirmation-content {
    display: flex;
    align-items: center;
    justify-content: center;
}

.image-container {
    display: inline-block;
    margin-right: 5px;
}

.image-container img {
    max-width: 100%;
    height: auto;
    max-height: 500px;
}
</style>