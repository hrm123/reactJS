// state argumentt is not application state but the state that this
// reducer is repsponsible for
export default function(state = null, action){
    switch(action.type){
        case 'BOOK_SELECTED':
        //debugger;
        return action.payload; //selected book
    }
    return state; // never mutate input state.. object returned should always be a fresh object
}