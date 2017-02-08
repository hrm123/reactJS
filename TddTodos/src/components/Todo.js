import React from 'react';
import TodoButton from "./TodoButton";
import '../App.css';

const Todo = ({ todo, toggleComplete, deleteTodo  }) => (
    <div className="todoContainer">
        <div className="todoText" >
            {todo.Task}
        </div>
        <div className="buttons">
            <TodoButton
                name='Done'
                complete={todo.Complete}
                onPress={() =>toggleComplete(todo.TaskId)} 
            />
            <TodoButton
                name='Delete'
                onPress={() =>deleteTodo(todo.TaskId)}
            />
        </div>
    </div>
);


export default Todo;