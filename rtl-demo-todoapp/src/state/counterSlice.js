const { createSlice } = require("@reduxjs/toolkit");
const initialState = {
    counter: 0
}

const counterSlice = createSlice({
    name: "counterSlice", // represents particular reducer in the state
    initialState: initialState, // you can directly import the initial state object
    reducers: {
        INCREMENT: (state) => {
            state.counter += 1;
        },
        DECREMENT: (state) => {
            state.counter -= 1;
        },
        RESET: (state) => {
            state.counter = 0;
        },
        INCREMENT_BY: (state, action) => {
            state.counter += action.payload;
        }
    }
});

export const {INCREMENT, DECREMENT, INCREMENT_BY, RESET} = counterSlice.actions; // contains action creators for each of the reducer methods defined above
export default counterSlice.reducer; // contains the generated reducer function
