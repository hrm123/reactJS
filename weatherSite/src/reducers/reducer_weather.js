import {FETCH_WEATHER } from '../actions/index'

export default function(state = [], action){
    // the redux-promise MIDDLEWARE sees this 'action'' and then checks the payload property
    // if it is a promise then it stops 'action' entirely until promise is ersolved and ocne the request is doen it 
    // dispatches another action of same type but with a payload of resolved request i.e., it unwraps the promise.
    switch(action.type){
        case FETCH_WEATHER: 
            return [action.payload.data , ...state]; //ES6 verrsion for - state.concat([action.payload.data ]);
    }
    return state;
}