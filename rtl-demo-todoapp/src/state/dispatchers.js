const { default: store } = require("./store");

class Dispatchers {
    static increment() {
        store.dispatch({ type: "INCREMENT" });
    }

    static incrementBy(amount) {
        store.dispatch({ type: "INCREMENT_BY", payload: { amount } });
    }

    static decrement() {
        store.dispatch({ type: "DECREMENT" });
    }

    static reset() {
        store.dispatch({ type: "RESET" });
    }
}

export default Dispatchers;