<template>
<div>
    <h3>{{request.title}}</h3>
    <div class="p-fluid p-form-grid p-grid">
        <div class="p-field p-col-12">
            <label for="title">Title</label>
            <InputText id="title" v-model="request.title"></InputText>
        </div>
        <div class="p-field p-col-12">
            <label for="description">Description</label>
            <InputText id="description" v-model="request.description"></InputText>
        </div>
        <div class="p-field p-col-12 p-md-4">
            <label for="stock">Stock</label>
            <InputNumber id="stock" v-model="request.stock" showButtons/>
        </div>
        <div class="p-field p-col-12 p-md-4">
            <label for="rental-price">Rental price</label>
            <InputNumber id="rental-price" v-model="request.rentalPrice" showButtons/>
        </div>
        <div class="p-field p-col-12 p-md-4">
            <label for="sale-price">Sale price</label>changeTypes
            <InputNumber id="sale-price" v-model="request.salePrice" showButtons/>
        </div>
        <div class="p-field p-col-12">
            <label for="image-url">Image URL</label>
            <div class="p-inputgroup">
                <InputText id="image-url" v-model="imageUrl" :class="invalid.imageUrl? 'p-invalid' : ''"/>
                <Button icon="pi pi-plus" title="Add URL" @click="addImageUrl"/>
            </div>
            <small id="username2-help" class="p-invalid" v-if="invalid.imageUrl">The image URL cannot be empty</small>
        </div>
        <div class="p-field p-col-12">
            <Carousel :value="request.movieImages" :numVisible="numVisible">
                <template #item="slotProps">
                    <img :src="slotProps.data.url" alt="" width="100" height="100">
                    <Button icon="pi pi-times" title="Remove" @click="removeImg(slotProps.data.url)"/>
                </template>
            </Carousel>
        </div>
    </div>
    <Button @click="save" class="p-mr-2">Save</Button>
    <Button class="p-button-danger">Cancel</Button>
</div>
</template>

<script>
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import Carousel from 'primevue/carousel';

export default {
    components: {
        InputText,
        InputNumber,
        Button,
        Carousel,
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
    mounted() {
        if(this.movie) {
            Object.assign(this.request, this.movie);
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
        }
    },
    methods: {
        save() {
            this.service.saveMovie(this.request).then(res => {
                this.$toast.add({severity:'success', summary: 'Success', detail:"The movie was saved successfully", life: 3000});
                console.log("res", res);
                this.$emit('save-ok', res.id);
            });
        },
        addImageUrl() {
            if(!this.imageUrl) {
                return this.invalid.imageUrl = true;
            }
            this.invalid.imageUrl = false;
            if(this.request.movieImages.filter(img => img.url == this.imageUrl).length < 1) {
                this.request.movieImages.push({url: this.imageUrl});
            }
        
        },
        removeImg(url) {
            this.request.movieImages = this.request.movieImages.filter(img => img.url !== url)
        }
    }
}
</script>

<style>

</style>