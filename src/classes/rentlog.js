export default class RentLog {
    constructor(log) {
        this.id = log.id;
        this.movie = log.movie;
        this.user = log.user;
        this.rentDate = new Date(log.rentDate + " 00:00");
        this.expectedReturnDate = new Date(log.expectedReturnDate + " 00:00");
        this.actualReturnDate = log.actualReturnDate ? new Date(log.actualReturnDate + " 00:00") : null;
        this.price = log.price;
        this.penalty = log.penalty;
        this.totalPrice = log.totalPrice;
        this.quantity = log.quantity;
    }
}