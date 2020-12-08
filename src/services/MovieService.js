import BaseService from './BaseService';



export default class MovieService extends BaseService {

    getMovieList(lazyRequest) {
        console.log(lazyRequest)
        // let url = this.baseUrl+"/movie/find";
        let url = this.baseUrl+"/api/v1/movies";
        let sort = lazyRequest.sortField;
        if(lazyRequest.sortOrder == 0) {
            sort = "-" + sort;
        }
        let params = {'page': lazyRequest.page, 'per_page': lazyRequest.pageSize, 'sort': sort, 'title': lazyRequest.filters.title, 'available': lazyRequest.filters.available}
        return this.axios.get(url, {headers: this.headers, params: params}).then(res => res);
    }

    getMovieDetails(id) {
        let url = this.baseUrl+"/api/v1/movies/"+id;
        return this.axios.get(url, {headers: this.headers}).then(res => res.data);
    }

    saveMovie(movie) {
        let url = this.baseUrl+"/api/v1/movies/"+ (movie.id ? movie.id : '')
        let send = movie.id ? this.axios.put : this.axios.post
        return send(url, movie, {headers: this.headers}).then(res =>{
            return res.data;
        });
    }

    deleteMovie(id) {
        let url = this.baseUrl+"/api/v1/movies/"+id;
        return this.axios.delete(url, {headers: this.headers}).then(res => res);
    }

    likeMovie(id) {
        let url = this.baseUrl+"/api/v1/movies/"+id+"/like"
        return this.axios.patch(url, {}, {headers: this.headers}).then(res => res.data)
    }

    rentMovie(rent) {
        let url = this.baseUrl + "/api/v1/movies/"+rent.movieId+"/rents";
        return this.axios.post(url, rent, {headers: this.headers})
    }

    purchaseMovie(purchase) {
        let url = this.baseUrl + "/api/v1/movies/"+purchase.movieId+"/purchases";
        console.log("purchase url", url, purchase.movieId);
        return this.axios.post(url, purchase, {headers: this.headers});
    }

    queryChangeLogs(request) {
        let url = this.baseUrl + "/api/v1/movie/admin/changelog";
        return this.axios.post(url, request, {headers: this.headers}).then(res => res.data)
    }

    toggleAvailable(movieId) {
        return this.axios.patch(this.baseUrl + "/api/v1/movies/"+movieId+"/available/", {}, {headers: this.headers})
    }


}