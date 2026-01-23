import { INCREMENT, DECREMENT, RESET, INCREMENT_BY } from './counterSlice';
import counterReducer from './counterSlice';

describe('Counter Slice', () => {
    const initialState = {
        counter: 0,
        todos: [],
        todosStatus: 'idle',
        todosStatusMessage: ''
    };

    test('should return the initial state', () => {
        expect(counterReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    describe('INCREMENT action', () => {
        test('should increment counter by 1', () => {
            const state = { ...initialState, counter: 5 };
            const newState = counterReducer(state, INCREMENT());
            expect(newState.counter).toBe(6);
        });

        test('should increment from 0', () => {
            const newState = counterReducer(initialState, INCREMENT());
            expect(newState.counter).toBe(1);
        });

        test('should increment negative numbers', () => {
            const state = { ...initialState, counter: -5 };
            const newState = counterReducer(state, INCREMENT());
            expect(newState.counter).toBe(-4);
        });
    });

    describe('DECREMENT action', () => {
        test('should decrement counter by 1', () => {
            const state = { ...initialState, counter: 5 };
            const newState = counterReducer(state, DECREMENT());
            expect(newState.counter).toBe(4);
        });

        test('should decrement from 0', () => {
            const newState = counterReducer(initialState, DECREMENT());
            expect(newState.counter).toBe(-1);
        });

        test('should decrement to negative numbers', () => {
            const state = { ...initialState, counter: 2 };
            const newState = counterReducer(state, DECREMENT());
            expect(newState.counter).toBe(1);
        });
    });

    describe('INCREMENT_BY action', () => {
        test('should increment counter by specified amount', () => {
            const state = { ...initialState, counter: 5 };
            const newState = counterReducer(state, INCREMENT_BY({ amount: 10 }));
            expect(newState.counter).toBe(15);
        });

        test('should handle negative amounts', () => {
            const state = { ...initialState, counter: 10 };
            const newState = counterReducer(state, INCREMENT_BY({ amount: -3 }));
            expect(newState.counter).toBe(7);
        });

        test('should handle zero amount', () => {
            const state = { ...initialState, counter: 5 };
            const newState = counterReducer(state, INCREMENT_BY({ amount: 0 }));
            expect(newState.counter).toBe(5);
        });

        test('should increment from zero with large number', () => {
            const newState = counterReducer(initialState, INCREMENT_BY({ amount: 100 }));
            expect(newState.counter).toBe(100);
        });
    });

    describe('RESET action', () => {
        test('should reset counter to 0', () => {
            const state = { ...initialState, counter: 42 };
            const newState = counterReducer(state, RESET());
            expect(newState.counter).toBe(0);
        });

        test('should reset from negative number', () => {
            const state = { ...initialState, counter: -10 };
            const newState = counterReducer(state, RESET());
            expect(newState.counter).toBe(0);
        });

        test('should reset from already zero', () => {
            const newState = counterReducer(initialState, RESET());
            expect(newState.counter).toBe(0);
        });
    });

    describe('Multiple consecutive actions', () => {
        test('should handle multiple increment actions', () => {
            let state = initialState;
            state = counterReducer(state, INCREMENT());
            state = counterReducer(state, INCREMENT());
            state = counterReducer(state, INCREMENT());
            expect(state.counter).toBe(3);
        });

        test('should handle mixed increment and decrement', () => {
            let state = initialState;
            state = counterReducer(state, INCREMENT());
            state = counterReducer(state, INCREMENT_BY({ amount: 5 }));
            state = counterReducer(state, DECREMENT());
            expect(state.counter).toBe(5);
        });

        test('should handle reset in middle of operations', () => {
            let state = initialState;
            state = counterReducer(state, INCREMENT_BY({ amount: 10 }));
            state = counterReducer(state, RESET());
            state = counterReducer(state, INCREMENT());
            expect(state.counter).toBe(1);
        });
    });

    test('should not modify other state properties', () => {
        const state = { ...initialState, todos: [{ id: 1, title: 'Test' }] };
        const newState = counterReducer(state, INCREMENT());
        expect(newState.todos).toEqual([{ id: 1, title: 'Test' }]);
        expect(newState.todosStatus).toBe('idle');
        expect(newState.todosStatusMessage).toBe('');
    });
});
