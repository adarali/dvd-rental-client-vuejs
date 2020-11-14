<template>
<div>
    <Toolbar class="form-toolbar">
        <template #left>
            <Button @click="save" class="p-mr-2">Save</Button>
            <Button class="p-button-danger" @click="cancel">Cancel</Button>
        </template>    
    </Toolbar>    
    <h3>{{headerText}}</h3>
    <div class="p-fluid p-form-grid p-grid">
        <div class="p-field p-col-12">
            <label for="title">Title</label>
            <InputText id="title" v-model="request.title" :class="{'p-invalid': invalid.title}"></InputText>
            <small id="title-help" class="p-invalid" v-if="invalid.title">{{invalid.title}}</small>
        </div>
        <div class="p-field p-col-12">
            <label for="description">Description</label>
            <Textarea id="description" v-model="request.description" :class="{'p-invalid': invalid.description}"></Textarea>
            <small id="description-help" class="p-invalid" v-if="invalid.description">{{invalid.description}}</small>
        </div>
        <div class="p-field p-col-12 p-md-4">
            <label for="stock">Stock</label>
            <InputNumber id="stock" v-model="request.stock" showButtons :class="{'p-invalid': invalid.stock}" :min="0"/>
            <small id="stock-help" class="p-invalid" v-if="invalid.stock">{{invalid.stock}}</small>
        </div>
        <div class="p-field p-col-12 p-md-4">
            <label for="rental-price">Rental price</label>
            <InputNumber id="rental-price" v-model="request.rentalPrice" showButtons :class="{'p-invalid': invalid.rentalPrice}" :min="0" :minFractionDigits="2" :maxFractionDigits="2"/>
            <small id="rental-help" class="p-invalid" v-if="invalid.rentalPrice">{{invalid.rentalPrice}}</small>
        </div>
        <div class="p-field p-col-12 p-md-4">
            <label for="sale-price">Sale price</label>
            <InputNumber id="sale-price" v-model="request.salePrice" showButtons :class="{'p-invalid' : invalid.salePrice}" :min="0" :minFractionDigits="2"  :maxFractionDigits="2"/>
            <small id="sale-help" class="p-invalid" v-if="invalid.salePrice">{{invalid.salePrice}}</small>
        </div>
        <div class="p-field p-col-12">
            <label for="image-url">Image URL</label>
            <div class="p-inputgroup">
                <InputText id="image-url" v-model="imageUrl" :class="invalid.imageUrl || invalid.movieImages ? 'p-invalid' : ''"/>
                <Button icon="pi pi-plus" title="Add URL" @click="addImageUrl" label="Add"/>
            </div>
            <small id="username2-help" class="p-invalid" v-if="invalid.movieImages">{{invalid.movieImages}}</small>
        </div>
        <!-- <div style="display: inline-block; margin-left: 5px;" v-for="image in request.movieImages" :key="image.url" class="image-container">
            <img :src="image.url" alt="" height="300">
            <Button icon="pi pi-times" title="Remove" @click="removeImg(image.url)" class="btn-remove-image"/>
        </div> -->
    </div>
    <draggable class="dragArea list-group w-full" :list="request.movieImages" handle=".movie-image">
      <div
        class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center image-container"
        v-for="image in request.movieImages"
        :key="image.url">
            <Button icon="pi pi-times" title="Remove" @click="removeImg(image.url)" class="btn-remove-image"/>
            <img :src="image.url" alt="" height="300" class="movie-image">
      </div>
    </draggable>
</div>
</template>

<script>
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import Textarea from 'primevue/textarea';
import Toolbar from 'primevue/toolbar';
import { VueDraggableNext } from 'vue-draggable-next';

export default {
    components: {
        InputText,
        InputNumber,
        Button,
        Textarea,
        Toolbar,
        draggable: VueDraggableNext,
    },
    props: {
        movie: Object,
    },
    data() {
        return {
            imageUrl: '',
            request: {
                movieId: null,
                title: '',
                description: '',
                rentalPrice: 0,
                salePrice: 0,
                stock: 0,
                likes: 0,
                available: true,
                movieImages: [],
                
            },
            invalid: {
                imageUrl: false,
            }
            
        }
    },
    created() {
        if(this.movie) {
            Object.assign(this.request, this.movie);
            this.request.movieImages = []
            if(this.movie.movieImages) {
                this.movie.movieImages.forEach(img => this.request.movieImages.push(img));
            }
            
            console.log("request images", this.request.movieImages)
            console.log("movie images", this.movie.movieImages)
        }
    },
    computed: {
        movieName() {
            if(this.movie.name) return this.movie.name;
            return '';
        },
        numVisible() {
            if(this.request.movieImages) {
                return this.request.movieImages.length;
            }
            return 0;
        },
        service() {
            return this.$store.getters.services.movieService;
        },
        headerText() {
            let text = this.movie.id ? 'Edit movie' : 'Add movie';
            if(this.request.title) {
                text += ` "${this.request.title.trim()}"`;
            }
            return text;
        }
    },
    methods: {
        save() {
            this.service.saveMovie(this.request).then(res => {
                this.$toast.add({severity:'success', summary: 'Success', detail:"The movie was saved successfully", life: 3000});
                this.$emit('save-ok', res.id);
            }).catch(error => {
                if(error.response.status == 422) {
                    let invalid = {};
                    error.response.data.messages.forEach(message => {
                       invalid[message.field] = message.error.message;
                    });
                    this.invalid = invalid;
                }
            });
        },
        addImageUrl() {
            if(!this.imageUrl) {
                return this.invalid.movieImages = "The image URL is required";
            }
            this.invalid.imageUrl = false;
            if(this.request.movieImages.filter(img => img.url == this.imageUrl).length < 1) {
                this.request.movieImages.push({url: this.imageUrl});
            }
            this.imageUrl = "";
            console.log(this.request.movieImages)
        
        },
        removeImg(url) {
            let images = this.request.movieImages
            console.log("removing img", url)
            images.splice(images.findIndex((item) => item.url == url), 1);
        },
        cancel() {
            this.$emit('cancelled', this.movie.id);
        }
    }
}
</script>

<style scoped>
.form-toolbar {
    position: sticky;
    top: 50px;
    z-index: 600;
}

.image-container {
    position: relative;
    display: inline-block;
    margin-right: 5px;
    border: none;
    border-width: 2px;
    height: auto;
    max-height: 300px;
}

.image-container img {
    max-width: 100%;
    height: auto;
    max-height: 300px;
}

.btn-remove-image {
    position: absolute;
    top: 0px;
    right: 0px;
    display: none;
    border: none;
}

.image-container:hover .btn-remove-image {
    display: block;
}

.btn-remove-image,.btn-remove-image:hover {
    background-color: rgba(255, 255, 255, 0.5);
    color: black;
}
</style>