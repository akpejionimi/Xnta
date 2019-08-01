import * as _ from "lodash";
import store from "./components/Store"
class Sub {
    constructor() {
        this.subs = []
        store.subscribe(() => {
            this.storeValue = store.getState();

            this.subs.forEach(sub => {
                const newValue = _.get(this.storeValue, sub.key);
                if (sub.currentValue !== newValue) {
                    sub.currentValue = newValue;
                    this.getData(sub);
                }
            });
        });

        this.subscribe = this.subscribe.bind(this)
        this.unSubscribe = this.unSubscribe.bind(this);
        this.getData = this.getData.bind(this);
    }

    getData(sub) {
        const value = _.get(this.storeValue, sub.key);
        sub.method(value);
    }

    subscribe(field, cb) {
        const sub = {
            key: field,
            method: cb,
            currentValue: null
        };

        this.subs.push(sub);
        this.getData(sub);
    }
    unSubscribe(field) {
        this.subs = this.subs.filter(a => a.key !== field)

        // for (let i = 0; i < this.subs.length; i++) {
        //     const sub = this.subs[i];
        //     if (sub.key === field) {
        //         // remove from list
        //         this.subs.splice(i, 1);
        //         break;
        //     }
        // }
    }
}

export default Sub

// store.pipe(
        //   filter(val => val),
        //   take(1)
        // ).subscribe(() => this.toggleSuccess)