const { createAsyncThunk } = require("@reduxjs/toolkit");


const fetchPostsThunk = createAsyncThunk("todos/fetchTodos", async (userId, thunkAPI) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`);
    const data = await response.json();
    return data; // this will be the payload of the fulfilled action
});

export { fetchPostsThunk };