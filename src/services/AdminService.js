import BaseService from './BaseService';

export default class AdminService extends BaseService {

    getChangeLog(request) {
        let url = this.baseUrl + "/movie/admin/changelog"
        return this.axios.post(url, request, {headers: this.headers});
    }

    getRentLog(request) {
        let url = this.baseUrl + "/rent/admin/logs";
        return this.axios.post(url, request, {headers: this.headers});
    }

    getPurchaseLog(request) {
        let url = this.baseUrl + "/purchase/admin/logs";
        return this.axios.post(url, request, {headers: this.headers});
    }
}