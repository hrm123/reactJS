import todosReducer from './todosSlice';
import { fetchPostsThunk } from './asyncThunks';

describe('Todos Slice', () => {
    const initialState = {
        counter: 0,
        todos: [],
        todosStatus: 'idle',
        todosStatusMessage: ''
    };

    test('should return the initial state', () => {
        expect(todosReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    describe('fetchPostsThunk actions', () => {
        test('should handle fetchPostsThunk.pending', () => {
            const state = { ...initialState, todosStatus: 'idle' };
            const action = { type: fetchPostsThunk.pending.type };
            const newState = todosReducer(state, action);
            expect(newState.todosStatus).toBe('loading');
        });

        test('should handle fetchPostsThunk.fulfilled', () => {
            const mockTodos = [
                { id: 1, userId: 1, title: 'Test Todo', completed: false },
                { id: 2, userId: 1, title: 'Another Todo', completed: true }
            ];
            const state = { ...initialState, todosStatus: 'loading' };
            const action = {
                type: fetchPostsThunk.fulfilled.type,
                payload: mockTodos
            };
            const newState = todosReducer(state, action);
            expect(newState.todoSlice.todos).toEqual(mockTodos);
            expect(newState.todosStatus).toBe('succeeded');
        });

        test('should handle fetchPostsThunk.rejected', () => {
            const errorPayload = { message: 'Failed to fetch todos' };
            const state = { ...initialState, todosStatus: 'loading' };
            const action = {
                type: fetchPostsThunk.rejected.type,
                payload: errorPayload
            };
            const newState = todosReducer(state, action);
            expect(newState.todoSlice.todos).toEqual([]);
            expect(newState.todoSlice.todosStatusMessage).toBe('Failed to fetch todos');
            expect(newState.todosStatus).toBe('failed');
        });

        test('should transition from pending to fulfilled', () => {
            const mockTodos = [{ id: 1, title: 'Test', completed: false }];
            let state = initialState;

            // Simulate pending
            state = todosReducer(state, { type: fetchPostsThunk.pending.type });
            expect(state.todosStatus).toBe('loading');

            // Simulate fulfilled
            state = todosReducer(state, {
                type: fetchPostsThunk.fulfilled.type,
                payload: mockTodos
            });
            expect(state.todosStatus).toBe('succeeded');
            expect(state.todoSlice.todos).toEqual(mockTodos);
        });

        test('should transition from pending to rejected', () => {
            let state = initialState;

            // Simulate pending
            state = todosReducer(state, { type: fetchPostsThunk.pending.type });
            expect(state.todosStatus).toBe('loading');

            // Simulate rejected
            state = todosReducer(state, {
                type: fetchPostsThunk.rejected.type,
                payload: { message: 'Network error' }
            });
            expect(state.todosStatus).toBe('failed');
            expect(state.todoSlice.todosStatusMessage).toBe('Network error');
        });

        test('should handle empty todos array on success', () => {
            const state = initialState;
            const action = {
                type: fetchPostsThunk.fulfilled.type,
                payload: []
            };
            const newState = todosReducer(state, action);
            expect(newState.todoSlice.todos).toEqual([]);
            expect(newState.todosStatus).toBe('succeeded');
        });

        test('should handle large todos array', () => {
            const mockTodos = Array.from({ length: 100 }, (_, i) => ({
                id: i + 1,
                userId: 1,
                title: `Todo ${i + 1}`,
                completed: false
            }));
            const state = initialState;
            const action = {
                type: fetchPostsThunk.fulfilled.type,
                payload: mockTodos
            };
            const newState = todosReducer(state, action);
            expect(newState.todoSlice.todos).toHaveLength(100);
            expect(newState.todosStatus).toBe('succeeded');
        });

        test('should preserve other state on fulfill', () => {
            const state = { ...initialState, counter: 5 };
            const action = {
                type: fetchPostsThunk.fulfilled.type,
                payload: [{ id: 1, title: 'Test' }]
            };
            const newState = todosReducer(state, action);
            expect(newState.counter).toBe(5);
        });

        test('should preserve other state on reject', () => {
            const state = { ...initialState, counter: 5 };
            const action = {
                type: fetchPostsThunk.rejected.type,
                payload: { message: 'Error' }
            };
            const newState = todosReducer(state, action);
            expect(newState.counter).toBe(5);
        });
    });

    test('should not modify counter state in todos reducer', () => {
        const state = { ...initialState, counter: 42 };
        const action = {
            type: fetchPostsThunk.pending.type
        };
        const newState = todosReducer(state, action);
        expect(newState.counter).toBe(42);
    });
});
