import React from 'react';
import '../App.css';

const Button = ({ submitTodo }) => (
    <div className="buttonContainer">
        <input type='button'
            className="button"
            onClick={submitTodo}
            value="Submit" ></input>
    </div>
);


export default Button;