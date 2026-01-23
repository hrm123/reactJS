import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {INCREMENT, DECREMENT, INCREMENT_BY, RESET} from '../state/counterSlice';

const counterDemo = ({ userId = 1 }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks 
    const dispatch = useDispatch();
    // eslint-disable-next-line react-hooks/rules-of-hooks 
    var counter = useSelector((state) => state.counterSlice.counter);

    

    return (
        <div>
            <p>
            <button onClick={() => {dispatch(INCREMENT())}}>Add</button>
            <button onClick={() => {dispatch(DECREMENT())}}>Substract</button>
            <button onClick={() => {dispatch(INCREMENT_BY(10))}}>Add by ten</button>
            <button onClick={() => {dispatch(RESET())}}>Reset</button>
            </p>
            <label>Count: {counter}</label>
        </div>
    );
};

export default counterDemo;
