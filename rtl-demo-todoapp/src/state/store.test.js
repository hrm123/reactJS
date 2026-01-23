import store from './store';
import { INCREMENT, DECREMENT, RESET, INCREMENT_BY } from './counterSlice';
import { fetchPostsThunk } from './asyncThunks';

// Mock fetch globally
global.fetch = jest.fn();

describe('Redux Store', () => {
    beforeEach(() => {
        // Reset store state before each test
        store.dispatch(RESET());
        fetch.mockClear();
    });

    test('should have counter and todo reducers', () => {
        const state = store.getState();
        expect(state).toHaveProperty('counter');
        expect(state).toHaveProperty('todo');
    });

    test('should have correct initial state shape', () => {
        const state = store.getState();
        expect(state.counter).toBeDefined();
        expect(state.todo).toBeDefined();
        expect(state.counter.counter).toBe(0);
        expect(state.todo.todos).toEqual([]);
        expect(state.todo.todosStatus).toBe('idle');
    });

    test('should dispatch counter actions', () => {
        store.dispatch(INCREMENT());
        let state = store.getState();
        expect(state.counter.counter).toBe(1);

        store.dispatch(INCREMENT());
        state = store.getState();
        expect(state.counter.counter).toBe(2);

        store.dispatch(DECREMENT());
        state = store.getState();
        expect(state.counter.counter).toBe(1);
    });

    test('should dispatch INCREMENT_BY action', () => {
        store.dispatch(INCREMENT_BY({ amount: 10 }));
        const state = store.getState();
        expect(state.counter.counter).toBe(10);
    });

    test('should dispatch RESET action', () => {
        store.dispatch(INCREMENT_BY({ amount: 5 }));
        store.dispatch(RESET());
        const state = store.getState();
        expect(state.counter.counter).toBe(0);
    });

    test('should maintain isolation between counter and todo state', () => {
        store.dispatch(INCREMENT_BY({ amount: 5 }));
        const state = store.getState();
        
        expect(state.counter.counter).toBe(5);
        expect(state.todo.todos).toEqual([]);
        expect(state.todo.todosStatus).toBe('idle');
    });

    test('should dispatch async thunk', async () => {
        const mockTodos = [
            { id: 1, userId: 1, title: 'Test Todo', completed: false }
        ];
        fetch.mockResolvedValueOnce({
            json: async () => mockTodos
        });

        await store.dispatch(fetchPostsThunk(1));
        const state = store.getState();

        expect(state.todo.todoSlice.todos).toEqual(mockTodos);
        expect(state.todo.todosStatus).toBe('succeeded');
    });

    test('should subscribe to store changes', (done) => {
        const unsubscribe = store.subscribe(() => {
            const state = store.getState();
            if (state.counter.counter === 1) {
                unsubscribe();
                done();
            }
        });

        store.dispatch(INCREMENT());
    });

    test('should handle multiple dispatches', () => {
        store.dispatch(INCREMENT());
        store.dispatch(INCREMENT());
        store.dispatch(INCREMENT_BY({ amount: 5 }));
        store.dispatch(DECREMENT());

        const state = store.getState();
        expect(state.counter.counter).toBe(6);
    });

    test('should get current state with getState()', () => {
        store.dispatch(INCREMENT_BY({ amount: 25 }));
        const state = store.getState();
        
        expect(state.counter.counter).toBe(25);
    });

    test('should handle async thunk with different userId', async () => {
        const mockTodos = [
            { id: 5, userId: 5, title: 'User 5 Todo', completed: true }
        ];
        fetch.mockResolvedValueOnce({
            json: async () => mockTodos
        });

        await store.dispatch(fetchPostsThunk(5));
        const state = store.getState();

        expect(fetch).toHaveBeenCalledWith(
            'https://jsonplaceholder.typicode.com/todos?userId=5'
        );
        expect(state.todo.todoSlice.todos).toEqual(mockTodos);
    });

    test('should have middleware (logger) enabled', () => {
        // Store should be created with middleware
        expect(store).toBeDefined();
        // Dispatch should work without errors
        expect(() => store.dispatch(INCREMENT())).not.toThrow();
    });

    test('should properly handle dispatched actions in sequence', () => {
        const initialState = store.getState().counter.counter;
        
        store.dispatch(INCREMENT());
        store.dispatch(INCREMENT());
        const afterIncrements = store.getState().counter.counter;
        expect(afterIncrements).toBe(initialState + 2);

        store.dispatch(INCREMENT_BY({ amount: 10 }));
        const afterIncrementBy = store.getState().counter.counter;
        expect(afterIncrementBy).toBe(afterIncrements + 10);

        store.dispatch(RESET());
        const afterReset = store.getState().counter.counter;
        expect(afterReset).toBe(0);
    });
});
