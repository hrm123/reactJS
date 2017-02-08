import React from 'react';
import '../App.css';

const TodoButton = ({ onPress, complete, name }) =>{
    return (
        <button
            onClick={onPress}
            className="todobutton"
        >
                {name}
        </button>
    );
}


export default TodoButton;