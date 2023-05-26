const { configureStore, createAsyncThunk, createSlice } = require("@reduxjs/toolkit")
const axios = require("axios")

const url = "https://jsonplaceholder.typicode.com/posts"

const initialState = {
    posts: [],
    total: 0,
    loading: false,
    error: '' 
}

// create async thunk
const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    try{
    const response = await axios.get(url)
    return response.data;
    }
    catch(err){
        return err;
    }
})

// slice
const postsSlice = createSlice({ name: 'counter',
    initialState,
    reducers:{
    },
    extraReducers : (builder) => {
        builder.addCase(fetchPosts.pending, (state,action) => {
            state.loading = true
        })
        builder.addCase(fetchPosts.fulfilled, (state,action) => {
            state.loading = false;
            state.posts = action.payload;
        })
        builder.addCase(fetchPosts.rejected, (state,action) => {
            state.loading = false
            state.posts = []
            state.error = 'server error'
        })

    }
})

// Reducer
const postsReducer = postsSlice.reducer

// Store
const logger = require('redux-logger').createLogger()

const store = configureStore({
    reducer: postsReducer,
    middeware: (getDefaultMiddleware) => { getDefaultMiddleware().concat(logger)}
})

store.subscribe(() => {
    console.log(store.getState())
})
store.dispatch(fetchPosts())
