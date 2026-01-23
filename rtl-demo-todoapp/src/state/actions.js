
const {createAction, nanoid} = require('@reduxjs/toolkit');


const increment = createAction('INCREMENT');
const decrement = createAction('DECREMENT');
const reset = createAction('RESET');
const incrementBy = createAction('INCREMENT_BY', (amount, user) => {
    return {
        payload: {amount, user, id: nanoid()}
    };
});