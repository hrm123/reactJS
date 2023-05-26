const { createAction, nanoid, createReducer, configureStore } = require("@reduxjs/toolkit")

// Initial state
const InitialState = {
    counter: 0
}

// Action creator
const increment = createAction("INCREMENT")
// console.log( increment(20)) gives {type: 'INCREMENT', payload: 20}

const decrement = createAction("DECREMENT")
const reset = createAction("RESET")

const increment_by = createAction("INCREMENT_BY", (amount, user) => {
    return {
        payload: {amount , user, id : nanoid()}
    }
})
// console.log(increment_by(20, "Emma")) gives  {type: 'INCREMENT_BY', payload: {amount: 20, user: 'Emma', id: 'Ghfryweowekknk-ov'}

 
// Reducer

const counterSlice1 = createReducer(InitialState, (builder)=>{
    builder.addCase(increment, (state) => { state.counter += 1 })
    builder.addCase(decrement, (state) => { state.counter -= 1 })
    builder.addCase(reset, (state) => { state.counter = 0 })
    builder.addcase(increment_by, (state, action) => { state.counter += action.payload.amount })


}) // this method of creating reducers is advised since this will give intellisense

const counterSlice2 = createAction(initialState, {
    [increment]: (state) => {state.counter += 1},
    [decrement]: (state) => {state.counter -= 1},
    [increment_by]: (state, action) => {state.counter += action.payload.amount},
}) //alternative syntax for creating reducer

// Store
const logger = require('redux-logger').createLogger()

const store = configureStore({reducer: counterSlice1,
    middeware: (getDefaultMiddleware) => { getDefaultMiddleware().concat(logger)}
})

//dispatch action
store.dispatch(increment())
//console.log(store.getState()) give {counter: 1}

store.dispatch(incrementBy(100, "Carol"))
//console.log(store.getState()) give {counter: 101}


