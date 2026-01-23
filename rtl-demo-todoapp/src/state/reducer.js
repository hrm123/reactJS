const { createReducer
    //, createAction 
     } = require("@reduxjs/toolkit");
const initialState = require("./initialState");

const counterReducer = createReducer(initialState, (builder) => {
    builder
        .addCase("INCREMENT", (state) => {
            state.counter += 1;
        })
        .addCase("DECREMENT", (state) => {
            state.counter -= 1;
        })
        .addCase("RESET", (state) => {
            state.counter = 0;
        })
        .addCase("INCREMENT_BY", (state, action) => {
            state.counter += action.payload.amount; // we can directly mutate the state since RTK uses immer under the hoods
        });
});

// you could also create reducer using map object based notation

/*
const alternateCounterSlice = createAction(initialState, {
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
        state.counter += action.payload.amount;
    }
});
*/


export default counterReducer;