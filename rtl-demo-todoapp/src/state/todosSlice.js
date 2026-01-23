const { createSlice } = require("@reduxjs/toolkit");
const {fetchPostsThunk} = require("./asyncThunks");


const initialTodosState = {
    todos: [],
    Status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    StatusMessage: ''
};



/*
const todoSlice = createSlice({
    name: "todo", // represents particular reducer in the state
    initialState: require("./initialState"), // you can directly import the initial state object
    reducers: {
        ADD: (state, action) => {
            state.todos.append(action.payload.todo);
        },
        REMOVE: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
        },
        DONE: (state, action) => {
            state.todos = state.todos.map(todo => {
                if (todo.id === action.payload.id) {
                    todo.completed = true;
                }
                return todo;
            });
        }
    }
});
*/
const todoSlice = createSlice({
    name: "todosSlice", // represents particular reducer in the state
    initialState: initialTodosState, // you can directly import the initial state object
    extraReducers: (builder) => {
        builder
            .addCase(fetchPostsThunk.pending, (state) => {
                state.Status = 'loading';
            })
            .addCase(fetchPostsThunk.fulfilled, (state, action) => {
                state.todos = action.payload;
                state.Status = 'succeeded';
            })
            .addCase(fetchPostsThunk.rejected, (state, action) => {
                state.todos = [];
                state.StatusMessage = action.payload.message;
                state.Status = 'failed';
            });
        }
});

// const {INCREMENT, DECREMENT, INCREMENT_BY, RESET} = counterSlice.actions; // contains action creators for each of the reducer methods defined above
// const counterReducer = counterSlice.reducer; // contains the generated reducer function

export const {ADD, REMOVE, DONE} = todoSlice.actions;
export default todoSlice.reducer;