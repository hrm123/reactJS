import counterReducer from "./counterSlice";
import todoReducer from "./todosSlice";

const { configureStore } = require("@reduxjs/toolkit");
const logger = require("redux-logger").default;


const store = configureStore({
    // reducer: require("./reducer"),
    reducer: {
        counterSlice: counterReducer,
        todoSlice: todoReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
export default store;