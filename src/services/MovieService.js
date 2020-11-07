import BaseService from './BaseService';



export default class MovieService extends BaseService {

    getMovieList(lazyRequest) {
        let url = this.baseUrl+"/movie/find";
        return this.axios.post(url, lazyRequest, {headers: this.headers}).then(res => res.data);
    }

    getMovieDetails(id) {
        let url = this.baseUrl+"/movie/find/"+id;
        return this.axios.get(url, {headers: this.headers}).then(res => res.data);
    }

    saveMovie(movie) {
        let url = this.baseUrl+"/movie/admin/"
        let send = movie.id ? this.axios.put : this.axios.post
        return send(url, movie, {headers: this.headers}).then(res =>{
            return res.data;
        });
    }

    deleteMovie(id) {
        let url = this.baseUrl+"/movie/admin/"+id;
        return this.axios.delete(url, {headers: this.headers}).then(res => res);
    }

    likeMovie(id) {
        let url = this.baseUrl+"/movie/like?id="+id;
        return this.axios.get(url, {headers: this.headers}).then(res => res.data)
    }

    rentMovie(rent) {
        let url = this.baseUrl + "/rent";
        return this.axios.post(url, rent, {headers: this.headers})
    }

    purchaseMovie(purchase) {
        let url = this.baseUrl + "/purchase";
        return this.axios.post(url, purchase, {headers: this.headers});
    }

    queryChangeLogs(request) {
        let url = this.baseUrl + "/movie/admin/changelog";
        return this.axios.post(url, request, {headers: this.headers}).then(res => res.data)
    }

    toggleAvailable(movieId) {
        return this.axios.patch(this.baseUrl + "/movie/admin/availability/"+movieId, {}, {headers: this.headers})
    }


}