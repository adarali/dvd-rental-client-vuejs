<template>
<div>
    <h3>Purchase Log</h3>
    <div class="p-fluid p-form-grid p-grid">
        <div class="p-field p-col-12 p-sm-6">
            <label for="dateFrom">From</label>
            <Calendar v-model="request.dateFrom" dateFormat="dd/mm/yy" :yearNavigator="true" :monthNavigator="true" :yearRange="yearRange" @date-select="query"/>
        </div>
        <div class="p-field p-col-12 p-sm-6">
            <label for="dateTo">To</label>
            <Calendar v-model="request.dateTo" dateFormat="dd/mm/yy" :yearNavigator="true" :monthNavigator="true" :yearRange="yearRange" @date-select="query"/>
        </div>
        <div class="p-field p-col-12 p-sm-6">
            <label for="">Movie</label>
            <Dropdown v-model="selectedMovie" :filter="!isMobile" :options="movieOptions" optionLabel="title" @change="onMovieChanged" style="width: 100%"></Dropdown>
        </div>
        <div class="p-field p-col-12 p-sm-6">
            <label for="">User</label>
            <Dropdown v-model="selectedUser" :filter="true" :options="userOptions" optionLabel="fullName" @change="onUserChanged" style="width: 100%"></Dropdown>
        </div>
    </div>
    <div>
        <Button @click="onQueryClicked">Query</Button>
    </div>
    <div>
        <DataTable :value="logs" :paginator="true" :rows="pageSize"
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        :rowsPerPageOptions="[10,20,50]" :autoLayout="false" :scrollable="true">
            <Column field="movie.title" header="Movie Title" :sortable="true" :headerStyle="headerStyle"></Column>
            <Column field="user.fullName" header="User" :sortable="true" :headerStyle="headerStyle"></Column>
            <Column field="date" header="Purchase Date" :sortable="true" style="width: 100px;" :headerStyle="headerStyle">
                <template #body="slotProps">
                    {{formatDate(slotProps.data.date)}}
                </template>
            </Column>
            <Column field="quantity" header="Quantity" :sortable="true" :headerStyle="headerStyle"></Column>
            <Column field="price" header="Price" :sortable="true" :headerStyle="headerStyle">
                <template #body="slotProps">
                    {{$filters.formatCurrency(slotProps.data.price)}}
                </template>
            </Column>
            
        </DataTable>
    </div>
</div>
</template>

<script>
import Calendar from 'primevue/calendar';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dropdown from 'primevue/dropdown';

import RentLog from '@/classes/purchaselog'

export default {
    components: {
        Calendar,
        Button,
        DataTable,
        Column,
        Dropdown,
    },
    data() {
        return {
            request: {
                dateFrom: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                dateTo: new Date(),
                movieId: null,
                username: null,
                returned: null,
            },
            logs: [],
            selectedMovie: {},
            movies: [],
            selectedUser: {},
            users: [],
            pageSize: 20,
            headerStyle: 'width: 160px',
        }
    },
    computed: {
        yearRange() {
            let currentYear = new Date().getFullYear();
            return `${currentYear-10}:${currentYear}`;
        },
        service() {
            return this.$store.getters.services.adminService;
        },
        movieOptions() {
            return [this.emptyMovie].concat(this.movies);
        },
        emptyMovie() {
            return {id: null, title: "All"};
        },
        userOptions() {
            return [this.emptyUser].concat(this.users);
        },
        emptyUser() {
            return {username: null, fullName: "All"}
        },
        isMobile() {
            return this.$utils.isMobile();
        }
    },
    mounted() {
        this.selectedMovie = this.emptyMovie;
        this.selectedUser = this.emptyUser;
        this.query();
    },
    methods: {
        query() {
            return this.service.getPurchaseLog(this.request).then(res => {
                this.logs = res.data.map(l => new RentLog(l));
                this.updateMovies();
                this.updateUsers();
            });
        },
        updateMovies() {
            let map = new Map();
            this.logs.forEach(log => {
                map.set(log.movie.id, log.movie);
            });
            let movies = map.values();
            this.movies = Array.from(movies);
        },
        updateUsers() {
            let map = new Map();
            this.logs.forEach(log => {
                map.set(log.user.username, log.user)
            });
            this.users = Array.from(map.values());
        },
        onMovieChanged() {
            this.request.movieId = this.selectedMovie.id;
            this.query();
        },
        onUserChanged() {
            this.request.username = this.selectedUser.username;
            this.query();
        },
        onQueryClicked() {
            this.query();
        },
        formatDate(date) {
            return new Date(date).toLocaleDateString('es-NI');
        }
    }
}
</script>

<style>

</style>