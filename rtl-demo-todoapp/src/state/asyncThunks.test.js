import { fetchPostsThunk } from './asyncThunks';
import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todosSlice';

// Mock fetch globally
global.fetch = jest.fn();

describe('Async Thunks', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    describe('fetchPostsThunk', () => {
        test('should have correct action type', () => {
            expect(fetchPostsThunk.typePrefix).toBe('todos/fetchTodos');
        });

        test('should create pending, fulfilled, and rejected actions', () => {
            expect(fetchPostsThunk.pending).toBeDefined();
            expect(fetchPostsThunk.fulfilled).toBeDefined();
            expect(fetchPostsThunk.rejected).toBeDefined();
        });

        test('should fetch todos successfully', async () => {
            const mockTodos = [
                { id: 1, userId: 1, title: 'Test Todo 1', completed: false },
                { id: 2, userId: 1, title: 'Test Todo 2', completed: true }
            ];
            fetch.mockResolvedValueOnce({
                json: async () => mockTodos
            });

            const store = configureStore({
                reducer: {
                    todo: todosReducer
                }
            });

            await store.dispatch(fetchPostsThunk(1));
            const state = store.getState();

            expect(fetch).toHaveBeenCalledWith(
                'https://jsonplaceholder.typicode.com/todos?userId=1'
            );
            expect(state.todo.todoSlice.todos).toEqual(mockTodos);
            expect(state.todo.todosStatus).toBe('succeeded');
        });

        test('should handle different userIds', async () => {
            const mockTodos = [{ id: 1, userId: 5, title: 'Test', completed: false }];
            fetch.mockResolvedValueOnce({
                json: async () => mockTodos
            });

            const store = configureStore({
                reducer: {
                    todo: todosReducer
                }
            });

            await store.dispatch(fetchPostsThunk(5));

            expect(fetch).toHaveBeenCalledWith(
                'https://jsonplaceholder.typicode.com/todos?userId=5'
            );
        });

        test('should handle empty response', async () => {
            fetch.mockResolvedValueOnce({
                json: async () => []
            });

            const store = configureStore({
                reducer: {
                    todo: todosReducer
                }
            });

            await store.dispatch(fetchPostsThunk(1));
            const state = store.getState();

            expect(state.todo.todoSlice.todos).toEqual([]);
            expect(state.todo.todosStatus).toBe('succeeded');
        });

        test('should handle fetch network error', async () => {
            const error = new Error('Network error');
            fetch.mockRejectedValueOnce(error);

            const store = configureStore({
                reducer: {
                    todo: todosReducer
                }
            });

            const result = await store.dispatch(fetchPostsThunk(1));
            const state = store.getState();

            expect(state.todo.todosStatus).toBe('failed');
            expect(state.todo.todoSlice.todos).toEqual([]);
        });

        test('should handle various user IDs', async () => {
            const userIds = [1, 5, 10];

            for (const userId of userIds) {
                fetch.mockResolvedValueOnce({
                    json: async () => [{ id: userId, userId, title: 'Test', completed: false }]
                });

                const store = configureStore({
                    reducer: {
                        todo: todosReducer
                    }
                });

                await store.dispatch(fetchPostsThunk(userId));

                expect(fetch).toHaveBeenCalledWith(
                    `https://jsonplaceholder.typicode.com/todos?userId=${userId}`
                );

                fetch.mockClear();
            }
        });

        test('should properly set loading state before fetch completes', async () => {
            let resolveJson;
            const jsonPromise = new Promise((resolve) => {
                resolveJson = resolve;
            });

            fetch.mockResolvedValueOnce({
                json: () => jsonPromise
            });

            const store = configureStore({
                reducer: {
                    todo: todosReducer
                }
            });

            const dispatchPromise = store.dispatch(fetchPostsThunk(1));
            
            // At this point, the action should be pending
            expect(store.getState().todo.todosStatus).toBe('loading');

            // Resolve the fetch
            resolveJson([{ id: 1, title: 'Test', completed: false }]);
            await dispatchPromise;

            // Now it should be succeeded
            expect(store.getState().todo.todosStatus).toBe('succeeded');
        });

        test('should handle response with additional properties', async () => {
            const mockTodos = [
                {
                    id: 1,
                    userId: 1,
                    title: 'Test Todo',
                    completed: false,
                    description: 'Extra property'
                }
            ];
            fetch.mockResolvedValueOnce({
                json: async () => mockTodos
            });

            const store = configureStore({
                reducer: {
                    todo: todosReducer
                }
            });

            await store.dispatch(fetchPostsThunk(1));
            const state = store.getState();

            expect(state.todo.todoSlice.todos).toEqual(mockTodos);
            expect(state.todo.todoSlice.todos[0].description).toBe('Extra property');
        });
    });
});
