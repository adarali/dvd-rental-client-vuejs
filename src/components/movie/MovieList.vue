<template>
  <div>
      
      <DataTable :value="movies" :lazy="true" :paginator="true" :rows="request.pageSize"
        :totalRecords="totalRecords" @page="onPage" @sort="onSort">
        <template #header>
            <div class="table-header">Movies</div>
        </template>
          <Column field="title" header="Title" :sortable="true" key="title">
            <template #filter>
                <input type="text" v-model="request.filters.title" class="p-column-filter" placeholder="Search by title" @change="loadMovies()">
            </template>
          </Column>
          <Column field="likes" header="Likes" :sortable="true" key="likes"></Column>
      </DataTable>
  </div>
</template>

<script>
// import MovieService from '@/services/MovieService.js';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

import { inject } from 'vue';

export default {
    name: 'MovieList',
    components: {
        DataTable,
        Column
    },
    data() {
        return {
            date: new Date(),
            service: inject('service'),
            movies: [],
            totalRecords: 0,
            request: {
              page: 0,
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
    methods: {
        loadMovies(request = this.request) {
            this.service.getMovieList(request).then(res => {
                
                this.movies = res.data;
                this.totalRecords = res.totalRecords;
            });
        },
        onPage(e) {
            console.log("e", e)
            this.request.page = e.first / this.request.pageSize;
            this.request.sortOrder = e.sortOrder;
            this.loadMovies();
        },
        onSort(e) {
            this.onPage(e);
        }
    }

}
</script>

<style>
div.table-header {
    font-size: 20pt;
}
</style>