<template>
<div>
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
            <label>Movie</label>
            <Dropdown v-model="selectedMovie" :filter="!isMobile" :options="movieOptions" optionLabel="title" @change="onMovieChanged" style="width: 100%"></Dropdown>
        </div>
        <div class="p-field p-col-12 p-sm-6">
            <label for="">Change Type</label>
            <Dropdown v-model="selectedChangeType" :options="changeTypeOptions" optionLabel="name" @change="onChangeTypeChanged" style="width: 100%"></Dropdown>
        </div>
    </div>
    <div style="margin-top: 10px;">
        <DataTable :value="logs" :scrollable="true" scrollHeight="200px" :loading="loading" style="width: 100%;">
            <template #header>
                <div class="table-header">
                    <h4>Changes</h4>
                    <Button icon="pi pi-refresh" @click="onQueryClicked" title="Refresh"></Button>
                </div>
            </template>
            <Column field="movie.title" header="Movie Title" :sortable="true" :headerStyle="headerStyle"></Column>
            <Column field="date" header="Date" :sortable="true" :headerStyle="headerStyle">
                <template #body="row">
                    {{row.data.dateFormatted}}
                </template>
            </Column>
            <Column field="oldValue" header="Old Value" :headerStyle="headerStyle">
                <template #body="row">
                    {{row.data.changeType != 'TITLE' ? $filters.formatCurrency(parseFloat(row.data.oldValue)) : row.data.oldValue}}
                </template>
            </Column>
            <Column field="newValue" header="New Value" :headerStyle="headerStyle">
                <template #body="row">
                    {{row.data.changeType !== 'TITLE' ? $filters.formatCurrency(parseFloat(row.data.newValue)) : row.data.newValue}}
                </template>
            </Column>
            <Column field="changeType" header="Change Type" :sortable="true" :headerStyle="headerStyle">
                
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
import ChangeLog from '@/classes/changelog';

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
                changeType: null,
            },
            logs: [],
            selectedMovie: {},
            movies: [],
            selectedChangeType: {},
            changeTypes: [
                    {changeType: 'TITLE', name: 'Title'},
                    {changeType: 'SALE_PRICE', name: 'Sale price'},
                    {changeType: 'RENTAL_PRICE', name: 'Rental price'},
                ],
            headerStyle: 'width: 150px',
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
            return {id: null, title: 'All'}
        },
        emptyChangeType() {
            return {changeType: null, name: 'All'}
        },
        changeTypeOptions() {
            return [this.emptyChangeType].concat(this.changeTypes)
        },
        isMobile() {
            return this.$utils.isMobile();
        }
    },
    created() {
        this.$store.commit('pageTitle', 'Change Log')
    },
    mounted() {
        this.selectedMovie = this.emptyMovie;
        this.selectedChangeType = this.emptyChangeType;
        this.query();
    },
    methods: {
        query() {
            return this.service.getChangeLog(this.request).then(res => {
                this.logs = res.data.map(l => new ChangeLog(l));
                this.updateMovies();
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
        onMovieChanged() {
            this.request.movieId = this.selectedMovie.id;
            this.query();
        },
        onChangeTypeChanged() {
            this.request.changeType = this.selectedChangeType.changeType;
            this.query();
        },
        onQueryClicked() {
            this.query();
            if(window.Android) {
                window.Android.showToast("Querying");
            }
            
        }
    },

}
</script>

<style scoped>
.table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>