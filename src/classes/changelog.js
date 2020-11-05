export default class ChangeLog {

    

    constructor(log) {
        this.movie = log.movie;
        this.date = new Date(log.date);
        this.oldValue = log.oldValue;
        this.newValue = log.newValue;
        this.changeType = log.changeType;
    }

    get dateFormatted() {
        return this.date.toLocaleString('es-NI', { hour12: true });
    }
}