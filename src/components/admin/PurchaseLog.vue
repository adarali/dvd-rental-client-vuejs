<template>
<div>
    <h3>Purchase Log</h3>
    <div class="p-fluid p-form-grid p-grid">
        <div class="p-field p-col-6">
            <label for="dateFrom">From</label>
            <Calendar v-model="request.dateFrom" dateFormat="dd/mm/yy" :yearNavigator="true" :monthNavigator="true" :yearRange="yearRange" @date-select="query"/>
        </div>
        <div class="p-field p-col-6">
            <label for="dateTo">To</label>
            <Calendar v-model="request.dateTo" dateFormat="dd/mm/yy" :yearNavigator="true" :monthNavigator="true" :yearRange="yearRange" @date-select="query"/>
        </div>
    </div>
    <div>
        <Button @click="onQueryClicked">Query</Button>
    </div>
    <div>
        <DataTable :value="logs" :paginator="true" :rows="pageSize"
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        :rowsPerPageOptions="[10,20,50]" :autoLayout="false">
            <Column field="movie.title" header="Movie Title" :sortable="true">
                <template #filter>
                    <Dropdown v-model="selectedMovie" :filter="true" :options="movieOptions" optionLabel="title" @change="onMovieChanged" style="width: 100%"></Dropdown>
                </template>
            </Column>
            <Column field="user.fullName" header="User" :sortable="true">
                <template #filter>
                    <Dropdown v-model="selectedUser" :filter="true" :options="userOptions" optionLabel="fullName" @change="onUserChanged" style="width: 100%"></Dropdown>
                </template>
            </Column>
            <Column field="date" header="Purchase Date" :sortable="true" style="width: 100px;">
                <template #body="slotProps">
                    {{formatDate(slotProps.data.date)}}
                </template>
            </Column>
            <Column field="quantity" header="Quantity" :sortable="true"></Column>
            <Column field="price" header="Price" :sortable="true">
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
            console.log(date);
            return new Date(date).toLocaleDateString('es-NI');
        }
    }
}
</script>

<style>

</style>