export default class RentLog {
    constructor(log) {
        this.movie = log.movie;
        this.user = log.user;
        this.rentDate = new Date(log.rentDate);
        this.expectedReturnDate = new Date(log.expectedReturnDate);
        this.actualReturnDate = new Date(log.actualReturnDate);
        this.price = log.price;
        this.penalty = log.penalty;
        this.totalPrice = log.totalPrice;
        this.quantity = log.quantity;
    }
}