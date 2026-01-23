import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsThunk } from '../state/asyncThunks';

const TodoList = ({ userId = 1 }) => {
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todoSlice.todos || []);
    const todosStatus = useSelector((state) => state.todoSlice.Status);
    const todosStatusMessage = useSelector((state) => state.todoSlice.StatusMessage || '');

    useEffect(() => {
        dispatch(fetchPostsThunk(userId));
    }, [userId, dispatch]);

    const renderContent = () => {
        if (todosStatus === 'loading') {
            return (
                <div className="todos-loading">
                    <p>Loading todos...</p>
                </div>
            );
        }

        if (todosStatus === 'failed') {
            return (
                <div className="todos-error">
                    <p>Error loading todos: {todosStatusMessage}</p>
                </div>
            );
        }

        if (todosStatus === 'succeeded' && todos.length === 0) {
            return (
                <div className="todos-empty">
                    <p>No todos found for user {userId}</p>
                </div>
            );
        }

        return (
            <ul className="todos-list">
                {todos.map((todo) => (
                    <li
                        key={todo.id}
                        className={`todo-item ${todo.completed ? 'completed' : 'pending'}`}
                    >
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            readOnly
                            className="todo-checkbox"
                        />
                        <span className="todo-title">{todo.title}</span>
                        <span className="todo-id">#{todo.id}</span>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="todo-list-container">
            <h2>User {userId} Todos</h2>
            <div className="todos-status">
                Status: <span className={`status-${todosStatus}`}>{todosStatus}</span>
            </div>
            {renderContent()}
            <div className="todos-count">
                Total: {todos.length} todo{todos.length !== 1 ? 's' : ''}
            </div>
        </div>
    );
};

export default TodoList;
