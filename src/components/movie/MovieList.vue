<template>
  <div>
      
      <DataTable :value="movies" :lazy="true" :paginator="true" :rows="request.pageSize"
        :totalRecords="totalRecords" @page="onPage" @sort="onSort" v-model:selection="selectedMovie" selectionMode="single" dataKey="id"
        @row-select="onSelection">
        
        <template #header>
            <div class="table-header">
                Movies
                <Button icon="pi pi-plus" title="Add movie" label="Add" @click="addMovie" v-if="isAdmin"/>
            </div>
        </template>
          <Column field="title" header="Title" :sortable="true" key="title" style="width: auto;">
            <template #filter>
                <InputText type="text" v-model="request.filters['title']" class="p-column-filter" placeholder="Search by title" @change="onPage"/>
            </template>
          </Column>
          <Column field="likes" header="Likes" :sortable="true" key="id"></Column>
          <div v-if="isAdmin">
              <Column field="available" header="Available" key="available">
              <template #filter>
                  <Dropdown v-model="request.filters.available" :options="availableOptions" optionValue="code" optionLabel="name" class="p-column-filter" @change="onAvailableFilgerCahnged()"></Dropdown>
              </template>
                <template #body="slotProps">
                    {{slotProps.data.available ? 'Available' : 'Unavailable'}}
                </template>
              </Column>
          </div>
          
      </DataTable>
  </div>
</template>

<script>
// import MovieService from '@/services/MovieService.js';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';

import { inject } from 'vue';

export default {
    name: 'MovieList',
    components: {
        DataTable,
        Column,
        InputText,
        Dropdown,
        Button
    },
    data() {
        return {
            auth: inject('auth'),
            date: new Date(),
            service: inject('service'),
            movies: [],
            totalRecords: 0,
            selectedMovie: {},
            availableOptions: [
                {name: 'Available', code: 1},
                {name: 'Unavailable', code: 0},
                {name: 'All', code: 2},
            ],
            request: {
              page: 1,
              pageSize: 10,
              sortField: "title",
              sortOrder: 1,
              filters: {
                title: "",
                available: 1,
              }
            }
        }
    },
    mounted() {
        this.loadMovies();
    },
    computed: {
        isAdmin() {
            return this.auth.isAdmin;
        }
    },
    methods: {
        loadMovies(request = this.request) {
            this.service.getMovieList(request).then(res => {
                
                this.movies = res.data;
                this.totalRecords = res.totalRecords;
            });
        },
        onPage(e) {
            console.log("e", e.sortField)
            this.request.page = e.first / this.request.pageSize;
            this.request.sortField = e.sortField;
            this.request.sortOrder = e.sortOrder;
            this.loadMovies();
        },
        onSort(e) {
            
            this.onPage(e);
        },
        onSelection() {
            this.$emit('movie-selected', this.selectedMovie);
            // this.$router.push('/movie/details/'+this.selectedMovie.id)
        },
        onAvailableFilgerCahnged() {
            this.request.page = 0;
            this.loadMovies();
        },
        edit(id) {
            console.log("editing", id)
        },
        showDetails(movie) {
            this.$emit('movie-selected', movie);
        },
        addMovie() {
            this.$emit('add-clicked');
        }
    }

}
</script>

<style>
div.table-header {
    font-size: 20pt;
}
.p-column-filter {
    width: 100%;
}
.table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>