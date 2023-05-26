const { createSlice, nanoid, configureStore, createAsyncThunk } = require("@reduxjs/toolkit")


// createSlice combines createReducer / createAction

// Initial state
const InitialState = {
    counter: 0
}


// asynchronous actions
const thunks = createAsyncThunk({

})

const counterSlices = createSlice({
    name: 'counter',
    initialState,
    reducers:{
        increment: (state, action) => { state.counter += 1},
        decrement: (state, action) => { state.counter -= 1},
        reset : (state, action) => { state.counter = 0},        
        increment_by: (state, action) => { state.counter += action.payload.amount},
    }
})

// Actions
const {increment, increment_by, decrement, reset} = counterSlices.actions;

// Reducer
const counterReducer = counterSlices.reducer

// Store
const logger = require('redux-logger').createLogger()

const store = configureStore({reducer: counterSlices,
    middeware: (getDefaultMiddleware) => { getDefaultMiddleware().concat(logger)}
})

store.dispatch(increment())

