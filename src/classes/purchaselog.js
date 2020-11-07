export default class PurchaseLog {
    constructor(log) {
        this.movie = log.movie;
        this.user = log.user;
        this.date = new Date(log.purchaseDateTime);
        this.quantity = log.quantity;
        this.price = log.price;
    }
}