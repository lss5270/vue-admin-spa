class EventBus {
    constructor() {
        this._events = {};
    }
    on(type, callback) {
        if (!this._events.hasOwnProperty(type)) {
        this._events[type] = [callback];
        } else {
        this._events[type].push(callback);
        }
    }
    emit(type, param) {
        if (this._events.hasOwnProperty(type)) {
        this._events[type].forEach((item) => {
            item.apply(this, [param]);
        });
        }
    }
    off(type, callback) {
        if (typeof this._events[type] === "object" && Object.prototype.toString.apply(this._events[type]) === "[object Array]") {
        for (let i = this._events[type].length - 1; i >= 0; i--) {
            if (this._events[type][i] === callback) {
            this._events[type].splice(i, 1);
            }
        }
        }
    }
}
let eventBus = new EventBus();

export const eventBusPlugin = (V) => Object.defineProperty(V.prototype, '$eBus', {value: eventBus, writable: true});