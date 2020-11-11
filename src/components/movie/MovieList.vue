<template>
<div>
    <DataView :value="movies" :layout="layout">
        <template #header>
            <div class="list-header-left p-grid">
                <div class="sorter p-lg-4 p-col-12" style="text-align: left">
                    <div class="p-inputgroup sort-inputgroup">
                        <Dropdown v-model="request.sortField" :options="sortOptions" optionLabel="label" optionValue="value" @change="onSort($event)"/>
                        <Button :icon="sortBtnIcon" @click="changeSortDirection"></Button>
                    </div>
                </div>
                
                <div class="search-title p-lg-4 p-col-12">
                    <InputText v-model="request.filters.title" placeholder="Search by title" @change="onSearch()" style="width: 100%"></InputText>
                </div>
                <div class="p-lg-4 p-col-12" v-if="isAdmin">
                    <Dropdown v-model="request.filters.available" :options="availableOptions" optionLabel="name" optionValue="code" @change="onSearch()" style="width: 100%;"></Dropdown>
                </div>
                <div class="paginator p-lg-2 p-col-12">
                    
                </div>
            </div>
            <div style="text-align: center">
                <Paginator :rows="request.pageSize" :totalRecords="totalRecords" :rowsPerPageOptions="[10,20,50, 100]" :first="firstItem"
                template="PrevPageLink CurrentPageReport NextPageLink RowsPerPageDropdown" @page="onPage"></Paginator>
            </div>
        </template>

        <template #list="slotProps">
            <div class="p-col-12 list-items">
                <div class="product-list-item" @click="showDetails(slotProps.data)">
                    <img :src="slotProps.data.thumbnail" :alt="slotProps.data.title" onerror="this.onerror=null;this.src='https://image.shutterstock.com/image-vector/vector-graphic-no-thumbnail-symbol-260nw-1391095985.jpg'"/>
                    <div class="product-list-detail">
                        <div class="product-name">{{(slotProps.data.title)}}</div>
                        <div class="product-likes">{{slotProps.data.likes}} Like(s)</div>
                    </div>
                    <div class="product-list-action">
                        <div class="product-rental-price"><span style="font-weight: bold">Rent: </span>${{slotProps.data.rentalPrice.toFixed(2)}}</div>
                        <div class="product-sale-price"><span style="font-weight: bold">Purchase: </span>${{slotProps.data.salePrice.toFixed(2)}}</div>
                        <div :class="{'product-unavailable':!slotProps.data.available, 'product-available':slotProps.data.available}" v-if="isAdmin">{{slotProps.data.available? 'Available' : 'Unavailable'}}</div>
                    </div>
                    
                </div>
            </div>
        </template>

        <template #footer>
            <div style="text-align: center">
                <Paginator :rows="request.pageSize" :totalRecords="totalRecords" :rowsPerPageOptions="[10,20,50, 100]" :first="firstItem"
                template="PrevPageLink CurrentPageReport NextPageLink RowsPerPageDropdown" @page="onPage"></Paginator>
            </div>
        </template>
    </DataView>
</div>
</template>

<script>
// import MovieService from '@/services/MovieService.js';
import DataView from 'primevue/dataview';
import Dropdown from 'primevue/dropdown';
import Paginator from 'primevue/paginator';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

export default {
    name: 'MovieList',
    components: {
        DataView,
        Dropdown,
        Paginator,
        Button,
        InputText,
    },
    data() {
        return {
            date: new Date(),
            movies: [],
            totalRecords: 0,
            selectedMovie: {},
            layout: 'list',
            availableOptions: [
                {name: 'Show available only', code: 1},
                {name: 'Show unavailable', code: 0},
                {name: 'Show all', code: 2},
            ],
            request: {
              page: 0,
              pageSize: 10,
              sortField: "title",
              sortOrder: 1,
              filters: {
                title: "",
                available: 2,
              }
            },
            sortOptions: [
                {label : 'Sort By Title', value: 'title'},
                {label : 'Sort By Likes', value: 'likes'},
            ],
            pageSizeOptions: [
                {label : '10', value: 10},
                {label : '20', value: 20},
                {label : '50', value: 50},
                {label : '100', value: 100},
            ]
        }
    },
    mounted() {
        this.loadMovies();
    },
    computed: {
        isAdmin() {
            return this.auth.isAdmin;
        },
        auth() {
            return this.$store.getters.auth;
        },
        service() {
            return this.$store.getters.services.movieService;
        },
        firstItem() {
            return this.request.page * this.request.pageSize;
        },
        sortBtnIcon() {
            let dir = this.request.sortOrder == 1 ? 'up' : 'down';
            let type = this.request.sortField == 'likes' ? 'numeric' : 'alpha'
            return `pi pi-sort-${type}-${dir}`;
        },
        pageCount() {
            return Math.floor(this.totalRecords / this.request.pageSize)
        }
    },
    methods: {
        loadMovies(request = this.request) {
            return this.service.getMovieList(request).then(res => {
                this.movies = res.data;
                console.log("movies", this.movies);
                this.totalRecords = res.totalRecords;
            });
        },
        onPage(e) {
            console.log("page e", e)
            this.request.page = e.page;
            if(e.rows) {
                this.request.pageSize = e.rows;
            }
            this.loadMovies();
            this.scrollToTop();
            
        },
        onNextPage() {
           this.onPage({page: this.request.page + 1, rows: 10}) 
        },
        onPrevPage() {
           this.onPage({page: this.request.page -1, rows: 10}) 
        },
        onSort() {
            if(this.request.sortField == 'likes') {
                this.request.sortOrder = 0;
            } else {
                this.request.sortOrder = 1;
            }
            this.loadMovies();
        },
        onSelection() {
            this.$emit('movie-selected', this.selectedMovie);
            // this.$router.push('/movie/details/'+this.selectedMovie.id)
        },
        onAvailableFilgerCahnged() {
            this.request.page = 0;
            this.loadMovies();
        },
        showDetails(movie) {
            this.$emit('movie-selected', movie);
        },
        addMovie() {
            this.$emit('add-clicked');
        },
        onSearch() {
            this.onPage({page: 0, rows: this.request.pageSize});
        },
        changeSortDirection() {
            if(this.request.sortOrder == 1) {
                this.request.sortOrder = 0;
            } else {
                this.request.sortOrder = 1;
            }
            this.onPage({page: 0});
        },
        cutTitle(title) {
            let res = title.substring(0,50);
            if(res.length < title.length && res.length == 50) {
                res += '...'
            }
            return res;
        },
        scrollToTop() {
            window.scroll({
                top: 0,
                left: 0,
            });
        }
    }

}
</script>

<style lang="scss" scoped>


.paginator {
    width: auto;
}

.list-header-left {
    .sorter, .search-title, .paginator {
        display: inline-block;
    }
}

.product-name {
    font-weight: bold;
    overflow: hidden;
}

.product-list-item {
    position: relative;
    cursor: pointer;

    &:hover {
        background-color: rgba(0,0,0,0.1);
    }

    img {
        height: 150px;
        width: 100px;
    }

    .product-list-detail, .product-list-action, img, .product-available {
        display: inline-block;
    }

    .product-list-detail {
        position: absolute;
        top: 5px;
        font-size: 20pt;

        .product-likes {
            font-size: 12pt;
        }
    }

    @media(max-width: 600px) {
        .product-name {
            font-size: 12pt;
        }
    }

    .product-list-action {
        .product-rental-price{
            margin-bottom: 3px;
        }
    }

    .product-unavailable {
        color: red;
    }
    .product-available {
        color: green;
    }

    .product-unavailable, .product-available {
        font-weight: bold;
    }
}


</style>