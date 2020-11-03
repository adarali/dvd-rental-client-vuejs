import axios from 'axios';
import BaseService from './BaseService';



export default class MovieService extends BaseService {

    getMovieList(lazyRequest) {
        let url = this.baseUrl+"/movie/find";
        return axios.post(url, lazyRequest, {headers: this.headers}).then(res => res.data);
    }

    getMovieDetails(id) {
        let url = this.baseUrl+"/movie/find/"+id;
        return axios.get(url, {headers: this.headers}).then(res => res.data);
    }

    saveMovie(movie) {
        let url = this.baseUrl+"/movie/admin/" + (movie.id ? 'modify' : 'add');
        console.log("headers", this.headers)
        return axios.post(url, movie, {headers: this.headers}).then(res =>{
            return res.data;
        });
    }

    deleteMovie(id) {
        let url = this.baseUrl+"/movie/admin/"+id;
        return axios.delete(url, {headers: this.headers}).then(res => res);
    }

    likeMovie(id) {
        let url = this.baseUrl+"/movie/like?id="+id;
        return axios.get(url, {headers: this.headers}).then(res => res.data)
    }

    rentMovie(rent) {
        let url = this.baseUrl + "/rent";
        return axios.post(url, rent, {headers: this.headers})
    }

    purchaseMovie(purchase) {
        let url = this.baseUrl + "/purchase";
        return axios.post(url, purchase, {headers: this.headers});
    }

    queryChangeLogs(request) {
        let url = this.baseUrl + "/movie/admin/changelog";
        return axios.post(url, request, {headers: this.headers}).then(res => res.data)
    }
    

}