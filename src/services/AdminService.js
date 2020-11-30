import BaseService from './BaseService';

export default class AdminService extends BaseService {

    getChangeLog(request) {
        let url = this.baseUrl + "/api/v1/changes"
        let params = {};
        Object.assign(params, request);
        params.dateFrom = this.dateToString(request.dateFrom);
        params.dateTo = this.dateToString(request.dateTo);
        return this.axios.get(url, {headers: this.headers, params: params});
    }

    getRentLog(request) {
        let url = this.baseUrl + "/api/v1/rents";
        let params = {};
        Object.assign(params, request);
        params.dateFrom = this.dateToString(request.dateFrom);
        params.dateTo = this.dateToString(request.dateTo);
        return this.axios.get(url, {headers: this.headers, params: params});
    }

    getPurchaseLog(request) {
        let url = this.baseUrl + "/api/v1/purchases";
        let params = {};
        Object.assign(params, request);
        params.dateFrom = this.dateToString(request.dateFrom);
        params.dateTo = this.dateToString(request.dateTo);
        return this.axios.get(url, {headers: this.headers, params: params});
    }

    returnRent(log) {
        let url = this.baseUrl + "/api/v1/movies/"+log.movie.id+"/rents/"+log.id+"/return"
        console.log("return url", url)
        return this.axios.patch(url, {}, {headers: this.headers});
    }

    dateToString(date) {
        let day2 = date.getDate().toString().padStart(2,0)
        let month = (date.getMonth() + 1).toString().padStart(2, 0)
        return `${date.getFullYear()}-${month}-${day2}`;
    }
}